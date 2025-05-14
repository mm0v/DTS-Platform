"use client";

import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundVideo from "../components/BackgroundVideo";
import { FormContext } from "../context/FormContext";
import 'react-international-phone/style.css'; // Keep this import near other global CSS imports
import { PhoneInput } from 'react-international-phone';

export default function ApplyOne() {
  const navigate = useNavigate();
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("ApplyOne must be used within a FormContext.Provider");
  }

  const { formData, setFormData } = context;
  const [step, setStep] = useState(1);

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
        companyName: "Şirkət adı tələb olunur, zəhmət olmasa daxil edin.",
      }));
      return;
    }

    setStep((prevStep) => Math.min(prevStep + 1, 5));
    navigate("/apply/two");
  };

  return (
    <>
      <BackgroundVideo />
      <div className="relative min-h-screen w-full text-white flex flex-col items-center justify-center py-10">
        {/* Main Content */}
        <div className="relative z-20 w-full max-w-4xl mb-8 px-4">
          {/* Step indicators */}
          <div className="relative w-full h-[1px] bg-blue-500">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm ${num <= step ? "bg-blue-500" : "bg-blue-900"}`}
                style={{ left: `${(num - 1) * 25}%` }}
              >
                {num}
              </div>
            ))}
          </div>

          {/* Step descriptions */}
          <div className="flex justify-between mt-4 text-xs text-gray-400 space-y-2">
            <div className="text-center  max-w-[150px] text-blue-400">
              Şirkət haqqında məlumat
            </div>
            <div className="text-center max-w-[150px]">Mülkiyyət və hüquqi quruluş</div>
            <div className="text-center max-w-[150px]">Rəqəmsal hazırlıq və transformasiya ehtiyacları</div>
            <div className="text-center max-w-[150px]">Liderlik və öhdəliklər</div>
            <div className="text-center max-w-[150px]">Tələb olunan sənədlər</div>
          </div>
        </div>

      <div className="text-center text-3xl font-semibold mb-6 py-5"> <h1> Şirkət haqqında məlumat</h1> </div>

        <div className="w-full max-w-2xl space-y-6 relative z-20">
          {/* Company Name */}
          <div className="space-y-2">
            <label className="text-sm">Şirkətin adı (Tam hüquqi adı)</label>
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
              <label className="text-sm">Şirkətin VÖEN nömrəsi</label>
              <input
                type="text"
                name="vatNumber"
                value={localFormData.vatNumber}
                onChange={handleInputChange}
                className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Şirkətin yaranma tarixi</label>
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
    <label className="text-sm">
      Şirkətin ölçüsü (Tam ştatlı işçilərin sayı)
    </label>
    <select
      name="companySize"
      value={localFormData.companySize}
      onChange={handleInputChange}
      className="w-full bg-[#131121] text-white border border-g rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#373176] transition duration-300 hover:bg-[#373176]"
    >
      <option className="text-white hover:bg-[#373176]" value="">
        Seçin
      </option>
      <option className="text-white hover:bg-[#373176]" value="10">
        1-10
      </option>
      <option className="text-white hover:bg-[#373176]" value="50">
        11-50
      </option>
      <option className="text-white hover:bg-[#373176]" value="250">
        51-250
      </option>
      <option className="text-white hover:bg-[#373176]" value="350">
        250+
      </option>
    </select>
  </div>
  <div className="space-y-2">
    <label className="text-sm">İllik dövriyyə (AZN)</label>
    <select
      name="annualTurnover"
      value={localFormData.annualTurnover}
      onChange={handleInputChange}
      className="w-full bg-[#131121] text-white border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-[#373176] transition duration-300 hover:bg-[#373176]"
    >
      <option className="text-white" value="">
        Seçin
      </option>
      <option className="text-white" value="3">
        3m-ə qədər
      </option>
      <option className="text-white" value="30">
        3m - 30m
      </option>
      <option className="text-white" value="60">
        30m+
      </option>
    </select>
  </div>
</div>


          {/* Address and Location */}
          <div className="space-y-2">
            <label className="text-sm">Şirkətin ünvanı</label>
            <input
              type="text"
              name="companyAddress"
              value={localFormData.companyAddress}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Yerləşdiyi şəhər/region</label>
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
            <label className="text-sm">Vebsayt (əgər varsa)</label>
            <input
              type="text"
              name="website"
              value={localFormData.website}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Əlaqələndirici şəxs (ad və soyad)</label>
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
              <label className="text-sm">Elektron poçt ünvanı</label>
              <input
                type="email"
                name="email"
                value={localFormData.email}
                onChange={handleInputChange}
                className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Əlaqə nömrəsi</label>

              <PhoneInput
                defaultCountry="az"
                value={localFormData.phone}
                onChange={(phone: string) => {
                  setLocalFormData((p) => ({ ...p, phone }));
                  localStorage.setItem("phone", phone);
                  setFormData((p) => ({
                    ...p,
                    companyData: { ...p.companyData, contactPhone: phone },
                  }));
                }}
                className="bg-transparent border border-gray-700 rounded-lg p-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                inputClassName="phone-dark-input flex-1"
              />
            </div>
          </div>

          {/* Next Button */}
          <button
            className="w-full cursor-pointer bg-blue-600 hover:bg-[#1a4381] text-white py-3 rounded-lg transition duration-300 mt-6"
            onClick={handleNext}
          >
            Növbəti
          </button>
        </div>
      </div>
    </>
  );
}
