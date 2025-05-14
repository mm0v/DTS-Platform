"use client"

import type React from "react"

import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
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
      <div className="relative min-h-screen w-full text-white flex flex-col items-center justify-center py-10">
        {/* Background Video with Blur Effect */}
        {/* <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0 filter blur-[10px]">
        <source src="/img/Navbar/bg-header.mp4" type="video/mp4" />
      </video> */}

        {/* Overlay for the blurred video background */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

        {/* Main Content */}
        <div className="relative z-20 w-full max-w-4xl mb-8 px-4">
          <div className="relative w-full h-[1px] bg-blue-500">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  num <= 2 ? "bg-blue-500" : "bg-blue-900"
                }`}
                style={{ left: `${(num - 1) * 25}%` }}
              >
                {num}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4 text-xs text-gray-400">
            <div className="text-center max-w-[100px]">Şirkət haqqında məlumat</div>
            <div className="text-center max-w-[100px] text-blue-400">Mülkiyyət və hüquqi quruluş</div>
            <div className="text-center max-w-[100px]">Rəqəmsal hazırlıq və transformasiya ehtiyacları</div>
            <div className="text-center max-w-[100px]">Liderlik və öhdəliklər</div>
            <div className="text-center max-w-[100px]">Tələb olunan sənədlər</div>
          </div>
        </div>

        <div className="text-center mb-8 relative z-20">
          <h1 className="text-2xl md:text-3xl font-medium">Mülkiyyət və hüquqi quruluş</h1>
        </div>

        <div className="w-full max-w-2xl space-y-6 relative z-20">
          {/* Şirkətin hüquqi növü */}
          <div className="space-y-2">
            <label className="text-sm">Şirkətin hüquqi növü (MMC, ASC, Fərdi sahibkar və s.)</label>
            <input
              type="text"
              name="companyType"
              value={localFormData.companyType}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {/* Sənaye və biznes fəaliyyətləri */}
          {/* <div className="space-y-2">
            <label className="text-sm">Sənaye və biznes əməliyyatları</label>
            <input
              type="text"
              name="businessIndustry"
              value={localFormData.businessIndustry}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div> */}

          <label className="text-sm">Sənaye və biznes əməliyyatları</label>
          <select
            name="businessIndustry"
            value={localFormData.businessIndustry}
            onChange={handleInputChange}
            className="w-full bg-[#131021] border  border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
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

          {/* Əsas məhsullar/xidmətlər */}
          <div className="space-y-2">
            <label className="text-sm">Əsas məhsullar/xidmətlər</label>
            <input
              type="text"
              name="mainProducts"
              value={localFormData.mainProducts}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {/* İxrac fəaliyyəti ilə məşğul olmaq */}
          <div className="space-y-2">
            <label className="text-sm">İxrac fəaliyyəti ilə məşğul olursunuz?</label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="exportActivity"
                  value="Bəli"
                  onChange={handleInputChange}
                  checked={localFormData.exportActivity === "Bəli"}
                  className="text-blue-500"
                />
                <label className="text-sm">Bəli</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="exportActivity"
                  value="Xeyr"
                  onChange={handleInputChange}
                  checked={localFormData.exportActivity === "Xeyr"}
                  className="text-blue-500"
                />
                <label className="text-sm">Xeyr</label>
              </div>
            </div>
          </div>

          {/* Məhsulların ixrac olunduğu bazarlar */}
          <div className="space-y-2">
            <label className="text-sm">Məhsullarınızın ixrac olunduğu bazarlar</label>
            <input
              type="text"
              name="exportMarkets"
              value={localFormData.exportMarkets}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {/* Təqdimedici sənəd */}
          <div className="space-y-2">
            <label className="text-sm">Təqdimedici sənəd (.doc, .docx, .pdf)</label>
            <input
              type="file"
              name="document"
              onChange={handleInputChange}
              accept=".doc,.docx,.pdf"
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {/* Geri və Növbəti Butonları */}
          <div className="flex justify-between mt-6">
            <button
              className="w-[48%] bg-gray-600 cursor-pointer text-white py-3 rounded-lg transition duration-300"
              onClick={handleGoBack}
            >
              Geri
            </button>
            <button
              className="w-[48%] bg-blue-600 cursor-pointer hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
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
