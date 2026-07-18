import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import MobileCtaBar from './MobileCtaBar'
import Seo from './Seo'
import SkipLink from './SkipLink'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

function scrollToTop(instant: boolean) {
  try {
    window.scrollTo({ top: 0, behavior: instant ? 'auto' : 'smooth' })
  } catch {
    // jsdom / non-browser environments do not implement scrollTo
  }
}

function ScrollManager() {
  const { pathname, hash } = useLocation()
  const reduceMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) {
          try {
            el.scrollIntoView({
              behavior: reduceMotion ? 'auto' : 'smooth',
              block: 'start',
            })
          } catch {
            el.scrollIntoView()
          }
          return
        }
        scrollToTop(true)
      })
    } else {
      scrollToTop(true)
    }
  }, [pathname, hash, reduceMotion])

  return null
}

export default function Layout() {
  return (
    <MotionConfig reducedMotion="user">
      <SkipLink />
      <Seo />
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <MobileCtaBar />
    </MotionConfig>
  )
}
