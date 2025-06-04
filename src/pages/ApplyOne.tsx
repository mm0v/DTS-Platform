// "use client";

// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import BackgroundVideo from "../components/BackgroundVideo";
// import { FormContext } from "../context/FormContext";
// import "react-international-phone/style.css";
// import { PhoneInput } from "react-international-phone";
// import { useLanguage } from "../context/LanguageContext";
// import ApplySteps from "../components/ApplySteps";

// export default function ApplyOne() {
//   const navigate = useNavigate();
//   const context = useContext(FormContext);
//   const { language, pagesTranslations } = useLanguage();
//   const page = pagesTranslations.apply1;

//   if (!context) {
//     throw new Error("ApplyOne must be used within a FormContext.Provider");
//   }

//   const initialValue = {
//     companyName: "",
//     companyRegisterNumber: "",
//     createYear: "",
//     companySize: "",
//     annualTurnover: "",
//     companyAddress: "",
//     location: "",
//     website: "",
//     contactPerson: "",
//     email: "",
//     phone: "",
//   };

//   const [localFormData, setLocalFormData] = useState(initialValue);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const companyData = JSON.parse(localStorage.getItem("companyData")!);

//   useEffect(() => {
//     const savedData = {
//       companyName: companyData?.companyName || "",
//       companyRegisterNumber: companyData?.companyRegisterNumber || "",
//       createYear: companyData?.createYear || "",
//       companySize: companyData?.companySize || "",
//       annualTurnover: companyData?.annualTurnover || "",
//       companyAddress: companyData?.companyAddress || "",
//       location: companyData?.location || "",
//       website: companyData?.website || "",
//       contactPerson: companyData?.contactPerson || "",
//       email: companyData?.email || "",
//       phone: companyData?.phone || "",
//     };
//     setLocalFormData(savedData);
//   }, []);

//   // Validation functions
//   const validateCompanyName = (value: string) => {
//     if (!value.trim()) {
//       return "Boş buraxıla bilməz, minimum 2, maksimum 255 simvol";
//     }
//     if (value.trim().length < 2) {
//       return "Boş buraxıla bilməz, minimum 2, maksimum 255 simvol";
//     }
//     if (value.trim().length > 255) {
//       return "Boş buraxıla bilməz, minimum 2, maksimum 255 simvol";
//     }
//     return "";
//   };

//   const validateCompanyAddress = (value: string) => {
//     if (!value.trim()) {
//       return page.companyAddressRequired[language];
//     }
//     if (value.trim().length < 5) {
//       return "Minimum 5 simvol olmalıdır";
//     }
//     return "";
//   };

//   const validateWebsite = (value: string) => {
//     if (!value.trim()) {
//       return ""; // Website is optional
//     }

//     const urlPattern = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
//     if (!urlPattern.test(value.trim())) {
//       return "URL tam olmalıdır (http:// və ya https:// ilə başlamalıdır)";
//     }
//     return "";
//   };

//   const validateEmail = (value: string) => {
//     if (!value.trim()) {
//       return page.emailRequired[language];
//     }

//     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!emailPattern.test(value.trim())) {
//       return "Düzgün email ünvanı daxil edin";
//     }
//     return "";
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;

//     if (name === "createYear") {
//       if (!/^\d{0,4}$/.test(value)) return;
//       if (value.length === 4) {
//         const year = parseInt(value, 10);
//         if (year < 0 || year > 2025) return;
//       }
//     }

//     // Clear previous error for this field
//     setErrors((prev) => ({ ...prev, [name]: "" }));

//     // Update form data
//     setLocalFormData((prevState) => ({ ...prevState, [name]: value }));
//     localStorage.setItem(
//       "companyData",
//       JSON.stringify({ ...companyData, [name]: value })
//     );

//     // Real-time validation
//     let error = "";
//     switch (name) {
//       case "companyName":
//         error = validateCompanyName(value);
//         break;
//       case "companyAddress":
//         error = validateCompanyAddress(value);
//         break;
//       case "website":
//         error = validateWebsite(value);
//         break;
//       case "email":
//         error = validateEmail(value);
//         break;
//     }

