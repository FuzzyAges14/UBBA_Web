import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import PageFallback from './components/PageFallback'
import Home from './pages/Home'

// Keep the homepage eager for fastest first paint / LCP.
// Less-frequent routes are code-split so they do not inflate the initial bundle.
const ChildrenPrograms = lazy(() => import('./pages/ChildrenPrograms'))
const AdultPrograms = lazy(() => import('./pages/AdultPrograms'))
const ProgramDetail = lazy(() => import('./pages/ProgramDetail'))
const Just4Kids = lazy(() => import('./pages/Just4Kids'))
const BirthdayParties = lazy(() => import('./pages/BirthdayParties'))
const SummerCamp = lazy(() => import('./pages/SummerCamp'))
const ParentsNightOut = lazy(() => import('./pages/ParentsNightOut'))
const FollowUs = lazy(() => import('./pages/FollowUs'))
const SocialFeed = lazy(() => import('./pages/SocialFeed'))
const Contact = lazy(() => import('./pages/Contact'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/programs/children" element={<ChildrenPrograms />} />
          <Route path="/programs/adult" element={<AdultPrograms />} />
          <Route path="/programs/:slug" element={<ProgramDetail />} />
          <Route path="/just-4-kids" element={<Just4Kids />} />
          <Route path="/just-4-kids/birthday-parties" element={<BirthdayParties />} />
          <Route path="/just-4-kids/summer-camp" element={<SummerCamp />} />
          <Route path="/just-4-kids/parents-night-out" element={<ParentsNightOut />} />
          <Route path="/follow-us" element={<FollowUs />} />
          <Route path="/follow-us/:network" element={<SocialFeed />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
