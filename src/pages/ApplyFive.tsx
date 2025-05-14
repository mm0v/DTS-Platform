"use client"

import type React from "react"
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Download, X } from "lucide-react"
import BackgroundVideo from "../components/BackgroundVideo"
import { FormContext } from "../context/FormContext"

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
  const context = useContext(FormContext)

  if (!context) {
    throw new Error("ApplyFive must be used within a FormContext.Provider")
  }

  const { setFormData } = context

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
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showSuccessPage, setShowSuccessPage] = useState<boolean>(false)

  // Derived state to check if all agreements are checked
  const allAgreementsChecked = Object.values(agreements).every((value) => value === true)

  // Load data from localStorage when component mounts
  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem("files") || "{}")
    const savedAgreements = JSON.parse(localStorage.getItem("agreements") || "{}")

    if (savedFiles.companyRegistry) {
      setFiles((prev) => ({
        ...prev,
        companyRegistry: savedFiles.companyRegistry,
      }))
    }

    if (savedFiles.financialReports) {
      setFiles((prev) => ({
        ...prev,
        financialReports: savedFiles.financialReports,
      }))
    }

    setAgreements(savedAgreements)
  }, [])

  // Save data to localStorage whenever files or agreements change
  useEffect(() => {
    localStorage.setItem("files", JSON.stringify(files))
    localStorage.setItem("agreements", JSON.stringify(agreements))
  }, [files, agreements])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: keyof FileState) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setFiles((prev) => ({
        ...prev,
        [fileType]: file, // Store the file object in state
      }))
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setAgreements((prev) => ({
      ...prev,
      [name as keyof AgreementState]: checked,
    }))

    // Update the declarationConsent in formData
    if (name === "confirmAccuracy") {
      setFormData((prev) => ({
        ...prev,
        declarationConsent: {
          ...prev.declarationConsent,
          dataIsReal: checked,
        },
      }))
    } else if (name === "contactConsent") {
      setFormData((prev) => ({
        ...prev,
        declarationConsent: {
          ...prev.declarationConsent,
          permitContact: checked,
        },
      }))
    }
  }

  const handleGoBack = () => {
    navigate("/apply/four")
  }

  const handleModalClose = () => {
    setShowModal(false) // Close the modal without submitting
  }

  const handleModalConfirm = () => {
    setIsSubmitting(true)
    // Simulate form submission with a short delay
    setTimeout(() => {
      setIsSubmitting(false)
      setShowModal(false)
      // Show success page instead of navigating
      setShowSuccessPage(true)
    }, 1500)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShowModal(true) // Show the modal when user clicks "Təsdiq et"
  }

  const handleSuccessClose = () => {
    // Navigate to home or reset the form
    navigate("/")
  }

  // If showing success page, render that instead of the form
  if (showSuccessPage) {
    return (
      <>
        <BackgroundVideo />
        <div className="min-h-screen bg-[url('/images/space-background.jpg')] bg-cover bg-center bg-no-repeat text-white flex flex-col items-center justify-center">
          <div className="max-w-md w-full p-8 relative">
            <button
              onClick={handleSuccessClose}
              className="absolute top-0 right-0 text-red-500 hover:text-red-400"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center text-center space-y-8">
              <h1 className="text-3xl font-bold">Müraciətiniz üçün təşəkkür edirik!</h1>

              <p className="text-lg">Müraciətinizin nəticəsi barəsində qısa zamanda sizinlə əlaqə saxlanılacaqdır.</p>

              <div className="relative w-24 h-24 mt-4">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-green-400">
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 50L40 70L80 30"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-ping"></div>
                </div>
                <div className="absolute top-0 right-0">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-ping delay-300"></div>
                </div>
                <div className="absolute bottom-0 left-0">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-ping delay-700"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <BackgroundVideo />
      <div className="min-h-screen bg-[url('/images/space-background.jpg')] bg-cover bg-center bg-no-repeat text-white flex flex-col items-center justify-center py-10">
        {/* Modal */}
        {showModal && (
         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
  <div className="bg-gray-800 text-white p-10 rounded-xl w-96 max-w-sm">
    <h2 className="text-xl text-center font-semibold mb-6">
      Müraciətinizi təsdiq edirsinizmi?
    </h2>
    <div className="flex justify-between gap-4">
      <button
        onClick={handleModalClose}
        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition duration-300 text-lg font-medium"
      >
        Xeyr
      </button>
      <button
        onClick={handleModalConfirm}
        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition duration-300 text-lg font-medium"
      >
        Bəli
      </button>
    </div>
  </div>
</div>

        )}

        {/* Progress Bar */}
        <div className="w-full max-w-4xl mb-8 px-4">
          <div className="relative w-full h-[1px] bg-blue-500">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  num <= 5 ? "bg-blue-500" : "bg-blue-900"
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
            <div className="text-center max-w-[100px]">Rəqəmsal hazırlıq və transformasiya ehtiyacları</div>
            <div className="text-center max-w-[100px] text-blue-400">Liderlik və öhdəliklər</div>
            <div className="text-center max-w-[100px]">Tələb olunan sənədlər</div>
          </div>
        </div>

        {/* Form */}
        <div className="w-full max-w-4xl p-8 rounded-lg">
          <div className="text-center text-3xl font-semibold mb-6 py-5">
            <h1>Tələb olunan sənədlər</h1>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* First file upload */}
            <div className="space-y-2">
              <label className="block text-lg font-medium">Şirkətin dövlət reyestrindən çıxarışı</label>
              <div className="relative">
                <div className="w-full h-14 border border-gray-600 rounded-lg flex items-center justify-between px-4 bg-gray-800/30">
                  <span className="text-gray-400 text-sm">
                    {files.companyRegistry ? files.companyRegistry.name : "No file selected"}
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

            {/* Second file upload */}
            <div className="space-y-2">
              <label className="block text-lg font-medium">Maliyyə hesabatları (son 2 il)</label>
              <div className="relative">
                <div className="w-full h-14 border border-gray-600 rounded-lg flex items-center justify-between px-4 bg-gray-800/30">
                  <span className="text-gray-400 text-sm">
                    {files.financialReports ? files.financialReports.name : "No file selected"}
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
                className={`flex-1 py-3 rounded-lg transition-colors ${
                  allAgreementsChecked && !isSubmitting
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
