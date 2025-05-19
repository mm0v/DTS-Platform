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

  const { setFormData } = context;

  const [localFormData, setLocalFormData] = useState({
    companyName: "",
    vatNumber: "",
    foundingDate: "",
    companySize: "",
    annualTurnover: "",
    companyAddress: "",
    location: "",
    website: "",
    contactPerson: "",
    email: "",
    phone: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load saved data if any
    const savedData = {
      companyName: localStorage.getItem("companyName") || "",
      vatNumber: localStorage.getItem("vatNumber") || "",
      foundingDate: localStorage.getItem("foundingDate") || "",
      companySize: localStorage.getItem("companySize") || "",
      annualTurnover: localStorage.getItem("annualTurnover") || "",
      companyAddress: localStorage.getItem("companyAddress") || "",
      location: localStorage.getItem("location") || "",
      website: localStorage.getItem("website") || "",
      contactPerson: localStorage.getItem("contactPerson") || "",
      email: localStorage.getItem("email") || "",
      phone: localStorage.getItem("phone") || "",
    };
    setLocalFormData(savedData);
  }, []);

  

const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  // foundingDate üçün əlavə yoxlamalar
  if (name === "foundingDate") {
    // Yalnız rəqəmlərdən ibarət olsun
    if (!/^\d{0,4}$/.test(value)) return;

    // Əgər 4 rəqəm yazılıbsa, onu tam ədəd kimi yoxla
    if (value.length === 4) {
      const year = parseInt(value, 10);
      if (year < 0 || year > 2025) return;
    }
  }

  setErrors((prev) => ({ ...prev, [name]: "" }));
  setLocalFormData((prevState) => ({ ...prevState, [name]: value }));
  localStorage.setItem(name, value);

  // Update context accordingly
  setFormData((prev) => ({
    ...prev,
    companyData: {
      ...prev.companyData,
      [name === "vatNumber"
        ? "companyRegisterNumber"
        : name === "foundingDate"
        ? "createYear"
        : name === "companySize"
        ? "workerCount"
        : name === "annualTurnover"
        ? "annualTurnover"
        : name === "companyAddress"
        ? "address"
        : name === "location"
        ? "cityAndRegion"
        : name === "contactPerson"
        ? "contactName"
        : name === "email"
        ? "contactEmail"
        : name === "phone"
        ? "contactPhone"
        : "companyName"]: value,
    },
  }));
};



const handlePhoneChange = (value: string) => {
  // 1. Daxil edilən dəyəri saxla
  setLocalFormData((prev) => ({ ...prev, phone: value }));
  localStorage.setItem("phone", value);

  // 2. Sadecə rəqəmləri götür və uzunluğunu yoxla
  const digits = value.replace(/\D/g, "");
  let errorMsg = "";

  if (digits.length === 0) {
    errorMsg = "Zəhmət olmasa telefon nömrəsini daxil edin";
  } else if (digits.length < 9) {
    errorMsg = "Telefon nömrəsi ən azı 9 rəqəm olmalıdır";
  }

  // 3. Səhv mesajını set et
  setErrors((prev) => ({
    ...prev,
    phone: errorMsg,
  }));

  // 4. Context-i yenilə
  setFormData((prev) => ({
    ...prev,
    companyData: {
      ...prev.companyData,
      contactPhone: value,
    },
  }));
};


