import { afterEach, describe, expect, it, vi } from 'vitest'
import request from 'supertest'
import { createApp } from './app.ts'
import { serverConfig } from './config.ts'
import { getSocialFeed, isSocialNetwork, metaLiveConfigured } from './social.ts'
import { SOCIAL_FEED_LIMIT, SOCIAL_RECENT_POSTS } from '../src/data/site.ts'

describe('social feed helpers', () => {
  it('recognizes supported networks only', () => {
    expect(isSocialNetwork('instagram')).toBe(true)
    expect(isSocialNetwork('facebook')).toBe(true)
    expect(isSocialNetwork('youtube')).toBe(false)
  })

  it('reports live Meta feed as off without a page access token', () => {
    expect(metaLiveConfigured('instagram')).toBe(false)
    expect(metaLiveConfigured('facebook')).toBe(false)
  })

  it('keeps exactly three curated fallback posts per network', () => {
    expect(SOCIAL_RECENT_POSTS.instagram).toHaveLength(SOCIAL_FEED_LIMIT)
    expect(SOCIAL_RECENT_POSTS.facebook).toHaveLength(SOCIAL_FEED_LIMIT)
  })

  it('returns curated fallback posts with outbound links', async () => {
    const feed = await getSocialFeed('instagram')
    expect(feed.source).toBe('fallback')
    expect(feed.posts).toHaveLength(SOCIAL_FEED_LIMIT)
    expect(feed.avatarSrc).toContain('/media/social/')
    expect(feed.posts[0]?.href).toMatch(/^https:\/\//)
    expect(feed.posts[0]?.image).toMatch(/^\/media\/authentic\//)
  })
})

describe('GET /api/social/:network', () => {
  const app = createApp({ isProduction: false, corsOrigins: [] })

  it('returns Instagram fallback feed with exactly three posts', async () => {
    const res = await request(app).get('/api/social/instagram')
    expect(res.status).toBe(200)
    expect(res.body.ok).toBe(true)
    expect(res.body.network).toBe('instagram')
    expect(res.body.source).toBe('fallback')
    expect(Array.isArray(res.body.posts)).toBe(true)
    expect(res.body.posts).toHaveLength(SOCIAL_FEED_LIMIT)
    expect(res.body.posts[0].caption).toMatch(/back-to-school/i)
  })

  it('returns Facebook fallback feed with exactly three posts', async () => {
    const res = await request(app).get('/api/social/facebook')
    expect(res.status).toBe(200)
    expect(res.body.ok).toBe(true)
    expect(res.body.network).toBe('facebook')
    expect(res.body.posts).toHaveLength(SOCIAL_FEED_LIMIT)
  })

  it('rejects unknown networks', async () => {
    const res = await request(app).get('/api/social/youtube')
    expect(res.status).toBe(404)
    expect(res.body.ok).toBe(false)
  })
})

describe('live Meta Graph feed (mocked)', () => {
  const originalMeta = { ...serverConfig.meta }

  afterEach(() => {
    Object.assign(serverConfig.meta, originalMeta)
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('keeps only the three newest live Instagram posts when Graph returns more', async () => {
    serverConfig.meta.pageAccessToken = 'test-token'
    serverConfig.meta.instagramBusinessAccountId = 'ig-biz-1'
    serverConfig.meta.facebookPageId = 'ubbaad'

    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({
        ok: true,
        json: async () => ({
          data: [
            {
              id: '1',
              caption: 'Newest',
              timestamp: '2026-09-28T12:00:00+0000',
              permalink: 'https://www.instagram.com/p/newest/',
              media_url: 'https://cdn.example/1.jpg',
            },
            {
              id: '2',
              caption: 'Second',
              timestamp: '2026-09-27T12:00:00+0000',
              permalink: 'https://www.instagram.com/p/second/',
              media_url: 'https://cdn.example/2.jpg',
            },
            {
              id: '3',
              caption: 'Third',
              timestamp: '2026-09-26T12:00:00+0000',
              permalink: 'https://www.instagram.com/p/third/',
              media_url: 'https://cdn.example/3.jpg',
            },
            {
              id: '4',
              caption: 'Should drop',
              timestamp: '2026-09-25T12:00:00+0000',
              permalink: 'https://www.instagram.com/p/fourth/',
              media_url: 'https://cdn.example/4.jpg',
            },
          ],
        }),
      })),
    )

    const feed = await getSocialFeed('instagram', { bypassCache: true, limit: SOCIAL_FEED_LIMIT })
    expect(feed.source).toBe('live')
    expect(feed.posts).toHaveLength(SOCIAL_FEED_LIMIT)
    expect(feed.posts.map((p) => p.id)).toEqual(['1', '2', '3'])
    expect(feed.posts.some((p) => p.id === '4')).toBe(false)
  })

  it('keeps only the three newest live Facebook posts when Graph returns more', async () => {
    serverConfig.meta.pageAccessToken = 'test-token'
    serverConfig.meta.facebookPageId = 'ubbaad'
    serverConfig.meta.instagramBusinessAccountId = ''

    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({
        ok: true,
        json: async () => ({
          data: [
            {
              id: 'fb1',
              message: 'FB newest',
              created_time: '2026-09-28T12:00:00+0000',
              permalink_url: 'https://www.facebook.com/ubbaad/posts/1',
              full_picture: 'https://cdn.example/fb1.jpg',
            },
            {
              id: 'fb2',
              message: 'FB second',
              created_time: '2026-09-27T12:00:00+0000',
              permalink_url: 'https://www.facebook.com/ubbaad/posts/2',
              full_picture: 'https://cdn.example/fb2.jpg',
            },
            {
              id: 'fb3',
              message: 'FB third',
              created_time: '2026-09-26T12:00:00+0000',
              permalink_url: 'https://www.facebook.com/ubbaad/posts/3',
              full_picture: 'https://cdn.example/fb3.jpg',
            },
            {
              id: 'fb4',
              message: 'FB fourth dropped',
              created_time: '2026-09-25T12:00:00+0000',
              permalink_url: 'https://www.facebook.com/ubbaad/posts/4',
              full_picture: 'https://cdn.example/fb4.jpg',
            },
          ],
        }),
      })),
    )

    const feed = await getSocialFeed('facebook', { bypassCache: true, limit: SOCIAL_FEED_LIMIT })
    expect(feed.source).toBe('live')
    expect(feed.posts).toHaveLength(SOCIAL_FEED_LIMIT)
    expect(feed.posts.map((p) => p.id)).toEqual(['fb1', 'fb2', 'fb3'])
  })
})
