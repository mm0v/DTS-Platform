"use client"
import type React from "react"
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Download } from "lucide-react"
import BackgroundVideo from "../components/BackgroundVideo"
import { FormContext } from "../context/FormContext"
import { useLanguage } from "../context/LanguageContext"
import ApplySteps from "../components/ApplySteps"
import { motion, AnimatePresence } from "framer-motion"

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
  const { language, pagesTranslations } = useLanguage()
  const page = pagesTranslations.apply5
  if (!context) {
    throw new Error("ApplyFive must be used within a FormContext.Provider")
  }

  const { setFormData, handleSubmit, isSubmitting, submitError, submitSuccess } = context
  const [files, setFiles] = useState<FileState>({
    companyRegistry: null,
    financialReports: null,
  })

  const [agreements, setAgreements] = useState<AgreementState>({
    confirmAccuracy: false,
    contactConsent: false,
    termsAgreement: false,
  })

  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)
  const [showThankYouModal, setShowThankYouModal] = useState<boolean>(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const allAgreementsChecked = Object.values(agreements).every((value) => value === true)

  useEffect(() => {
    // Load saved files and agreements from localStorage
    try {
      const savedAgreements = JSON.parse(localStorage.getItem("agreements") || "{}")
      setAgreements(savedAgreements)
    } catch (error) {
      console.error("Error loading saved agreements:", error)
    }
  }, [])

  useEffect(() => {
    // Save agreements to localStorage when they change
    localStorage.setItem("agreements", JSON.stringify(agreements))
  }, [agreements])

  useEffect(() => {
    // Show thank you modal if submission was successful
    if (submitSuccess) {
      setShowConfirmModal(false)
      setShowThankYouModal(true)
    }
  }, [submitSuccess])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: keyof FileState) => {
    const fileList = e.target.files
    if (fileList && fileList.length > 0) {
      const file = fileList[0]

      // Update state with the file
      setFiles((prev) => ({
        ...prev,
        [fileType]: file,
      }))

      // Store file reference in localStorage
      // Note: Files can't be directly stored in localStorage, so we're just storing metadata
      try {
        const filesMetadata = JSON.parse(localStorage.getItem("files") || "{}")
        filesMetadata[fileType] = {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
        }
        localStorage.setItem("files", JSON.stringify(filesMetadata))
      } catch (error) {
        console.error("Error storing file metadata:", error)
      }
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setAgreements((prev) => ({
      ...prev,
      [name as keyof AgreementState]: checked,
    }));

    // Make sure companyData exists and has declarationConsent
    const updatedFormData = { ...formData };
    if (!updatedFormData.companyData.declarationConsent) {
      updatedFormData.companyData.declarationConsent = {
        dataIsReal: false,
        permitContact: false,
      };
    }

    if (name === "confirmAccuracy") {
      setFormData((prev) => ({
        ...prev,
        companyData: {
          ...prev.companyData,
          declarationConsent: {
            ...prev.companyData.declarationConsent,
            dataIsReal: checked,
          },
        },
      }));
    } else if (name === "contactConsent") {
      setFormData((prev) => ({
        ...prev,
        companyData: {
          ...prev.companyData,
          declarationConsent: {
            ...prev.companyData.declarationConsent,
            permitContact: checked,
          },
        },
      }));
    }
  }

  const handleGoBack = () => {
    navigate("/apply/four")
  }

  const handleConfirmModalClose = () => {
    setShowConfirmModal(false)
    setSubmissionError(null)
  }

  const handleThankYouModalClose = () => {
    setShowThankYouModal(false)
    // Optionally navigate to a different page after closing thank you modal
    navigate("/")
  }

  const handleConfirmModalYes = async () => {
    setIsSubmitting(true);

    try {
      // Handle the exportBazaar field - convert array to string if needed
      const exportBazaar = formData.companyData.propertyLaw.exportBazaar;
      const formattedExportBazaar = Array.isArray(exportBazaar)
        ? exportBazaar.join(", ")
        : exportBazaar;

      // Correctly access properties from formData.companyData
      const dataToSend = {
        companyData: {
          companyName: formData.companyData.companyName,
          companyRegisterNumber: formData.companyData.companyRegisterNumber,
          createYear: formData.companyData.createYear,
          workerCount: formData.companyData.workerCount,
          annualTurnover: formData.companyData.annualTurnover,
          address: formData.companyData.address,
          cityAndRegion: formData.companyData.cityAndRegion,
          website: formData.companyData.website,
          contactName: formData.companyData.contactName,
          contactEmail: formData.companyData.contactEmail,
          contactPhone: formData.companyData.contactPhone,
        },
        declarationConsent: formData.companyData.declarationConsent,
        digitalLeadership: formData.companyData.digitalLeadership,
        digitalReadiness: {
          ...formData.companyData.digitalReadiness,
          // Ensure digital level is a number
          digitalLevel: Number(
            formData.companyData.digitalReadiness.digitalLevel
          ),
        },
        financialNeeding: formData.companyData.financialNeeding,
        propertyLaw: {
          ...formData.companyData.propertyLaw,
          // Use the formatted exportBazaar
          exportBazaar: formattedExportBazaar,
        },
      };

      // JSON məlumatı göndər (yalnız obyekt)
      const dataToSubmit = {
        companyRequest: dataToSend,
      };

      // Log files for debugging (can remove later)
      if (files.companyRegistry || files.financialReports) {
        console.log(
          "Files are available but will not be submitted in this version:"
        );
        if (files.companyRegistry)
          console.log("- Company Registry File:", files.companyRegistry.name);
        if (files.financialReports)
          console.log("- Financial Reports File:", files.financialReports.name);

        // TODO: Implement file upload when API supports it
        // For now, just notify the user that files will be sent separately
        // alert(page.alerts.filesNotSubmitted ? page.alerts.filesNotSubmitted[language] : "Files have been saved but will need to be submitted separately.");
      }

      // Submit the JSON data
      await companyService.submitCompanyData(dataToSubmit);

      setShowConfirmModal(false);
      setShowThankYouModal(true);
    } catch (error) {
      console.error("Submission failed:", error)
      setSubmissionError(submitError || "Məlumatların göndərilməsi zamanı xəta baş verdi")

      // Increment retry count
      setRetryCount((prev) => prev + 1)
    }
  }

  const handleRetry = () => {
    handleConfirmModalYes()
  }

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShowConfirmModal(true)
    setSubmissionError(null)
    setRetryCount(0)
  }

  return (
    <>
      <BackgroundVideo />
      <div className="min-h-screen bg-[url('/images/space-background.jpg')] bg-cover bg-center bg-no-repeat text-white flex flex-col items-center justify-center py-10">
        <ApplySteps step={5} />

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showConfirmModal && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-[#121213] rounded-xl w-[440px] p-8 flex flex-col items-center justify-center relative shadow-lg space-y-6"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-white text-xl font-semibold text-center">Müraciətinizi təsdiq edirsinizmi?</h2>
                <button
                  onClick={handleConfirmModalClose}
                  className="absolute cursor-pointer top-5 right-5 text-red-500 hover:text-red-600 transition-colors"
                  aria-label="Close modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {submissionError && (
                  <div className="bg-red-500/20 border border-red-500 text-red-500 p-4 rounded-md text-sm mb-4 w-full">
                    <p className="font-medium mb-2">Xəta:</p>
                    <p>{submissionError}</p>

                    {retryCount < 3 && (
                      <button
                        onClick={handleRetry}
                        className="mt-3 bg-red-500 text-white py-2 px-4 rounded-md text-sm hover:bg-red-600 transition-colors w-full"
                      >
                        Yenidən cəhd edin ({retryCount}/3)
                      </button>
                    )}

                    {retryCount >= 3 && (
                      <div className="mt-3 text-amber-400 text-xs">
                        <p>
                          Maksimum cəhd sayı aşıldı. Zəhmət olmasa daha sonra yenidən cəhd edin və ya texniki dəstəklə
                          əlaqə saxlayın.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex space-x-8 w-full justify-center">
                  <button
                    onClick={handleConfirmModalClose}
                    className="border cursor-pointer border-red-500 text-red-500 py-3 px-10 rounded-lg hover:bg-red-50 transition font-medium"
                    disabled={isSubmitting}
                  >
                    Xeyr
                  </button>
                  <button
                    onClick={handleConfirmModalYes}
                    className="bg-green-500 cursor-pointer text-white py-3 px-10 rounded-lg hover:bg-green-600 transition font-medium"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Göndərilir...
                      </span>
                    ) : (
                      "Bəli"
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Thank You Modal */}
        <AnimatePresence>
          {showThankYouModal && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-[#121213] rounded-xl w-[440px] p-8 flex flex-col items-center justify-center relative shadow-lg text-center space-y-6"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-white text-2xl font-bold">Müraciətiniz üçün təşəkkür edirik!</h2>
                <p className="text-white text-base max-w-[360px] mx-auto">
                  Müraciətinizin nəticəsi barəsində qısa zamanda sizinlə əlaqə saxlanılacaqdır.
                </p>

                <button
                  onClick={handleThankYouModalClose}
                  className="absolute top-5 right-5 text-red-500 hover:text-red-600 transition-colors"
                  aria-label="Close modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <img src="/img/click.svg" alt="Confirmation checkmark" className="w-20 h-20 mx-auto mt-2" />

                <button
                  onClick={handleThankYouModalClose}
                  className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Ana səhifəyə qayıt
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form section */}
        <div className="w-full max-w-4xl p-8 rounded-lg">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold">{page.title[language]}</h1>
          </div>
          <form className="space-y-8" onSubmit={handleSubmitForm}>
            {/* Company registry file */}
            <div className="space-y-2">
              <label htmlFor="companyRegistry" className="block text-lg cursor-pointer font-medium">
                {page.companyRegistry[language]}
              </label>
              <div className="relative">
                <label
                  htmlFor="companyRegistry"
                  className="w-full h-14 border border-gray-600 rounded-lg flex items-center justify-between px-4 bg-gray-800/30 text-gray-400 text-sm cursor-pointer select-none"
                >
                  {files.companyRegistry ? files.companyRegistry.name : "No file selected"}
                </label>
                <button
                  type="button"
                  className="text-white absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Download size={20} />
                </button>
                <input
                  id="companyRegistry"
                  type="file"
                  className="hidden"
                  accept=".doc,.docx,.pdf"
                  onChange={(e) => handleFileChange(e, "companyRegistry")}
                />
              </div>
              <p className="text-sm text-gray-400">{page.fileFormatText[language]}</p>
            </div>

            {/* Financial reports file */}
            <div className="space-y-2">
              <label htmlFor="financialReports" className="block text-lg cursor-pointer font-medium">
                {page.financialReports[language]}
              </label>
              <div className="relative">
                <label
                  htmlFor="financialReports"
                  className="w-full h-14 border border-gray-600 rounded-lg flex items-center justify-between px-4 bg-gray-800/30 text-gray-400 text-sm cursor-pointer select-none"
                >
                  {files.financialReports ? files.financialReports.name : "No file selected"}
                </label>
                <button
                  type="button"
                  className="text-white absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <Download size={20} />
                </button>
                <input
                  id="financialReports"
                  type="file"
                  className="hidden"
                  accept=".doc,.docx,.pdf,.xls,.xlsx"
                  onChange={(e) => handleFileChange(e, "financialReports")}
                />
              </div>
              <p className="text-sm text-gray-400">
                {page.fileFormatText[language]}
              </p>

              <p className="text-sm italic text-[#F9F9F9]">
                {page.applyNeedText[language]}
              </p>
            </div>

            {/* Agreement checkboxes */}
            <div className="space-y-4">
              <div className="flex items-start">
                <label
                  htmlFor="confirmAccuracy"
                  className="flex items-start cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="confirmAccuracy"
                    name="confirmAccuracy"
                    checked={agreements.confirmAccuracy}
                    onChange={handleCheckboxChange}
                    className="hidden"
                  />
                  <span className="mt-1 w-5 h-5 flex items-center justify-center border border-gray-400 rounded">
                    {agreements.confirmAccuracy && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="ml-2 text-sm text-gray-400">
                    {page.checkboxes.confirmAccuracy[language]}
                  </span>
                </label>
              </div>

              <div className="flex items-start">
                <label
                  htmlFor="contactConsent"
                  className="flex items-start cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="contactConsent"
                    name="contactConsent"
                    checked={agreements.contactConsent}
                    onChange={handleCheckboxChange}
                    className="hidden"
                  />
                  <span className="mt-1 w-5 h-5 flex items-center justify-center border border-gray-400 rounded">
                    {agreements.contactConsent && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="ml-2 text-sm text-gray-400">
                    {page.checkboxes.contactConsent[language]}
                  </span>
                </label>
              </div>

              <div className="flex items-start">
                <label
                  htmlFor="termsAgreement"
                  className="flex items-start cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="termsAgreement"
                    name="termsAgreement"
                    checked={agreements.termsAgreement}
                    onChange={handleCheckboxChange}
                    className="hidden"
                  />
                  <span className="mt-1 w-5 h-5 flex items-center justify-center border border-gray-400 rounded">
                    {agreements.termsAgreement && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </span>
                  <span
                    className="ml-2 text-sm text-gray-400 underline underline-offset-8"
                    onClick={downloadPDF}
                  >
                    {page.checkboxes.termsAgreement[language]}
                  </span>
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
                {pagesTranslations.applyBtns.backBtn[language]}
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
                {isSubmitting ? page.buttons.submitting[language] : page.buttons.confirm[language]}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
