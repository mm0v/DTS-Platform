import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import { PhoneInput } from "react-international-phone";
import * as Yup from "yup";
import "react-international-phone/style.css";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";

interface FormValues {
  name: string;
  surname: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  phone: string;
  email: string;
}

const Schema = Yup.object({
  name: Yup.string().required("Ad vacibdir"),
  surname: Yup.string().required("Soyad vacibdir"),
  birthDay: Yup.string().required("Gün"),
  birthMonth: Yup.string().required("Ay"),
  birthYear: Yup.string().required("İl"),
  phone: Yup.string().required("Mobil nömrə vacibdir"),
  email: Yup.string().email("E-poçt düzgün deyil").required("E-poçt vacibdir"),
});

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
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

const years = Array.from(
  { length: 101 },
  (_, i) => new Date().getFullYear() - i
);

const ProfileInfo: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const [profile, setProfile] = useState({
    name: "",
    surname: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchProfile = async () => {
      try {
        const response = await axiosPrivate.get("/api/v1/users/profile", {
          signal: controller.signal,
        });
        if (isMounted) {
          console.log(response.data);
          const dateOfBirth = response.data.dateOfBirth
            ? response.data.dateOfBirth.split("-")
            : null;
          setProfile({
            name: response.data.name,
            surname: response.data.surname,
            birthDay: dateOfBirth !== null ? dateOfBirth[2] : "",
            birthMonth: dateOfBirth !== null ? dateOfBirth[1] : "",
            birthYear: dateOfBirth !== null ? dateOfBirth[0] : "",
            phone: response.data.phoneNumber ?? "",
            email: response.data.email,
          });
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    fetchProfile();
  }, []);

  const updateProfile = async (data: FormValues) => {
    const formData = new FormData();

    const infos = {
      name: data.name,
      surname: data.surname,
      dateOfBirth: `${data.birthYear}-${
        data.birthMonth.length === 1 ? `0${data.birthMonth}` : data.birthMonth
      }-${data.birthDay.length === 1 ? `0${data.birthDay}` : data.birthDay}`,
      phoneNumber: data.phone,
      email: data.email,
    };

    formData.append(
      "request",
      new Blob([JSON.stringify(infos)], {
        type: "application/json",
      })
    );

    try {
      const response = await axiosPrivate.put(
        "/api/v1/users/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      await updateProfile(values);
      toast.success("Dəyişikliklər tətbiq olundu.");
    } catch (error) {
      console.error(error);
      toast.error("Xəta baş verdi!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-[8px] w-content max-w-[750px] p-[30px]">
      <h1 className="text-start font-[500] text-[22px] mb-5">
        Profil Məlumatları
      </h1>
      <Formik
        initialValues={profile}
        enableReinitialize
        validationSchema={Schema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form className="flex flex-col gap-6">
            {/* First Name */}
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">
                Adınız<span className="text-red-500">*</span>
              </label>
              <Field
                id="name"
                name="name"
                placeholder="Ad"
                className="border border-[#CED4DA] rounded-[8px] p-2 w-full focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="surname" className="block mb-1 font-medium">
                Soyadınız<span className="text-red-500">*</span>
              </label>
              <Field
                id="surname"
                name="surname"
                placeholder="Soyad"
                className="border border-[#CED4DA] rounded-[8px] p-2 w-full focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="surname"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Birth Date */}
            <div>
              <label className="block mb-6 mt-8 font-medium">
                Doğum tarixi
              </label>
              <div className="flex gap-3">
                {/* Day */}
                <div className="flex-1 relative">
                  <label htmlFor="surname" className="block mb-1 font-medium">
                    Gün<span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    name="birthDay"
                    className="border border-[#CED4DA] rounded-[8px] w-full p-2 focus:outline-none focus:border-blue-500 appearance-none"
                  >
                    <option value="">Gün</option>
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </Field>
                  <div className="pointer-events-none absolute inset-y-0 right-3 top-6 flex items-center">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Month */}
                <div className="flex-1 relative">
                  <label htmlFor="surname" className="block mb-1 font-medium">
                    Ay<span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    name="birthMonth"
                    className="border border-[#CED4DA] rounded-[8px] w-full p-2 focus:outline-none focus:border-blue-500 appearance-none"
                  >
                    <option value="">Ay</option>
                    {months.map((m, i) => (
                      <option key={i} value={i + 1}>
                        {m}
                      </option>
                    ))}
                  </Field>
                  <div className="pointer-events-none absolute inset-y-0 right-3 top-6 flex items-center">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Year */}
                <div className="flex-1 relative">
                  <label htmlFor="surname" className="block mb-1 font-medium">
                    İl<span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    name="birthYear"
                    className="border border-[#CED4DA] rounded-[8px] w-full p-2 focus:outline-none focus:border-blue-500 appearance-none"
                  >
                    <option value="">İl</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </Field>
                  <div className="pointer-events-none absolute inset-y-0 right-3 top-6 flex items-center">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="phone-input-container">
              <label htmlFor="phone" className="block mb-1 font-medium">
                Mobil nömrə
              </label>
              <PhoneInput
                value={values.phone}
                onChange={(phone) => setFieldValue("phone", phone)}
                defaultCountry="az"
                placeholder="Mobil nömrə"
                inputClassName="react-international-phone-input"
                countrySelectorStyleProps={{
                  className: "react-international-phone-country-selector",
                }}
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                E-poçt<span className="text-red-500">*</span>
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                className="border border-[#CED4DA] rounded-[8px] p-2 w-full focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="text-end mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#E8ECF2] text-[#1A4381] cursor-pointer px-6 py-2 rounded disabled:opacity-50 transition-all duration-500 hover:bg-[#1A4381] hover:text-white"
              >
                Göndər
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <style>
        {`
          input:focus,
          select:focus {
          outline: none;
          border-color: blue;
          }
          .react-international-phone-input {
          border-color: #CED4DA!important;
          border-top-right-radius: 12px!important;
          border-bottom-right-radius: 12px!important;
          color:black!important;
          }
          .react-international-phone-country-selector-button{
          padding:10px;
          border-color: #CED4DA!important;
          border-top-left-radius: 12px!important;
          border-bottom-left-radius: 12px!important;
          }
        `}
      </style>
    </div>
  );
};

export default ProfileInfo;
