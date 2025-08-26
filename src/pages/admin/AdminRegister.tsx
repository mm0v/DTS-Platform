import { Link } from "react-router-dom"
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DateScrollPicker } from "react-date-wheel-picker";

const AdminRegister = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
    const [showPicker, setShowPicker] = useState(false)
    const monthsAZ = [
        "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
        "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
    ];

    const formatDateAZ = (date: Date) => {
        return `${date.getDate()} ${monthsAZ[date.getMonth()]} ${date.getFullYear()}`;
    };

    return (
        <div className="register h-screen flex flex-col items-center justify-center gap-7">
            <h1 className="text-center text-[32px] font-[500] text-[#323232]">Xoş Gəlmisiniz</h1>
            <form className="w-full px-5 lg:w-[748px] grid grid-cols-1 md:grid-cols-2 gap-6">
                <style>
                    {`
                    input:focus {
                        outline: none ;
                    }
                `}
                </style>

                {/* Name */}
                <div>
                    <label htmlFor="ad" className="block text-sm font-medium mb-1 text-[#2D3748]">
                        Ad
                    </label>
                    <input
                        type="text"
                        id="ad"
                        name="ad"
                        className="w-full border border-[#D1D1D1] rounded-md p-2"
                        required
                    />
                </div>

                {/* Surname */}
                <div>
                    <label htmlFor="soyad" className="block text-sm font-medium mb-1 text-[#2D3748]">
                        Soyad
                    </label>
                    <input
                        type="text"
                        id="soyad"
                        name="soyad"
                        className="w-full border border-[#D1D1D1] rounded-md p-2"
                        required
                    />
                </div>

                {/* E-mail */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1 text-[#2D3748]">
                        E-poçt
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full border border-[#D1D1D1] rounded-md p-2"
                        required
                    />
                </div>

                {/* Date */}
                <div className="relative">
                    <label htmlFor="date" className="block text-sm font-medium mb-1 text-[#2D3748]">
                        Doğum tarixi
                    </label>
                    <button
                        type="button"
                        id="date"
                        name="date"
                        className="w-full border border-[#D1D1D1] rounded-md p-2 text-start text-[#2D3748]"
                        onClick={() => setShowPicker(!showPicker)}
                    >
                        <p>{selectedDate ? formatDateAZ(selectedDate) : "Tarix seç"}</p>
                    </button>

                    {showPicker && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                            <div className="date bg-white p-4 rounded-lg shadow-lg relative">
                                <DateScrollPicker
                                    onDateChange={(date: Date) => setSelectedDate(date)}
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
                    <label htmlFor="password" className="block text-sm font-medium mb-1 text-[#2D3748]">
                        Şifrə
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        className="w-full border border-[#D1D1D1] rounded-md p-2 pr-10"
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-8 text-gray-300"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <Visibility className="w-4 h-4" /> : <VisibilityOff className="w-4 h-4" />}
                    </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 text-[#2D3748]">
                        Şifrənin təsdiqi
                    </label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        className="w-full border border-[#D1D1D1] rounded-md p-2 pr-10"
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-8 text-gray-300"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <Visibility className="w-4 h-4" /> : <VisibilityOff className="w-4 h-4" />}
                    </button>
                </div>
                <div className="col-span-1 md:col-span-2 flex flex-col justify-center items-center gap-2">
                    <button
                        type="submit"
                        className="w-[220px] bg-[#1a4381] transition-all ease hover:bg-[#102c56] hover:cursor-pointer text-white rounded-[30px] py-2"
                    >
                        Daxil ol
                    </button>
                    <Link to={'/admin/login'} className="text-[#8E8E93] text-[12px] underline hover:text-[#1a4381] transition-all ease">Hesabınız var artıq?</Link>
                </div>
            </form>
        </div>
    )
}

export default AdminRegister