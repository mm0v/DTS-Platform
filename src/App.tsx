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
import PersistLogin from "./pages/admin/PersistLogin";
import CompanyInfo from "./pages/admin/CompanyInfo";
import AddCompany from "./pages/admin/AddCompany";
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
const VerifyRegistration = lazy(() => import("./pages/admin/VerifyRegistration"));
const ProfileInfo = lazy(() => import("./pages/admin/ProfileInfo"));
const Notification = lazy(() => import("./pages/admin/Notifications"));
const Administration = lazy(() => import("./pages/admin/Administration"));

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

          <Route path="/users/verify-register" element={<VerifyRegistration />} />
          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            <Route path="/admin" element={<Admin />}>
              <Route index element={<Applies />} />
              <Route path="applies" element={<Applies />} />
              <Route path="applies/info/:id" element={<CompanyInfo />} />
              <Route path="add_company" element={<AddCompany />} />
              <Route path="administration" element={<Administration />} />{" "}
              {/* <Route path="reports" element={<Reports />} />{" "} */}
              <Route path="profile_info" element={<ProfileInfo />} />{" "}
              <Route path="notification" element={<Notification />} />{" "}
            </Route>
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
          </Route>
        </Routes>
      </Suspense>
      {!isNotFound && <Footer />}
    </LanguageProvider>
  );
};

export default App;
