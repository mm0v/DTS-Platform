import { useLanguage } from "../../context/LanguageContext";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../services/API/axiosConfig,api";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { BASE_URL } from "./Admin";

const FORGOT_URL = `${BASE_URL}/api/v1/auth/forgot-password`;
const OTP_URL = `${BASE_URL}/api/v1/auth/validate-otp`;
const RESET_URL = `${BASE_URL}/api/v1/auth/reset-password`;

function ForgotPassword() {
  const { language, pagesTranslations } = useLanguage();
  const page = pagesTranslations.admin.login;

  const navigate = useNavigate();

  const [stage, setStage] = useState<"email" | "otp" | "password">("email");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetToken, setResetToken] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [errMsg, setErrMsg] = useState("");

  // ==========================
  // Validation helpers
  // ==========================
  const validateEmail = (email: string) => {
    if (email.length < 2) return "Boş buraxıla bilməz. Minimum 2 simvol.";
    if (email.length > 255) return "Maksimum 255 simvol";
    return "";
  };

  const validateOTP = (otp: string) => {
    if (otp.length !== 6) return "OTP 6 rəqəm olmalıdır.";
    return "";
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) return "Boş buraxıla bilməz. Minimum 8 simvol.";
    if (password.length > 255) return "Maksimum 255 simvol";
    return "";
  };

  const validateConfirmPassword = (confirm: string, original: string) => {
    if (confirm.length < 8) return "Boş buraxıla bilməz. Minimum 8 simvol.";
    if (confirm !== original) return "Şifrələr uyğun gəlmir.";
    return "";
  };

  // ==========================
  // Handlers
  // ==========================
  const handleSubmitEmail = async () => {
    const emailError = validateEmail(email);

    const controller = new AbortController();

    setErrors((prev) => ({ ...prev, email: emailError }));
    if (emailError) return;

    try {
      await axios.post(FORGOT_URL, null, {
        params: { email },
        signal: controller.signal,
      });
      toast.success("E-poçt göndərildi. Təsdiq kodunu daxil edin.");
      setStage("otp");
    } catch (err: any) {
      setErrMsg("E-poçt göndərilmədi. Yenidən cəhd edin.");
    }
  };
  const handleSubmitOTP = async () => {
    const otpError = validateOTP(otp);
    setErrors((prev) => ({ ...prev, otp: otpError }));
    if (otpError) return;

    try {
      // Example: Verify OTP
      const response = await axios.post(OTP_URL, null, {
        params: { email, otp },
      });
      setResetToken(response.data);
      toast.success("OTP təsdiqləndi. Yeni şifrə təyin edin.");
      setStage("password");
    } catch (err: any) {
      setErrMsg("OTP düzgün deyil və ya vaxtı bitib.");
    }
  };

  const handleSubmitPassword = async () => {
    const passwordError = validatePassword(password);
    const confirmError = validateConfirmPassword(confirmPassword, password);

    setErrors((prev) => ({
      ...prev,
      password: passwordError,
      confirmPassword: confirmError,
    }));

    if (passwordError || confirmError) return;

    try {
      await axios.post(
        RESET_URL,
        JSON.stringify({
          email,
          newPassword: password,
          verifyPassword: confirmPassword,
          resetToken,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success("Şifrə uğurla yeniləndi!");
      navigate("/login", { replace: true });
    } catch (err: any) {
      console.log(err);
      setErrMsg(
        err.response?.data?.message || "Şifrə yenilənmədi. Yenidən cəhd edin."
      );
    }
  };

  useEffect(() => {
    if (errMsg) {
      toast.error(errMsg);
      setErrMsg("");
    }
  }, [errMsg]);

  useEffect(() => {
    document.title = "Şifrəni Yenilə";
    return () => {
      document.title = "DTS Platform";
    };
  }, []);

  // ==========================
  // RENDER
  // ==========================
  return (
    <div className="h-dvh w-full flex items-center justify-center flex-col">
      <div className="rounded-lg w-full max-w-2xl space-y-6 relative z-20 p-10 bg-opacity-80 flex flex-col items-center">
        <div className="text-center mb-8 relative z-20">
          <h1 className="text-3xl md:text-4xl mb-10 font-medium font-plus-jakarta">
            {stage === "email" ? "E-poçt Təsdiqi" : "Yeni Şifrə Təyin Et"}
          </h1>
        </div>

        {stage === "email" && (
          <form
            className="w-full flex items-center justify-center flex-col gap-6 mb-3.5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitEmail();
            }}
          >
            <div className="space-y-2 max-w-96 w-full">
              <label htmlFor="email" className="text-sm font-light">
                {page.email[language]}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={`w-full bg-transparent rounded-lg p-3 border focus:outline-none focus:ring-2 transition duration-300 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-[#D1D1D1] focus:ring-blue-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-[26px] uppercase max-w-3xs px-4 py-2 hover:bg-[#122e58] bg-[#1A4381] transition-all rounded-[34px] shadow-xl text-[16px] tracking-wider text-white font-light cursor-pointer"
            >
              Təsdİqlə
            </button>
          </form>
        )}

        {/* ========== OTP STAGE ========== */}
        {stage === "otp" && (
          <form
            className="w-full flex items-center justify-center flex-col gap-6 mb-3.5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitOTP();
            }}
          >
            <div className="space-y-2 max-w-96 w-full">
              <label htmlFor="otp" className="text-sm font-light">
                OTP kodu
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                maxLength={6}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className={`w-full bg-transparent rounded-lg p-3 border text-center tracking-widest text-lg focus:outline-none focus:ring-2 transition duration-300 ${
                  errors.otp
                    ? "border-red-500 focus:ring-red-500"
                    : "border-[#D1D1D1] focus:ring-blue-500"
                }`}
              />
              {errors.otp && (
                <p className="text-red-500 text-sm">{errors.otp}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-[26px] uppercase max-w-3xs px-4 py-2 hover:bg-[#122e58] bg-[#1A4381] transition-all rounded-[34px] shadow-xl text-[16px] tracking-wider text-white font-light cursor-pointer"
            >
              Təsdiqlə
            </button>

            <button
              type="button"
              className="text-[#1A4381] text-sm underline hover:text-[#122e58] cursor-pointer"
              onClick={handleSubmitEmail}
            >
              OTP-ni yenidən göndər
            </button>
          </form>
        )}

        {stage === "password" && (
          <form
            className="w-full flex items-center justify-center flex-col gap-6 mb-3.5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitPassword();
            }}
          >
            {/* Password */}
            <div className="space-y-2 max-w-96 w-full">
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-light mb-1 text-[#2D3748]"
                >
                  Yeni Şifrə
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full border rounded-md p-3 pr-10 bg-transparent focus:outline-none focus:ring-2 transition duration-300 ${
                      errors.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[#D1D1D1] focus:ring-blue-500"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-[50%] -translate-y-1/2 text-gray-400 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Visibility className="w-4 h-4" />
                    ) : (
                      <VisibilityOff className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2 max-w-96 w-full">
              <div className="relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-light mb-1 text-[#2D3748]"
                >
                  Yeni Şifrənin Təsdiqi
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    autoComplete="off"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full border rounded-md p-3 pr-10 bg-transparent focus:outline-none focus:ring-2 transition duration-300 ${
                      errors.confirmPassword
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[#D1D1D1] focus:ring-blue-500"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-[50%] -translate-y-1/2 text-gray-400 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <Visibility className="w-4 h-4" />
                    ) : (
                      <VisibilityOff className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-[26px] uppercase max-w-3xs px-4 py-2 hover:bg-[#122e58] bg-[#1A4381] transition-all rounded-[34px] shadow-xl text-[16px] tracking-wider text-white font-light cursor-pointer"
            >
              Şifrəni Yenilə
            </button>
          </form>
        )}

        <Link
          to={"/login"}
          className="text-[#8E8E93] text-[12px] underline hover:text-[#1a4381] transition-all ease"
        >
          Giriş et
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
