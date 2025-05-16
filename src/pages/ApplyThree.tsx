"use client";

import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import BackgroundVideo from "../components/BackgroundVideo";
import { FormContext } from "../context/FormContext";
import { useLanguage } from "../context/LanguageContext";
import ApplySteps from "../components/ApplySteps";
import { ChevronDown, ChevronUp } from "lucide-react";

const ApplyThree = () => {
  const navigate = useNavigate();
  const context = useContext(FormContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { language, pagesTranslations } = useLanguage();
  const page = pagesTranslations.apply3;
  const buttons = pagesTranslations.applyBtns;

  if (!context) {
    throw new Error("ApplyThree must be used within a FormContext.Provider");
  }

  const { formData, setFormData } = context;

  // Validasiya üçün error state
  const [errors, setErrors] = useState<{
    digitalLevel: boolean;
    digitalTools: boolean;
    companyPurpose: boolean;
  }>({
    digitalLevel: false,
    digitalTools: false,
    companyPurpose: false,
  });

  // Form səviyyəsində ümumi error mesajı
  const [errorMessage, setErrorMessage] = useState("");

  // LocalStorage-dan məlumat yüklə
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }
  }, [setFormData]);

  // Formu validasiya edən funksiya
  const validateForm = () => {
    const newErrors = {
      digitalLevel: formData.digitalReadiness.digitalLevel === 0,
      digitalTools: formData.digitalReadiness.digitalTools.length === 0,
      companyPurpose:
        formData.digitalReadiness.companyPurpose.trim().length < 3,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  // Input dəyişdikdə
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    let updatedFormData = { ...formData };

    if (name === "digitalLevel") {
      const digitalLevelMap: { [key: string]: number } = {
        "": 0,
        "1": 1,
        "2": 2,
        "3": 3,
      };
      const numericValue = digitalLevelMap[value] || 0;

      updatedFormData = {
        ...updatedFormData,
        digitalReadiness: {
          ...updatedFormData.digitalReadiness,
          digitalLevel: numericValue,
        },
      };
    } else {
      updatedFormData = {
        ...updatedFormData,
        digitalReadiness: {
          ...updatedFormData.digitalReadiness,
          [name]: value,
        },
      };
    }

    setFormData(updatedFormData);
    localStorage.setItem("formData", JSON.stringify(updatedFormData));

    // Səhvləri real vaxtda yenilə
    setErrors((prev) => ({
      ...prev,
      [name]:
        name === "digitalLevel"
          ? updatedFormData.digitalReadiness.digitalLevel === 0
          : value.trim().length < 3 && name === "companyPurpose"
          ? true
          : false,
    }));

    // Ümumi error mesajını sil
    setErrorMessage("");
  };

  // Checkbox dəyişəndə (digitalTools üçün)
  const handleDigitalToolChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    const updatedDigitalTools = checked
      ? [...formData.digitalReadiness.digitalTools, value]
      : formData.digitalReadiness.digitalTools.filter((tool) => tool !== value);

    const updatedFormData = {
      ...formData,
      digitalReadiness: {
        ...formData.digitalReadiness,
        digitalTools: updatedDigitalTools,
      },
    };

    setFormData(updatedFormData);
    localStorage.setItem("formData", JSON.stringify(updatedFormData));

    setErrors((prev) => ({
      ...prev,
      digitalTools: updatedDigitalTools.length === 0,
    }));

    setErrorMessage("");
  };

  const handleGoBack = () => {
    navigate("/apply/two");
  };

  const handleGoNext = () => {
    if (validateForm()) {
      setErrorMessage("");
      navigate("/apply/four");
    } else {
      setErrorMessage(page.errorMessages.formError[language]);
    }
  };

  useEffect(() => {
    if (errors.digitalLevel || errors.digitalTools || errors.companyPurpose) {
      setErrorMessage(page.errorMessages.formError[language]);
    } else {
      setErrorMessage("");
    }
  }, [language, errors, page.errorMessages.formError]);

  const getDigitalLevelString = (): string => {
    switch (formData.digitalReadiness.digitalLevel) {
      case 1:
        return "1";
      case 2:
        return "2";
      case 3:
        return "3";
      default:
        return "";
    }
  };

  return (
    <>
      <BackgroundVideo />
      <div className="min-h-screen bg-[url('/images/space-background.jpg')] bg-cover bg-center text-white flex flex-col items-center justify-center py-10">
        <ApplySteps step={3} />

        <div className="w-full max-w-4xl mb-8 px-6">
          <div className="text-center text-3xl font-semibold mb-6">
            {page.title[language]}
          </div>

          <form className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-2">
                  {page.digitalLevel[language]}
                </label>
                <select
                  name="digitalLevel"
                  value={getDigitalLevelString()}
                  onChange={handleInputChange}
                  className={`w-full p-2 bg-gray-800 text-white rounded
                    ${
                      errors.digitalLevel
                        ? "border-2 border-red-500"
                        : "border border-gray-700"
                    }`}
                >
                  <option value="">
                    {page.placeholder ? page.placeholder[language] : "Seçin"}
                  </option>
                  <option value="1">
                    {page.digitalLevelOptions.level1[language]}
                  </option>
                  <option value="2">
                    {page.digitalLevelOptions.level2[language]}
                  </option>
                  <option value="3">
                    {page.digitalLevelOptions.level3[language]}
                  </option>
                </select>
                {errors.digitalLevel && (
                  <p className="text-red-500 text-sm mt-1">
                    {page.errorMessages.required[language]}
                  </p>
                )}
              </div>

              <div className="flex-1 relative">
                <label className="block mb-2">
                  {page.digitalTools[language]}
                </label>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full p-2 bg-gray-800 text-white rounded text-left flex justify-between items-center
                    ${
                      errors.digitalTools
                        ? "border-2 border-red-500"
                        : "border border-gray-700"
                    }`}
                >
                  <span>
                    {formData.digitalReadiness.digitalTools.length > 0
                      ? `${formData.digitalReadiness.digitalTools.length} ${page.digitalToolsOptions.selected[language]}`
                      : page.placeholder[language]}
                  </span>
                  <span className="ml-2">
                    {isDropdownOpen ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-800 rounded shadow-lg max-h-48 overflow-auto">
                    {[
                      { value: "crm", label: "CRM" },
                      { value: "erp", label: "ERP" },
                      {
                        value: "accounting",
                        label: page.digitalToolsOptions.accounting[language],
                      },
                      {
                        value: "other",
                        label: page.digitalToolsOptions.other[language],
                      },
                    ].map((tool) => (
                      <label
                        key={tool.value}
                        className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={tool.value}
                          checked={formData.digitalReadiness.digitalTools.includes(
                            tool.value
                          )}
                          onChange={handleDigitalToolChange}
                          className="form-checkbox text-blue-500 rounded"
                        />
                        <span className="ml-2">{tool.label}</span>
                      </label>
                    ))}
                  </div>
                )}
                {errors.digitalTools && (
                  <p className="text-red-500 text-sm mt-1">
                    {page.errorMessages.required[language]}
                  </p>
                )}
              </div>
            </div>

            <div>
              <p className="text-xl mb-2">
                {page.keyChallenges.title[language]}
              </p>
              <div className="grid grid-cols-1 gap-4">
                {[
                  "budget_shortage",
                  "technical_expertise",
                  "training_needs",
                  "digital_strategy",
                  "infrastructure_limits",
                  "other",
                ].map((challenge) => (
                  <label key={challenge} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={challenge}
                      checked={formData.digitalReadiness.keyChallenges.includes(
                        challenge
                      )}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        let updatedKeyChallenges = checked
                          ? [...formData.digitalReadiness.keyChallenges, value]
                          : formData.digitalReadiness.keyChallenges.filter(
                              (c) => c !== value
                            );
                        const updatedFormData = {
                          ...formData,
                          digitalReadiness: {
                            ...formData.digitalReadiness,
                            keyChallenges: updatedKeyChallenges,
                          },
                        };
                        setFormData(updatedFormData);
                        localStorage.setItem(
                          "formData",
                          JSON.stringify(updatedFormData)
                        );
                      }}
                      className="form-checkbox text-blue-500"
                    />
                    <span className="ml-2">
                      {challenge === "budget_shortage" &&
                        page.keyChallenges.budget_shortage[language]}
                      {challenge === "technical_expertise" &&
                        page.keyChallenges.technical_expertise[language]}
                      {challenge === "training_needs" &&
                        page.keyChallenges.training_needs[language]}
                      {challenge === "digital_strategy" &&
                        page.keyChallenges.digital_strategy[language]}
                      {challenge === "infrastructure_limits" &&
                        page.keyChallenges.infrastructure_limits[language]}
                      {challenge === "other" &&
                        page.keyChallenges.other[language]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xl mb-2">
                {page.companyPurpose.title[language]}
              </p>
              <textarea
                name="companyPurpose"
                value={formData.digitalReadiness.companyPurpose}
                onChange={handleInputChange}
                className={`w-full p-4 bg-gray-800 text-white rounded
                  ${
                    errors.companyPurpose
                      ? "border-2 border-red-500"
                      : "border border-gray-700"
                  }`}
                rows={4}
                placeholder={page.companyPurpose.placeholder[language]}
                maxLength={500}
                minLength={3}
              />
              {errors.companyPurpose && (
                <p className="text-red-500 text-sm mt-1">
                  {page.errorMessages.minLength[language]}
                </p>
              )}
            </div>
          </form>

          {/* Ümumi səhv mesajı */}
          {errorMessage && (
            <div className="mt-6 mb-2 text-center text-red-500 font-semibold">
              {errorMessage}
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button
              className="w-[48%] bg-blue-600 hover:bg-blue-700 cursor-pointer text-white py-3 rounded-lg transition duration-300"
              onClick={handleGoBack}
            >
              {buttons.backBtn[language]}
            </button>
            <button
              className="w-[48%] bg-blue-600 cursor-pointer hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
              onClick={handleGoNext}
            >
              {buttons.nextBtn[language]}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyThree;
