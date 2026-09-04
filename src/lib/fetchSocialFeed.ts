import type { SocialPost, SocialSlug } from '../data/site'

export type SocialFeedPayload = {
  ok: true
  network: SocialSlug
  source: 'live' | 'fallback'
  avatarSrc: string
  posts: SocialPost[]
  fetchedAt?: string
}

/**
 * Loads recent posts from the API (live Meta feed when configured, else curated
 * fallback). Returns null on network / parse failure so the UI can keep static data.
 */
export async function fetchSocialFeed(
  network: SocialSlug,
  signal?: AbortSignal,
): Promise<SocialFeedPayload | null> {
  try {
    const res = await fetch(`/api/social/${network}`, { signal })
    if (!res.ok) return null
    const data = (await res.json()) as SocialFeedPayload
    if (!data?.ok || !Array.isArray(data.posts)) return null
    return data
  } catch {
    return null
  }
}
