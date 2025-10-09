import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DateScrollPicker } from "react-date-wheel-picker";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "../../../public/styles/phone.css";
import { BASE_URL } from "./Admin";
const AdminRegister = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const navigate = useNavigate();

  const monthsAZ = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "İyun",
    "İyul",
    "Avqust",
    "Sentyabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr",
  ];

  const formatDateAZ = (date: Date) =>
    `${date.getDate()} ${monthsAZ[date.getMonth()]} ${date.getFullYear()}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    let errorMsg = "";
    if ((name === "name" || name === "surname") && value.length < 1)
      errorMsg = "Bu sahə boş ola bilməz";
    if (name === "email" && !value.includes("@"))
      errorMsg = "Düzgün email daxil edin";
    if (name === "phoneNumber" && (value.length < 10 || value.length > 15))
      errorMsg = "Telefon nömrəsi 10–15 rəqəm olmalıdır";
    if (name === "password" && value.length < 8) errorMsg = "Şifrə çox qısadır";
    if (name === "confirmPassword" && value !== formValues.password)
      errorMsg = "Şifrə uyğun deyil";

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const isoDate = date.toISOString().split("T")[0];
    setFormValues((prev) => ({ ...prev, dateOfBirth: isoDate }));
    setErrors((prev) => ({ ...prev, dateOfBirth: "" }));
  };

  const handleSubmit = () => {
    // Check required fields
    const requiredFields: Array<keyof typeof formValues> = [
      "name",
      "surname",
      "email",
      "phoneNumber",
      "dateOfBirth",
      "password",
      "confirmPassword",
    ];
    const emptyField = requiredFields.find((f) => !formValues[f]);
    if (emptyField) {
      toast.error("Zəhmət olmasa bütün sahələri düzgün doldurun.");
      return;
    }

    // Check for any errors
    const hasAnyError = Object.values(errors).some((err) => err !== "");
    if (hasAnyError) {
      toast.error("Zəhmət olmasa bütün sahələri düzgün doldurun.");
      return;
    }

    // Submit form
    axios
      .post(`${BASE_URL}/api/v1/users/finish-register`, formValues, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then(() => {
        toast.success("Qeydiyyat tamamlandı.");
        setFormValues({
          name: "",
          surname: "",
          email: "",
          phoneNumber: "",
          dateOfBirth: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({
          name: "",
          surname: "",
          email: "",
          phoneNumber: "",
          dateOfBirth: "",
          password: "",
          confirmPassword: "",
        });
        setSelectedDate(undefined);
        navigate("/login");
      })
      .catch((e) => {
        toast.error(e?.response?.data?.message || "Qeydiyyat uğursuz oldu.");
      });
  };

  useEffect(() => {
    document.title = "Qeydiyyat";

    return () => {
      document.title = "DTS Platform";
    };
  }, []);

  return (
    <div className="register h-screen flex flex-col items-center justify-center gap-7">
      <h1 className="text-center text-[32px] font-[500] text-[#323232]">
        Xoş Gəlmisiniz
      </h1>
      <form className="w-full px-5 lg:w-[748px] grid grid-cols-1 md:grid-cols-2 gap-x-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1 text-[#2D3748]">
            Ad
          </label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            className={`w-full rounded-lg p-3 !focus:outline-none focus:ring-2 transition duration-300 border ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-[#D1D1D1] focus:border-blue-500"
            }`}
          />
          <div className="min-h-[20px] text-red-500 text-sm">{errors.name}</div>
        </div>

        {/* Surname */}
        <div>
          <label className="block text-sm font-medium mb-1 text-[#2D3748]">
            Soyad
          </label>
          <input
            type="text"
            name="surname"
            value={formValues.surname}
            onChange={handleChange}
            className={`w-full rounded-lg p-3 !focus:outline-none focus:ring-2 transition duration-300 border ${
              errors.surname
                ? "border-red-500 focus:ring-red-500"
                : "border-[#D1D1D1] focus:border-blue-500"
            }`}
          />
          <div className="min-h-[20px] text-red-500 text-sm">
            {errors.surname}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1 text-[#2D3748]">
            E-poçt
          </label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className={`w-full rounded-lg p-3 !focus:outline-none focus:ring-2 transition duration-300 border ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-[#D1D1D1] focus:border-blue-500"
            }`}
          />
          <div className="min-h-[20px] text-red-500 text-sm">
            {errors.email}
          </div>
        </div>

        {/* Date of Birth */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1 text-[#2D3748]">
            Doğum tarixi
          </label>
          <button
            type="button"
            className="w-full h-[50px] border border-[#D1D1D1] rounded-md px-3 text-start text-[#2D3748] flex items-center justify-start cursor-pointer"
            onClick={() => setShowPicker(!showPicker)}
          >
            {selectedDate ? formatDateAZ(selectedDate) : "Tarix seç"}
          </button>

          {showPicker && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
              <div className="date bg-white p-4 rounded-lg shadow-lg relative">
                <DateScrollPicker
                  onDateChange={handleDateChange}
                  pickerItemHeight={35}
                  visibleRows={5}
                  startYear={1950}
                  endYear={new Date().getFullYear()}
                  defaultSelectedYear={new Date().getFullYear()}
                  defaultSelectedMonth={new Date().getMonth()}
                  defaultSelectedDay={new Date().getDate()}
                  monthNames={monthsAZ}
                />
                <button
                  type="button"
                  onClick={() => setShowPicker(false)}
                  className="mt-3 px-4 py-1 bg-[#1a4381] text-white rounded-md hover:bg-[#102c56] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Phone Number */}
        <div className="col-span-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium mb-1 text-[#2D3748]"
          >
            Mobil nömrə
          </label>
          <PhoneInput
            value={formValues.phoneNumber}
            onChange={(phone: string) => {
              setFormValues((prev) => ({ ...prev, phoneNumber: phone }));
              setErrors((prev) => ({ ...prev, phoneNumber: "" }));
            }}
            defaultCountry="az"
            placeholder="Mobil nömrə"
            inputClassName="react-international-phone-input"
            countrySelectorStyleProps={{
              className:
                "react-international-phone-country-selector text-black",
            }}
          />

          <div className="min-h-[20px] text-red-500 text-sm">
            {errors.phoneNumber}
          </div>
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1 text-[#2D3748]">
            Şifrə
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formValues.password}
            onChange={handleChange}
            className={`w-full rounded-lg p-3 !focus:outline-none focus:ring-2 transition duration-300 border ${
              errors.password
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
          <div className="min-h-[20px] text-red-500 text-sm">
            {errors.password}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1 text-[#2D3748]">
            Şifrənin təsdiqi
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            className={`w-full rounded-lg p-3 !focus:outline-none focus:ring-2 transition duration-300 border ${
              errors.confirmPassword
                ? "border-red-500 focus:ring-red-500"
                : "border-[#D1D1D1] focus:border-blue-500"
            }`}
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-300"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
          </button>
          <div className="min-h-[20px] text-red-500 text-sm">
            {errors.confirmPassword}
          </div>
        </div>

        {/* Submit */}
        <div className="col-span-1 md:col-span-2 flex flex-col justify-center items-center gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-[220px] uppercase bg-[#1a4381] hover:bg-[#102c56] text-white rounded-[30px] py-2 transition-all cursor-pointer"
          >
            Tamamla
          </button>
          <Link
            to="/login"
            className="text-[#8E8E93] text-[12px] underline hover:text-[#1a4381] transition-all"
          >
            Hesabınız var artıq?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminRegister;
