"use client";

import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundVideo from "../components/BackgroundVideo";
import { FormContext } from "../context/FormContext";
import { useLanguage } from "../context/LanguageContext";
import ApplySteps from "../components/ApplySteps";

export default function ApplyFour() {
  const navigate = useNavigate();
  const context = useContext(FormContext);
  const { language, pagesTranslations } = useLanguage();
  const page = pagesTranslations.apply4;
  const buttons = pagesTranslations.applyBtns;

  if (!context) {
    throw new Error("ApplyFour must be used within a FormContext.Provider");
  }

  const { formData, setFormData } = context;

  // Initialize local form state from context or localStorage
  const [localFormData, setLocalFormData] = useState({
    digitalTeamOrLead: formData.digitalLeadership.digitalTeamOrLead
      ? "Bəli"
      : "Xeyr",
    digitalPath: formData.digitalLeadership.digitalPath ? "Bəli" : "Xeyr",
    digitalTransformationLoyality: formData.digitalLeadership
      .digitalTransformationLoyality
      ? "Bəli"
      : "Xeyr",
    financialNeed: formData.financialNeeding.financialNeed ? "Bəli" : "Xeyr",
    neededBudget: formData.financialNeeding.neededBudget,
  });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formDataFour') || '{}');
    
    // Initialize form data from localStorage if available
    if (savedData) {
      setLocalFormData((prevState) => ({
        ...prevState,
        digitalTeamOrLead: savedData.digitalTeamOrLead || prevState.digitalTeamOrLead,
        digitalPath: savedData.digitalPath || prevState.digitalPath,
        digitalTransformationLoyality: savedData.digitalTransformationLoyality || prevState.digitalTransformationLoyality,
        financialNeed: savedData.financialNeed || prevState.financialNeed,
        neededBudget: savedData.neededBudget || prevState.neededBudget,
      }));
    }
  }, []);

  useEffect(() => {
    // Save form data to localStorage whenever it changes
    localStorage.setItem('formDataFour', JSON.stringify(localFormData));
  }, [localFormData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLocalFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Update the global form context based on the input name
    if (
      name === "digitalTeamOrLead" ||
      name === "digitalPath" ||
      name === "digitalTransformationLoyality"
    ) {
      setFormData((prev) => ({
        ...prev,
        digitalLeadership: {
          ...prev.digitalLeadership,
          [name]: value === "Bəli", // Convert to boolean
        },
      }));
    } else if (name === "financialNeed") {
      setFormData((prev) => ({
        ...prev,
        financialNeeding: {
          ...prev.financialNeeding,
          financialNeed: value === "Bəli", // Convert to boolean
        },
      }));
    } else if (name === "neededBudget") {
      setFormData((prev) => ({
        ...prev,
        financialNeeding: {
          ...prev.financialNeeding,
          neededBudget: value,
        },
      }));
    }
  };

  // Geri butonuna basıldığında ApplyThree sayfasına git
  const handleGoBack = () => {
    navigate("/apply/three");
  };

  // Növbəti butonuna basıldığında ApplyFive səhifəsinə keçid
  const handleNext = () => {
    navigate("/apply/five");
  };

  return (
    <>
      <BackgroundVideo />
      <div className="min-h-screen w-full bg-[url('/images/space-background.jpg')] bg-cover bg-center bg-no-repeat text-white flex flex-col items-center justify-center py-0">
        {/* Progress Steps */}
        <ApplySteps step={4} />

        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-medium">
            Liderlik və öhdəliklər
          </h1>
        </div>

        <div className="w-full max-w-2xl space-y-4">
          {/* Digital Transformation Leader */}
          <div className="space-y-1">
            <label className="text-sm">
              {page.digitalTransformationLeader[language]}
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="digitalTeamOrLead"
                  value="Bəli"
                  checked={localFormData.digitalTeamOrLead === "Bəli"}
                  onChange={handleInputChange}
                  className="text-blue-500"
                />
                <label className="text-sm">
                  {page.optionLabels.yes[language]}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="digitalTeamOrLead"
                  value="Xeyr"
                  checked={localFormData.digitalTeamOrLead === "Xeyr"}
                  onChange={handleInputChange}
                  className="text-blue-500"
                />
                <label className="text-sm">
                  {page.optionLabels.no[language]}
                </label>
              </div>
            </div>
          </div>

          {/* Strategy and Roadmap */}
          <div className="space-y-1">
            <label className="text-sm">{page.hasStrategy[language]}</label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="digitalPath"
                  value="Bəli"
                  checked={localFormData.digitalPath === "Bəli"}
                  onChange={handleInputChange}
                  className="text-blue-500"
                />
                <label className="text-sm">
                  {page.optionLabels.yes[language]}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="digitalPath"
                  value="Xeyr"
                  checked={localFormData.digitalPath === "Xeyr"}
                  onChange={handleInputChange}
                  className="text-blue-500"
                />
                <label className="text-sm">
                  {page.optionLabels.no[language]}
                </label>
              </div>
            </div>
          </div>

          {/* High-Level Management Support */}
          <div className="space-y-1">
            <label className="text-sm">
              {page.highLevelManagementSupport[language]}
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="digitalTransformationLoyality"
                  value="Bəli"
                  checked={localFormData.digitalTransformationLoyality === "Bəli"}
                  onChange={handleInputChange}
                  className="text-blue-500"
                />
                <label className="text-sm">
                  {page.optionLabels.yes[language]}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="digitalTransformationLoyality"
                  value="Xeyr"
                  checked={localFormData.digitalTransformationLoyality === "Xeyr"}
                  onChange={handleInputChange}
                  className="text-blue-500"
                />
                <label className="text-sm">
                  {page.optionLabels.no[language]}
                </label>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-medium">
              {page.financialNeeds.title[language]}
            </h1>
          </div>

          {/* Financial Needs */}
          <div className="space-y-1">
            <label className="text-sm">
              {page.financialNeeds.question[language]}
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="financialNeed"
                  value="Bəli"
                  checked={localFormData.financialNeed === "Bəli"}
                  onChange={handleInputChange}
                  className="text-blue-500"
                />
                <label className="text-sm">
                  {page.optionLabels.yes[language]}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="financialNeed"
                  value="Xeyr"
                  checked={localFormData.financialNeed === "Xeyr"}
                  onChange={handleInputChange}
                  className="text-blue-500"
                />
                <label className="text-sm">
                  {page.optionLabels.no[language]}
                </label>
              </div>
            </div>
          </div>

          {/* Transformation Budget */}
          <div className="space-y-1">
            <label className="text-sm">
              {page.transformationBudget[language]}
            </label>
            <input
              type="number"
              name="neededBudget"
              value={localFormData.neededBudget}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-700 rounded p-2 focus:outline-none focus:border-blue-500"
              placeholder="AZN"
            />
          </div>

          {/* Geri və Növbəti Butonları */}
          <div className="flex justify-between mt-6">
            <button
              className="w-[48%] cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition duration-200"
              onClick={handleGoBack}
            >
              {buttons.backBtn[language]}
            </button>
            <button
              className="w-[48%] cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition duration-200"
              onClick={handleNext}
            >
              {buttons.nextBtn[language]}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
