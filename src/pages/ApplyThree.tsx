"use client"

import { useNavigate } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import type { ChangeEvent } from "react"
import BackgroundVideo from "../components/BackgroundVideo"
import { FormContext } from "../context/FormContext"
import { useLanguage } from "../context/LanguageContext";
import ApplySteps from "../components/ApplySteps";

const ApplyThree = () => {
  const navigate = useNavigate()
  const context = useContext(FormContext)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { language, pagesTranslations } = useLanguage();
  const page = pagesTranslations.apply3;
  const buttons = pagesTranslations.applyBtns;

  if (!context) {
    throw new Error("ApplyThree must be used within a FormContext.Provider")
  }

  const { formData, setFormData } = context

  // Load data from localStorage when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem("formData")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        // Update context with saved data
        setFormData(parsedData)
      } catch (error) {
        console.error("Error parsing saved form data:", error)
      }
    }
  }, [setFormData])

  // Debug current value of digitalLevel on component mount
  useEffect(() => {
    console.log("Current digitalLevel value:", formData.digitalReadiness.digitalLevel)
    console.log("Current digitalLevel type:", typeof formData.digitalReadiness.digitalLevel)
  }, [formData.digitalReadiness.digitalLevel])

  // Function to save data to localStorage
  const saveToLocalStorage = (updatedData: typeof formData) => {
    localStorage.setItem("formData", JSON.stringify(updatedData))
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    let updatedFormData = { ...formData }

    if (name === "digitalLevel") {
      // Convert digitalLevel to a number (Byte)
      const digitalLevelMap: { [key: string]: number } = {
        "": 0,
        "1": 1, // Make sure to use string keys for string values from the select
        "2": 2,
        "3": 3,
      }

      // Ensure we're setting a number value by using Number()
      const numericValue = digitalLevelMap[value] || 0

      console.log(`Setting digitalLevel to ${numericValue} (${typeof numericValue})`)

      updatedFormData = {
        ...updatedFormData,
        digitalReadiness: {
          ...updatedFormData.digitalReadiness,
          digitalLevel: numericValue,
        },
      }
    } else {
      updatedFormData = {
        ...updatedFormData,
        digitalReadiness: {
          ...updatedFormData.digitalReadiness,
          [name]: value,
        },
      }
    }

    // Update form data in context
    setFormData(updatedFormData)

    // Save to localStorage
    saveToLocalStorage(updatedFormData)
  }

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target

    const updatedFormData = {
      ...formData,
      digitalReadiness: {
        ...formData.digitalReadiness,
        keyChallenges: checked
          ? [...formData.digitalReadiness.keyChallenges, value]
          : formData.digitalReadiness.keyChallenges.filter((challenge) => challenge !== value),
      },
    }

    // Update form data in context
    setFormData(updatedFormData)

    // Save to localStorage
    saveToLocalStorage(updatedFormData)
  }

  const handleDigitalToolChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target

    const updatedFormData = {
      ...formData,
      digitalReadiness: {
        ...formData.digitalReadiness,
        digitalTools: checked
          ? [...formData.digitalReadiness.digitalTools, value]
          : formData.digitalReadiness.digitalTools.filter((tool) => tool !== value),
      },
    }

    // Update form data in context
    setFormData(updatedFormData)

    // Save to localStorage
    saveToLocalStorage(updatedFormData)
  }

  const handleGoBack = () => {
    navigate("/apply/two")
  }

  const handleGoNext = () => {
    // Add validation if needed
    navigate("/apply/four")
  }

  // Convert the numeric digitalLevel back to string for the select input
  const getDigitalLevelString = (): string => {
    const levelValue = formData.digitalReadiness.digitalLevel

    console.log(`Getting digital level string for value: ${levelValue} (${typeof levelValue})`)

    switch (Number(levelValue)) {
      case 1:
        return "1"
      case 2:
        return "2"
      case 3:
        return "3"
      default:
        return ""
    }
  }

  return (
    <>
      <BackgroundVideo />
      <div className="min-h-screen bg-black bg-[url('/images/space-background.jpg')] bg-cover bg-center text-white flex flex-col items-center justify-center py-10">
        <ApplySteps step={3} />

        <div className="w-full max-w-4xl mb-8 px-6">
          <div className="text-center text-3xl font-semibold mb-6">
            {page.title[language]}
          </div>

          {/* Digital Level Debug Info */}
          {/* <div className="mb-4 p-3 bg-blue-900/30 rounded">
            <p className="text-sm">
              Current digitalLevel: {formData.digitalReadiness.digitalLevel}{" "}
              (type: {typeof formData.digitalReadiness.digitalLevel})
            </p>
          </div> */}

          <form className="space-y-6">
            <div className="flex justify-between items-center space-x-4">
              <label className="w-1/3">{page.digitalLevel[language]}</label>
              <select
                name="digitalLevel"
                value={getDigitalLevelString()}
                onChange={handleInputChange}
                className="w-2/3 p-2 bg-gray-800 text-white rounded"
              >
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
            </div>

            <div className="flex justify-between items-center space-x-4">
              <label className="w-1/3">{page.digitalTools[language]}</label>
              <div className="w-2/3 relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full p-2 bg-gray-800 text-white rounded text-left flex justify-between items-center"
                >
                  <span>
                    {formData.digitalReadiness.digitalTools.length > 0
                      ? `${formData.digitalReadiness.digitalTools.length} ${page.digitalToolsOptions.selected[language]}`
                      : page.placeholder[language]}
                  </span>
                  <span className="ml-2">▼</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-800 rounded shadow-lg">
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
                      <label key={tool.value} className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          value={tool.value}
                          checked={formData.digitalReadiness.digitalTools.includes(tool.value)}
                          onChange={handleDigitalToolChange}
                          className="form-checkbox text-blue-500 rounded"
                        />
                        <span className="ml-2">{tool.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xl">{page.keyChallenges.title[language]}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      checked={formData.digitalReadiness.keyChallenges.includes(challenge)}
                      onChange={handleCheckboxChange}
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

            <div className="space-y-2">
              <p className="text-xl">{page.companyPurpose.title[language]}</p>
              <textarea
                name="companyPurpose"
                value={formData.digitalReadiness.companyPurpose}
                onChange={handleInputChange}
                className="w-full p-4 bg-gray-800 text-white rounded"
                rows={4}
                placeholder={page.companyPurpose.placeholder[language]}
                maxLength={500}
                minLength={3}
              />
            </div>
          </form>

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
  )
}

export default ApplyThree
