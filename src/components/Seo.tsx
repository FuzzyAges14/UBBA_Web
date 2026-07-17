import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SEO } from '../data/site'

const FALLBACK = SEO['/']

/** Updates document title and meta description on route change. */
export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = SEO[pathname] ?? FALLBACK
    document.title = meta.title
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', meta.description)
  }, [pathname])

  return null
}
