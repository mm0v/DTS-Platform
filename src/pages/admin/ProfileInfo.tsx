import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import { PhoneInput } from "react-international-phone";
import * as Yup from "yup";
import "react-international-phone/style.css";

interface FormValues {
  firstName: string;
  lastName: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  phone: string;
  email: string;
}

const Schema = Yup.object({
  firstName: Yup.string().required("Ad vacibdir"),
  lastName: Yup.string().required("Soyad vacibdir"),
  birthDay: Yup.string().required("Gün"),
  birthMonth: Yup.string().required("Ay"),
  birthYear: Yup.string().required("İl"),
  phone: Yup.string().required("Mobil nömrə vacibdir"),
  email: Yup.string().email("E-poçt düzgün deyil").required("E-poçt vacibdir"),
});

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
  "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
];
const years = Array.from({ length: 101 }, (_, i) => new Date().getFullYear() - i);

const ProfileInfo: React.FC = () => {
  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    phone: "",
    email: "",
  };

  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    console.log(values);
    alert("Göndərildi!");
    setSubmitting(false);
  };

  return (
    <div className="bg-white rounded-[8px] w-content max-w-[750px] p-[30px]">
      <h1 className="text-start font-[500] text-[22px] mb-5">Profil Məlumatları</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={Schema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form className="flex flex-col gap-6">

            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block mb-1 font-medium">Ad</label>
              <Field
                id="firstName"
                name="firstName"
                placeholder="Ad"
                className="border border-[#CED4DA] rounded-[8px] p-2 w-full focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block mb-1 font-medium">Soyad</label>
              <Field
                id="lastName"
                name="lastName"
                placeholder="Soyad"
                className="border border-[#CED4DA] rounded-[8px] p-2 w-full focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Birth Date */}
            {/* Birth Date */}
            <div>
              <label className="block mb-1 font-medium">Doğum tarixi</label>
              <div className="flex gap-3">

                {/* Day */}
                <div className="flex-1 relative">
                  <Field
                    as="select"
                    name="birthDay"
                    className="border border-[#CED4DA] rounded-[8px] w-full p-2 focus:outline-none focus:border-blue-500 appearance-none"
                  >
                    <option value="">Gün</option>
                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                  </Field>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Month */}
                <div className="flex-1 relative">
                  <Field
                    as="select"
                    name="birthMonth"
                    className="border border-[#CED4DA] rounded-[8px] w-full p-2 focus:outline-none focus:border-blue-500 appearance-none"
                  >
                    <option value="">Ay</option>
                    {months.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
                  </Field>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Year */}
                <div className="flex-1 relative">
                  <Field
                    as="select"
                    name="birthYear"
                    className="border border-[#CED4DA] rounded-[8px] w-full p-2 focus:outline-none focus:border-blue-500 appearance-none"
                  >
                    <option value="">İl</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </Field>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

              </div>
            </div>


            {/* Phone */}
            <div className="phone-input-container">
              <label htmlFor="phone" className="block mb-1 font-medium">Mobil nömrə</label>
              <PhoneInput
                value={values.phone}
                onChange={(phone) => setFieldValue("phone", phone)}
                defaultCountry="az"
                placeholder="Mobil nömrə"
                inputClassName="react-international-phone-input"
                countrySelectorStyleProps={{
                  className: "react-international-phone-country-selector"
                }}
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">E-poçt</label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                className="border border-[#CED4DA] rounded-[8px] p-2 w-full focus:outline-none focus:border-blue-500"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
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