import { useLanguage } from "../../context/LanguageContext";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LOGIN_URL = "http://217.18.210.188:7777/api/v1/auth/login";

function AdminLogin() {
  const { language, pagesTranslations } = useLanguage();
  const page = pagesTranslations.admin.login;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({ email: "", password: "" });
  const [errMsg, setErrMsg] = useState("");

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setErrors(prev => ({
      ...prev,
      email: value.length < 2 || value.length > 255 ? page.errors.emailError[language] : "",
    }));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setErrors(prev => ({
      ...prev,
      password: value.length < 6 || value.length > 255 ? page.errors.passwordError[language] : "",
    }));
  };

  useEffect(() => {
    if (errMsg) {
      toast.error(errMsg, { position: "top-right", autoClose: 5000 });
      setErrMsg("");
    }
  }, [errMsg]);

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    if (errors.email || errors.password) return;

    try {
      const response = await axios.post(
        LOGIN_URL,
        { email, password },
        {
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          withCredentials: true,
        }
      );

      const { accessToken, refreshToken } = response.data;

      setAuth({ user: { email }, accessToken, refreshToken });
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
      });
      setEmail("");
      setPassword("");

      navigate("/admin", { replace: true });
    } catch (err: any) {
      setErrMsg(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="h-dvh w-full flex items-center justify-center">
      <div className="w-[358px]">
        <div className="text-center mb-[40px] relative z-20">
          <h1 className="text-center text-[32px] font-[500] text-[#323232]">
            {pagesTranslations.admin.title[language]}
          </h1>
        </div>
        <form className="grid gap-3">
          <div>
            <label className="text-sm">{page.eMail[language]} <span className="text-red-500">*</span></label>
            <input
              autoComplete="off"
              type="email"
              name="email"
              onChange={(e) => handleEmailChange(e.target.value)}
              minLength={2}
              maxLength={255}
              className={`w-full rounded-lg p-3 !focus:outline-none focus:ring-2 transition duration-300 border ${errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-[#D1D1D1] focus:border-blue-500"
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="relative space-y-2">
            <label className="text-sm">{page.password[language]}</label>
            <input
              autoComplete="off"
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={(e) => handlePasswordChange(e.target.value)}
              minLength={2}
              maxLength={255}
              className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-[#D1D1D1] focus:border-blue-500"
                }`}
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div className="flex flex-col justify-center items-center gap-3 pt-3">
            <button
              type="submit"
              onClick={handleSubmitForm}
              className="w-[220px] bg-[#1a4381] hover:bg-[#102c56] text-white rounded-[30px] py-2 transition-all cursor-pointer"
            >
              {page.loginBtn[language]}
            </button>
            <Link
              to="/admin/register"
              className="text-[#8E8E93] text-[12px] underline hover:text-[#1a4381] transition-all"
            >
              Hesabınız yoxdu?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;