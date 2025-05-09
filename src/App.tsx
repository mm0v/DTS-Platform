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

import ApplyOne from './pages/ApplyOne'
import ApplyTwo from './pages/ApplyTwo'
import ApplyThree from './pages/ApplyThree'
import ApplyFour from './pages/ApplyFour'
import ApplyFive from './pages/ApplyFive'

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
        
        <Route path='/*' element={<ApplyOne />} />
        <Route path='/apply-two' element={<ApplyTwo />} />
        <Route path='/apply-three' element={<ApplyThree />} />
        <Route path='/apply-four' element={<ApplyFour/>}/>
        <Route path='/apply-five' element={<ApplyFive/>}/>
        
        
      </Routes>

      <Footer />
    </>
  )
}

export default App
