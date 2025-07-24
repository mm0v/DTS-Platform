import { useLanguage } from "../../context/LanguageContext";
import BackgroundVideo from "../../components/videos/BackgroundVideo";

import { use, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "../../services/API/axiosConfig,api";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
const LOGIN_URL = "http://217.18.210.188:8081/api/v1/auth/login";

function AdminLogin() {
  const { language, pagesTranslations } = useLanguage();
  const page = pagesTranslations.admin.login;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [errors, setErrors] = useState({ username: "", password: "" });
  const [errMsg, setErrMsg] = useState("");

  const handleUsernameChange = (username: string) => {
    setUsername(username);

    let errorMsg = "";

    if (username.length < 2 || username.length > 255) {
      errorMsg = page.errors.usernameError[language];
    }
    setErrors((prev) => ({
      ...prev,
      username: errorMsg,
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
    let userError = handleUsernameChange(username);
    let passError = handlePasswordChange(password);
    if (userError || passError) {
      return;
    }

    console.log("Submitting form with:", { username, password });

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      setAuth({ user: { username, password }, accessToken: accessToken });
      console.log({ user: { username, password }, accessToken: accessToken });
      setUsername("");
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
    <div className="h-dvh text-white w-full flex items-center justify-center">
      <BackgroundVideo />
      <div className="rounded-lg w-full max-w-2xl space-y-6 relative z-20 p-10 bg-opacity-80 shadow-lg">
        <div className="text-center mb-8 relative z-20">
          <h1 className="text-3xl md:text-4xl font-medium">
            {page.loginTitle[language]}
          </h1>
        </div>
        <div className="space-y-2">
          <label className="text-sm">{page.username[language]}</label>
          <input
            autoComplete="off"
            type="text"
            name="username"
            onChange={(e) => handleUsernameChange(e.target.value)}
            minLength={2}
            maxLength={255}
            className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${
              errors.username
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-700 focus:ring-blue-500"
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm">{page.password[language]}</label>
          <input
            autoComplete="off"
            type="password"
            name="password"
            onChange={(e) => handlePasswordChange(e.target.value)}
            minLength={2}
            maxLength={255}
            className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-700 focus:ring-blue-500"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        <button
          type="button"
          onClick={handleSubmitForm}
          className="w-full py-3 rounded-lg transition duration-300 mt-6 text-white bg-blue-600 hover:bg-[#1a4381] cursor-pointer"
        >
          {page.loginBtn[language]}
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
