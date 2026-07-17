import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SEO, getProgram } from '../data/site'

const FALLBACK = SEO['/']

/** Updates document title and meta description on route change. */
export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    let meta = SEO[pathname]
    if (!meta && pathname.startsWith('/programs/')) {
      const program = getProgram(pathname.replace('/programs/', ''))
      if (program) {
        meta = {
          title: `${program.name} | United Black Belt Academy`,
          description: program.tagline,
        }
      }
    }
    meta = meta ?? FALLBACK
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
