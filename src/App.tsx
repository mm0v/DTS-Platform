import { Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import './App.css';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import { LanguageProvider } from './context/LanguageContext';
import LoadingSpinner from './components/LoadingSpinner'; // We'll create this component
// test
// Lazy load all page components
const Home = lazy(() => import('./pages/Home'));
const Compliance_And_Prioritization = lazy(() => import('./pages/Compliance_And_Prioritization'));
const Our_Success = lazy(() => import('./pages/Our_Success'));
const FAG = lazy(() => import('./pages/FAG'));
const Apply = lazy(() => import('./pages/Apply'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App: React.FC = () => {
  const location = useLocation();
  const [isNotFound, setIsNotFound] = useState<boolean>(false);

  // Define all valid paths
  const validPaths = useMemo<string[]>(() => [
    '/',
    '/eligibility',
    '/success',
    '/fag',
    '/contact',
    '/apply'
  ], []);

  // Check if current path is valid
  useEffect(() => {
    const pathIsValid = validPaths.some(path => {
      if (path === '/') {
        return location.pathname === '/';
      }
      return location.pathname === path ||
        (path !== '/' && location.pathname.startsWith(`${path}/`));
    });
    setIsNotFound(!pathIsValid);
  }, [location.pathname, validPaths]);

  return (
    <LanguageProvider>
      {!isNotFound && <Navbar />}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/eligibility' element={<Compliance_And_Prioritization />} />
          <Route path='/success' element={<Our_Success />} />
          <Route path='/fag' element={<FAG />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/apply/*' element={<Apply />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
      {!isNotFound && <Footer />}
    </LanguageProvider>
  );
};

export default App;