import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Download } from "lucide-react"

interface FileState {
  companyRegistry: string | null
  financialReports: string | null
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
  const [showModal, setShowModal] = useState<boolean>(false) // Modal visibility state

  // Load data from localStorage when component mounts
  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem('files') || '{}')
    const savedAgreements = JSON.parse(localStorage.getItem('agreements') || '{}')

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
    localStorage.setItem('files', JSON.stringify(files))
    localStorage.setItem('agreements', JSON.stringify(agreements))
  }, [files, agreements])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: keyof FileState) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setFiles((prev) => ({
        ...prev,
        [fileType]: file.name, // Store the file name in localStorage
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
    navigate("/apply-four")
  }

  const handleModalClose = () => {
    setShowModal(false) // Close the modal without submitting
  }

  const handleModalConfirm = () => {
    setIsSubmitting(true)
    // Proceed with form submission logic (e.g., API call)
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Müraciətiniz uğurla göndərildi!")
    }, 1500)
    setShowModal(false) // Close the modal after confirming
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShowModal(true) // Show the modal when user clicks "Təsdiq et"
  }

  const allAgreementsChecked = Object.values(agreements).every((value) => value === true)

  return (
    <div className="min-h-screen bg-black bg-[url('/images/space-background.jpg')] bg-cover bg-center bg-no-repeat text-white flex flex-col items-center justify-center py-10">
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 text-white p-24 rounded-lg w-80 h-80">
            <h2 className="text-lg text-center justify-center font-semibold mb-4">Müraciətinizi təsdiq edirsinizmi?</h2>
            <div className="flex justify-between">
              <button
                onClick={handleModalClose}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Xeyr
              </button>
              <button
                onClick={handleModalConfirm}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Bəli
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full max-w-4xl mb-8 px-4">
        {/* Progress bar code */}
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
                  {files.companyRegistry || "No file selected"}
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
                  {files.financialReports || "No file selected"}
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
                Müraciətimlə əlaqədar 45İM tərəfindən əlaqə saxlanmasını qəbul edirəm.
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
              className="flex-1 bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Geri
            </button>
            <button
              type="submit"
              disabled={!allAgreementsChecked || isSubmitting}
              className={`flex-1 py-3 rounded-lg transition-colors ${
                allAgreementsChecked && !isSubmitting
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-900/50 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Göndərilir..." : "Təsdiq et"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