//     if (error) {
//       setErrors((prev) => ({ ...prev, [name]: error }));
//     }
//   };

//   const handlePhoneChange = (value: string) => {
//     setLocalFormData((prev) => ({ ...prev, phone: value }));
//     localStorage.setItem(
//       "companyData",
//       JSON.stringify({ ...companyData, phone: value })
//     );

//     const digits = value.replace(/\D/g, "");
//     let errorMsg = "";

//     if (digits.length === 0) {
//       errorMsg = "Zəhmət olmasa telefon nömrəsini daxil edin";
//     } else if (digits.length < 9) {
//       errorMsg = "Telefon nömrəsi ən azı 9 rəqəm olmalıdır";
//     }

//     setErrors((prev) => ({
//       ...prev,
//       phone: errorMsg,
//     }));
//   };

//   const handleNext = () => {
//     const requiredFields: {
//       key: keyof typeof localFormData;
//       errorKey: keyof typeof page;
//     }[] = [
//         { key: "companyName", errorKey: "companyNameRequired" },
//         {
//           key: "companyRegisterNumber",
//           errorKey: "companyRegisterNumberRequired",
//         },
//         { key: "createYear", errorKey: "createYearRequired" },
//         { key: "companySize", errorKey: "companySizeRequired" },
//         { key: "annualTurnover", errorKey: "annualTurnoverRequired" },
//         { key: "companyAddress", errorKey: "companyAddressRequired" },
//         { key: "location", errorKey: "locationRequired" },
//         { key: "contactPerson", errorKey: "contactPersonRequired" },
//         { key: "email", errorKey: "emailRequired" },
//         { key: "phone", errorKey: "phoneRequired" },
//       ];

//     const newErrors: Record<string, string> = {};

//     // Validate all required fields
//     requiredFields.forEach(({ key, errorKey }) => {
//       const value = localFormData[key];
//       if (typeof value === "string" && !value.trim()) {
//         newErrors[key] = page[errorKey][language];
//       }
//     });

//     // Apply specific validation rules
//     const companyNameError = validateCompanyName(localFormData.companyName);
//     if (companyNameError) {
//       newErrors.companyName = companyNameError;
//     }

//     const companyAddressError = validateCompanyAddress(localFormData.companyAddress);
//     if (companyAddressError) {
//       newErrors.companyAddress = companyAddressError;
//     }

//     const websiteError = validateWebsite(localFormData.website);
//     if (websiteError) {
//       newErrors.website = websiteError;
//     }

//     const emailError = validateEmail(localFormData.email);
//     if (emailError) {
//       newErrors.email = emailError;
//     }

//     // Phone validation
//     const digits = localFormData.phone.replace(/\D/g, "");
//     if (digits.length === 0) {
//       newErrors.phone = "Zəhmət olmasa telefon nömrəsini daxil edin";
//     } else if (digits.length < 9) {
//       newErrors.phone = "Telefon nömrəsi ən azı 9 rəqəm olmalıdır";
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     navigate("/apply/two");
//   };

//   useEffect(() => {
//     if (Object.keys(errors).length === 0) return;

//     const requiredFields: {
//       key: keyof typeof errors;
//       errorKey: keyof typeof page;
//     }[] = [
//         { key: "companyName", errorKey: "companyNameRequired" },
//         {
//           key: "companyRegisterNumber",
//           errorKey: "companyRegisterNumberRequired",
//         },
//         { key: "createYear", errorKey: "createYearRequired" },
//         { key: "companySize", errorKey: "companySizeRequired" },
//         { key: "annualTurnover", errorKey: "annualTurnoverRequired" },
//         { key: "companyAddress", errorKey: "companyAddressRequired" },
//         { key: "location", errorKey: "locationRequired" },
//         { key: "contactPerson", errorKey: "contactPersonRequired" },
//         { key: "email", errorKey: "emailRequired" },
//         { key: "phone", errorKey: "phoneRequired" },
//       ];

//     const updatedErrors: Record<string, string> = {};

//     requiredFields.forEach(({ key, errorKey }) => {
//       if (errors[key]) {
//         updatedErrors[key] = page[errorKey][language];
//       }
//     });

//     setErrors(updatedErrors);
//   }, [language]);

