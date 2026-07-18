import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ChildrenPrograms from './pages/ChildrenPrograms'
import AdultPrograms from './pages/AdultPrograms'
import ProgramDetail from './pages/ProgramDetail'
import Just4Kids from './pages/Just4Kids'
import BirthdayParties from './pages/BirthdayParties'
import SummerCamp from './pages/SummerCamp'
import ParentsNightOut from './pages/ParentsNightOut'
import FollowUs from './pages/FollowUs'
import SocialFeed from './pages/SocialFeed'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'

export default function App() {
  return (
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
  )
}
