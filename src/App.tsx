import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Compliance_And_Prioritization from './pages/Compliance_And_Prioritization'
import Our_Success from './pages/Our_Success'
import FAG from './pages/FAG'
import Apply from './pages/Apply'
import NotFound from './pages/NotFound'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import Contact from './pages/Contact'

function App() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/compliance' element={<Compliance_And_Prioritization />} />
        <Route path='/success' element={<Our_Success />} />
        <Route path='/fag' element={<FAG />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/apply' element={<Apply />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
