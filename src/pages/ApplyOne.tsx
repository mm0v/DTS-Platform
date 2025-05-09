"use client"

import { useState } from "react"
// import { ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function ApplyOne() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: "",
    vatNumber: "",
    foundingDate: "",
    companySize: "",
    annualTurnover: "",
    companyAddress: "",
    location: "",
    website: "",
    contactPerson: "",
    email: "",
    phone: "",
  })

  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleNext = () => {
    setStep(prevStep => Math.min(prevStep + 1, 5))
    navigate('/apply-two')
  }

  return (
    <div className="relative min-h-screen w-full text-white flex flex-col items-center justify-center p-4">
      {/* Background Video */}
      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0 filter blur-[10px]">
        <source src="/img/Navbar/bg-header.mp4" type="video/mp4" />
      </video>

      {/* Overlay for the blurred video background */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

      {/* Main Content */}
      <div className="relative z-20 w-full max-w-4xl mb-8 px-4">
        {/* Step indicators */}
        <div className="relative w-full h-[1px] bg-blue-500">
          {[1, 2, 3, 4, 5].map((num) => (
            <div
              key={num}
              className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm ${num <= step ? "bg-blue-500" : "bg-blue-900 "
                }`}
              style={{ left: `${(num - 1) * 25}%` }}
            >
              {num}
            </div>
          ))}
        </div>

        {/* Step descriptions */}
        <div className="flex justify-between mt-4 text-xs text-gray-400 space-y-2">
          <div className="text-center max-w-[150px] text-blue-400">Şirkət haqqında məlumat</div>
          <div className="text-center max-w-[150px]">Hüquqi və hüquqi quruluş</div>
          <div className="text-center max-w-[150px]">Rəqəmsal hüquqi və transformasiya xidmətləri</div>
          <div className="text-center max-w-[150px]">Lisenzli və əhatəlidir</div>
          <div className="text-center max-w-[150px]">Tələb olunan sənədlər</div>
        </div>
      </div>

      <div className="text-center mb-8 relative z-20">
        <h1 className="text-2xl md:text-3xl font-medium">Şirkət haqqında məlumat</h1>
      </div>

      <div className="w-full max-w-2xl space-y-6 relative z-20">
        {/* Company Name */}
        <div className="space-y-2">
          <label className="text-sm">Şirkətin adı (Tam hüquqi adı)</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>

        {/* Company VAT and Founding Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm">Şirkətin VÖN nömrəsi</label>
            <input
              type="text"
              name="vatNumber"
              value={formData.vatNumber}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Şirkətin yaranma tarixi</label>
            <select
              name="foundingDate"
              value={formData.foundingDate}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              <option value="">Seçin</option>
            </select>
          </div>
        </div>

        {/* Company Size and Business Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm">Şirkətin ölçüsü - Tam ştatlı işçilərin sayı</label>
            <select
              name="companySize"
              value={formData.companySize}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              <option value="">Seçin</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm">İllik dövriyyə (AZN)</label>
            <select
              name="annualTurnover"
              value={formData.annualTurnover}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              <option value="">Seçin</option>
            </select>
          </div>
        </div>

        {/* Address and Location */}
        <div className="space-y-2">
          <label className="text-sm">Şirkətin ünvanı</label>
          <input
            type="text"
            name="companyAddress"
            value={formData.companyAddress}
            onChange={handleInputChange}
            className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Yerləşdiyi şəhər/region</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>

        {/* Website and Contact Person */}
        <div className="space-y-2">
          <label className="text-sm">Vebsayt (əgər varsa)</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Əlaqələndirici şəxs (ad və soyad)</label>
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleInputChange}
            className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm">Elektron poçt ünvanı</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Əlaqə nömrəsi</label>
            <div className="flex">
              <div className="relative w-20">
                <select
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full h-full appearance-none bg-transparent border border-gray-700 rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                >
                  <option value="+1">🇺🇸 +1</option>
                </select>
              </div>
              <input
                type="tel"
                className="flex-1 bg-transparent border border-gray-700 border-l-0 rounded-r-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300 mt-6"
          onClick={handleNext}
        >
          Növbəti
        </button>
      </div>
    </div>
  )
}