const validateForm = () => {
  const newErrors: typeof errors = { /* əvvəlki qaydalar */ };

  // Telefon validasiyası
  const digitsOnly = (localFormData.phone || "").replace(/\D/g, "");
  if (digitsOnly.length < 9) {
    newErrors.phone = page.phoneRequired[language];
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};





  const handleNext = () => {
    const newErrors: Record<string, string> = {};
    if (!localFormData.companyName.trim()) {
      newErrors.companyName = page.companyNameRequired[language];
    }

    if (!localFormData.vatNumber.trim()) {
      newErrors.vatNumber = page.vatNumberRequired[language];
    }
    if (!localFormData.foundingDate.trim()) {
      newErrors.foundingDate = page.foundingDateRequired[language];
    }
    if (!localFormData.companySize.trim()) {
      newErrors.companySize = page.companySizeRequired[language];
    }
    if (!localFormData.annualTurnover.trim()) {
      newErrors.annualTurnover = page.annualTurnoverRequired[language];
    }
    if (!localFormData.companyAddress.trim()) {
      newErrors.companyAddress = page.companyAddressRequired[language];
    }
    if (!localFormData.location.trim()) {
      newErrors.location = page.locationRequired[language];
    }
    if (!localFormData.website.trim()) {
      newErrors.website = page.websiteRequired[language];
    }
    if (!localFormData.contactPerson.trim()) {
      newErrors.contactPerson = page.contactPersonRequired[language];
    }
    if (!localFormData.email.trim()) {
      newErrors.email = page.emailRequired[language];
    }
    if (!localFormData.phone.trim()) {
      newErrors.phone = page.phoneRequired[language];
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigate("/apply/two");
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0) return;

    const updatedErrors: Record<string, string> = {};

    if (errors.companyName) {
      updatedErrors.companyName = page.companyNameRequired[language];
    }
    if (errors.vatNumber) {
      updatedErrors.vatNumber = page.vatNumberRequired[language];
    }
    if (errors.foundingDate) {
      updatedErrors.foundingDate = page.foundingDateRequired[language];
    }
    if (errors.companySize) {
      updatedErrors.companySize = page.companySizeRequired[language];
    }
    if (errors.annualTurnover) {
      updatedErrors.annualTurnover = page.annualTurnoverRequired[language];
    }
    if (errors.companyAddress) {
      updatedErrors.companyAddress = page.companyAddressRequired[language];
    }
    if (errors.location) {
      updatedErrors.location = page.locationRequired[language];
    }
    if (errors.website) {
      updatedErrors.website = page.websiteRequired[language];
    }
    if (errors.contactPerson) {
      updatedErrors.contactPerson = page.contactPersonRequired[language];
    }
    if (errors.email) {
      updatedErrors.email = page.emailRequired[language];
    }
    if (errors.phone) {
      updatedErrors.phone = page.phoneRequired[language];
    }

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
            {/* VAT Number */}
            <div className="flex-1 space-y-2">
              <label className="text-sm">{page.vatNumber[language]}</label>
              <input
                type="text"
                name="vatNumber"
                value={localFormData.vatNumber}
                onChange={handleInputChange}
                className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.vatNumber
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-700 focus:ring-blue-500"
                  }`}
              />
              {errors.vatNumber && (
                <p className="text-red-500 text-sm">{errors.vatNumber}</p>
              )}
            </div>

            {/* Founding Date */}
            <div className="flex-1 space-y-2">
  <label className="text-sm">{page.foundingDate[language]}</label>
 <input
  type="number"
  name="foundingDate"
  value={localFormData.foundingDate}
  onChange={handleInputChange}
  max={2025}
  placeholder="YYYY"
  className={`no-spinner w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${
    errors.foundingDate
      ? "border-red-500 focus:ring-red-500"
      : "border-gray-700 focus:ring-blue-500"
  }`}
/>

  {errors.foundingDate && (
    <p className="text-red-500 text-sm">{errors.foundingDate}</p>
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
            <label className="text-sm">{page.website[language]}</label>
            <input
              type="text"
              name="website"
              value={localFormData.website}
              onChange={handleInputChange}
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
                className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 transition duration-300 border ${errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-700 focus:ring-blue-500"
                  }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
          <div className="flex-1 space-y-2">
  <label className="text-sm">{page.phone[language]}</label>
  <PhoneInput
    inputClassName="phone-dark-input flex-1 bg-transparent"
    defaultCountry="az"
    value={localFormData.phone}
    onChange={handlePhoneChange}
    className={`w-full ${
      errors.phone ? "border border-red-500 rounded" : "border border-gray-700"
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
  disabled={!!errors.phone}
  className={`w-full py-3 rounded-lg transition duration-300 mt-6 text-white
    ${
      !errors.phone
        ? 'bg-blue-600 hover:bg-[#1a4381] cursor-pointer'
        : 'bg-gray-500 cursor-not-allowed'
    }`
  }
>
  {pagesTranslations.applyBtns.nextBtn[language]}
</button>

        </div>
      </div>
    </>
  );
}
