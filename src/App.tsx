import { Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo, Suspense, lazy } from "react";
import "./App.css";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { LanguageProvider } from "./context/LanguageContext";
import LoadingSpinner from "./components/shared/LoadingSpinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = lazy(() => import("./pages/Home"));
const ComplianceAndPrioritization = lazy(
  () => import("./pages/ComplianceAndPrioritization")
);
const Our_Success = lazy(() => import("./pages/actions/Our_Success"));
const FAG = lazy(() => import("./pages/FAG"));
const Apply = lazy(() => import("./pages/applies/Apply"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/actions/NotFound"));

const App: React.FC = () => {
  const location = useLocation();
  const [isNotFound, setIsNotFound] = useState<boolean>(false);

  const validPaths = useMemo<string[]>(
    () => ["/", "/eligibility", "/success", "/fag", "/contact", "/apply"],
    []
  );

  useEffect(() => {
    const pathIsValid = validPaths.some((path) => {
      if (path === "/") {
        return location.pathname === "/";
      }
      return (
        location.pathname === path ||
        (path !== "/" && location.pathname.startsWith(`${path}/`))
      );
    });
    setIsNotFound(!pathIsValid);
  }, [location.pathname, validPaths]);

  return (
    <LanguageProvider>
      {!isNotFound && <Navbar />}
      <Suspense fallback={<LoadingSpinner />}>
        <ToastContainer theme="dark" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/eligibility"
            element={<ComplianceAndPrioritization />}
          />
          <Route path="/fag" element={<FAG />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apply/*" element={<Apply />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/success" element={<Our_Success />} />
        </Routes>
      </Suspense>
      {!isNotFound && <Footer />}
    </LanguageProvider>
  );
};

export default App;
