"use client";

import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundVideo from "../components/BackgroundVideo";
import { FormContext } from "../context/FormContext";
import { useLanguage } from "../context/LanguageContext";
import ApplySteps from "../components/ApplySteps";
import Select, { type MultiValue } from "react-select";
import countryList from "react-select-country-list";
interface PropertyLaw {
  exportBazaar: string[];
  businessOperations: string;
  companyLawType: string;
  products: string;
  exportActivity: boolean;
  document: string;
}

export default function ApplyTwo() {
  const navigate = useNavigate();
  const context = useContext(FormContext);
  const { language, pagesTranslations } = useLanguage();
  const page = pagesTranslations.apply2;
  const buttons = pagesTranslations.applyBtns;
  const options = countryList().getData();

  if (!context) {
    throw new Error("ApplyTwo must be used within a FormContext.Provider");
  }

  const initialValue: PropertyLaw = {
    exportBazaar: [],
    businessOperations: "",
    companyLawType: "",
    products: "",
    exportActivity: false,
    document: "",
  };

  const [localLawData, setLocalLawData] = useState(initialValue);
  const [localLawDataErrors, setLocalLawDataErrors] = useState<
    Record<string, string>
  >({});
  const propertyLawData = JSON.parse(localStorage.getItem("propertyLaw")!);

  useEffect(() => {
    const savedData = {
      exportBazaar: propertyLawData?.exportBazaar || [],
      businessOperations: propertyLawData?.businessOperations || "",
      companyLawType: propertyLawData?.companyLawType || "",
      products: propertyLawData?.products || "",
      exportActivity: propertyLawData?.exportActivity || false,
      document: propertyLawData?.document || "",
    };
    setLocalLawData(savedData);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setLocalLawData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setLocalLawDataErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    switch (name) {
      case "companyLawType":
        localLawData.companyLawType = value;
        break;
      case "businessOperations":
        localLawData.businessOperations = value;
        break;
      case "products":
        localLawData.products = value;
        break;
      case "exportActivity": {
        const checked = value === "Xeyr" ? false : true;
        localLawData.exportActivity = checked;
        break;
      }
      case "document":
        localLawData.document = value;
        break;
      default:
        break;
    }
    localStorage.setItem("propertyLaw", JSON.stringify(localLawData));
  };

  const handleCountryChange = (
    selectedOptions: MultiValue<{ label: string; value: string }>
  ) => {
    let countries: string[] = [];
    if (Array.isArray(selectedOptions)) {
      countries = selectedOptions.map((option) => option.label);
    }

    setLocalLawData((prev) => ({
      ...prev,
      exportBazaar: countries,
    }));

    setLocalLawDataErrors((prev) => ({
      ...prev,
      exportBazaar: "",
    }));

    let updatedFormData = { ...localLawData };
    if (!updatedFormData) {
      updatedFormData = {
        exportBazaar: [],
        businessOperations: "",
        companyLawType: "",
        products: "",
        exportActivity: false,
        document: "",
      };
    } else {
      updatedFormData = {
        ...updatedFormData,
        exportBazaar: countries,
      };
    }
    localStorage.setItem("propertyLaw", JSON.stringify(updatedFormData));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLocalLawData((prev) => ({
        ...prev,
        document: file.name,
      }));

      // Remove error if any
      setLocalLawDataErrors((prev) => ({
        ...prev,
        document: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof localLawDataErrors = {};

    if (!localLawData.companyLawType.trim()) {
      newErrors.companyLawType = page.companyTypeRequired[language];
    }

    if (!localLawData.businessOperations.trim()) {
      newErrors.businessOperations = page.businessIndustryRequired[language];
    }

    if (!localLawData.products.trim()) {
      newErrors.products = page.mainProductsRequired[language];
    }

    if (localLawData.exportActivity && localLawData.exportActivity === null) {
      newErrors.exportActivity = page.exportActivityRequired[language];
    }

    if (!localLawData.exportBazaar || localLawData.exportBazaar.length === 0) {
      newErrors.exportBazaar = page.exportMarketsRequired[language];
    }

    setLocalLawDataErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (Object.keys(localLawDataErrors).length > 0) {
      const translatedErrors: typeof localLawDataErrors = {};

      if (localLawDataErrors.companyLawType) {
        translatedErrors.companyLawType = page.companyTypeRequired[language];
      }

      if (localLawDataErrors.businessOperations) {
        translatedErrors.businessOperations =
          page.businessIndustryRequired[language];
      }

      if (localLawDataErrors.products) {
        translatedErrors.products = page.mainProductsRequired[language];
      }

      if (localLawDataErrors.exportActivity) {
        translatedErrors.exportActivity = page.exportActivityRequired[language];
      }

      if (localLawDataErrors.exportBazaar) {
        translatedErrors.exportBazaar = page.exportMarketsRequired[language];
      }

      setLocalLawDataErrors(translatedErrors);
    }
  }, [
    language,
    localLawDataErrors,
    page.companyTypeRequired,
    page.businessIndustryRequired,
    page.mainProductsRequired,
    page.exportActivityRequired,
    page.exportMarketsRequired,
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
    localLawData.exportBazaar.includes(option.label)
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
              name="companyLawType"
              value={localLawData.companyLawType}
              onChange={handleInputChange}
              className={`w-full bg-transparent rounded-lg p-2 sm:p-3 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-300
                ${
                  localLawDataErrors.companyLawType
                    ? "border border-red-500"
                    : "border border-gray-700"
                }`}
              aria-invalid={!!localLawDataErrors.companyLawType}
              aria-describedby="companyType-error"
            />
            {localLawDataErrors.companyLawType && (
              <p
                id="companyType-error"
                className="text-red-500 text-xs mt-1 input-error"
              >
                {localLawDataErrors.companyLawType}
              </p>
            )}
          </div>

          {/* Business Industry */}
          <div className="space-y-2">
            <label className="text-sm">
              {page.businessIndustry.label[language]}
            </label>
            <select
              name="businessOperations"
              value={localLawData.businessOperations}
              onChange={handleInputChange}
              className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300
                ${
                  localLawDataErrors.businessOperations
                    ? "border border-red-500"
                    : "border border-gray-700"
                }`}
              aria-invalid={!!localLawDataErrors.businessOperations}
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
              <option
                className="text-white bg-[#131021]"
                value="Qida və içkilər"
              >
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
              <option
                className="text-white bg-[#131021]"
                value="Elektrik avadanlıqları"
              >
                {page.businessIndustry.options.electricalEquipment[language]}
              </option>
              {localLawData.businessOperations === "Digər" && (
                <input
                  type="text"
                  placeholder="Sahəni daxil edin..."
                  value={localLawData.businessOperations}
                  onChange={handleInputChange}
                  name="businessIndustry"
                  className="p-2 rounded bg-white text-black"
                />
              )}
            </select>
            {localLawDataErrors.businessOperations && (
              <p
                id="businessIndustry-error"
                className="text-red-500 text-xs mt-1 input-error"
              >
                {localLawDataErrors.businessOperations}
              </p>
            )}
          </div>

          {/* Main Products */}
          <div className="space-y-2">
            <label className="text-sm">{page.mainProducts[language]}</label>
            <input
              type="text"
              name="products"
              value={localLawData.products}
              onChange={handleInputChange}
              className={`w-full bg-transparent rounded-lg p-2 sm:p-3 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-300
                ${
                  localLawDataErrors.products
                    ? "border border-red-500"
                    : "border border-gray-700"
                }`}
              aria-invalid={!localLawData.products}
              aria-describedby="mainProducts-error"
            />
            {localLawDataErrors.products && (
              <p
                id="mainProducts-error"
                className="text-red-500 text-xs mt-1 input-error"
              >
                {localLawDataErrors.products}
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
                  checked={localLawData.exportActivity === true}
                  className="hidden"
                />
                <span className="w-5 h-5 flex items-center justify-center border border-gray-400 rounded">
                  {localLawData.exportActivity && (
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
                  checked={localLawData.exportActivity === false}
                  className="hidden"
                />
                <span className="w-5 h-5 flex items-center justify-center border border-gray-400 rounded">
                  {localLawData.exportActivity === false && (
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
            {localLawDataErrors.exportActivity && (
              <p className="text-red-500 text-xs mt-1 input-error">
                {localLawDataErrors.exportActivity}
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
              className={`w-full ${
                localLawDataErrors.exportBazaar
                  ? "border border-red-500 rounded"
                  : ""
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
                  borderColor: localLawDataErrors.exportBazaar
                    ? "red"
                    : "#4B5563",
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
            {localLawDataErrors.exportBazaar && (
              <p className="text-red-500 text-xs mt-1 input-error">
                {localLawDataErrors.exportBazaar}
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
            {localLawDataErrors.document && (
              <p className="text-xs text-gray-400 mt-1">
                {page.selectedFile[language]} {localLawDataErrors.document}
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
