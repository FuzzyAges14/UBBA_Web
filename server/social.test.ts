import { describe, expect, it } from 'vitest'
import request from 'supertest'
import { createApp } from './app.ts'
import { getSocialFeed, isSocialNetwork, metaLiveConfigured } from './social.ts'

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

  it('returns curated fallback posts with preview images', async () => {
    const feed = await getSocialFeed('instagram')
    expect(feed.source).toBe('fallback')
    expect(feed.posts.length).toBeGreaterThan(0)
    expect(feed.avatarSrc).toContain('/media/social/')
    expect(feed.posts[0]?.image).toBeTruthy()
    expect(feed.posts[0]?.href).toMatch(/^https:\/\//)
  })
})

describe('GET /api/social/:network', () => {
  const app = createApp({ isProduction: false, corsOrigins: [] })

  it('returns Instagram fallback feed', async () => {
    const res = await request(app).get('/api/social/instagram')
    expect(res.status).toBe(200)
    expect(res.body.ok).toBe(true)
    expect(res.body.network).toBe('instagram')
    expect(res.body.source).toBe('fallback')
    expect(Array.isArray(res.body.posts)).toBe(true)
    expect(res.body.posts[0].caption).toMatch(/back-to-school/i)
  })

  it('returns Facebook fallback feed', async () => {
    const res = await request(app).get('/api/social/facebook')
    expect(res.status).toBe(200)
    expect(res.body.ok).toBe(true)
    expect(res.body.network).toBe('facebook')
    expect(res.body.posts.length).toBeGreaterThan(0)
  })

  it('rejects unknown networks', async () => {
    const res = await request(app).get('/api/social/youtube')
    expect(res.status).toBe(404)
    expect(res.body.ok).toBe(false)
  })
})
