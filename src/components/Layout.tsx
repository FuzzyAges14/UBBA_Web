import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import MobileCtaBar from './MobileCtaBar'
import Seo from './Seo'

function scrollToTop() {
  try {
    window.scrollTo({ top: 0 })
  } catch {
    // jsdom / non-browser environments do not implement scrollTo
  }
}

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
        scrollToTop()
      })
    } else {
      scrollToTop()
    }
  }, [pathname, hash])

  return null
}

export default function Layout() {
  return (
    <>
      <Seo />
      <ScrollManager />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <MobileCtaBar />
    </>
  )
}
