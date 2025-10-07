import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DateScrollPicker } from "react-date-wheel-picker";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { axiosPrivate } from '../../services/API/axiosConfig,api';

interface UserInfo {
  id: number;
  name: string;
  surname: string;
  email: string;
}

const validationSchema = Yup.object({
  phoneNumber: Yup.string()
    .required('Telefon nömrəsi mütləqdir')
    .matches(/^\+994[0-9]{9}$/, 'Düzgün Azərbaycan nömrəsi daxil edin (+994XXXXXXXXX)'),
  password: Yup.string()
    .min(8, 'Şifrə ən azı 8 simvol olmalıdır')
    .required('Şifrə mütləqdir'),
  dateOfBirth: Yup.date()
    .required('Doğum tarixi mütləqdir')
    .max(new Date(), 'Doğum tarixi gələcəkdə ola bilməz'),
});

const VerifyRegistration = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const monthsAZ = [
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
    "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
  ];

  const formatDateAZ = (date: Date) =>
    `${date.getDate()} ${monthsAZ[date.getMonth()]} ${date.getFullYear()}`;

  const uuid = searchParams.get('uuid');

  useEffect(() => {
    const verifyUUID = async () => {
      if (!uuid) {
        toast.error('UUID tapılmadı. Linkdə problem var.');
        setIsLoading(false);
        return;
      }

      try {
        // ✅ Use public axios without token
        const response = await axiosPrivate.get(`/api/v1/users/verify-register?uuid=${uuid}`);
        const userData = response.data;

        setUserInfo(userData);
      } catch (error: any) {
        console.error('Verification error:', error);

        if (error.response?.status === 409 || error.response?.data?.message?.includes('already registered')) {
          toast.info('İstifadəçi artıq qeydiyyatdan keçib. Admin səhifəsinə yönləndirilir...');
          navigate('/admin?page=1&size=10');
          return;
        }

        toast.error(error.response?.data?.message || 'Link etibarsız və ya vaxtı bitmişdir');
      } finally {
        setIsLoading(false);
      }
    };

    verifyUUID();
  }, [uuid, navigate]);

  const handleSubmit = async (values: any) => {
    if (!userInfo) return;
    console.log({
      id: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
      surname: userInfo.surname,
      phoneNumber: values.phoneNumber,
      password: values.password,
      dateOfBirth: values.dateOfBirth,
    });

    try {
      const response = await axios.post(
        'http://217.18.210.188:7777/api/v1/users/finish-register',
        {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          surname: userInfo.surname,
          phoneNumber: values.phoneNumber,
          password: values.password,
          dateOfBirth: values.dateOfBirth,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        }
      );


      const { accessToken, refreshToken, role } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      toast.success('Qeydiyyat uğurla tamamlandı!');

      setTimeout(() => {
        if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }, 2000);

    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Qeydiyyat zamanı xəta baş verdi');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg">Yoxlanılır...</div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl text-red-600 mb-4">Xəta</h2>
          <p className="text-gray-600">Link etibarsız və ya vaxtı bitmişdir.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ana Səhifəyə Qayıt
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="register h-screen flex flex-col items-center justify-center gap-7">
      <h1 className="text-center text-[32px] font-[500] text-[#323232]">Qeydiyyatı Tamamlayın</h1>

      <div className="w-full px-5 lg:w-[500px] text-center mb-4">
        <p className="text-[#2D3748] text-lg">
          {userInfo.name} {userInfo.surname}
        </p>
        <p className="text-[#8E8E93] text-sm">{userInfo.email}</p>
      </div>

      <Formik
        initialValues={{
          phoneNumber: '',
          password: '',
          dateOfBirth: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, setFieldValue, values, errors, touched }) => (
          <form className="w-full px-5 lg:w-[500px] grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            {/* Phone Number */}
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium mb-1 text-[#2D3748]">Mobil nömrə</label>
              <PhoneInput
                value={values.phoneNumber}
                onChange={(phone: string) => setFieldValue('phoneNumber', phone)}
                defaultCountry="az"
                placeholder="Mobil nömrə"
                inputClassName="react-international-phone-input"
              />
              <ErrorMessage name="phoneNumber" component="div" className="min-h-[20px] text-red-500 text-sm" />
            </div>

            {/* Date of Birth */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1 text-[#2D3748]">Doğum tarixi</label>
              <button
                type="button"
                className={`w-full h-[50px] border rounded-md px-3 text-start text-[#2D3748] flex items-center justify-start cursor-pointer ${errors.dateOfBirth && touched.dateOfBirth ? "border-red-500" : "border-[#D1D1D1]"}`}
                onClick={(e) => { e.preventDefault(); setShowPicker(true); }}
              >
                {selectedDate ? formatDateAZ(selectedDate) : "Tarix seç"}
              </button>

              {showPicker && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]">
                  <div className="w-[300px] bg-white p-4 rounded-lg shadow-lg relative">
                    <DateScrollPicker
                      onDateChange={(date: Date) => {
                        setSelectedDate(date);
                        setFieldValue("dateOfBirth", date.toISOString().split("T")[0]);
                      }}
                      pickerItemHeight={35}
                      visibleRows={5}
                      startYear={1950}
                      endYear={new Date().getFullYear()}
                      defaultSelectedYear={new Date().getFullYear()}
                      defaultSelectedMonth={new Date().getMonth()}
                      defaultSelectedDay={new Date().getDate()}
                      monthNames={monthsAZ}
                    />
                    <div className="flex justify-center mt-3 gap-2">
                      <button type="button" onClick={() => setShowPicker(false)} className="px-4 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500 cursor-pointer">Bağla</button>
                      <button type="button" onClick={() => { setShowPicker(false); if (selectedDate) setFieldValue("dateOfBirth", selectedDate.toISOString().split("T")[0]); }} className="px-4 py-1 bg-[#1a4381] text-white rounded-md hover:bg-[#102c56] cursor-pointer">Təsdiqlə</button>
                    </div>
                  </div>
                </div>
              )}
              <ErrorMessage name="dateOfBirth" component="div" className="min-h-[20px] text-red-500 text-sm" />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1 text-[#2D3748]">Şifrə</label>
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                className={`w-full rounded-lg p-3 !focus:outline-none focus:ring-2 transition duration-300 border ${errors.password && touched.password ? "border-red-500 focus:ring-red-500" : "border-[#D1D1D1] focus:border-blue-500"}`}
              />
              <button type="button" className="absolute right-3 top-9 text-gray-300" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </button>
              <ErrorMessage name="password" component="div" className="min-h-[20px] text-red-500 text-sm" />
            </div>

            {/* Submit */}
            <div className="col-span-1 sm:col-span-2 flex flex-col justify-center items-center gap-2 mt-4">
              <button type="submit" className="w-[220px] bg-[#1a4381] hover:bg-[#102c56] text-white rounded-[30px] py-2 transition-all cursor-pointer">
                Qeydiyyatı Tamamla
              </button>
            </div>
          </form>
        )}
      </Formik>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default VerifyRegistration;