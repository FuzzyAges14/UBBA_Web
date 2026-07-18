import { cleanup, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import Seo, { SEO_MANAGED_TAGS } from './Seo'
import { resolveSeo, SEO } from '../data/seo'
import { PROGRAM_DETAILS } from '../data/site'

function renderSeo(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Seo />
    </MemoryRouter>,
  )
}

function metaContent(attr: 'name' | 'property', key: string) {
  return document.head
    .querySelector(`meta[${attr}="${key}"]`)
    ?.getAttribute('content')
}

function metaCount(attr: 'name' | 'property', key: string) {
  return document.head.querySelectorAll(`meta[${attr}="${key}"]`).length
}

afterEach(() => {
  cleanup()
  document.head
    .querySelectorAll('meta[name], meta[property], link[rel="canonical"]')
    .forEach((node) => node.remove())
  document.title = ''
})

describe('Seo component', () => {
  it('sets unique title, description, canonical, and social tags for /contact', () => {
    renderSeo('/contact')
    const expected = resolveSeo('/contact')

    expect(document.title).toBe(expected.title)
    expect(metaContent('name', 'description')).toBe(expected.description)
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      expected.canonical,
    )
    expect(metaContent('property', 'og:title')).toBe(expected.ogTitle)
    expect(metaContent('property', 'og:description')).toBe(expected.ogDescription)
    expect(metaContent('property', 'og:image')).toBe(expected.ogImage)
    expect(metaContent('property', 'og:url')).toBe(expected.ogUrl)
    expect(metaContent('property', 'og:type')).toBe('website')
    expect(metaContent('name', 'twitter:card')).toBe('summary_large_image')
    expect(metaContent('name', 'twitter:title')).toBe(expected.twitterTitle)
    expect(metaContent('name', 'twitter:image')).toBe(expected.twitterImage)
  })

  it('updates canonical and OG URL when the route changes without duplicating tags', () => {
    const first = renderSeo('/programs/children')
    expect(metaCount('name', 'description')).toBe(1)
    expect(metaCount('property', 'og:title')).toBe(1)

    first.unmount()
    renderSeo('/contact')

    const expected = resolveSeo('/contact')
    expect(document.title).toBe(expected.title)
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      expected.canonical,
    )
    expect(metaCount('name', 'description')).toBe(1)
    expect(metaCount('property', 'og:url')).toBe(1)
    expect(metaCount('property', 'og:image')).toBe(1)
    expect(metaCount('name', 'twitter:card')).toBe(1)
  })

  it('builds program-specific metadata for detail slugs', () => {
    const slug = PROGRAM_DETAILS[0].slug
    renderSeo(`/programs/${slug}`)
    const expected = resolveSeo(`/programs/${slug}`)

    expect(document.title).toBe(expected.title)
    expect(document.title).toMatch(/United Black Belt Academy/)
    expect(metaContent('name', 'description')).toBe(expected.description)
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toContain(
      `/programs/${slug}`,
    )
  })

  it('marks unknown routes as noindex', () => {
    renderSeo('/this-route-does-not-exist')
    expect(document.title).toMatch(/page not found/i)
    expect(metaContent('name', 'robots')).toBe('noindex, nofollow')
  })

  it('clears robots when navigating from a noindex page to an indexable page', () => {
    const first = renderSeo('/missing-page')
    expect(metaContent('name', 'robots')).toBe('noindex, nofollow')
    first.unmount()
    renderSeo('/')
    expect(metaContent('name', 'robots')).toBeUndefined()
  })
})

describe('SEO data', () => {
  it('gives every static SEO route a distinct title and description', () => {
    const titles = Object.values(SEO).map((m) => m.title)
    const descriptions = Object.values(SEO).map((m) => m.description)
    expect(new Set(titles).size).toBe(titles.length)
    expect(new Set(descriptions).size).toBe(descriptions.length)
  })

  it('exposes managed tag lists for regression awareness', () => {
    expect(SEO_MANAGED_TAGS.name).toContain('description')
    expect(SEO_MANAGED_TAGS.property).toContain('og:title')
  })
})
