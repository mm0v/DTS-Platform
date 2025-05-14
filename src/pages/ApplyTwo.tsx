"use client"

import type React from "react"

import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Upload } from "lucide-react"
import BackgroundVideo from "../components/BackgroundVideo"
import { FormContext } from "../context/FormContext"

export default function ApplyTwo() {
  const navigate = useNavigate()
  const context = useContext(FormContext)

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
  }, [])

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
        <div className="relative z-20 w-full max-w-4xl mb-4 sm:mb-6 md:mb-8 px-4">
          <div className="relative w-full h-[1px] bg-blue-500">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm ${
                  num <= 2 ? "bg-blue-500" : "bg-blue-900"
                }`}
                style={{ left: `${(num - 1) * 25}%` }}
              >
                {num}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-2 text-[10px] xs:text-xs text-gray-400">
            <div className="text-center max-w-[60px] sm:max-w-[100px]">Şirkət haqqında məlumat</div>
            <div className="text-center max-w-[60px] sm:max-w-[100px] text-blue-400">Mülkiyyət və hüquqi quruluş</div>
            <div className="text-center max-w-[60px] sm:max-w-[100px]">Rəqəmsal hazırlıq</div>
            <div className="text-center max-w-[60px] sm:max-w-[100px]">Liderlik və öhdəliklər</div>
            <div className="text-center max-w-[60px] sm:max-w-[100px]">Tələb olunan sənədlər</div>
          </div>
        </div>

        <div className="text-center text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 py-2 sm:py-3 md:py-5">
          <h1>Mülkiyyət və hüquqi quruluş</h1>
        </div>

        <div className="w-full max-w-2xl space-y-4 sm:space-y-6 relative z-20 px-4 sm:px-6">
          {/* Şirkətin hüquqi növü */}
          <div className="space-y-2 bg-gray-900/30 p-3 sm:p-4 rounded-lg">
            <label className="block text-xs sm:text-sm md:text-base font-medium">
              Şirkətin hüquqi növü (MMC, ASC, Fərdi sahibkar və s.)
            </label>
            <input
              type="text"
              name="companyType"
              value={localFormData.companyType}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-2 sm:p-3 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {/* Sənaye və biznes fəaliyyətləri */}
          <div className="space-y-2 bg-gray-900/30 p-3 sm:p-4 rounded-lg">
            <label className="block text-xs sm:text-sm md:text-base font-medium">Sənaye və biznes əməliyyatları</label>
            <select
              name="businessIndustry"
              value={localFormData.businessIndustry}
              onChange={handleInputChange}
              className="w-full bg-[#131021]/80 border border-gray-700 rounded-lg p-2 sm:p-3 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-300"
            >
              <option className="text-white" value="">
                Seçin
              </option>
              <option className="text-white" value="Təmsil etdiyimiz sənayə sektoru">
                Təmsil etdiyimiz sənayə sektoru
              </option>
              <option className="text-white" value="Qida və içkilər">
                Qida və içkilər
              </option>
              <option className="text-white" value="Neft - qaz">
                Neft - qaz
              </option>
              <option className="text-white" value=" Kimya">
                Kimya
              </option>
              <option className="text-white" value="Metallurgiya">
                Metallurgiya
              </option>
              <option className="text-white" value="Maşın və avadanlıqların təmiri və quraşdırılması">
                Maşın və avadanlıqların təmiri və quraşdırılması
              </option>
              <option className="text-white" value="Kauçuk və plastik məhsullar">
                Kauçuk və plastik məhsullar
              </option>
              <option className="text-white" value="Tekstil">
                Tekstil
              </option>
              <option className="text-white" value="Elektrik avadanlıqları">
                Elektrik avadanlıqları
              </option>
              <option className="text-white" value="Digər">
                Digər
              </option>
            </select>
          </div>

          {/* Əsas məhsullar/xidmətlər */}
          <div className="space-y-2 bg-gray-900/30 p-3 sm:p-4 rounded-lg">
            <label className="block text-xs sm:text-sm md:text-base font-medium">Əsas məhsullar/xidmətlər</label>
            <input
              type="text"
              name="mainProducts"
              value={localFormData.mainProducts}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-2 sm:p-3 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {/* İxrac fəaliyyəti ilə məşğul olmaq */}
          <div className="space-y-2 bg-gray-900/30 p-3 sm:p-4 rounded-lg">
            <label className="block text-xs sm:text-sm md:text-base font-medium">
              İxrac fəaliyyəti ilə məşğul olursunuz?
            </label>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="exportActivity"
                  value="Bəli"
                  onChange={handleInputChange}
                  checked={localFormData.exportActivity === "Bəli"}
                  className="text-blue-500 w-3 h-3 sm:w-4 sm:h-4"
                />
                <label className="text-xs sm:text-sm">Bəli</label>
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
                <label className="text-xs sm:text-sm">Xeyr</label>
              </div>
            </div>
          </div>

          {/* Məhsulların ixrac olunduğu bazarlar */}
          <div className="space-y-2 bg-gray-900/30 p-3 sm:p-4 rounded-lg">
            <label className="block text-xs sm:text-sm md:text-base font-medium">
              Məhsullarınızın ixrac olunduğu bazarlar
            </label>
            <input
              type="text"
              name="exportMarkets"
              value={localFormData.exportMarkets}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-2 sm:p-3 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {/* Təqdimedici sənəd */}
          <div className="space-y-2 bg-gray-900/30 p-3 sm:p-4 rounded-lg">
            <label className="block text-xs sm:text-sm md:text-base font-medium">
              Təqdimedici sənəd (.doc, .docx, .pdf)
            </label>
            <div className="relative">
              <div className="w-full h-10 sm:h-12 border border-gray-700 rounded-lg flex items-center justify-between px-3 sm:px-4 bg-[#131021]/50">
                <span className="text-gray-400 text-xs sm:text-sm truncate max-w-[70%]">
                  {fileName || "Fayl seçilməyib"}
                </span>
                <button
                  type="button"
                  className="text-white"
                  onClick={() => document.getElementById("documentUpload")?.click()}
                >
                  <Upload size={16} className="sm:w-5 sm:h-5" />
                </button>
              </div>
              <input
                id="documentUpload"
                type="file"
                name="document"
                onChange={handleFileChange}
                accept=".doc,.docx,.pdf"
                className="hidden"
              />
            </div>
            <p className="text-[10px] sm:text-xs text-gray-400">Yüklənən fayl 10 mb – dan çox ola bilməz.</p>
          </div>

          {/* Geri və Növbəti Butonları */}
          <div className="flex justify-between mt-6 sm:mt-8 gap-4">
            <button
              className="w-full cursor-pointer bg-blue-900 hover:bg-blue-800 text-white py-2 sm:py-3 rounded-lg transition duration-200 text-xs sm:text-sm"
              onClick={handleGoBack}
            >
              Geri
            </button>
            <button
              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-lg transition duration-200 text-xs sm:text-sm"
              onClick={handleGoNext}
            >
              Növbəti
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
