"use client"

import React, { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BackgroundVideo from "../components/BackgroundVideo"
import { FormContext } from "../context/FormContext"
import { useLanguage } from "../context/LanguageContext"
import ApplySteps from "../components/ApplySteps"

export default function ApplyFour() {
  const navigate = useNavigate()
  const context = useContext(FormContext)
  const { language, pagesTranslations } = useLanguage()
  const page = pagesTranslations.apply4
  const buttons = pagesTranslations.applyBtns

  if (!context) {
    throw new Error("ApplyFour must be used within a FormContext.Provider")
  }

  const { formData, setFormData } = context

  

  // Lokal form state
  const [localFormData, setLocalFormData] = useState({
    digitalTeamOrLead: formData.digitalLeadership.digitalTeamOrLead ? "Bəli" : "Xeyr",
    digitalPath: formData.digitalLeadership.digitalPath ? "Bəli" : "Xeyr",
    digitalTransformationLoyality: formData.digitalLeadership.digitalTransformationLoyality ? "Bəli" : "Xeyr",
    financialNeed: formData.financialNeeding.financialNeed ? "Bəli" : "Xeyr",
    neededBudget: formData.financialNeeding.neededBudget || "",
  })

  

  // Validation səhvləri
  const [errors, setErrors] = useState({
    digitalTeamOrLead: false,
    digitalPath: false,
    digitalTransformationLoyality: false,
    financialNeed: false,
    neededBudget: false,
  })

  // Validation mesajını göstərmək üçün state
  const [showValidationMessage, setShowValidationMessage] = useState(false)

  // LocalStorage-dan data yükləmək (varsa)
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formDataFour") || "{}")
    if (savedData) {
      setLocalFormData((prev) => ({
        ...prev,
        digitalTeamOrLead: savedData.digitalTeamOrLead || prev.digitalTeamOrLead,
        digitalPath: savedData.digitalPath || prev.digitalPath,
        digitalTransformationLoyality: savedData.digitalTransformationLoyality || prev.digitalTransformationLoyality,
        financialNeed: savedData.financialNeed || prev.financialNeed,
        neededBudget: savedData.neededBudget || prev.neededBudget,
      }))
    }
  }, [])

  // LocalStorage-a data yadda saxlamaq
  useEffect(() => {
    localStorage.setItem("formDataFour", JSON.stringify(localFormData))
  }, [localFormData])

  // Input dəyişdikdə local state və global konteksti yenilə
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setLocalFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: false,
    }))

    if (showValidationMessage) setShowValidationMessage(false)

    // Global konteksti də yenilə
    if (
      name === "digitalTeamOrLead" ||
      name === "digitalPath" ||
      name === "digitalTransformationLoyality"
    ) {
      setFormData((prev) => ({
        ...prev,
        digitalLeadership: {
          ...prev.digitalLeadership,
          [name]: value === "Bəli",
        },
      }))
    } else if (name === "financialNeed") {
      setFormData((prev) => ({
        ...prev,
        financialNeeding: {
          ...prev.financialNeeding,
          financialNeed: value === "Bəli",
        },
      }))
    } else if (name === "neededBudget") {
      setFormData((prev) => ({
        ...prev,
        financialNeeding: {
          ...prev.financialNeeding,
          neededBudget: value,
        },
      }))
    }
  }

  // Formu validasiya et
  const validateForm = () => {
    const newErrors = {
      digitalTeamOrLead: !localFormData.digitalTeamOrLead || localFormData.digitalTeamOrLead === "",
      digitalPath: !localFormData.digitalPath || localFormData.digitalPath === "",
      digitalTransformationLoyality:
        !localFormData.digitalTransformationLoyality || localFormData.digitalTransformationLoyality === "",
      financialNeed: !localFormData.financialNeed || localFormData.financialNeed === "",
      neededBudget:
        localFormData.financialNeed === "Bəli" &&
        (!localFormData.neededBudget || localFormData.neededBudget.trim() === ""),
    }
    setErrors(newErrors)

    // Əgər səhv varsa false qaytar, yoxsa true
    return !Object.values(newErrors).some(Boolean)
  }

  const handleGoBack = () => {
    navigate("/apply/three")
  }

  const handleNext = () => {
    if (validateForm()) {
      navigate("/apply/five")
    } else {
      setShowValidationMessage(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <>
      <BackgroundVideo />
      <div className="min-h-screen py-9 w-full bg-[url('/images/space-background.jpg')] bg-cover bg-center bg-no-repeat text-white flex flex-col items-center justify-center py-0">
        <ApplySteps step={4} />

        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-medium">Liderlik və öhdəliklər</h1>
        </div>

        {showValidationMessage && (
          <div className="w-full max-w-2xl mb-4 p-4 bg-red-500/20 border-2 border-red-500 rounded-md text-red-500 text-center font-medium">
            Zəhmət olmasa bütün məcburi xanaları doldurun!
          </div>
        )}

        <div className="w-full max-w-2xl space-y-6 text-white">
          {/* Leadership */}
          <div className="space-y-6">
            {/* Digital Team or Lead */}
            <div className="space-y-2">
              <label className="text-sm md:text-base">{page.digitalTransformationLeader[language]}</label>
              <div className="flex items-center space-x-8">
                {["Bəli", "Xeyr"].map((option) => (
                  <label
                    key={option}
                    className={`flex items-center cursor-pointer space-x-2 ${
                      errors.digitalTeamOrLead ? "text-red-400" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="digitalTeamOrLead"
                      value={option}
                      checked={localFormData.digitalTeamOrLead === option}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span
                      className={`w-5 h-5 flex items-center justify-center rounded-full border-2 transition-colors ${
                        localFormData.digitalTeamOrLead === option
                          ? "bg-blue-600 border-blue-600"
                          : errors.digitalTeamOrLead
                          ? "bg-white border-red-400"
                          : "bg-white border-gray-400"
                      } hover:border-blue-600`}
                    >
                      {localFormData.digitalTeamOrLead === option && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3.5 h-3.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span className="text-sm">{page.optionLabels[option === "Bəli" ? "yes" : "no"][language]}</span>
                  </label>
                ))}
              </div>
              {errors.digitalTeamOrLead && (
                <p className="text-red-500 font-medium text-sm mt-1">Bu xananı doldurmaq məcburidir!</p>
              )}
            </div>

            {/* Digital Path */}
            <div className="space-y-2">
              <label className="text-sm md:text-base">{page.hasStrategy[language]}</label>
              <div className="flex items-center space-x-8">
                {["Bəli", "Xeyr"].map((option) => (
                  <label
                    key={option}
                    className={`flex items-center cursor-pointer space-x-2 ${
                      errors.digitalPath ? "text-red-400" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="digitalPath"
                      value={option}
                      checked={localFormData.digitalPath === option}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span
                      className={`w-5 h-5 flex items-center justify-center rounded-full border-2 transition-colors ${
                        localFormData.digitalPath === option
                          ? "bg-blue-600 border-blue-600"
                          : errors.digitalPath
                          ? "bg-white border-red-400"
                          : "bg-white border-gray-400"
                      } hover:border-blue-600`}
                    >
                      {localFormData.digitalPath === option && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3.5 h-3.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span className="text-sm">{page.optionLabels[option === "Bəli" ? "yes" : "no"][language]}</span>
                  </label>
                ))}
              </div>
              {errors.digitalPath && (
                <p className="text-red-500 font-medium text-sm mt-1">Bu xananı doldurmaq məcburidir!</p>
              )}
            </div>

            {/* Digital Transformation Loyalty */}
            <div className="space-y-2">
              <label className="text-sm md:text-base">{page.highLevelManagementSupport[language]}</label>
              <div className="flex items-center space-x-8">
                {["Bəli", "Xeyr"].map((option) => (
                  <label
                    key={option}
                    className={`flex items-center cursor-pointer space-x-2 ${
                      errors.digitalTransformationLoyality ? "text-red-400" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="digitalTransformationLoyality"
                      value={option}
                      checked={localFormData.digitalTransformationLoyality === option}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span
                      className={`w-5 h-5 flex items-center justify-center rounded-full border-2 transition-colors ${
                        localFormData.digitalTransformationLoyality === option
                          ? "bg-blue-600 border-blue-600"
                          : errors.digitalTransformationLoyality
                          ? "bg-white border-red-400"
                          : "bg-white border-gray-400"
                      } hover:border-blue-600`}
                    >
                      {localFormData.digitalTransformationLoyality === option && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3.5 h-3.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span className="text-sm">{page.optionLabels[option === "Bəli" ? "yes" : "no"][language]}</span>
                  </label>
                ))}
              </div>
              {errors.digitalTransformationLoyality && (
                <p className="text-red-500 font-medium text-sm mt-1">Bu xananı doldurmaq məcburidir!</p>
              )}
            </div>
          </div>

          {/* Financial Section */}
          <div className="pt-6 border-t border-gray-700/30">
            <h2 className="text-xl md:text-2xl font-medium mb-6 text-center">Maliyyə ehtiyacları</h2>

         

            {/* Financial Need */}
            <div className="space-y-2 mb-6">
              <label className="text-sm md:text-base">{page.financialNeeds.question[language]}</label>
              <div className="flex items-center space-x-8">
                {["Bəli", "Xeyr"].map((option) => (
                  <label
                    key={option}
                    className={`flex items-center cursor-pointer space-x-2 ${
                      errors.financialNeed ? "text-red-400" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="financialNeed"
                      value={option}
                      checked={localFormData.financialNeed === option}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span
                      className={`w-5 h-5 flex items-center justify-center rounded-full border-2 transition-colors ${
                        localFormData.financialNeed === option
                          ? "bg-blue-600 border-blue-600"
                          : errors.financialNeed
                          ? "bg-white border-red-400"
                          : "bg-white border-gray-400"
                      } hover:border-blue-600`}
                    >
                      {localFormData.financialNeed === option && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3.5 h-3.5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span className="text-sm">{page.optionLabels[option === "Bəli" ? "yes" : "no"][language]}</span>
                  </label>
                ))}
              </div>
              {errors.financialNeed && (
                <p className="text-red-500 font-medium text-sm mt-1">Bu xananı doldurmaq məcburidir!</p>
              )}
            </div>
                {/* Transformation Budget */}
<div className="mb-4">
  <label
    htmlFor="neededBudget"
    className="block mb-1 text-sm md:text-base font-semibold text-gray-200"
  >
    {page.transformationBudget[language]}
  </label>
  <div className="relative">
    <input
      id="neededBudget"
      type="number"
      name="neededBudget"
      value={localFormData.neededBudget}
      onChange={handleInputChange}
      placeholder="AZN"
      min={0}
      className={`w-full rounded border px-3 py-2 pr-12 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition
        ${
          errors.neededBudget
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-600 focus:ring-blue-500"
        }`}
    />
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 select-none pointer-events-none">
      AZN
    </span>
  </div>
  {errors.neededBudget && (
    <p className="mt-1 text-sm font-medium text-red-500">{errors.neededBudget}</p>
  )}
</div>




            {/* Needed Budget */}
            {localFormData.financialNeed === "Bəli" && (
              <div className="space-y-2">
                <label className="text-sm md:text-base">{page.transformationBudget[language]}</label>
                <div className="relative">
                  <input
                    type="number"
                    name="neededBudget"
                    value={localFormData.neededBudget}
                    onChange={handleInputChange}
                    className={`w-full bg-transparent border ${
                      errors.neededBudget ? "border-red-400" : "border-gray-700"
                    } rounded p-3 focus:outline-none focus:border-blue-500`}
                    placeholder="AZN"
                    min={0}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">AZN</div>
                </div>
                {errors.neededBudget && (
                  <p className="text-red-500 font-medium text-sm mt-1">
                    Maliyyə dəstəyi lazımdırsa, büdcə məbləğini qeyd edin!
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-8">
            <button
              className="w-[48%] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition duration-200"
              onClick={handleGoBack}
              type="button"
            >
              {buttons.backBtn[language]}
            </button>
            <button
              className="w-[48%] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition duration-200"
              onClick={handleNext}
              type="button"
            >
              {buttons.nextBtn[language]}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
