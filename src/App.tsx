import { Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo, Suspense, lazy } from "react";
import "./App.css";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { LanguageProvider } from "./context/LanguageContext";
import LoadingSpinner from "./components/shared/LoadingSpinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Applies from "./pages/admin/Applies";
import Reports from "./pages/admin/Reports";
const Home = lazy(() => import("./pages/Home"));
const ComplianceAndPrioritization = lazy(
  () => import("./pages/ComplianceAndPrioritization")
);
const Our_Success = lazy(() => import("./pages/actions/Our_Success"));
const FAG = lazy(() => import("./pages/FAG"));
const Apply = lazy(() => import("./pages/applies/Apply"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/actions/NotFound"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminRegister = lazy(() => import("./pages/admin/AdminRegister"));
const Profile = lazy(() => import("./pages/Profile"));
const ProfileInfo = lazy(() => import("./pages/ProfileInfo"));
const Notification = lazy(() => import("./pages/Notifications"));
const Administration = lazy(() => import("./pages/Administration"));

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

          <Route path="/admin" element={<Admin />}>
            <Route index path="applies" element={<Applies />} />
            <Route path="administration" element={<Administration />} />{" "}
            <Route path="reports" element={<Reports />} />{" "}
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/profile" element={<Profile />}>
            <Route index element={<ProfileInfo />} />
            <Route path="profile_info" element={<ProfileInfo />} />
            <Route path="notification" element={<Notification />} />
            <Route path="administration" element={<Administration />} />
          </Route>

        </Routes>
      </Suspense>
      {!isNotFound && <Footer />}
    </LanguageProvider>
  );
};

export default App;
