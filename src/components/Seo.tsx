import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { resolveSeo } from '../data/seo'

const MANAGED_NAME_TAGS = [
  'description',
  'robots',
  'twitter:card',
  'twitter:title',
  'twitter:description',
  'twitter:image',
] as const

const MANAGED_PROPERTY_TAGS = [
  'og:title',
  'og:description',
  'og:image',
  'og:url',
  'og:type',
  'og:site_name',
] as const

function upsertMeta(
  attr: 'name' | 'property',
  key: string,
  content: string | undefined,
) {
  const selector = `meta[${attr}="${CSS.escape(key)}"]`
  const existing = Array.from(document.head.querySelectorAll(selector))

  if (!content) {
    existing.forEach((node) => node.remove())
    return
  }

  let tag = existing[0] as HTMLMetaElement | undefined
  // Drop duplicates left by earlier navigations or static HTML.
  existing.slice(1).forEach((node) => node.remove())

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  const existing = Array.from(
    document.head.querySelectorAll('link[rel="canonical"]'),
  )
  let link = existing[0] as HTMLLinkElement | undefined
  existing.slice(1).forEach((node) => node.remove())

  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

/**
 * Keeps document title, canonical URL, and social/search meta in sync with the
 * active route. Tags are upserted in place so client navigations never stack
 * duplicate meta elements.
 */
export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const seo = resolveSeo(pathname)

    document.title = seo.title
    upsertCanonical(seo.canonical)

    upsertMeta('name', 'description', seo.description)
    upsertMeta('name', 'robots', seo.robots)

    upsertMeta('property', 'og:title', seo.ogTitle)
    upsertMeta('property', 'og:description', seo.ogDescription)
    upsertMeta('property', 'og:image', seo.ogImage)
    upsertMeta('property', 'og:url', seo.ogUrl)
    upsertMeta('property', 'og:type', seo.ogType)
    upsertMeta('property', 'og:site_name', 'United Black Belt Academy')

    upsertMeta('name', 'twitter:card', seo.twitterCard)
    upsertMeta('name', 'twitter:title', seo.twitterTitle)
    upsertMeta('name', 'twitter:description', seo.twitterDescription)
    upsertMeta('name', 'twitter:image', seo.twitterImage)
  }, [pathname])

  return null
}

/** Exported for tests — lists every meta key this component manages. */
export const SEO_MANAGED_TAGS = {
  name: MANAGED_NAME_TAGS,
  property: MANAGED_PROPERTY_TAGS,
} as const
