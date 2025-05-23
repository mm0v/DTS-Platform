"use client";

import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundVideo from "../components/BackgroundVideo";
import { FormContext } from "../context/FormContext";
import { useLanguage } from "../context/LanguageContext";
import ApplySteps from "../components/ApplySteps";

interface DigitalAndFinancial {
  digital: DigitalLeadership;
  finance: FinancialNeeding;
}
interface DigitalLeadership {
  digitalTeamOrLead: boolean;
  digitalPath: boolean;
  digitalTransformationLoyality: boolean;
}
interface FinancialNeeding {
  financialNeed: boolean;
  neededBudget: number;
}

export default function ApplyFour() {
  const navigate = useNavigate();
  const context = useContext(FormContext);
  const { language, pagesTranslations } = useLanguage();
  const page = pagesTranslations.apply4;
  const buttons = pagesTranslations.applyBtns;

  if (!context) {
    throw new Error("ApplyFour must be used within a FormContext.Provider");
  }

  const initialValue: DigitalAndFinancial = {
    digital: {
      digitalTeamOrLead: false,
      digitalPath: false,
      digitalTransformationLoyality: false,
    },
    finance: {
      financialNeed: false,
      neededBudget: 0,
    },
  };
  const [formData, setFormData] = useState<DigitalAndFinancial>(initialValue);

  useEffect(() => {
    const savedData = JSON.parse(
      localStorage.getItem("digitalAndFinancial") || "null"
    );

    if (savedData) {
      try {
        setFormData(savedData);
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }
  }, []);

  type ErrorsType = {
    digital?: {
      digitalTeamOrLead?: string;
      digitalPath?: string;
      digitalTransformationLoyality?: string;
    };
    finance?: {
      financialNeed?: string;
      neededBudget?: string;
    };
  };

  const [errors, setErrors] = useState<ErrorsType>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const digitalVariables: string[] = [
      "digitalTeamOrLead",
      "digitalPath",
      "digitalTransformationLoyality",
    ];
    const financeVariables: string[] = ["financialNeed", "neededBudget"];
    let parentName = "";

    let updatedValue;
    updatedValue =
      name !== "neededBudget"
        ? (updatedValue = value === "Bəli" ? true : false)
        : value;

    if (digitalVariables.includes(name)) {
      parentName = "digital";
    }

    if (financeVariables.includes(name)) {
      parentName = "finance";
    }

    const updatedData = {
      ...formData,
      [parentName]: {
        ...(formData[parentName as keyof DigitalAndFinancial] as object),
        [name]: updatedValue,
      },
    };
    setFormData(updatedData);
    localStorage.setItem("digitalAndFinancial", JSON.stringify(updatedData));
    setErrors((prev) => ({
      ...prev,
      [parentName]: {
        ...((prev[parentName as keyof ErrorsType] || {})),
        [name]: false,
      },
    }));
  };

  const validateForm = (): boolean => {
    const errors: ErrorsType = {};

    if (formData.finance.financialNeed === undefined || formData.finance.financialNeed === null) {
      errors.finance = {
        ...errors.finance,
        financialNeed: page.errorMessages.requiredField[language],
      };
    }

    if (
      formData.finance.financialNeed === true &&
      (formData.finance.neededBudget.toString() === "0" ||
        formData.finance.neededBudget.toString() === "")
    ) {
      errors.finance = {
        ...errors.finance,
        neededBudget: page.errorMessages.requiredField[language],
      };
    }

    if (formData.digital.digitalTeamOrLead === null) {
      errors.digital = {
        ...errors.digital,
        digitalTeamOrLead: page.errorMessages.requiredField[language],
      };
    }

    if (formData.digital.digitalPath === null) {
      errors.digital = {
        ...errors.digital,
        digitalPath: page.errorMessages.requiredField[language],
      };
    }

    if (formData.digital.digitalTransformationLoyality === null) {
      errors.digital = {
        ...errors.digital,
        digitalTransformationLoyality:
          page.errorMessages.requiredField[language],
      };
    }
    setErrors(errors);
    return errors.finance === undefined;
  };

  const handleGoBack = () => {
    navigate("/apply/three");
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate("/apply/five");
    }
  };

  return (
    <>
      <BackgroundVideo />
      <div className="min-h-screen py-9 w-full bg-[url('/images/space-background.jpg')] bg-cover bg-center bg-no-repeat text-white flex flex-col items-center justify-center">
        <ApplySteps step={4} />

        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-medium">
            {page.title[language]}
          </h1>
        </div>

        <div className="w-full max-w-2xl space-y-6 text-white">
          {/* Leadership */}
          <div className="space-y-6">
            {/* Digital Team or Lead */}
            <div className="space-y-2">
              <label className="text-sm md:text-base">
                {page.digitalTransformationLeader[language]}
              </label>
              <div className="flex items-center space-x-4">
                {["Bəli", "Xeyr"].map((option) => (
                  <label
                    key={option}
                    className={`flex items-center space-x-2 cursor-pointer`}
                  >
                    <input
                      type="radio"
                      name="digitalTeamOrLead"
                      value={option}
                      checked={
                        formData.digital.digitalTeamOrLead ===
                        (option === "Bəli" ? true : false)
                      }
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span className="w-5 h-5 flex items-center justify-center border border-gray-400 rounded">
                      {formData.digital.digitalTeamOrLead ===
                        (option === "Bəli" ? true : false) && (
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
                    <span className="text-sm">
                      {
                        page.optionLabels[option === "Bəli" ? "yes" : "no"][
                          language
                        ]
                      }
                    </span>
                  </label>
                ))}
              </div>
              {errors.digital?.digitalTeamOrLead && (
                <p className="text-red-500 font-medium text-sm mt-1">
                  {page.errorMessages.requiredField[language]}
                </p>
              )}
            </div>

            {/* Digital Path */}
            <div className="space-y-2">
              <label className="text-sm md:text-base">
                {page.hasStrategy[language]}
              </label>
              <div className="flex items-center space-x-4">
                {["Bəli", "Xeyr"].map((option) => (
                  <label
                    key={option}
                    className={`flex items-center cursor-pointer space-x-2 ${
                      errors.digital?.digitalPath ? "text-red-400" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="digitalPath"
                      value={option}
                      checked={
                        (formData.digital.digitalPath === true
                          ? "Bəli"
                          : "Xeyr") === option
                      }
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span className="w-5 h-5 flex items-center justify-center border border-gray-400 rounded">
                      {(formData.digital.digitalPath === true
                        ? "Bəli"
                        : "Xeyr") === option && (
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
                    <span className="text-sm">
                      {
                        page.optionLabels[option === "Bəli" ? "yes" : "no"][
                          language
                        ]
                      }
                    </span>
                  </label>
                ))}
              </div>

              {errors.digital?.digitalPath && (
                <p className="text-red-500 font-medium text-sm mt-1">
                  {page.errorMessages.requiredField[language]}
                </p>
              )}
            </div>

            {/* Digital Transformation Loyalty */}
            <div className="space-y-2">
              <label className="text-sm md:text-base">
                {page.highLevelManagementSupport[language]}
              </label>
              <div className="flex items-center space-x-4">
                {["Bəli", "Xeyr"].map((option) => (
                  <label
                    key={option}
                    className={`flex items-center cursor-pointer space-x-2 ${
                      errors.digital?.digitalTransformationLoyality
                        ? "text-red-400"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="digitalTransformationLoyality"
                      value={option}
                      checked={
                        (formData.digital.digitalTransformationLoyality === true
                          ? "Bəli"
                          : "Xeyr") === option
                      }
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span className="w-5 h-5 flex items-center justify-center border border-gray-400 rounded">
                      {(formData.digital.digitalTransformationLoyality === true
                        ? "Bəli"
                        : "Xeyr") === option && (
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
                    <span className="text-sm">
                      {
                        page.optionLabels[option === "Bəli" ? "yes" : "no"][
                          language
                        ]
                      }
                    </span>
                  </label>
                ))}
              </div>

              {errors.digital?.digitalTransformationLoyality && (
                <p className="text-red-500 font-medium text-sm mt-1">
                  {page.errorMessages.requiredField[language]}
                </p>
              )}
            </div>
          </div>

          {/* Financial Section */}
          <div className="pt-6 border-t border-gray-700/30">
            <h2 className="text-xl md:text-2xl font-medium mb-6 text-center">
              {page.financialNeeds.title[language]}
            </h2>

            {/* Financial Need */}
            <div className="space-y-2 mb-6">
              <label className="text-sm md:text-base">
                {page.financialNeeds.question[language]}
              </label>
              <div className="flex items-center space-x-4">
                {["Bəli", "Xeyr"].map((option) => (
                  <label
                    key={option}
                    className={`flex items-center cursor-pointer space-x-2 ${
                      errors.finance?.financialNeed ? "text-red-400" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="financialNeed"
                      value={option}
                      checked={
                        (formData.finance.financialNeed === true
                          ? "Bəli"
                          : "Xeyr") === option
                      }
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span className="w-5 h-5 flex items-center justify-center border border-gray-400 rounded">
                      {(formData.finance.financialNeed === true
                        ? "Bəli"
                        : "Xeyr") === option && (
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
                    <span className="text-sm">
                      {
                        page.optionLabels[option === "Bəli" ? "yes" : "no"][
                          language
                        ]
                      }
                    </span>
                  </label>
                ))}
              </div>

              {errors.finance?.financialNeed && (
                <p className="text-red-500 font-medium text-sm mt-1">
                  {page.errorMessages.requiredField[language]}
                </p>
              )}
            </div>

            {/* Needed Budget - Show when financialNeed is "Bəli" */}
            {formData.finance.financialNeed === true && (
              <div className="space-y-2">
                <label className="text-sm md:text-base">
                  {page.transformationBudget[language]}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="neededBudget"
                    value={formData.finance.neededBudget}
                    onChange={handleInputChange}
                    className={`w-full bg-transparent border ${
                      errors.finance?.neededBudget
                        ? "border-red-400"
                        : "border-gray-700"
                    } rounded p-3 focus:outline-none focus:border-blue-500`}
                    placeholder="AZN"
                    min={0}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    AZN
                  </div>
                </div>
                {errors.finance?.neededBudget && (
                  <p className="text-red-500 font-medium text-sm mt-1">
                    {page.errorMessages.budgetRequired[language]}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-8">
            <button
              className="w-[48%] cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition duration-200"
              onClick={handleGoBack}
              type="button"
            >
              {buttons.backBtn[language]}
            </button>
            <button
              className="w-[48%] cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition duration-200"
              onClick={handleNext}
              type="button"
            >
              {buttons.nextBtn[language]}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
