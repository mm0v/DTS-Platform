"use client";

import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundVideo from "../components/BackgroundVideo";
import { FormContext } from "../context/FormContext";
import { useLanguage } from "../context/LanguageContext";
import ApplySteps from "../components/ApplySteps";
import Select, { type MultiValue } from "react-select";
import countryList from "react-select-country-list";
import { Download } from "lucide-react";

interface PropertyLaw {
  exportBazaar: string[];
  businessOperations: string;
  companyLawType: string;
  products: string;
  exportActivity: boolean;
  registerCertificate: string;
}

const DB_NAME = "ALL files";
const STORE_NAME = "files";
const FILE_KEY = "registerCertificate";

function openDB() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
}

async function saveFileToIndexedDB(file: File) {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const putRequest = store.put(file, FILE_KEY);
    putRequest.onsuccess = () => resolve();
    putRequest.onerror = () => reject(putRequest.error);
  });
}

async function getFileFromIndexedDB(): Promise<File | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const getRequest = store.get(FILE_KEY);
    getRequest.onsuccess = () => resolve(getRequest.result || null);
    getRequest.onerror = () => reject(getRequest.error);
  });
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
    registerCertificate: "",
  };

  const [localLawData, setLocalLawData] = useState<PropertyLaw>(initialValue);
  const [localLawDataErrors, setLocalLawDataErrors] = useState<
    Record<string, string>
  >({});
  const [customIndustry, setCustomIndustry] = useState<string>("");
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("propertyLaw") || "null");
    getFileFromIndexedDB()
      .then((file) => {
        if (file && savedData) {
          setLocalLawData({
            ...savedData,
            registerCertificate: file.name,
          });
          fileInputRef.current!.name = file.name;
        } else if (savedData) {
          setLocalLawData(savedData);
        }

        // Check if the saved data has a custom industry value
        if (savedData && savedData.businessOperations &&
          !["", "Qida və içkilər", "Neft - qaz", "Kimya", "Metallurgiya",
            "Maşın və avadanlıqların təmiri və quraşdırılması",
            "Kauçuk və plastik məhsullar", "Tekstil", "Elektrik avadanlıqları"].includes(savedData.businessOperations)) {
          setCustomIndustry(savedData.businessOperations);
          setShowCustomInput(true);
        }
      })
      .catch(console.error);
  }, []);

  const updateLocalStorage = (data: PropertyLaw) => {
    localStorage.setItem("propertyLaw", JSON.stringify(data));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let newValue: unknown = value;

    if (name === "exportActivity") {
      newValue = value === "Bəli";
    }

    if (name === "businessOperations") {
      if (value === "Digər") {
        setShowCustomInput(true);
        setCustomIndustry("");
        newValue = "";
      } else {
        setShowCustomInput(false);
        setCustomIndustry("");
      }
    }

    const updatedData = { ...localLawData, [name]: newValue };
    setLocalLawData(updatedData);

    // Real-time validasiya - xüsusilə products üçün
    if (name === "products") {
      if (value.trim().length > 0 && value.trim().length < 3) {
        setLocalLawDataErrors((prev) => ({
          ...prev,
          [name]: page.mainProductsMinLength ? page.mainProductsMinLength[language] : "Minimum 3 simvol daxil edilməlidir"
        }));
      } else {
        setLocalLawDataErrors((prev) => ({ ...prev, [name]: "" }));
      }
    } else {
      setLocalLawDataErrors((prev) => ({ ...prev, [name]: "" }));
    }

    updateLocalStorage(updatedData);
  };

  const handleCustomIndustryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomIndustry(value);

    const updatedData = { ...localLawData, businessOperations: value };
    setLocalLawData(updatedData);
    setLocalLawDataErrors((prev) => ({ ...prev, businessOperations: "" }));
    updateLocalStorage(updatedData);
  };

  const handleCountryChange = (
    selectedOptions: MultiValue<{ label: string; value: string }>
  ) => {
    const countries = selectedOptions.map((option) => option.label);
    const updatedData = { ...localLawData, exportBazaar: countries };
    setLocalLawData(updatedData);
    setLocalLawDataErrors((prev) => ({ ...prev, exportBazaar: "" }));
    updateLocalStorage(updatedData);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!localLawData.companyLawType.trim())
      errors.companyLawType = page.companyTypeRequired[language];
    if (!localLawData.businessOperations.trim())
      errors.businessOperations = page.businessIndustryRequired[language];

    // Products üçün yenilənmiş validasiya
    if (!localLawData.products.trim()) {
      errors.products = page.mainProductsRequired[language];
    } else if (localLawData.products.trim().length < 3) {
      errors.products = page.mainProductsMinLength ? page.mainProductsMinLength[language] : "Minimum 3 simvol daxil edilməlidir";
    }

    if (localLawData.exportActivity === null)
      errors.exportActivity = page.exportActivityRequired[language];
    if (!localLawData.exportBazaar.length)
      errors.exportBazaar = page.exportMarketsRequired[language];

    setLocalLawDataErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleGoBack = () => navigate("/apply");
  const handleGoNext = () => {
    if (validateForm()) navigate("/apply/three");
  };

  const selectedOptions = options.filter((option) =>
    localLawData.exportBazaar.includes(option.label)
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await saveFileToIndexedDB(file);
        const updatedData = { ...localLawData, registerCertificate: file.name };
        setLocalLawData(updatedData);
        updateLocalStorage(updatedData);
      } catch (error) {
        console.error("Failed to save file to IndexedDB", error);
      }
    }
  };

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
                ${localLawDataErrors.companyLawType
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
              value={showCustomInput ? "Digər" : localLawData.businessOperations}
              onChange={handleInputChange}
              className={`w-full bg-transparent rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300
                ${localLawDataErrors.businessOperations
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
              <option className="text-white bg-[#131021]" value="Digər">
                Digər
              </option>
            </select>

            {/* Custom Industry Input */}
            {showCustomInput && (
              <input
                type="text"
                placeholder="Sahəni daxil edin..."
                value={customIndustry}
                onChange={handleCustomIndustryChange}
                className="w-full bg-transparent rounded-lg p-2 sm:p-3 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-300 border border-gray-700 mt-2"
              />
            )}

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
                ${localLawDataErrors.products
                  ? "border border-red-500"
                  : "border border-gray-700"
                }`}
              aria-invalid={!!localLawDataErrors.products}
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
              className={`w-full ${localLawDataErrors.exportBazaar
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

          {/* RegisterCertificate upload */}
          <div className="space-y-2">
            <label className="text-sm ">
              {page.registerCertificate[language]}
            </label>
            <label
              htmlFor="registerCertificate"
              className="w-full h-14 border border-gray-700 rounded-lg flex items-center justify-between px-4 bg-transparent text-gray-400 text-sm cursor-pointer select-none"
            >
              <span className="truncate">
                {localLawData?.registerCertificate
                  ? `${localLawData.registerCertificate}`
                  : "No file selected"}
              </span>
              <Download size={20} className="text-white ml-2" />
            </label>
            <input
              id="registerCertificate"
              type="file"
              name="registerCertificate"
              accept=".doc,.docx,.pdf"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            {localLawDataErrors.registerCertificate && (
              <p className="text-xs text-gray-400 mt-1">
                {page.selectedFile[language]}{" "}
                {localLawDataErrors.registerCertificate}
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