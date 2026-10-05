import { afterEach, describe, expect, it, vi } from 'vitest'
import { SOCIAL_FEED_LIMIT } from '../data/site'
import { fetchSocialFeed } from './fetchSocialFeed'

describe('fetchSocialFeed', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('caps API payloads to the three latest posts', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({
        ok: true,
        json: async () => ({
          ok: true,
          network: 'instagram',
          source: 'live',
          avatarSrc: '/media/social/instagram-profile.jpg',
          posts: [
            { id: 'a', caption: 'A', dateLabel: 'Sep 1', href: 'https://example.com/a' },
            { id: 'b', caption: 'B', dateLabel: 'Sep 2', href: 'https://example.com/b' },
            { id: 'c', caption: 'C', dateLabel: 'Sep 3', href: 'https://example.com/c' },
            { id: 'd', caption: 'D', dateLabel: 'Sep 4', href: 'https://example.com/d' },
          ],
        }),
      })),
    )

    const feed = await fetchSocialFeed('instagram')
    expect(feed).not.toBeNull()
    expect(feed?.posts).toHaveLength(SOCIAL_FEED_LIMIT)
    expect(feed?.posts.map((p) => p.id)).toEqual(['a', 'b', 'c'])
  })

  it('returns null when the request fails so static fallback can remain', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new Error('offline')
      }),
    )
    await expect(fetchSocialFeed('facebook')).resolves.toBeNull()
  })
})
