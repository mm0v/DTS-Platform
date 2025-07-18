"use client";

import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../../context/FormContext";
import "react-international-phone/style.css";
import { PhoneInput } from "react-international-phone";
import { useLanguage } from "../../context/LanguageContext";
import ApplySteps from "../../components/ApplySteps";

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

const validateCompanyName = (value: string) => {
  if (!value.trim()) {
    return page.companyNameEmpty[language];
  }
  if (value.trim().length < 2) {
    return page.companyNameEmpty[language];
  }
  if (value.trim().length > 255) {
    return page.companyNameTooLong[language];
  }
  return "";
};

const validateCompanyRegisterNumber = (value: string) => {
  if (!value.trim()) {
    return page.companyRegisterNumberRequired[language];
  }

  const numericPattern = /^[0-9]+$/;
  if (!numericPattern.test(value.trim())) {
    return page.companyRegisterNumberNumeric[language];
  }

  if (value.trim().length < 3) {
    return page.companyRegisterNumberMinLength[language];
  }

  if (value.trim().length > 50) {
    return page.companyRegisterNumberMaxLength[language];
  }

  return "";
};

const validateCreateYear = (value: string) => {
  if (!value.trim()) {
    return page.createYearRequired[language];
  }

  const year = parseInt(value, 10);
  const currentYear = new Date().getFullYear();

  if (!/^\d{4}$/.test(value)) {
    return page.createYearFourDigits[language];
  }

  if (year < 1000) {
    return page.createYearMinimum[language];
  }

  if (year > currentYear) {
    return page.createYearFuture[language];
  }

  return "";
};

const validateCompanyAddress = (value: string) => {
  if (!value.trim()) {
    return page.companyAddressRequired[language];
  }
  if (value.trim().length < 5) {
    return page.companyAddressMinLength[language];
  }
  return "";
};

// New validation function for location
const validateLocation = (value: string) => {
  if (!value.trim()) {
    return page.locationRequired[language];
  }
  if (value.trim().length < 4) {
    return page.locationMinLength[language];
  }
  return "";
};

// New validation function for contact person
const validateContactPerson = (value: string) => {
  if (!value.trim()) {
    return page.contactPersonRequired[language];
  }
  if (value.trim().length < 4) {
    return page.contactPersonMinLength[language];
  }
  return "";
};

const validateWebsite = (value: string) => {
  if (!value.trim()) {
    return page.websiteRequired[language];
  }

  const urlPattern = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
  if (!urlPattern.test(value.trim())) {
    return page.websiteInvalidFormat[language];
  }
  return "";
};

const validateWebsiteOptional = (value: string) => {
  if (!value.trim()) {
    return "";
  }

  const urlPattern = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
  if (!urlPattern.test(value.trim())) {
    return page.websiteInvalidFormat[language];
  }
  return "";
};

