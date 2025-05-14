"use client"

import React, { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import BackgroundVideo from "../components/BackgroundVideo"
import { FormContext } from "../context/FormContext"
import { useLanguage } from "../context/LanguageContext"
import ApplySteps from "../components/ApplySteps"
import Select from "react-select"
import countryList from "react-select-country-list"

// Tip tərifləri
interface PropertyLaw {
  exportBazaar: string[]
  businessOperations: string
  companyLawType: string
  products: string
  exportActivity: boolean
}

interface FormData {
  propertyLaw: PropertyLaw
  // başqa sahələriniz varsa onları əlavə edin
}

export default function ApplyTwo() {
  const navigate = useNavigate()
  const context = useContext(FormContext)
  const { language, pagesTranslations } = useLanguage()
  const page = pagesTranslations.apply2
  const buttons = pagesTranslations.applyBtns

  if (!context) {
    throw new Error("ApplyTwo must be used within a FormContext.Provider")
  }

  // formData tipini PropertyLaw tipinə uyğun təyin edirik
  const { formData, setFormData } = context as unknown as {
    formData: FormData
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
  }

  const options = countryList().getData()

  // Başlanğıc exportMarkets massiv kimi olmalıdır
  const initialExportMarkets: string[] = Array.isArray(formData.propertyLaw.exportBazaar)
    ? formData.propertyLaw.exportBazaar
    : formData.propertyLaw.exportBazaar
    ? [formData.propertyLaw.exportBazaar]
    : []

  const [localFormData, setLocalFormData] = useState({
    companyType: formData.propertyLaw.companyLawType || "",
    businessIndustry: formData.propertyLaw.businessOperations || "",
    mainProducts: formData.propertyLaw.products || "",
    exportActivity: formData.propertyLaw.exportActivity ? "Bəli" : "Xeyr",
    exportMarkets: initialExportMarkets, // massiv
    document: "",
  })

  useEffect(() => {
    const updatedExportMarkets: string[] = Array.isArray(formData.propertyLaw.exportBazaar)
      ? formData.propertyLaw.exportBazaar
      : formData.propertyLaw.exportBazaar
      ? [formData.propertyLaw.exportBazaar]
      : []

    setLocalFormData({
      companyType: formData.propertyLaw.companyLawType || "",
      businessIndustry: formData.propertyLaw.businessOperations || "",
      mainProducts: formData.propertyLaw.products || "",
      exportActivity: formData.propertyLaw.exportActivity ? "Bəli" : "Xeyr",
      exportMarkets: updatedExportMarkets,
      document: "",
    })
  }, [formData])

  useEffect(() => {
    const savedData = localStorage.getItem("formData")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as FormData
        setFormData(parsedData)

        const savedExportMarkets: string[] = Array.isArray(parsedData.propertyLaw?.exportBazaar)
          ? parsedData.propertyLaw.exportBazaar
          : parsedData.propertyLaw?.exportBazaar
          ? [parsedData.propertyLaw.exportBazaar]
          : []

        setLocalFormData({
          companyType: parsedData.propertyLaw?.companyLawType || "",
          businessIndustry: parsedData.propertyLaw?.businessOperations || "",
          mainProducts: parsedData.propertyLaw?.products || "",
          exportActivity: parsedData.propertyLaw?.exportActivity ? "Bəli" : "Xeyr",
          exportMarkets: savedExportMarkets,
          document: "",
        })
      } catch (error) {
        console.error("Error parsing saved form data:", error)
      }
    }
  }, [setFormData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setLocalFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    let updatedFormData = { ...formData }

    switch (name) {
      case "companyType":
        updatedFormData.propertyLaw.companyLawType = value
        break
      case "businessIndustry":
        updatedFormData.propertyLaw.businessOperations = value
        break
      case "mainProducts":
        updatedFormData.propertyLaw.products = value
        break
      case "exportActivity":
        updatedFormData.propertyLaw.exportActivity = value === "Bəli"
        break
      case "document":
        break
      default:
        break
    }

    setFormData(updatedFormData)
    localStorage.setItem("formData", JSON.stringify(updatedFormData))
  }

  // Multi-select üçün handler
  const handleCountryChange = (selectedOptions: any) => {
    let countries: string[] = []
    if (Array.isArray(selectedOptions)) {
      countries = selectedOptions.map((option) => option.label)
    }

    setLocalFormData((prev) => ({
      ...prev,
      exportMarkets: countries,
    }))

    const updatedFormData = {
      ...formData,
      propertyLaw: {
        ...formData.propertyLaw,
        exportBazaar: countries,
      },
    }

    setFormData(updatedFormData)
    localStorage.setItem("formData", JSON.stringify(updatedFormData))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLocalFormData((prev) => ({
        ...prev,
        document: file.name,
      }))
    }
  }

  const handleGoBack = () => navigate("/apply")
  const handleGoNext = () => navigate("/apply/three")

  const selectedOptions = options.filter((option) =>
    localFormData.exportMarkets.includes(option.label)
  )

  return (
    <>
      <BackgroundVideo />
      <div className="relative min-h-screen w-full bg-[url('/images/space-background.jpg')] bg-cover bg-center bg-no-repeat text-white flex flex-col items-center justify-center py-4 sm:py-6 md:py-10 px-2 sm:px-4">
        <ApplySteps step={2} />

        <div className="text-center mb-8 relative z-20">
          <h1 className="text-2xl md:text-3xl font-medium">{page.title[language]}</h1>
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
              className="w-full bg-transparent border border-gray-700 rounded-lg p-2 sm:p-3 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {/* Business Industry */}
          <label className="text-sm">{page.businessIndustry.label[language]}</label>
          <select
            name="businessIndustry"
            value={localFormData.businessIndustry}
            onChange={handleInputChange}
            className="w-full bg-[#131021] border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            <option className="text-white" value="">
              {page.businessIndustry.placeholder[language]}
            </option>
            <option className="text-white" value="Təmsil etdiyimiz sənayə sektoru">
              {page.businessIndustry.options.representedIndustry[language]}
            </option>
            <option className="text-white" value="Qida və içkilər">
              {page.businessIndustry.options.foodAndBeverages[language]}
            </option>
            <option className="text-white" value="Neft - qaz">
              {page.businessIndustry.options.oilAndGas[language]}
            </option>
            <option className="text-white" value="Kimya">
              {page.businessIndustry.options.chemical[language]}
            </option>
            <option className="text-white" value="Metallurgiya">
              {page.businessIndustry.options.metallurgy[language]}
            </option>
            <option className="text-white" value="Maşın və avadanlıqların təmiri və quraşdırılması">
              {page.businessIndustry.options.machineRepairAndInstallation[language]}
            </option>
            <option className="text-white" value="Kauçuk və plastik məhsullar">
              {page.businessIndustry.options.rubberAndPlasticProducts[language]}
            </option>
            <option className="text-white" value="Tekstil">
              {page.businessIndustry.options.textile[language]}
            </option>
            <option className="text-white" value="Elektrik avadanlıqları">
              {page.businessIndustry.options.electricalEquipment[language]}
            </option>
            <option className="text-white" value="Digər">
              {page.businessIndustry.options.other[language]}
            </option>
          </select>

          {/* Main Products */}
          <div className="space-y-2">
            <label className="text-sm">{page.mainProducts[language]}</label>
            <input
              type="text"
              name="mainProducts"
              value={localFormData.mainProducts}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-2 sm:p-3 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {/* Export Activity */}
          <div className="space-y-2">
            <label className="text-sm">{page.exportActivity[language]}</label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="exportActivity"
                  value="Bəli"
                  onChange={handleInputChange}
                  checked={localFormData.exportActivity === "Bəli"}
                  className="text-blue-500 w-3 h-3 sm:w-4 sm:h-4"
                />
                <label className="text-sm">{page.yes[language]}</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="exportActivity"
                  value="Xeyr"
                  onChange={handleInputChange}
                  checked={localFormData.exportActivity === "Xeyr"}
                  className="text-blue-500 w-3 h-3 sm:w-4 sm:h-4"
                />
                <label className="text-sm">{page.no[language]}</label>
              </div>
            </div>
          </div>

          {/* Export Markets Multi-Select */}
          <div className="space-y-2">
            <label className="text-sm">{page.exportMarkets[language]}</label>
            <Select
              options={options}
              value={selectedOptions}
              onChange={(selected) => {
                if (selected && selected.length > 4) {
                  alert("Sadəcə maksimum 4 ölkə seçə bilərsiniz!")
                  return
                }
                handleCountryChange(selected)
              }}
              className="w-full"
              classNamePrefix="react-select"
              placeholder="Ölkə seçin (maksimum 4)"
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
                  borderColor: "#4B5563",
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
          </div>

          {/* Document upload */}
          <div className="space-y-2">
            <label className="text-sm">{page.document[language]}</label>
            <input
              type="file"
              name="document"
              accept=".doc,.docx,.pdf"
              onChange={handleFileChange}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            {localFormData.document && (
              <p className="text-xs text-gray-400 mt-1">Seçilmiş fayl: {localFormData.document}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6 sm:mt-8 gap-4">
            <button
              type="button"
              onClick={handleGoBack}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 sm:py-3 rounded-lg transition duration-200 text-xs sm:text-sm"
            >
              {buttons.backBtn[language]}
            </button>
            <button
              type="button"
              onClick={handleGoNext}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-lg transition duration-200 text-xs sm:text-sm"
            >
              {buttons.nextBtn[language]}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
