import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DateScrollPicker } from "react-date-wheel-picker";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const AdminRegister = () => {
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const navigate = useNavigate()

    const monthsAZ = [
        "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
        "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
    ];

    const formatDateAZ = (date: Date) =>
        `${date.getDate()} ${monthsAZ[date.getMonth()]} ${date.getFullYear()}`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));

        let errorMsg = "";
        if (name === "firstName" && value.length < 2) errorMsg = "Ad çox qısadır";
        if (name === "lastName" && value.length < 2) errorMsg = "Soyad çox qısadır";
        if (name === "email" && !value.includes("@")) errorMsg = "Düzgün email daxil edin";
        if (name === "password" && value.length < 6) errorMsg = "Şifrə çox qısadır";
        if (name === "confirmPassword" && value !== formValues.password)
            errorMsg = "Şifrə uyğun deyil";

        setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    };

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        setFormValues((prev) => ({ ...prev, dateOfBirth: formatDateAZ(date) }));
        setErrors((prev) => ({ ...prev, dateOfBirth: "" }));
    };

    const handleSubmit = () => {
        let hasError = false;

        Object.values(formValues).forEach((val) => { if (!val) hasError = true });
        Object.values(errors).forEach((err) => { if (err) hasError = true });

        if (hasError) {
            toast.error("Zəhmət olmasa bütün sahələri düzgün doldurun.");
            return;
        }

        try {
            toast.success("Qeydiyyat tamamlandı.");
            setFormValues({
                firstName: "",
                lastName: "",
                email: "",
                dateOfBirth: "",
                password: "",
                confirmPassword: "",
            });
            setErrors({
                firstName: "",
                lastName: "",
                email: "",
                dateOfBirth: "",
                password: "",
                confirmPassword: "",
            });
            setSelectedDate(undefined);
            navigate("/admin/login");
        } catch {
            toast.error("Qeydiyyat zamanı xəta baş verdi.");
        }
    };

    return (
        <div className="register h-screen flex flex-col items-center justify-center gap-7">
            <h1 className="text-center text-[32px] font-[500] text-[#323232]">Xoş Gəlmisiniz</h1>
            <form className="w-full px-5 lg:w-[748px] grid grid-cols-1 md:grid-cols-2 gap-x-6">
                {/* First Name */}
                <div>
                    <label className="block text-sm font-medium mb-1 text-[#2D3748]">Ad</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formValues.firstName}
                        onChange={handleChange}
                        className="w-full border border-[#D1D1D1] rounded-md p-2"
                    />
                    <div className="min-h-[20px] text-red-500 text-sm">{errors.firstName}</div>
                </div>

                {/* Last Name */}
                <div>
                    <label className="block text-sm font-medium mb-1 text-[#2D3748]">Soyad</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formValues.lastName}
                        onChange={handleChange}
                        className="w-full border border-[#D1D1D1] rounded-md p-2"
                    />
                    <div className="min-h-[20px] text-red-500 text-sm">{errors.lastName}</div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium mb-1 text-[#2D3748]">E-poçt</label>
                    <input
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                        className="w-full border border-[#D1D1D1] rounded-md p-2"
                    />
                    <div className="min-h-[20px] text-red-500 text-sm">{errors.email}</div>
                </div>

                {/* Date of Birth */}
                <div className="relative">
                    <label className="block text-sm font-medium mb-1 text-[#2D3748]">Doğum tarixi</label>
                    <button
                        type="button"
                        className="w-full border border-[#D1D1D1] rounded-md p-2 text-start text-[#2D3748]"
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
                                    className="mt-3 px-4 py-1 bg-[#1a4381] text-white rounded-md hover:bg-[#102c56]"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Password */}
                <div className="relative">
                    <label className="block text-sm font-medium mb-1 text-[#2D3748]">Şifrə</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formValues.password}
                        onChange={handleChange}
                        className="w-full border border-[#D1D1D1] rounded-md p-2 pr-10"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-8 text-gray-300"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </button>
                    <div className="min-h-[20px] text-red-500 text-sm">{errors.password}</div>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                    <label className="block text-sm font-medium mb-1 text-[#2D3748]">Şifrənin təsdiqi</label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                        className="w-full border border-[#D1D1D1] rounded-md p-2 pr-10"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-8 text-gray-300"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </button>
                    <div className="min-h-[20px] text-red-500 text-sm">{errors.confirmPassword}</div>
                </div>

                {/* Submit */}
                <div className="col-span-1 md:col-span-2 flex flex-col justify-center items-center gap-2">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-[220px] bg-[#1a4381] hover:bg-[#102c56] text-white rounded-[30px] py-2 transition-all"
                    >
                        Qeydiyyat
                    </button>
                    <Link
                        to="/admin/login"
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