const validateEmail = (value: string) => {
  if (!value.trim()) {
    return page.emailRequired[language];
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(value.trim())) {
    return page.emailInvalidFormat[language];
  }
  return "";
};

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "createYear") {
      if (!/^\d{0,4}$/.test(value)) return;

      if (value.length === 4) {
        const year = parseInt(value, 10);
        const currentYear = new Date().getFullYear();

        if (year < 1000 || year > currentYear) return;
      }
    }

    if (name === "companyRegisterNumber") {
      if (value.length > 50) return;
      if (!/^[0-9]*$/.test(value)) return;
    }

    if (name === "companyName") {
      if (value.length > 300) return;
    }

    // Add length restrictions for location and contactPerson
    if (name === "location" && value.length > 100) return;
    if (name === "contactPerson" && value.length > 100) return;

    setErrors((prev) => ({ ...prev, [name]: "" }));

    setLocalFormData((prevState) => ({ ...prevState, [name]: value }));
    localStorage.setItem(
      "companyData",
      JSON.stringify({ ...companyData, [name]: value })
    );

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
      case "location":
        error = validateLocation(value);
        break;
      case "contactPerson":
        error = validateContactPerson(value);
        break;
      case "website":
        error = validateWebsiteOptional(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
    }

    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handlePhoneChange = (value: string) => {
  setLocalFormData((prev) => ({ ...prev, phone: value }));
  localStorage.setItem(
    "companyData",
    JSON.stringify({ ...companyData, phone: value })
  );

  const digits = value.replace(/\D/g, "");
  let errorMsg = "";

  if (digits.length === 0) {
    errorMsg = page.phoneRequired[language];
  } else if (digits.length < 12) {
    errorMsg = page.phoneMinLength[language];
  } else if (digits.length > 15) {
    errorMsg = page.phoneMaxLength[language];
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
      { key: "website", errorKey: "websiteRequired" },
      { key: "contactPerson", errorKey: "contactPersonRequired" },
      { key: "email", errorKey: "emailRequired" },
      { key: "phone", errorKey: "phoneRequired" },
    ];

  const newErrors: Record<string, string> = {};

  requiredFields.forEach(({ key, errorKey }) => {
    const value = localFormData[key];
    if (typeof value === "string" && !value.trim()) {
      if (key === "website" && !page.websiteRequired) {
        newErrors[key] = page.websiteRequired[language];
      } else {
        newErrors[key] = page[errorKey][language];
      }
    }
  });

  // Apply specific validation rules
  const companyNameError = validateCompanyName(localFormData.companyName);
  if (companyNameError) {
    newErrors.companyName = companyNameError;
  }

  const companyRegisterNumberError = validateCompanyRegisterNumber(
    localFormData.companyRegisterNumber
  );
  if (companyRegisterNumberError) {
    newErrors.companyRegisterNumber = companyRegisterNumberError;
  }

  const createYearError = validateCreateYear(localFormData.createYear);
  if (createYearError) {
    newErrors.createYear = createYearError;
  }

  const companyAddressError = validateCompanyAddress(
    localFormData.companyAddress
  );
  if (companyAddressError) {
    newErrors.companyAddress = companyAddressError;
  }

  // Add location validation
  const locationError = validateLocation(localFormData.location);
  if (locationError) {
    newErrors.location = locationError;
  }

  // Add contact person validation
  const contactPersonError = validateContactPerson(localFormData.contactPerson);
  if (contactPersonError) {
    newErrors.contactPerson = contactPersonError;
  }

  const websiteError = validateWebsite(localFormData.website);
  if (websiteError) {
    newErrors.website = websiteError;
  }

  const emailError = validateEmail(localFormData.email);
  if (emailError) {
    newErrors.email = emailError;
  }

  const digits = localFormData.phone.replace(/\D/g, "");
  if (digits.length === 0) {
    newErrors.phone = page.phoneRequired[language];
  } else if (digits.length < 9) {
    newErrors.phone = page.phoneMinLength[language];
  } else if (digits.length > 15) {
    newErrors.phone = page.phoneMaxLength[language];
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return false;
  }

  navigate("/apply/two");
  return true;
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
      { key: "website", errorKey: "websiteRequired" },
      { key: "contactPerson", errorKey: "contactPersonRequired" },
      { key: "email", errorKey: "emailRequired" },
      { key: "phone", errorKey: "phoneRequired" },
    ];

  const updatedErrors: Record<string, string> = {};

  requiredFields.forEach(({ key, errorKey }) => {
    if (errors[key]) {
      if (key === "website" && !page.websiteRequired) {
        updatedErrors[key] = page.websiteRequired[language];
      } else {
        updatedErrors[key] = page[errorKey][language];
      }
    }
  });

  setErrors(updatedErrors);
}, [language]);

  return (
    <>
      <div className="relative min-h-screen w-full text-white flex flex-col items-center justify-center py-10">
        <ApplySteps
          onClick={handleNext}
          step={1}
        />

        <div className="text-center mb-8 relative z-20">
          <h1 className="text-2xl md:text-3xl font-medium">
            {page.title[language]}
          </h1>
        </div>

        <div className="w-full max-w-2xl space-y-6 relative z-20">
          <div className="space-y-2">
            <label className="text-sm">{page.companyName[language]}</label>
            <input
              autoComplete="off"
              type="text"
              name="companyName"
              value={localFormData.companyName}
              onChange={handleInputChange}
              minLength={2}
              maxLength={255}
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
            <div className="flex-1 space-y-2">
              <label className="text-sm">
                {page.companyRegisterNumber[language]}
              </label>
              <input
                autoComplete="off"
                type="text"
                name="companyRegisterNumber"
                value={localFormData.companyRegisterNumber}
                onChange={handleInputChange}
                maxLength={50}
                placeholder={page.companyRegisterNumberPlaceholder[language]}
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

            <div className="flex-1 space-y-2">
              <label className="text-sm">{page.createYear[language]}</label>
              <input
                autoComplete="off"
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

          <div className="space-y-2">
            <label className="text-sm">{page.companyAddress[language]}</label>
            <input
              autoComplete="off"
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

          {/* Updated Location field with validation */}
          <div className="space-y-2">
            <label className="text-sm">{page.location[language]}</label>
            <input
              autoComplete="off"
              type="text"
              name="location"
              value={localFormData.location}
              onChange={handleInputChange}
              minLength={4}
              maxLength={100}
              placeholder={page.locationPlaceholder[language]}
              className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.location
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-700 focus:ring-blue-500"
                }`}
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm">{page.website[language]}</label>
            <input
              autoComplete="off"
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

          {/* Updated Contact Person field with validation */}
          <div className="flex-1 space-y-2">
            <label className="text-sm">{page.contactPerson[language]}</label>
            <input
              autoComplete="off"
              type="text"
              name="contactPerson"
              value={localFormData.contactPerson}
              onChange={handleInputChange}
              minLength={4}
              maxLength={100}
              placeholder={page.contactPersonPlaceholder[language]}
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
            <div className="flex-1 space-y-2">
              <label className="text-sm">{page.email[language]}</label>
              <input
                type="email"
                name="email"
                value={localFormData.email}
                onChange={handleInputChange}
                placeholder="example@gmail.com"
                className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-700 focus:ring-blue-500"
                  }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

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



// "use client";

// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FormContext } from "../../context/FormContext";
// import "react-international-phone/style.css";
// import { PhoneInput } from "react-international-phone";
// import { useLanguage } from "../../context/LanguageContext";
// import ApplySteps from "../../components/ApplySteps";

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

//   const validateCompanyName = (value: string) => {
//     if (!value.trim()) {
//       return "Boş buraxıla bilməz, minimum 2, maksimum 255 simvol"; // localization
//     }
//     if (value.trim().length < 2) {
//       return "Boş buraxıla bilməz, minimum 2, maksimum 255 simvol"; // localization
//     }
//     if (value.trim().length > 255) {
//       return "255+ simvol yaza bilməzsiniz"; // localization
//     }
//     return "";
//   };

//   // const validateCompanyRegisterNumber = (value: string) => {
//   //   if (!value.trim()) {
//   //     return page.companyRegisterNumberRequired[language];
//   //   }

//   //   const alphanumericPattern = /^[a-zA-Z0-9]+$/;
//   //   if (!alphanumericPattern.test(value.trim())) {
//   //     return "Yalnız latın hərifləri və rəqəmlər daxil edilə bilər"; // localization
//   //   }

//   //   if (value.trim().length > 50) {
//   //     return "Maksimum 50 simvol ola bilər"; // localization
//   //   }

//   //   return "";
//   // };

//   // Updated validation function
//   const validateCompanyRegisterNumber = (value: string) => {
//     if (!value.trim()) {
//       return page.companyRegisterNumberRequired[language];
//     }

//     // Only allow numbers (no letters or special characters)
//     const numericPattern = /^[0-9]+$/;
//     if (!numericPattern.test(value.trim())) {
//       return "Yalnız rəqəmlər daxil edilə bilər"; // localization
//     }

//     // Minimum 3 digits required
//     if (value.trim().length < 3) {
//       return "Minimum 3 rəqəm olmalıdır"; // localization
//     }

//     if (value.trim().length > 50) {
//       return "Maksimum 50 simvol ola bilər"; // localization
//     }

//     return "";
//   };

//   const validateCreateYear = (value: string) => {
//     if (!value.trim()) {
//       return page.createYearRequired[language];
//     }

//     const year = parseInt(value, 10);
//     const currentYear = new Date().getFullYear();

//     if (!/^\d{4}$/.test(value)) {
//       return "4 rəqəmli il daxil edin";
//     }

//     if (year < 1000) {
//       return "Şirkətin yaranma ili 1000-dən əvvəl ola bilməz";
//     }

//     if (year > currentYear) {
//       return "Şirkətin yaranma ili gələcəkdə ola bilməz";
//     }

//     if (year < 1000) {
//       return "Şirkətin yaranma ili çox köhnə görünür";
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
//       return "Veb sayt tələb olunur"; // Lozalization
//     }

//     const urlPattern = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
//     if (!urlPattern.test(value.trim())) {
//       return "URL tam olmalıdır (http:// və ya https:// ilə başlamalıdır)"; // Lozalization
//     }
//     return "";
//   };

//   const validateWebsiteOptional = (value: string) => {
//     if (!value.trim()) {
//       return ""; // Website is optional during typing // Lozalization
//     }

//     const urlPattern = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
//     if (!urlPattern.test(value.trim())) {
//       return "URL tam olmalıdır (http:// və ya https:// ilə başlamalıdır)"; // Lozalization
//     }
//     return "";
//   };

//   const validateEmail = (value: string) => {
//     if (!value.trim()) {
//       return page.emailRequired[language];
//     }

//     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!emailPattern.test(value.trim())) {
//       return "Düzgün email ünvanı daxil edin"; // Lozalization
//     }
//     return "";
//   };

//   // const handleInputChange = (
//   //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   // ) => {
//   //   const { name, value } = e.target;

//   //   if (name === "createYear") {
//   //     if (!/^\d{0,4}$/.test(value)) return;

//   //     if (value.length === 4) {
//   //       const year = parseInt(value, 10);
//   //       const currentYear = new Date().getFullYear();

//   //       if (year < 1000 || year > currentYear) return;
//   //     }
//   //   }

//   //   if (name === "companyRegisterNumber") {
//   //     if (value.length > 50) return;
//   //     if (!/^[a-zA-Z0-9]*$/.test(value)) return;
//   //   }

//   //   if (name === "companyName") {
//   //     if (value.length > 300) return;
//   //   }

//   //   setErrors((prev) => ({ ...prev, [name]: "" }));

//   //   setLocalFormData((prevState) => ({ ...prevState, [name]: value }));
//   //   localStorage.setItem(
//   //     "companyData",
//   //     JSON.stringify({ ...companyData, [name]: value })
//   //   );

//   //   let error = "";
//   //   switch (name) {
//   //     case "companyName":
//   //       error = validateCompanyName(value);
//   //       break;
//   //     case "companyRegisterNumber":
//   //       error = validateCompanyRegisterNumber(value);
//   //       break;
//   //     case "createYear":
//   //       error = validateCreateYear(value);
//   //       break;
//   //     case "companyAddress":
//   //       error = validateCompanyAddress(value);
//   //       break;
//   //     case "website":
//   //       error = validateWebsiteOptional(value);
//   //       break;
//   //     case "email":
//   //       error = validateEmail(value);
//   //       break;
//   //   }

//   //   if (error) {
//   //     setErrors((prev) => ({ ...prev, [name]: error }));
//   //   }
//   // };

//   // Updated handleInputChange function - modify the companyRegisterNumber section
//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;

//     if (name === "createYear") {
//       if (!/^\d{0,4}$/.test(value)) return;

//       if (value.length === 4) {
//         const year = parseInt(value, 10);
//         const currentYear = new Date().getFullYear();

//         if (year < 1000 || year > currentYear) return;
//       }
//     }

//     if (name === "companyRegisterNumber") {
//       if (value.length > 50) return;
//       // Only allow numeric input
//       if (!/^[0-9]*$/.test(value)) return;
//     }

//     if (name === "companyName") {
//       if (value.length > 300) return;
//     }

//     setErrors((prev) => ({ ...prev, [name]: "" }));

//     setLocalFormData((prevState) => ({ ...prevState, [name]: value }));
//     localStorage.setItem(
//       "companyData",
//       JSON.stringify({ ...companyData, [name]: value })
//     );

//     let error = "";
//     switch (name) {
//       case "companyName":
//         error = validateCompanyName(value);
//         break;
//       case "companyRegisterNumber":
//         error = validateCompanyRegisterNumber(value);
//         break;
//       case "createYear":
//         error = validateCreateYear(value);
//         break;
//       case "companyAddress":
//         error = validateCompanyAddress(value);
//         break;
//       case "website":
//         error = validateWebsiteOptional(value);
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
//       errorMsg = "Zəhmət olmasa telefon nömrəsini daxil edin"; // localization
//     } else if (digits.length < 7) {
//       errorMsg = "Telefon nömrəsi ən azı 7 rəqəm olmalıdır"; // localization
//     } else if (digits.length > 15) {
//       errorMsg = "Telefon nömrəsi maksimum 15 rəqəm ola bilər"; // localization
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
//         { key: "website", errorKey: "websiteRequired" }, // Add website as required
//         { key: "contactPerson", errorKey: "contactPersonRequired" },
//         { key: "email", errorKey: "emailRequired" },
//         { key: "phone", errorKey: "phoneRequired" },
//       ];

//     const newErrors: Record<string, string> = {};

//     // Validate all required fields
//     requiredFields.forEach(({ key, errorKey }) => {
//       const value = localFormData[key];
//       if (typeof value === "string" && !value.trim()) {
//         // For website, use custom error message if errorKey doesn't exist
//         if (key === "website" && !page.websiteRequired) {
//           newErrors[key] = "Veb sayt tələb olunur"; // localization
//         } else {
//           newErrors[key] = page[errorKey][language];
//         }
//       }
//     });

//     // Apply specific validation rules
//     const companyNameError = validateCompanyName(localFormData.companyName);
//     if (companyNameError) {
//       newErrors.companyName = companyNameError;
//     }

//     const companyRegisterNumberError = validateCompanyRegisterNumber(
//       localFormData.companyRegisterNumber
//     );
//     if (companyRegisterNumberError) {
//       newErrors.companyRegisterNumber = companyRegisterNumberError;
//     }

//     const createYearError = validateCreateYear(localFormData.createYear);
//     if (createYearError) {
//       newErrors.createYear = createYearError;
//     }

//     const companyAddressError = validateCompanyAddress(
//       localFormData.companyAddress
//     );
//     if (companyAddressError) {
//       newErrors.companyAddress = companyAddressError;
//     }

//     // Use strict website validation for form submission
//     const websiteError = validateWebsite(localFormData.website);
//     if (websiteError) {
//       newErrors.website = websiteError;
//     }

//     const emailError = validateEmail(localFormData.email);
//     if (emailError) {
//       newErrors.email = emailError;
//     }

//     // Enhanced phone validation
//     const digits = localFormData.phone.replace(/\D/g, "");
//     if (digits.length === 0) {
//       newErrors.phone = "Zəhmət olmasa telefon nömrəsini daxil edin"; // localization
//     } else if (digits.length < 7) {
//       newErrors.phone = "Telefon nömrəsi ən azı 7 rəqəm olmalıdır"; // localization
//     } else if (digits.length > 15) {
//       newErrors.phone = "Telefon nömrəsi maksimum 15 rəqəm ola bilər"; // localization
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return false;
//     }

//     navigate("/apply/two");
//     return true;
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
//         { key: "website", errorKey: "websiteRequired" },
//         { key: "contactPerson", errorKey: "contactPersonRequired" },
//         { key: "email", errorKey: "emailRequired" },
//         { key: "phone", errorKey: "phoneRequired" },
//       ];

//     const updatedErrors: Record<string, string> = {};

//     requiredFields.forEach(({ key, errorKey }) => {
//       if (errors[key]) {
//         if (key === "website" && !page.websiteRequired) {
//           updatedErrors[key] = "Veb sayt tələb olunur";
//         } else {
//           updatedErrors[key] = page[errorKey][language];
//         }
//       }
//     });

//     setErrors(updatedErrors);
//   }, [language]);

//   return (
//     <>
//       <div className="relative min-h-screen w-full text-white flex flex-col items-center justify-center py-10">
//         <ApplySteps
//           onClick={handleNext}
//           step={1}
//         />

//         <div className="text-center mb-8 relative z-20">
//           <h1 className="text-2xl md:text-3xl font-medium">
//             {page.title[language]}
//           </h1>
//         </div>

//         <div className="w-full max-w-2xl space-y-6 relative z-20">
//           <div className="space-y-2">
//             <label className="text-sm">{page.companyName[language]}</label>
//             <input
//               autoComplete="off"
//               type="text"
//               name="companyName"
//               value={localFormData.companyName}
//               onChange={handleInputChange}
//               minLength={2}
//               maxLength={255}
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
//             <div className="flex-1 space-y-2">
//               <label className="text-sm">
//                 {page.companyRegisterNumber[language]}
//               </label>


//               <input
//                 autoComplete="off"
//                 type="text"  // Changed from "number" to "text"
//                 name="companyRegisterNumber"
//                 value={localFormData.companyRegisterNumber}
//                 onChange={handleInputChange}
//                 maxLength={50}
//                 placeholder="Minimum 3 rəqəm"  // Updated placeholder
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

//             <div className="flex-1 space-y-2">
//               <label className="text-sm">{page.createYear[language]}</label>
//               <input
//                 autoComplete="off"
//                 type="text"
//                 name="createYear"
//                 value={localFormData.createYear}
//                 onChange={handleInputChange}
//                 maxLength={4}
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
//               autoComplete="off"
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
//               autoComplete="off"
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

//           {/* Website - Now Required */}
//           <div className="space-y-2">
//             <label className="text-sm">{page.website[language]}</label>
//             <input
//               autoComplete="off"
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
//               autoComplete="off"
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

//             {/* Phone - Enhanced validation */}
//             <div className="flex-1 space-y-2">
//               <label className="text-sm">{page.phone[language]}</label>
//               <PhoneInput
//                 inputClassName="phone-dark-input flex-1 bg-transparent"
//                 defaultCountry="az"
//                 value={localFormData.phone}
//                 onChange={handlePhoneChange}
//                 className={`w-full ${errors.phone
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

