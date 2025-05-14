"use client";

import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundVideo from "../components/BackgroundVideo";
import { FormContext } from "../context/FormContext";
import 'react-international-phone/style.css';
// NEW import
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';   // keep near your other global CSS imports
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
  // Removed unused step state

  // Initialize local state with data from localStorage or context
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
    phone: "",
  });

  const [errors, setErrors] = useState({
    companyName: "",
  });

  // Load saved data from localStorage when component mounts
  useEffect(() => {
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

  // Handle input changes and update both local state and localStorage
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Update local state
    setLocalFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Update localStorage
    localStorage.setItem(name, value);

    // Update the global form context based on the input name
    if (name === "companyName") {
      setFormData((prev) => ({
        ...prev,
        companyData: { ...prev.companyData, companyName: value },
      }));
    } else if (name === "vatNumber") {
      setFormData((prev) => ({
        ...prev,
        companyData: { ...prev.companyData, companyRegisterNumber: value },
      }));
    } else if (name === "foundingDate") {
      const year = value ? parseInt(value, 10) : null;
      setFormData((prev) => ({
        ...prev,
        companyData: { ...prev.companyData, createYear: year },
      }));
    } else if (name === "companySize") {
      setFormData((prev) => ({
        ...prev,
        companyData: { ...prev.companyData, workerCount: value },
      }));
    } else if (name === "annualTurnover") {
      setFormData((prev) => ({
        ...prev,
        companyData: { ...prev.companyData, annualTurnover: value },
      }));
    } else if (name === "companyAddress") {
      setFormData((prev) => ({
        ...prev,
        companyData: { ...prev.companyData, address: value },
      }));
    } else if (name === "location") {
      setFormData((prev) => ({
        ...prev,
        companyData: { ...prev.companyData, cityAndRegion: value },
      }));
    } else if (name === "website") {
      setFormData((prev) => ({
        ...prev,
        companyData: { ...prev.companyData, website: value },
      }));
    } else if (name === "contactPerson") {
      setFormData((prev) => ({
        ...prev,
        companyData: { ...prev.companyData, contactName: value },
      }));
    } else if (name === "email") {
      setFormData((prev) => ({
        ...prev,
        companyData: { ...prev.companyData, contactEmail: value },
      }));
    } else if (name === "phone") {
      setFormData((prev) => ({
        ...prev,
        companyData: { ...prev.companyData, contactPhone: value },
      }));
    }
  };

  const handleNext = () => {
    if (!localFormData.companyName) {
      setErrors((prev) => ({
        ...prev,
        companyName: page.companyNameRequired[language],
      }));
      return;
    }

    // Removed setStep as step state is not used
    navigate("/apply/two");
  };

  return (
    <>
      <BackgroundVideo />
      <div className="relative min-h-screen w-full text-white flex flex-col items-center justify-center py-10">
        {/* Main Content */}
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
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm">{errors.companyName}</p>
            )}
          </div>

          {/* Company VAT and Founding Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm">{page.vatNumber[language]}</label>
              <input
                type="text"
                name="vatNumber"
                value={localFormData.vatNumber}
                onChange={handleInputChange}
                className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm">{page.foundingDate[language]}</label>
              <input
                type="number"
                name="foundingDate"
                value={localFormData.foundingDate}
                onChange={handleInputChange}
                min="1900"
                max={new Date().getFullYear()}
                className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="YYYY"
              />
            </div>
          </div>

          {/* Company Size and Business Activity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm">{page.companySize[language]}</label>
              <select
                name="companySize"
                value={localFormData.companySize}
                onChange={handleInputChange}
                className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              >
                <option className="text-black" value="">
                  {page.placeholder[language]}
                </option>
                <option className="text-black" value="10">
                  1-10
                </option>
                <option className="text-black" value="50">
                  11-50
                </option>
                <option className="text-black" value="250">
                  51-250
                </option>
                <option className="text-black" value="350">
                  250+
                </option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm">{page.annualTurnover[language]}</label>
              <select
                name="annualTurnover"
                value={localFormData.annualTurnover}
                onChange={handleInputChange}
                className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              >
                <option className="text-black" value="">
                  {page.placeholder[language]}
                </option>
                <option className="text-black" value="3">
                  {page.annualTurnoverOption1[language]}
                </option>
                <option className="text-black" value="30">
                  3m - 30m
                </option>
                <option className="text-black" value="60">
                  30m+
                </option>
              </select>
            </div>
          </div>

          {/* Address and Location */}
          <div className="space-y-2">
            <label className="text-sm">{page.companyAddress[language]}</label>
            <input
              type="text"
              name="companyAddress"
              value={localFormData.companyAddress}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm">{page.location[language]}</label>
            <input
              type="text"
              name="location"
              value={localFormData.location}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {/* Website and Contact Person */}
          <div className="space-y-2">
            <label className="text-sm">{page.website[language]}</label>
            <input
              type="text"
              name="website"
              value={localFormData.website}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm">{page.contactPerson[language]}</label>
            <input
              type="text"
              name="contactPerson"
              value={localFormData.contactPerson}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm">{page.email[language]}</label>
              <input
                type="email"
                name="email"
                value={localFormData.email}
                onChange={handleInputChange}
                className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm">{page.phone[language]}</label>

              <PhoneInput
                defaultCountry="az"
                value={localFormData.phone}
                onChange={(phone: string) => {
                  setLocalFormData(p => ({ ...p, phone }));
                  localStorage.setItem("phone", phone);
                  setFormData(p => ({
                    ...p,
                    companyData: { ...p.companyData, contactPhone: phone },
                  }));
                }}

                /* Bu iki prop komponentin tanıdığı yeganə stil prop-larıdır  */
                className="phone-dark w-full"
                inputClassName="phone-dark-input flex-1"
              />
            </div>

          </div>

          {/* Next Button */}
          <button
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300 mt-6"
            onClick={handleNext}
          >
            {pagesTranslations.applyBtns.nextBtn[language]}
          </button>
        </div>
      </div>
    </>
  );
}
