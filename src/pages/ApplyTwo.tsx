"use client";

import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundVideo from "../components/BackgroundVideo";
import { FormContext } from "../context/FormContext";
import { useLanguage } from "../context/LanguageContext";
import ApplySteps from "../components/ApplySteps";
import Select, { type MultiValue } from "react-select";
import countryList from "react-select-country-list";

// Tip tərifləri
interface PropertyLaw {
  exportBazaar: string[];
  businessOperations: string;
  companyLawType: string;
  products: string;
  exportActivity: boolean;
}

interface FormData {
  propertyLaw?: PropertyLaw;
  // başqa sahələriniz varsa onları əlavə edin
}

export default function ApplyTwo() {
  const navigate = useNavigate();
  const context = useContext(FormContext);
  const { language, pagesTranslations } = useLanguage();
  const page = pagesTranslations.apply2;
  const buttons = pagesTranslations.applyBtns;

  if (!context) {
    throw new Error("ApplyTwo must be used within a FormContext.Provider");
  }

  // formData tipini PropertyLaw tipinə uyğun təyin edirik
  const { formData, setFormData } = context as unknown as {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  };

  // Create a safe propertyLaw object with default values
  const safePropertyLaw: PropertyLaw = formData?.propertyLaw || {
    exportBazaar: [],
    businessOperations: "",
    companyLawType: "",
    products: "",
    exportActivity: false
  };

  // Initialize formData.propertyLaw if it doesn't exist
  useEffect(() => {
    if (!formData.propertyLaw) {
      setFormData((prevData) => ({
        ...prevData,
        propertyLaw: {
          exportBazaar: [],
          businessOperations: "",
          companyLawType: "",
          products: "",
          exportActivity: false
        }
      }));
    }
  }, [formData, setFormData]);

  const options = countryList().getData();

  // Safely access exportBazaar using the safePropertyLaw object
  const initialExportMarkets: string[] = Array.isArray(
    safePropertyLaw.exportBazaar
  )
    ? safePropertyLaw.exportBazaar
    : safePropertyLaw.exportBazaar
      ? [safePropertyLaw.exportBazaar]
      : [];

  const [localFormData, setLocalFormData] = useState({
    companyType: safePropertyLaw.companyLawType || "",
    businessIndustry: safePropertyLaw.businessOperations || "",
    mainProducts: safePropertyLaw.products || "",
    exportActivity: safePropertyLaw.exportActivity ? "Bəli" : "Xeyr",
    exportMarkets: initialExportMarkets, // massiv
    document: "",
  });

  const [errors, setErrors] = useState<{
    companyType?: string;
    businessIndustry?: string;
    mainProducts?: string;
    exportActivity?: string;
    exportMarkets?: string;
    document?: string;
  }>({});

  useEffect(() => {
    // Use safePropertyLaw for safe property access
    const updatedExportMarkets: string[] = Array.isArray(
      safePropertyLaw.exportBazaar
    )
      ? safePropertyLaw.exportBazaar
      : safePropertyLaw.exportBazaar
        ? [safePropertyLaw.exportBazaar]
        : [];

    setLocalFormData({
      companyType: safePropertyLaw.companyLawType || "",
      businessIndustry: safePropertyLaw.businessOperations || "",
      mainProducts: safePropertyLaw.products || "",
      exportActivity: safePropertyLaw.exportActivity ? "Bəli" : "Xeyr",
      exportMarkets: updatedExportMarkets,
      document: "",
    });
  }, [
    formData,
    safePropertyLaw.companyLawType,
    safePropertyLaw.businessOperations,
    safePropertyLaw.products,
    safePropertyLaw.exportActivity,
    safePropertyLaw.exportBazaar
  ]);

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as FormData;
        setFormData(parsedData);

        // Safely access properties with optional chaining
        const savedExportMarkets: string[] = Array.isArray(
          parsedData.propertyLaw?.exportBazaar
        )
          ? parsedData.propertyLaw.exportBazaar
          : parsedData.propertyLaw?.exportBazaar
            ? [parsedData.propertyLaw.exportBazaar]
            : [];

        setLocalFormData({
          companyType: parsedData.propertyLaw?.companyLawType || "",
          businessIndustry: parsedData.propertyLaw?.businessOperations || "",
          mainProducts: parsedData.propertyLaw?.products || "",
          exportActivity: parsedData.propertyLaw?.exportActivity
            ? "Bəli"
            : "Xeyr",
          exportMarkets: savedExportMarkets,
          document: "",
        });
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }
  }, [setFormData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setLocalFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update errors on input change to remove error once fixed
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));

    // Make sure propertyLaw exists before updating its properties
    const updatedFormData = { ...formData };
    if (!updatedFormData.propertyLaw) {
      updatedFormData.propertyLaw = {
        exportBazaar: [],
        businessOperations: "",
        companyLawType: "",
        products: "",
        exportActivity: false
      };
    }

    switch (name) {
      case "companyType":
        updatedFormData.propertyLaw.companyLawType = value;
        break;
      case "businessIndustry":
        updatedFormData.propertyLaw.businessOperations = value;
        break;
      case "mainProducts":
        updatedFormData.propertyLaw.products = value;
        break;
      case "exportActivity":
        updatedFormData.propertyLaw.exportActivity = value === "Bəli";
        break;
      case "document":
        break;
      default:
        break;
    }

    setFormData(updatedFormData);
    localStorage.setItem("formData", JSON.stringify(updatedFormData));
  };

  const handleCountryChange = (
    selectedOptions: MultiValue<{ label: string; value: string }>
  ) => {
    let countries: string[] = [];
    if (Array.isArray(selectedOptions)) {
      countries = selectedOptions.map((option) => option.label);
    }

    setLocalFormData((prev) => ({
      ...prev,
      exportMarkets: countries,
    }));

    // Remove error on valid change
    setErrors((prev) => ({
      ...prev,
      exportMarkets: undefined,
    }));

    // Make sure propertyLaw exists before updating
    const updatedFormData = { ...formData };
    if (!updatedFormData.propertyLaw) {
      updatedFormData.propertyLaw = {
        exportBazaar: countries,
        businessOperations: "",
        companyLawType: "",
        products: "",
        exportActivity: false
      };
    } else {
      updatedFormData.propertyLaw = {
        ...updatedFormData.propertyLaw,
        exportBazaar: countries,
      };
    }

    setFormData(updatedFormData);
    localStorage.setItem("formData", JSON.stringify(updatedFormData));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLocalFormData((prev) => ({
        ...prev,
        document: file.name,
      }));

      // Remove error if any
      setErrors((prev) => ({
        ...prev,
        document: undefined,
      }));
    }
  };

  // Form validasiyası
  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!localFormData.companyType.trim()) {
      newErrors.companyType = page.companyTypeRequired[language];
    }

    if (!localFormData.businessIndustry.trim()) {
      newErrors.businessIndustry = page.businessIndustryRequired[language];
    }

    if (!localFormData.mainProducts.trim()) {
      newErrors.mainProducts = page.mainProductsRequired[language];
    }

    if (
      localFormData.exportActivity !== "Bəli" &&
      localFormData.exportActivity !== "Xeyr"
    ) {
      newErrors.exportActivity = page.exportActivityRequired[language];
    }

    if (
      !localFormData.exportMarkets ||
      localFormData.exportMarkets.length === 0
    ) {
      newErrors.exportMarkets = page.exportMarketsRequired[language];
    }

    // Əgər sən sənədin yüklənməsini mütləq etmək istəyirsənsə, burada əlavə et.
    // Məsələn:
    // if (!localFormData.document) {
    //   newErrors.document = "Sənəd yüklənməlidir."
    // }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const translatedErrors: typeof errors = {};

      if (errors.companyType) {
        translatedErrors.companyType = page.companyTypeRequired[language];
      }

      if (errors.businessIndustry) {
        translatedErrors.businessIndustry =
          page.businessIndustryRequired[language];
      }

      if (errors.mainProducts) {
        translatedErrors.mainProducts = page.mainProductsRequired[language];
      }

      if (errors.exportActivity) {
        translatedErrors.exportActivity = page.exportActivityRequired[language];
      }

      if (errors.exportMarkets) {
        translatedErrors.exportMarkets = page.exportMarketsRequired[language];
      }

      // Optional for document if you're validating it
      // if (errors.document) {
      //   translatedErrors.document = page.documentRequired[language];
      // }

      setErrors(translatedErrors);
    }
  }, [
    language,
    errors,
    page.companyTypeRequired,
    page.businessIndustryRequired,
    page.mainProductsRequired,
    page.exportActivityRequired,
    page.exportMarketsRequired
  ]);

  const handleGoBack = () => navigate("/apply");
  const handleGoNext = () => {
    if (validateForm()) {
      navigate("/apply/three");
    } else {
      // İstəyə bağlı: səhv olan ilk sahəyə scroll
      const firstError = document.querySelector(".input-error");
      firstError?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const selectedOptions = options.filter((option) =>
    localFormData.exportMarkets.includes(option.label)
  );

  return (
    <>
      <BackgroundVideo />
      <div className="relative min-h-screen w-full bg-[url('/images/space-background.jpg')] bg-cover bg-center bg-no-repeat text-white flex flex-col items-center justify-center py-4 sm:py-6 md:py-10 px-2 sm:px-4">
        <ApplySteps step={2} />

        <div className="text-center mb-8 relative z-20">
          <h1 className="text-2xl md:text-3xl font-medium">
            {page.title[language]}
          </h1>
        </div>

        <div className="w-full max-w-2xl space-y-4 sm:space-y-6 relative z-20 px-4 sm:px-6">
          {/* Company Type */}
          <div className="space-y-2">
            <label className="text-sm">{page.companyType[language]}</label>
            <input
              type="text"
              name="companyType"
              value={localFormData.companyType}
              onChange={handleInputChange}
              className={`w-full bg-transparent rounded-lg p-2 sm:p-3 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-300
                ${errors.companyType
                  ? "border border-red-500"
                  : "border border-gray-700"
                }`}
              aria-invalid={!!errors.companyType}
              aria-describedby="companyType-error"
            />
            {errors.companyType && (
              <p
                id="companyType-error"
                className="text-red-500 text-xs mt-1 input-error"
              >
                {errors.companyType}
              </p>
            )}
          </div>

          {/* Business Industry */}
          <div className="space-y-2">
            <label className="text-sm">
              {page.businessIndustry.label[language]}
            </label>
            <select
              name="businessIndustry"
              value={localFormData.businessIndustry}
              onChange={handleInputChange}
              className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300
                ${errors.businessIndustry
                  ? "border border-red-500"
                  : "border border-gray-700"
                }`}
              aria-invalid={!!errors.businessIndustry}
              aria-describedby="businessIndustry-error"
            >
              <option className="text-white bg-[#131021]" value="">
                {page.businessIndustry.placeholder[language]}
              </option>
              <option
                className="text-white bg-[#131021]"
                value="Təmsil etdiyimiz sənayə sektoru"
              >
                {page.businessIndustry.options.representedIndustry[language]}
              </option>
              <option className="text-white bg-[#131021]" value="Qida və içkilər">
                {page.businessIndustry.options.foodAndBeverages[language]}
              </option>
              <option className="text-white bg-[#131021]" value="Neft - qaz">
                {page.businessIndustry.options.oilAndGas[language]}
              </option>
              <option className="text-white bg-[#131021]" value="Kimya">
                {page.businessIndustry.options.chemical[language]}
              </option>
              <option className="text-white bg-[#131021]" value="Metallurgiya">
                {page.businessIndustry.options.metallurgy[language]}
              </option>
              <option
                className="text-white bg-[#131021]"
                value="Maşın və avadanlıqların təmiri və quraşdırılması"
              >
                {
                  page.businessIndustry.options.machineRepairAndInstallation[
                  language
                  ]
                }
              </option>
              <option
                className="text-white bg-[#131021]"
                value="Kauçuk və plastik məhsullar"
              >
                {
                  page.businessIndustry.options.rubberAndPlasticProducts[
                  language
                  ]
                }
              </option>
              <option className="text-white bg-[#131021]" value="Tekstil">
                {page.businessIndustry.options.textile[language]}
              </option>
              <option className="text-white bg-[#131021]" value="Elektrik avadanlıqları">
                {page.businessIndustry.options.electricalEquipment[language]}
              </option>
              {/* {selectedOption === 'Digər' && (
        <input
          type="text"
          placeholder="Sahəni daxil edin..."
          value={customIndustry}
          onChange={(e) => setCustomIndustry(e.target.value)}
          className="p-2 rounded bg-white text-black"
        />
      )} */}
            </select>
            {errors.businessIndustry && (
              <p
                id="businessIndustry-error"
                className="text-red-500 text-xs mt-1 input-error"
              >
                {errors.businessIndustry}
              </p>
            )}
          </div>

          {/* Main Products */}
          <div className="space-y-2">
            <label className="text-sm">{page.mainProducts[language]}</label>
            <input
              type="text"
              name="mainProducts"
              value={localFormData.mainProducts}
              onChange={handleInputChange}
              className={`w-full bg-transparent rounded-lg p-2 sm:p-3 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-300
                ${errors.mainProducts
                  ? "border border-red-500"
                  : "border border-gray-700"
                }`}
              aria-invalid={!!errors.mainProducts}
              aria-describedby="mainProducts-error"
            />
            {errors.mainProducts && (
              <p
                id="mainProducts-error"
                className="text-red-500 text-xs mt-1 input-error"
              >
                {errors.mainProducts}
              </p>
            )}
          </div>

          {/* Export Activity */}
          <div className="space-y-2">
            <label className="text-sm">{page.exportActivity[language]}</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="exportActivity"
                  value="Bəli"
                  onChange={handleInputChange}
                  checked={localFormData.exportActivity === "Bəli"}
                  className="hidden"
                />
                <span className="w-5 h-5 flex items-center justify-center border border-gray-400 rounded">
                  {localFormData.exportActivity === "Bəli" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                <span className="text-sm">{page.yes[language]}</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="exportActivity"
                  value="Xeyr"
                  onChange={handleInputChange}
                  checked={localFormData.exportActivity === "Xeyr"}
                  className="hidden"
                />
                <span className="w-5 h-5 flex items-center justify-center border border-gray-400 rounded">
                  {localFormData.exportActivity === "Xeyr" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                <span className="text-sm">{page.no[language]}</span>
              </label>
            </div>
            {errors.exportActivity && (
              <p className="text-red-500 text-xs mt-1 input-error">
                {errors.exportActivity}
              </p>
            )}
          </div>

          {/* Export Markets Multi-Select */}
          <div className="space-y-2">
            <label className="text-sm">{page.exportMarkets[language]}</label>
            <Select
              options={options}
              value={selectedOptions}
              onChange={(selected) => {
                if (selected && selected.length > 4) {
                  alert(page.exportMarketsAlert[language]);
                  return;
                }
                handleCountryChange(selected);
              }}
              className={`w-full ${errors.exportMarkets ? "border border-red-500 rounded" : ""
                }`}
              classNamePrefix="react-select"
              placeholder={page.exportMarketsPlaceholder[language]}
              isClearable
              isMulti
              closeMenuOnSelect={false}
              styles={{
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: "#131021",
                  color: "white",
                }),
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "transparent",
                  borderColor: errors.exportMarkets ? "red" : "#4B5563",
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "white",
                }),
                multiValue: (provided) => ({
                  ...provided,
                  backgroundColor: "#373176",
                  color: "white",
                }),
                multiValueLabel: (provided) => ({
                  ...provided,
                  color: "white",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? "#373176" : "#131021",
                  color: "white",
                  cursor: "pointer",
                }),
              }}
            />
            {errors.exportMarkets && (
              <p className="text-red-500 text-xs mt-1 input-error">
                {errors.exportMarkets}
              </p>
            )}
          </div>

          {/* Document upload */}
          <div className="space-y-2">
            <label className="text-sm ">{page.document[language]}</label>
            <input
              type="file"
              name="document"
              accept=".doc,.docx,.pdf"
              onChange={handleFileChange}
              className="w-full cursor-pointer bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            {localFormData.document && (
              <p className="text-xs text-gray-400 mt-1">
                {page.selectedFile[language]} {localFormData.document}
              </p>
            )}
            <div>
              <p className="text-sm text-gray-400">
                {page.fileLimitNote[language]}{" "}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6 sm:mt-8 gap-4">
            <button
              type="button"
              onClick={handleGoBack}
              className="w-full cursor-pointer bg-blue-900 hover:bg-blue-800 text-white py-2 sm:py-3 rounded-lg transition duration-200 text-xs sm:text-sm"
            >
              {buttons.backBtn[language]}
            </button>
            <button
              type="button"
              onClick={handleGoNext}
              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-lg transition duration-200 text-xs sm:text-sm"
            >
              {buttons.nextBtn[language]}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}