//   return (
//     <>
//       <BackgroundVideo />
//       <div className="relative min-h-screen w-full text-white flex flex-col items-center justify-center py-10">
//         <ApplySteps step={1} />

//         <div className="text-center mb-8 relative z-20">
//           <h1 className="text-2xl md:text-3xl font-medium">
//             {page.title[language]}
//           </h1>
//         </div>

//         <div className="w-full max-w-2xl space-y-6 relative z-20">
//           {/* Company Name */}
//           <div className="space-y-2">
//             <label className="text-sm">{page.companyName[language]}</label>
//             <input
//               type="text"
//               name="companyName"
//               value={localFormData.companyName}
//               onChange={handleInputChange}
//               className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.companyName
//                 ? "border-red-500 focus:ring-red-500"
//                 : "border-gray-700 focus:ring-blue-500"
//                 }`}
//             />
//             {errors.companyName && (
//               <p className="text-red-500 text-sm">{errors.companyName}</p>
//             )}
//           </div>

//           <div className="flex gap-4">
//             {/* VAT Number */}
//             <div className="flex-1 space-y-2">
//               <label className="text-sm">
//                 {page.companyRegisterNumber[language]}
//               </label>
//               <input
//                 type="text"
//                 name="companyRegisterNumber"
//                 value={localFormData.companyRegisterNumber}
//                 onChange={handleInputChange}
//                 className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.companyRegisterNumber
//                   ? "border-red-500 focus:ring-red-500"
//                   : "border-gray-700 focus:ring-blue-500"
//                   }`}
//               />
//               {errors.companyRegisterNumber && (
//                 <p className="text-red-500 text-sm">
//                   {errors.companyRegisterNumber}
//                 </p>
//               )}
//             </div>

//             {/* Founding Date */}
//             <div className="flex-1 space-y-2">
//               <label className="text-sm">{page.createYear[language]}</label>
//               <input
//                 type="number"
//                 name="createYear"
//                 value={localFormData.createYear}
//                 onChange={handleInputChange}
//                 max={2025}
//                 placeholder="YYYY"
//                 className={`no-spinner w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.createYear
//                   ? "border-red-500 focus:ring-red-500"
//                   : "border-gray-700 focus:ring-blue-500"
//                   }`}
//               />

//               {errors.createYear && (
//                 <p className="text-red-500 text-sm">{errors.createYear}</p>
//               )}
//             </div>
//           </div>
//           <div className="flex gap-4">
//             {/* Company Size */}
//             <div className="flex-1 space-y-2">
//               <label className="text-sm"> {page.companySize[language]}</label>
//               <select
//                 name="companySize"
//                 value={localFormData.companySize}
//                 onChange={handleInputChange}
//                 className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.companySize
//                   ? "border-red-500 focus:ring-red-500"
//                   : "border-gray-700 focus:ring-blue-500"
//                   }`}
//               >
//                 <option className="text-white bg-[#070618]" value="">
//                   {page.placeholder[language]}
//                 </option>
//                 <option className="text-white bg-[#070618]" value="10">
//                   1-10
//                 </option>
//                 <option className="text-white bg-[#070618]" value="50">
//                   11-50
//                 </option>
//                 <option className="text-white bg-[#070618]" value="250">
//                   51-250
//                 </option>
//                 <option className="text-white bg-[#070618]" value="350">
//                   250+
//                 </option>
//               </select>
//               {errors.companySize && (
//                 <p className="text-red-500 text-sm">{errors.companySize}</p>
//               )}
//             </div>

//             {/* Annual Turnover */}
//             <div className="flex-1 space-y-2">
//               <label className="text-sm">
//                 {page.annualTurnover[language]}{" "}
//               </label>
//               <select
//                 name="annualTurnover"
//                 value={localFormData.annualTurnover}
//                 onChange={handleInputChange}
//                 className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.annualTurnover
//                   ? "border-red-500 focus:ring-red-500"
//                   : "border-gray-700 focus:ring-blue-500"
//                   }`}
//               >
//                 <option className="text-white bg-[#070618]" value="">
//                   {page.placeholder[language]}
//                 </option>
//                 <option className="text-white bg-[#070618]" value="3">
//                   {page.annualTurnoverOption1[language]}
//                 </option>
//                 <option className="text-white bg-[#070618]" value="30">
//                   {page.annualTurnoverOption2[language]}
//                 </option>
//                 <option className="text-white bg-[#070618]" value="60">
//                   {page.annualTurnoverOption3[language]}
//                 </option>
//               </select>
//               {errors.annualTurnover && (
//                 <p className="text-red-500 text-sm">{errors.annualTurnover}</p>
//               )}
//             </div>
//           </div>

