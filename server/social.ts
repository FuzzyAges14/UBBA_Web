import { SOCIAL_PROFILES, type SocialProfileSlug } from '../src/data/contact.ts'
import { SOCIAL_RECENT_POSTS, type SocialPost } from '../src/data/site.ts'
import { serverConfig } from './config.ts'

export type SocialFeedResponse = {
  ok: true
  network: SocialProfileSlug
  source: 'live' | 'fallback'
  avatarSrc: string
  posts: SocialPost[]
  /** ISO timestamp of when live data was fetched (omitted for static fallback). */
  fetchedAt?: string
}

type CacheEntry = {
  expiresAt: number
  payload: SocialFeedResponse
}

const cache = new Map<SocialProfileSlug, CacheEntry>()

function formatDateLabel(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return 'Recent'
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function truncateCaption(text: string, max = 110): string {
  const cleaned = text.replace(/\s+/g, ' ').trim()
  if (cleaned.length <= max) return cleaned
  return `${cleaned.slice(0, max - 1).trim()}…`
}

function fallbackFeed(network: SocialProfileSlug): SocialFeedResponse {
  const profile = SOCIAL_PROFILES.find((p) => p.slug === network)
  return {
    ok: true,
    network,
    source: 'fallback',
    avatarSrc: profile?.avatarSrc ?? '/logo.png',
    posts: SOCIAL_RECENT_POSTS[network] ?? [],
  }
}

async function graphGet<T>(path: string, params: Record<string, string>): Promise<T> {
  const url = new URL(`https://graph.facebook.com/v21.0/${path.replace(/^\//, '')}`)
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }
  const res = await fetch(url)
  const data = (await res.json()) as T & { error?: { message?: string } }
  if (!res.ok || data.error) {
    throw new Error(data.error?.message || `Meta Graph error (${res.status})`)
  }
  return data
}

type FacebookPostsResponse = {
  data?: Array<{
    id: string
    message?: string
    story?: string
    created_time?: string
    permalink_url?: string
    full_picture?: string
  }>
}

type InstagramMediaResponse = {
  data?: Array<{
    id: string
    caption?: string
    timestamp?: string
    permalink?: string
    media_url?: string
    thumbnail_url?: string
    media_type?: string
  }>
}

async function fetchFacebookLive(limit: number): Promise<SocialPost[]> {
  const { pageAccessToken, facebookPageId } = serverConfig.meta
  if (!pageAccessToken || !facebookPageId) {
    throw new Error('Facebook live feed is not configured')
  }

  const data = await graphGet<FacebookPostsResponse>(`${facebookPageId}/posts`, {
    fields: 'message,story,created_time,permalink_url,full_picture',
    limit: String(limit),
    access_token: pageAccessToken,
  })

  return (data.data ?? [])
    .filter((p) => p.permalink_url)
    .map((p) => ({
      id: p.id,
      caption: truncateCaption(p.message || p.story || 'Update from United Black Belt Academy'),
      dateLabel: p.created_time ? formatDateLabel(p.created_time) : 'Recent',
      href: p.permalink_url as string,
      image: p.full_picture,
    }))
}

async function fetchInstagramLive(limit: number): Promise<SocialPost[]> {
  const { pageAccessToken, instagramBusinessAccountId } = serverConfig.meta
  if (!pageAccessToken || !instagramBusinessAccountId) {
    throw new Error('Instagram live feed is not configured')
  }

  const data = await graphGet<InstagramMediaResponse>(`${instagramBusinessAccountId}/media`, {
    fields: 'caption,media_url,permalink,timestamp,thumbnail_url,media_type',
    limit: String(limit),
    access_token: pageAccessToken,
  })

  return (data.data ?? [])
    .filter((p) => p.permalink)
    .map((p) => ({
      id: p.id,
      caption: truncateCaption(p.caption || 'Update from United Black Belt Academy'),
      dateLabel: p.timestamp ? formatDateLabel(p.timestamp) : 'Recent',
      href: p.permalink as string,
      image: p.thumbnail_url || p.media_url,
    }))
}

export function isSocialNetwork(value: string): value is SocialProfileSlug {
  return value === 'instagram' || value === 'facebook'
}

export function metaLiveConfigured(network: SocialProfileSlug): boolean {
  const { pageAccessToken, facebookPageId, instagramBusinessAccountId } = serverConfig.meta
  if (!pageAccessToken) return false
  if (network === 'facebook') return Boolean(facebookPageId)
  return Boolean(instagramBusinessAccountId)
}

/**
 * Returns recent posts for a network. Uses Meta Graph when tokens are configured;
 * otherwise (or on fetch failure) returns curated fallback posts with self-hosted images.
 */
export async function getSocialFeed(
  network: SocialProfileSlug,
  options: { limit?: number; bypassCache?: boolean } = {},
): Promise<SocialFeedResponse> {
  const limit = options.limit ?? 3
  const profile = SOCIAL_PROFILES.find((p) => p.slug === network)
  const avatarSrc = profile?.avatarSrc ?? '/logo.png'

  if (!metaLiveConfigured(network)) {
    return fallbackFeed(network)
  }

  const cached = cache.get(network)
  if (!options.bypassCache && cached && cached.expiresAt > Date.now()) {
    return cached.payload
  }

  try {
    const posts =
      network === 'instagram'
        ? await fetchInstagramLive(limit)
        : await fetchFacebookLive(limit)

    if (posts.length === 0) {
      return fallbackFeed(network)
    }

    const payload: SocialFeedResponse = {
      ok: true,
      network,
      source: 'live',
      avatarSrc,
      posts: posts.slice(0, limit),
      fetchedAt: new Date().toISOString(),
    }
    cache.set(network, {
      expiresAt: Date.now() + serverConfig.meta.cacheTtlMs,
      payload,
    })
    return payload
  } catch (err) {
    console.warn('[social] live feed failed, using fallback:', {
      network,
      reason: err instanceof Error ? err.message : 'unknown',
    })
    return fallbackFeed(network)
  }
}
