import { useLanguage } from "../../context/LanguageContext";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import axios from "../../services/API/axiosConfig,api";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { BASE_URL } from "./Admin";

const LOGIN_URL = `${BASE_URL}/api/v1/auth/login`;

function AdminLogin() {
  const { language, pagesTranslations } = useLanguage();
  const page = pagesTranslations.admin.login;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const [showPassword, setShowPassword] = useState(false);

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({ email: "", password: "" });
  const [errMsg, setErrMsg] = useState("");

  const handleEmailChange = (email: string) => {
    setEmail(email);

    let errorMsg = "";

    if (email.length < 2 || email.length > 255) {
      errorMsg = page.errors.emailError[language];
    }
    setErrors((prev) => ({
      ...prev,
      email: errorMsg,
    }));

    return errorMsg !== "";
  };

  const handlePasswordChange = (password: string) => {
    setPassword(password);

    let errorMsg = "";

    if (password.length < 6 || password.length > 255) {
      errorMsg = page.errors.passwordError[language];
    }
    setErrors((prev) => ({
      ...prev,
      password: errorMsg,
    }));

    return errorMsg !== "";
  };

  useEffect(() => {
    if (errMsg) {
      toast.error(errMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setErrMsg("");
    }
  }, [errMsg]);

  const handleSubmitForm = async () => {
    let emailError = handleEmailChange(email);
    let passError = handlePasswordChange(password);
    if (emailError || passError) {
      return;
    }
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      localStorage.setItem("refreshToken", refreshToken);
      setAuth({
        user: { email, password },
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
      setEmail("");
      setPassword("");

      navigate("/admin", { replace: true });
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <div className="h-dvh w-full flex items-center justify-center flex-col">
      <div className="rounded-lg w-full max-w-2xl space-y-6 relative z-20 p-10 bg-opacity-80 flex flex-col items-center">
        <div className="text-center mb-8 relative z-20">
          <h1 className="text-3xl md:text-4xl mb-10 font-medium font-plus-jakarta">
            {page.loginTitle[language]}
          </h1>
        </div>
        <form className=" w-full flex items-center justify-center flex-col gap-6 mb-3.5">
          <div className="space-y-2 max-w-96 w-full">
            <label htmlFor="email" className="text-sm font-light">
              {page.email[language]}
              <span className="text-red-500">*</span>
              <p className="m-0 text-red-500 text-xs mb-[5px]">
                Zəhmət olmazsa korporativ e-poçt ünvanınızı daxil edin.
              </p>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => handleEmailChange(e.target.value)}
              minLength={2}
              maxLength={255}
              className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[#D1D1D1] focus:ring-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2 max-w-96 w-full">
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-light mb-1 text-[#2D3748]"
              >
                {page.password[language]}
              </label>
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                name="password"
                onChange={(e) => handlePasswordChange(e.target.value)}
                minLength={2}
                maxLength={255}
                className={`w-full border rounded-md p-3 pr-10 bg-transparent focus:outline-none focus:ring-2 transition duration-300 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-[#D1D1D1] focus:ring-blue-500"
                }`}
              />
              <button
                type="button"
                className="absolute right-3 top-[50%] text-gray-300 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Visibility className="w-4 h-4" />
                ) : (
                  <VisibilityOff className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleSubmitForm}
            className="w-full mt-[26px] max-w-3xs px-{17px} py-2 hover:bg-[#122e58] bg-[#1A4381] transition-all rounded-[34px] shadow-xl text-[16px] uppercase tracking-wider text-white font-light cursor-pointer"
          >
            {page.loginBtn[language].toUpperCase()}
          </button>
        </form>
        <Link
          to={"/admin/forgot-password"}
          className="text-[#8E8E93] text-[12px] mb-0.5 underline hover:text-[#1a4381] transition-all ease"
        >
          Şifrənizi unutmusunuz?
        </Link>
        <Link
          to={"/admin/register"}
          className="text-[#8E8E93] text-[12px] underline hover:text-[#1a4381] transition-all ease"
        >
          Hesabınız yoxdur?
        </Link>
      </div>
    </div>
  );
}

export default AdminLogin;