//           {/* Company Address */}
//           <div className="space-y-2">
//             <label className="text-sm">{page.companyAddress[language]}</label>
//             <input
//               type="text"
//               name="companyAddress"
//               value={localFormData.companyAddress}
//               onChange={handleInputChange}
//               className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.companyAddress
//                 ? "border-red-500 focus:ring-red-500"
//                 : "border-gray-700 focus:ring-blue-500"
//                 }`}
//             />
//             {errors.companyAddress && (
//               <p className="text-red-500 text-sm">{errors.companyAddress}</p>
//             )}
//           </div>

//           {/* Location */}
//           <div className="space-y-2">
//             <label className="text-sm">{page.location[language]}</label>
//             <input
//               type="text"
//               name="location"
//               value={localFormData.location}
//               onChange={handleInputChange}
//               className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.location
//                 ? "border-red-500 focus:ring-red-500"
//                 : "border-gray-700 focus:ring-blue-500"
//                 }`}
//             />
//             {errors.location && (
//               <p className="text-red-500 text-sm">{errors.location}</p>
//             )}
//           </div>

//           {/* Website */}
//           <div className="space-y-2">
//             <label className="text-sm">{page.website[language]} (İstəyə bağlı)</label>
//             <input
//               type="text"
//               name="website"
//               value={localFormData.website}
//               onChange={handleInputChange}
//               placeholder="https://example.com"
//               className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.website
//                 ? "border-red-500 focus:ring-red-500"
//                 : "border-gray-700 focus:ring-blue-500"
//                 }`}
//             />
//             {errors.website && (
//               <p className="text-red-500 text-sm">{errors.website}</p>
//             )}
//           </div>
//           {/* Contact Person */}
//           <div className="flex-1 space-y-2">
//             <label className="text-sm">{page.contactPerson[language]}</label>
//             <input
//               type="text"
//               name="contactPerson"
//               value={localFormData.contactPerson}
//               onChange={handleInputChange}
//               className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.contactPerson
//                 ? "border-red-500 focus:ring-red-500"
//                 : "border-gray-700 focus:ring-blue-500"
//                 }`}
//             />
//             {errors.contactPerson && (
//               <p className="text-red-500 text-sm">{errors.contactPerson}</p>
//             )}
//           </div>

//           <div className="flex gap-4">
//             {/* Email */}
//             <div className="flex-1 space-y-2">
//               <label className="text-sm">{page.email[language]}</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={localFormData.email}
//                 onChange={handleInputChange}
//                 placeholder="example@domain.com"
//                 className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.email
//                   ? "border-red-500 focus:ring-red-500"
//                   : "border-gray-700 focus:ring-blue-500"
//                   }`}
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm">{errors.email}</p>
//               )}
//             </div>

//             {/* Phone */}
//             <div className="flex-1 space-y-2">
//               <label className="text-sm">{page.phone[language]}</label>
//               <PhoneInput
//                 inputClassName="phone-dark-input flex-1 bg-transparent"
//                 defaultCountry="az"
//                 value={localFormData.phone}
//                 onChange={handlePhoneChange}
//                 className={`w-full ${errors.phonea
//                   ? "border border-red-500 rounded"
//                   : "border border-gray-700"
//                   }`}
//               />
//               {errors.phone && (
//                 <p className="text-red-500 text-sm">{errors.phone}</p>
//               )}
//             </div>
//           </div>

//           {/* Next Button */}
//           <button
//             type="button"
//             onClick={handleNext}
//             className="w-full py-3 rounded-lg transition duration-300 mt-6 text-white bg-blue-600 hover:bg-[#1a4381] cursor-pointer"
//           >
//             {pagesTranslations.applyBtns.nextBtn[language]}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// // Verified and refactored with enhanced validation


