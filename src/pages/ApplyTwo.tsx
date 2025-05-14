"use client"

import type React from "react"

import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Upload } from "lucide-react"
import BackgroundVideo from "../components/BackgroundVideo"
import { FormContext } from "../context/FormContext"
import { useLanguage } from "../context/LanguageContext";
import ApplySteps from "../components/ApplySteps";

export default function ApplyTwo() {
  const navigate = useNavigate()
  const context = useContext(FormContext)
  const { language, pagesTranslations } = useLanguage();
  const page = pagesTranslations.apply2;
  const buttons = pagesTranslations.applyBtns;


  if (!context) {
    throw new Error("ApplyTwo must be used within a FormContext.Provider")
  }

  const { formData, setFormData } = context
  const [localFormData, setLocalFormData] = useState({
    companyType: formData.propertyLaw.companyLawType,
    businessIndustry: formData.propertyLaw.businessOperations,
    mainProducts: formData.propertyLaw.products,
    exportActivity: formData.propertyLaw.exportActivity ? "Bəli" : "Xeyr",
    exportMarkets: formData.propertyLaw.exportBazaar,
    document: "",
  })

  const [fileName, setFileName] = useState<string>("")

  // Update local form data when context data changes
  useEffect(() => {
    setLocalFormData({
      companyType: formData.propertyLaw.companyLawType,
      businessIndustry: formData.propertyLaw.businessOperations,
      mainProducts: formData.propertyLaw.products,
      exportActivity: formData.propertyLaw.exportActivity ? "Bəli" : "Xeyr",
      exportMarkets: formData.propertyLaw.exportBazaar,
      document: "",
    })
  }, [formData])

  // Load data from localStorage when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem("formData")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)

        // Update context with saved data
        setFormData(parsedData)

        // Also update local form data directly to ensure UI is updated
        setLocalFormData({
          companyType: parsedData.propertyLaw?.companyLawType || "",
          businessIndustry: parsedData.propertyLaw?.businessOperations || "",
          mainProducts: parsedData.propertyLaw?.products || "",
          exportActivity: parsedData.propertyLaw?.exportActivity ? "Bəli" : "Xeyr",
          exportMarkets: parsedData.propertyLaw?.exportBazaar || "",
          document: "",
        })
      } catch (error) {
        console.error("Error parsing saved form data:", error)
      }
    }
  }, [setFormData])

  // Save data to localStorage immediately when any input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // Update local state
    setLocalFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))

    // Create updated form data
    let updatedFormData = { ...formData }

    // Update the global form context based on the input name
    if (name === "companyType") {
      updatedFormData = {
        ...updatedFormData,
        propertyLaw: {
          ...updatedFormData.propertyLaw,
          companyLawType: value,
        },
      }
    } else if (name === "businessIndustry") {
      updatedFormData = {
        ...updatedFormData,
        propertyLaw: {
          ...updatedFormData.propertyLaw,
          businessOperations: value,
        },
      }
    } else if (name === "mainProducts") {
      updatedFormData = {
        ...updatedFormData,
        propertyLaw: {
          ...updatedFormData.propertyLaw,
          products: value,
        },
      }
    } else if (name === "exportActivity") {
      updatedFormData = {
        ...updatedFormData,
        propertyLaw: {
          ...updatedFormData.propertyLaw,
          exportActivity: value === "Bəli",
        },
      }
    } else if (name === "exportMarkets") {
      updatedFormData = {
        ...updatedFormData,
        propertyLaw: {
          ...updatedFormData.propertyLaw,
          exportBazaar: value,
        },
      }
    }

    // Update context
    setFormData(updatedFormData)

    // Save to localStorage immediately
    localStorage.setItem("formData", JSON.stringify(updatedFormData))
  }

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  // Geri butonuna basıldığında Apply sayfasına git
  const handleGoBack = () => {
    navigate("/apply")
  }

  // Növbəti butonuna basıldığında ApplyThree sayfasına git
  const handleGoNext = () => {
    navigate("/apply/three")
  }

  return (
    <>
      <BackgroundVideo />
      <div className="relative min-h-screen w-full bg-[url('/images/space-background.jpg')] bg-cover bg-center bg-no-repeat text-white flex flex-col items-center justify-center py-4 sm:py-6 md:py-10 px-2 sm:px-4">
        {/* Main Content */}
        <ApplySteps step={2} />

        <div className="text-center mb-8 relative z-20">
          <h1 className="text-2xl md:text-3xl font-medium">
            {page.title[language]}
          </h1>
        </div>

        <div className="w-full max-w-2xl space-y-4 sm:space-y-6 relative z-20 px-4 sm:px-6">
          {/* Şirkətin hüquqi növü */}
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

          {/* Sənaye və biznes fəaliyyətləri */}
          {/* <div className="space-y-2">
            <label className="text-sm">{page.businessIndustry[language]}</label>
            <input
              type="text"
              name="businessIndustry"
              value={localFormData.businessIndustry}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div> */}

          <label className="text-sm">
            {page.businessIndustry.label[language]}
          </label>
          <select
            name="businessIndustry"
            value={localFormData.businessIndustry}
            onChange={handleInputChange}
            className="w-full bg-[#131021] border  border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            <option className="text-white" value="">
              {page.businessIndustry.placeholder[language]}
            </option>
            <option
              className="text-white"
              value="Təmsil etdiyimiz sənayə sektoru"
            >
              {page.businessIndustry.options.representedIndustry[language]}
            </option>
            <option className="text-white" value="Qida və içkilər">
              {page.businessIndustry.options.foodAndBeverages[language]}
            </option>
            <option className="text-white" value="Neft - qaz">
              {page.businessIndustry.options.oilAndGas[language]}
            </option>
            <option className="text-white" value=" Kimya">
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

          {/* Əsas məhsullar/xidmətlər */}
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

          {/* İxrac fəaliyyəti ilə məşğul olmaq */}
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

          {/* Məhsulların ixrac olunduğu bazarlar */}
          <div className="space-y-2">
            <label className="text-sm">{page.exportMarkets[language]}</label>
            <input
              type="text"
              name="exportMarkets"
              value={localFormData.exportMarkets}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-2 sm:p-3 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {/* Təqdimedici sənəd */}
          <div className="space-y-2">
            <label className="text-sm">{page.document[language]}</label>
            <input
              type="file"
              name="document"
              onChange={handleInputChange}
              accept=".doc,.docx,.pdf"
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {/* Geri və Növbəti Butonları */}
          <div className="flex justify-between mt-6 sm:mt-8 gap-4">
            <button
              className="w-full cursor-pointer bg-blue-900 hover:bg-blue-800 text-white py-2 sm:py-3 rounded-lg transition duration-200 text-xs sm:text-sm"
              onClick={handleGoBack}
            >
              {buttons.backBtn[language]}
            </button>
            <button
              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-lg transition duration-200 text-xs sm:text-sm"
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
