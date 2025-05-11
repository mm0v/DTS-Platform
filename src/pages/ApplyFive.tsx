"use client"

import type React from "react"

import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Download } from "lucide-react"
import BackgroundVideo from "../components/BackgroundVideo"

interface FileState {
  companyRegistry: File | null
  financialReports: File | null
}

interface AgreementState {
  confirmAccuracy: boolean
  contactConsent: boolean
  termsAgreement: boolean
}

export default function ApplyFive() {
  const navigate = useNavigate()
  const [files, setFiles] = useState<FileState>({
    companyRegistry: null,
    financialReports: null,
  })
  const [agreements, setAgreements] = useState<AgreementState>({
    confirmAccuracy: false,
    contactConsent: false,
    termsAgreement: false,
  })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: keyof FileState) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setFiles((prev) => ({
        ...prev,
        [fileType]: file,
      }))
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setAgreements((prev) => ({
      ...prev,
      [name as keyof AgreementState]: checked,
    }))
  }

  const handleGoBack = () => {
    navigate("/apply/four")
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Here you would typically upload the files to your server
    // and submit the form data

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Navigate to success page or show success message
      alert("Müraciətiniz uğurla göndərildi!")
    }, 1500)
  }

  const allAgreementsChecked = Object.values(agreements).every((value) => value === true)

  return (
    <>
      <BackgroundVideo />
      <div className="min-h-screen bg-black bg-[url('/images/space-background.jpg')] bg-cover bg-center bg-no-repeat text-white flex flex-col items-center justify-center py-10">
        {/* Progress Bar */}
        <div className="w-full max-w-4xl mb-8 px-4">
          <div className="relative w-full h-[1px] bg-blue-500">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm ${num <= 5 ? "bg-blue-500" : "bg-blue-900"
                  }`}
                style={{ left: `${(num - 1) * 25}%` }}
              >
                {num}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <div className="text-center max-w-[100px]">Şirkət haqqında məlumat</div>
            <div className="text-center max-w-[100px]">Mülkiyyət və hüquqi quruluş</div>
            <div className="text-center max-w-[100px]">Rəqəmsal hüquqi və transformasiya xidmətləri</div>
            <div className="text-center max-w-[100px]">Lisenzli və əhatəlidir</div>
            <div className="text-center max-w-[100px] text-blue-400">Tələb olunan sənədlər</div>
          </div>
        </div>

        {/* Form */}
        <div className="w-full max-w-4xl p-8 rounded-lg">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold">Tələb olunan sənədlər</h1>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* First file upload */}
            <div className="space-y-2">
              <label className="block text-lg font-medium">Şirkətin dövlət reyestrindən çıxarışı</label>
              <div className="relative">
                <div className="w-full h-14 border border-gray-600 rounded-lg flex items-center justify-between px-4 bg-gray-800/30">
                  <span className="text-gray-400 text-sm">
                    {files.companyRegistry ? files.companyRegistry.name : ".doc, .docx, .pdf"}
                  </span>
                  <button
                    type="button"
                    className="text-white"
                    onClick={() => document.getElementById("companyRegistry")?.click()}
                  >
                    <Download size={20} />
                  </button>
                </div>
                <input
                  id="companyRegistry"
                  type="file"
                  className="hidden"
                  accept=".doc,.docx,.pdf"
                  onChange={(e) => handleFileChange(e, "companyRegistry")}
                />
              </div>
              <p className="text-sm text-gray-400">Yüklənən fayl 50 mb – dan çox ola bilməz.</p>
            </div>

            {/* Dot separator */}
            <div className="flex justify-center">
              <div className="w-2 h-2 rounded-full bg-teal-400"></div>
            </div>

            {/* Second file upload */}
            <div className="space-y-2">
              <label className="block text-lg font-medium">Maliyyə hesabatları (son 2 il)</label>
              <div className="relative">
                <div className="w-full h-14 border border-gray-600 rounded-lg flex items-center justify-between px-4 bg-gray-800/30">
                  <span className="text-gray-400 text-sm">
                    {files.financialReports ? files.financialReports.name : ".doc, .docx, .pdf, .excel"}
                  </span>
                  <button
                    type="button"
                    className="text-white"
                    onClick={() => document.getElementById("financialReports")?.click()}
                  >
                    <Download size={20} />
                  </button>
                </div>
                <input
                  id="financialReports"
                  type="file"
                  className="hidden"
                  accept=".doc,.docx,.pdf,.xls,.xlsx"
                  onChange={(e) => handleFileChange(e, "financialReports")}
                />
              </div>
              <p className="text-sm text-gray-400">Yüklənən fayl 50 mb – dan çox ola bilməz.</p>
            </div>

            <p className="text-sm text-gray-400 mt-6">
              Müraciətinizlə bağlı əlavə təsdiqedici sənədlərə ehtiyac olacağı təqdirdə sizinlə əlaqə saxlanılacaqdır.
            </p>

            {/* Dot separator */}
            <div className="flex justify-center">
              <div className="w-2 h-2 rounded-full bg-teal-400"></div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="confirmAccuracy"
                  name="confirmAccuracy"
                  checked={agreements.confirmAccuracy}
                  onChange={handleCheckboxChange}
                  className="mt-1 h-4 w-4 text-blue-500 border-gray-600 rounded bg-transparent"
                />
                <label htmlFor="confirmAccuracy" className="ml-2 text-sm text-gray-400">
                  Təqdim olunan məlumatların doğruluğunu təsdiq edirəm.
                </label>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="contactConsent"
                  name="contactConsent"
                  checked={agreements.contactConsent}
                  onChange={handleCheckboxChange}
                  className="mt-1 h-4 w-4 text-blue-500 border-gray-600 rounded bg-transparent"
                />
                <label htmlFor="contactConsent" className="ml-2 text-sm text-gray-400">
                  Müraciətimlə əlaqədar 4SİM tərəfindən əlaqə saxlanmasını qəbul edirəm.
                </label>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="termsAgreement"
                  name="termsAgreement"
                  checked={agreements.termsAgreement}
                  onChange={handleCheckboxChange}
                  className="mt-1 h-4 w-4 text-blue-500 border-gray-600 rounded bg-transparent"
                />
                <label htmlFor="termsAgreement" className="ml-2 text-sm text-gray-400">
                  İstifadə şərtləri və gizlilik şərtləri ilə razıyam.
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 mt-10">
              <button
                type="button"
                onClick={handleGoBack}
                className="flex-1 cursor-pointer bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Geri
              </button>
              <button
                type="submit"
                disabled={!allAgreementsChecked || isSubmitting}
                className={`flex-1 py-3 rounded-lg transition-colors ${allAgreementsChecked && !isSubmitting
                  ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  : "bg-blue-900/50 text-gray-400 cursor-not-allowed "
                  }`}
              >
                {isSubmitting ? "Göndərilir..." : "Təsdiq et"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