"use client";

import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundVideo from "../components/BackgroundVideo";
import { FormContext } from "../context/FormContext";
import "react-international-phone/style.css";
import { PhoneInput } from "react-international-phone";
import { useLanguage } from "../context/LanguageContext";
import ApplySteps from "../components/ApplySteps";

export default function ApplyOne() {
  const navigate = useNavigate();
  const context = useContext(FormContext);
  const { language, pagesTranslations } = useLanguage();
  const page = pagesTranslations.apply1;

  if (!context) {
    throw new Error("ApplyOne must be used within a FormContext.Provider");
  }

  const initialValue = {
    companyName: "",
    companyRegisterNumber: "",
    createYear: "",
    companySize: "",
    annualTurnover: "",
    companyAddress: "",
    location: "",
    website: "",
    contactPerson: "",
    email: "",
    phone: "",
  };

  const [localFormData, setLocalFormData] = useState(initialValue);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const companyData = JSON.parse(localStorage.getItem("companyData")!);

  useEffect(() => {
    const savedData = {
      companyName: companyData?.companyName || "",
      companyRegisterNumber: companyData?.companyRegisterNumber || "",
      createYear: companyData?.createYear || "",
      companySize: companyData?.companySize || "",
      annualTurnover: companyData?.annualTurnover || "",
      companyAddress: companyData?.companyAddress || "",
      location: companyData?.location || "",
      website: companyData?.website || "",
      contactPerson: companyData?.contactPerson || "",
      email: companyData?.email || "",
      phone: companyData?.phone || "",
    };
    setLocalFormData(savedData);
  }, []);

  // Validation functions
  const validateCompanyName = (value: string) => {
    if (!value.trim()) {
      return "Boş buraxıla bilməz, minimum 2, maksimum 255 simvol";
    }
    if (value.trim().length < 2) {
      return "Boş buraxıla bilməz, minimum 2, maksimum 255 simvol";
    }
    if (value.trim().length > 255) {
      return "Boş buraxıla bilməz, minimum 2, maksimum 255 simvol";
    }
    return "";
  };

  // Company Register Number validation - Enhanced
  const validateCompanyRegisterNumber = (value: string) => {
    if (!value.trim()) {
      return page.companyRegisterNumberRequired[language];
    }

    // Only allow latin letters and numbers
    const alphanumericPattern = /^[a-zA-Z0-9]+$/;
    if (!alphanumericPattern.test(value.trim())) {
      return "Yalnız latın hərifləri və rəqəmlər daxil edilə bilər";
    }

    // Max 50 characters
    if (value.trim().length > 50) {
      return "Maksimum 50 simvol ola bilər";
    }

    return "";
  };

  // Create Year validation - Enhanced with business logic
  const validateCreateYear = (value: string) => {
    if (!value.trim()) {
      return page.createYearRequired[language];
    }

    const year = parseInt(value, 10);
    const currentYear = new Date().getFullYear();

    // Check if it's a valid 4-digit year
    if (!/^\d{4}$/.test(value)) {
      return "4 rəqəmli il daxil edin";
    }

    // Reasonable business founding year (not before 1800 and not in future)
    if (year < 1800) {
      return "Şirkətin yaranma ili 1800-dən əvvəl ola bilməz";
    }

    if (year > currentYear) {
      return "Şirkətin yaranma ili gələcəkdə ola bilməz";
    }

    // Additional business logic - warn if company is too old or too new
    if (year < 1900) {
      return "Şirkətin yaranma ili çox köhnə görünür";
    }

    return "";
  };

  const validateCompanyAddress = (value: string) => {
    if (!value.trim()) {
      return page.companyAddressRequired[language];
    }
    if (value.trim().length < 5) {
      return "Minimum 5 simvol olmalıdır";
    }
    return "";
  };

  const validateWebsite = (value: string) => {
    if (!value.trim()) {
      return ""; // Website is optional
    }

    const urlPattern = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
    if (!urlPattern.test(value.trim())) {
      return "URL tam olmalıdır (http:// və ya https:// ilə başlamalıdır)";
    }
    return "";
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      return page.emailRequired[language];
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(value.trim())) {
      return "Düzgün email ünvanı daxil edin";
    }
    return "";
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Enhanced createYear validation during input
    if (name === "createYear") {
      // Only allow 4 digits
      if (!/^\d{0,4}$/.test(value)) return;

      if (value.length === 4) {
        const year = parseInt(value, 10);
        const currentYear = new Date().getFullYear();

        // Don't allow future years or unreasonably old years
        if (year < 1800 || year > currentYear) return;
      }
    }

    // Enhanced companyRegisterNumber validation during input
    if (name === "companyRegisterNumber") {
      // Only allow alphanumeric characters and limit to 50
      if (value.length > 50) return;
      if (!/^[a-zA-Z0-9]*$/.test(value)) return;
    }

    // Clear previous error for this field
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // Update form data
    setLocalFormData((prevState) => ({ ...prevState, [name]: value }));
    localStorage.setItem(
      "companyData",
      JSON.stringify({ ...companyData, [name]: value })
    );

    // Real-time validation
    let error = "";
    switch (name) {
      case "companyName":
        error = validateCompanyName(value);
        break;
      case "companyRegisterNumber":
        error = validateCompanyRegisterNumber(value);
        break;
      case "createYear":
        error = validateCreateYear(value);
        break;
      case "companyAddress":
        error = validateCompanyAddress(value);
        break;
      case "website":
        error = validateWebsite(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
    }

    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  // Enhanced phone validation
  const handlePhoneChange = (value: string) => {
    setLocalFormData((prev) => ({ ...prev, phone: value }));
    localStorage.setItem(
      "companyData",
      JSON.stringify({ ...companyData, phone: value })
    );

    // Extract only digits for validation
    const digits = value.replace(/\D/g, "");
    let errorMsg = "";

    if (digits.length === 0) {
      errorMsg = "Zəhmət olmasa telefon nömrəsini daxil edin";
    } else if (digits.length < 7) {
      errorMsg = "Telefon nömrəsi ən azı 7 rəqəm olmalıdır";
    } else if (digits.length > 15) {
      errorMsg = "Telefon nömrəsi maksimum 15 rəqəm ola bilər";
    }

    setErrors((prev) => ({
      ...prev,
      phone: errorMsg,
    }));
  };

  const handleNext = () => {
    const requiredFields: {
      key: keyof typeof localFormData;
      errorKey: keyof typeof page;
    }[] = [
        { key: "companyName", errorKey: "companyNameRequired" },
        {
          key: "companyRegisterNumber",
          errorKey: "companyRegisterNumberRequired",
        },
        { key: "createYear", errorKey: "createYearRequired" },
        { key: "companySize", errorKey: "companySizeRequired" },
        { key: "annualTurnover", errorKey: "annualTurnoverRequired" },
        { key: "companyAddress", errorKey: "companyAddressRequired" },
        { key: "location", errorKey: "locationRequired" },
        { key: "contactPerson", errorKey: "contactPersonRequired" },
        { key: "email", errorKey: "emailRequired" },
        { key: "phone", errorKey: "phoneRequired" },
      ];

    const newErrors: Record<string, string> = {};

    // Validate all required fields
    requiredFields.forEach(({ key, errorKey }) => {
      const value = localFormData[key];
      if (typeof value === "string" && !value.trim()) {
        newErrors[key] = page[errorKey][language];
      }
    });

    // Apply specific validation rules
    const companyNameError = validateCompanyName(localFormData.companyName);
    if (companyNameError) {
      newErrors.companyName = companyNameError;
    }

    const companyRegisterNumberError = validateCompanyRegisterNumber(localFormData.companyRegisterNumber);
    if (companyRegisterNumberError) {
      newErrors.companyRegisterNumber = companyRegisterNumberError;
    }

    const createYearError = validateCreateYear(localFormData.createYear);
    if (createYearError) {
      newErrors.createYear = createYearError;
    }

    const companyAddressError = validateCompanyAddress(localFormData.companyAddress);
    if (companyAddressError) {
      newErrors.companyAddress = companyAddressError;
    }

    const websiteError = validateWebsite(localFormData.website);
    if (websiteError) {
      newErrors.website = websiteError;
    }

    const emailError = validateEmail(localFormData.email);
    if (emailError) {
      newErrors.email = emailError;
    }

    // Enhanced phone validation
    const digits = localFormData.phone.replace(/\D/g, "");
    if (digits.length === 0) {
      newErrors.phone = "Zəhmət olmasa telefon nömrəsini daxil edin";
    } else if (digits.length < 7) {
      newErrors.phone = "Telefon nömrəsi ən azı 7 rəqəm olmalıdır";
    } else if (digits.length > 15) {
      newErrors.phone = "Telefon nömrəsi maksimum 15 rəqəm ola bilər";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    navigate("/apply/two");
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0) return;

    const requiredFields: {
      key: keyof typeof errors;
      errorKey: keyof typeof page;
    }[] = [
        { key: "companyName", errorKey: "companyNameRequired" },
        {
          key: "companyRegisterNumber",
          errorKey: "companyRegisterNumberRequired",
        },
        { key: "createYear", errorKey: "createYearRequired" },
        { key: "companySize", errorKey: "companySizeRequired" },
        { key: "annualTurnover", errorKey: "annualTurnoverRequired" },
        { key: "companyAddress", errorKey: "companyAddressRequired" },
        { key: "location", errorKey: "locationRequired" },
        { key: "contactPerson", errorKey: "contactPersonRequired" },
        { key: "email", errorKey: "emailRequired" },
        { key: "phone", errorKey: "phoneRequired" },
      ];

    const updatedErrors: Record<string, string> = {};

    requiredFields.forEach(({ key, errorKey }) => {
      if (errors[key]) {
        updatedErrors[key] = page[errorKey][language];
      }
    });

    setErrors(updatedErrors);
  }, [language]);

  return (
    <>
      <BackgroundVideo />
      <div className="relative min-h-screen w-full text-white flex flex-col items-center justify-center py-10">
        <ApplySteps step={1} />

        <div className="text-center mb-8 relative z-20">
          <h1 className="text-2xl md:text-3xl font-medium">
            {page.title[language]}
          </h1>
        </div>

        <div className="w-full max-w-2xl space-y-6 relative z-20">
          {/* Company Name */}
          <div className="space-y-2">
            <label className="text-sm">{page.companyName[language]}</label>
            <input
              type="text"
              name="companyName"
              value={localFormData.companyName}
              onChange={handleInputChange}
              className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.companyName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-700 focus:ring-blue-500"
                }`}
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm">{errors.companyName}</p>
            )}
          </div>

          <div className="flex gap-4">
            {/* Company Register Number - Enhanced */}
            <div className="flex-1 space-y-2">
              <label className="text-sm">
                {page.companyRegisterNumber[language]}
              </label>
              <input
                type="text"
                name="companyRegisterNumber"
                value={localFormData.companyRegisterNumber}
                onChange={handleInputChange}
                maxLength={50}
                placeholder="Yalnız hərf və rəqəmlər"
                className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.companyRegisterNumber
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-blue-500"
                  }`}
              />
              {errors.companyRegisterNumber && (
                <p className="text-red-500 text-sm">
                  {errors.companyRegisterNumber}
                </p>
              )}
            </div>

            {/* Create Year - Enhanced */}
            <div className="flex-1 space-y-2">
              <label className="text-sm">{page.createYear[language]}</label>
              <input
                type="text"
                name="createYear"
                value={localFormData.createYear}
                onChange={handleInputChange}
                maxLength={4}
                placeholder="YYYY"
                className={`no-spinner w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.createYear
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-blue-500"
                  }`}
              />
              {errors.createYear && (
                <p className="text-red-500 text-sm">{errors.createYear}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            {/* Company Size */}
            <div className="flex-1 space-y-2">
              <label className="text-sm"> {page.companySize[language]}</label>
              <select
                name="companySize"
                value={localFormData.companySize}
                onChange={handleInputChange}
                className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.companySize
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-blue-500"
                  }`}
              >
                <option className="text-white bg-[#070618]" value="">
                  {page.placeholder[language]}
                </option>
                <option className="text-white bg-[#070618]" value="10">
                  1-10
                </option>
                <option className="text-white bg-[#070618]" value="50">
                  11-50
                </option>
                <option className="text-white bg-[#070618]" value="250">
                  51-250
                </option>
                <option className="text-white bg-[#070618]" value="350">
                  250+
                </option>
              </select>
              {errors.companySize && (
                <p className="text-red-500 text-sm">{errors.companySize}</p>
              )}
            </div>

            {/* Annual Turnover */}
            <div className="flex-1 space-y-2">
              <label className="text-sm">
                {page.annualTurnover[language]}{" "}
              </label>
              <select
                name="annualTurnover"
                value={localFormData.annualTurnover}
                onChange={handleInputChange}
                className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.annualTurnover
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-blue-500"
                  }`}
              >
                <option className="text-white bg-[#070618]" value="">
                  {page.placeholder[language]}
                </option>
                <option className="text-white bg-[#070618]" value="3">
                  {page.annualTurnoverOption1[language]}
                </option>
                <option className="text-white bg-[#070618]" value="30">
                  {page.annualTurnoverOption2[language]}
                </option>
                <option className="text-white bg-[#070618]" value="60">
                  {page.annualTurnoverOption3[language]}
                </option>
              </select>
              {errors.annualTurnover && (
                <p className="text-red-500 text-sm">{errors.annualTurnover}</p>
              )}
            </div>
          </div>

          {/* Company Address */}
          <div className="space-y-2">
            <label className="text-sm">{page.companyAddress[language]}</label>
            <input
              type="text"
              name="companyAddress"
              value={localFormData.companyAddress}
              onChange={handleInputChange}
              className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.companyAddress
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-700 focus:ring-blue-500"
                }`}
            />
            {errors.companyAddress && (
              <p className="text-red-500 text-sm">{errors.companyAddress}</p>
            )}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-sm">{page.location[language]}</label>
            <input
              type="text"
              name="location"
              value={localFormData.location}
              onChange={handleInputChange}
              className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.location
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-700 focus:ring-blue-500"
                }`}
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}
          </div>

          {/* Website */}
          <div className="space-y-2">
            <label className="text-sm">{page.website[language]} (İstəyə bağlı)</label>
            <input
              type="text"
              name="website"
              value={localFormData.website}
              onChange={handleInputChange}
              placeholder="https://example.com"
              className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.website
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-700 focus:ring-blue-500"
                }`}
            />
            {errors.website && (
              <p className="text-red-500 text-sm">{errors.website}</p>
            )}
          </div>

          {/* Contact Person */}
          <div className="flex-1 space-y-2">
            <label className="text-sm">{page.contactPerson[language]}</label>
            <input
              type="text"
              name="contactPerson"
              value={localFormData.contactPerson}
              onChange={handleInputChange}
              className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.contactPerson
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-700 focus:ring-blue-500"
                }`}
            />
            {errors.contactPerson && (
              <p className="text-red-500 text-sm">{errors.contactPerson}</p>
            )}
          </div>

          <div className="flex gap-4">
            {/* Email */}
            <div className="flex-1 space-y-2">
              <label className="text-sm">{page.email[language]}</label>
              <input
                type="email"
                name="email"
                value={localFormData.email}
                onChange={handleInputChange}
                placeholder="example@domain.com"
                className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-blue-500"
                  }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Phone - Enhanced validation */}
            <div className="flex-1 space-y-2">
              <label className="text-sm">{page.phone[language]}</label>
              <PhoneInput
                inputClassName="phone-dark-input flex-1 bg-transparent"
                defaultCountry="az"
                value={localFormData.phone}
                onChange={handlePhoneChange}
                className={`w-full ${errors.phone
                  ? "border border-red-500 rounded"
                  : "border border-gray-700"
                  }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="w-full py-3 rounded-lg transition duration-300 mt-6 text-white bg-blue-600 hover:bg-[#1a4381] cursor-pointer"
          >
            {pagesTranslations.applyBtns.nextBtn[language]}
          </button>
        </div>
      </div>
    </>
  );
}

// Enhanced with improved validations for companyRegisterNumber, createYear, and phone