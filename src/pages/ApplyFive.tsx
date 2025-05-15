"use client"
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Download } from "lucide-react";
import BackgroundVideo from "../components/BackgroundVideo";
import { FormContext } from "../context/FormContext";
import { useLanguage } from "../context/LanguageContext";
import ApplySteps from "../components/ApplySteps";
import { motion, AnimatePresence } from "framer-motion";

interface FileState {
  companyRegistry: File | null;
  financialReports: File | null;
}
interface AgreementState {
  confirmAccuracy: boolean;
  contactConsent: boolean;
  termsAgreement: boolean;
}

export default function ApplyFive() {
  const navigate = useNavigate();
  const context = useContext(FormContext);
  const { language, pagesTranslations } = useLanguage();
  const page = pagesTranslations.apply5;
  if (!context) {
    throw new Error("ApplyFive must be used within a FormContext.Provider");
  }

  const { setFormData } = context;
  const [files, setFiles] = useState<FileState>({
    companyRegistry: null,
    financialReports: null,
  });

  const [agreements, setAgreements] = useState<AgreementState>({
    confirmAccuracy: false,
    contactConsent: false,
    termsAgreement: false,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const allAgreementsChecked = Object.values(agreements).every(
    (value) => value === true
  );

  // Modal visibility states
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showThankYouModal, setShowThankYouModal] = useState<boolean>(false);

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem("files") || "{}");
    const savedAgreements = JSON.parse(localStorage.getItem("agreements") || "{}");
    if (savedFiles.companyRegistry) {
      setFiles((prev) => ({
        ...prev,
        companyRegistry: savedFiles.companyRegistry,
      }));
    }
    if (savedFiles.financialReports) {
      setFiles((prev) => ({
        ...prev,
        financialReports: savedFiles.financialReports,
      }));
    }
    setAgreements(savedAgreements);
  }, []);

  useEffect(() => {
    localStorage.setItem("files", JSON.stringify(files));
    localStorage.setItem("agreements", JSON.stringify(agreements));
  }, [files, agreements]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: keyof FileState) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFiles((prev) => ({
        ...prev,
        [fileType]: file,
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAgreements((prev) => ({
      ...prev,
      [name as keyof AgreementState]: checked,
    }));

    if (name === "confirmAccuracy") {
      setFormData((prev) => ({
        ...prev,
        declarationConsent: {
          ...prev.declarationConsent,
          dataIsReal: checked,
        },
      }));
    } else if (name === "contactConsent") {
      setFormData((prev) => ({
        ...prev,
        declarationConsent: {
          ...prev.declarationConsent,
          permitContact: checked,
        },
      }));
    }
  };

  const handleGoBack = () => {
    navigate("/apply/four");
  };

  const handleConfirmModalClose = () => {
    setShowConfirmModal(false);
  };

  const handleThankYouModalClose = () => {
    setShowThankYouModal(false);
  };

  // Yeni: təsdiqləmə modalının Bəli düyməsi funksiyası
  const handleConfirmModalYes = () => {
    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmModal(false);
      setShowThankYouModal(true); // Yeni təşəkkür modalını göstər
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowConfirmModal(true); // İlk təsdiq modalını aç
  };

  return (
    <>
      <BackgroundVideo />
      <div className="min-h-screen bg-[url('/images/space-background.jpg')] bg-cover bg-center bg-no-repeat text-white flex flex-col items-center justify-center py-10">
        <ApplySteps step={5} />

        {/* Təsdiq Modalı */}
     

        {/* Təşəkkür Modalı */}
      {/* Təsdiq Modalı */}
<AnimatePresence>
  {showConfirmModal && (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
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
        <h2 className="text-white text-xl font-semibold text-center">
          Müraciətinizi təsdiq edirsinizmi?
        </h2>
        <button
          onClick={handleConfirmModalClose}
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

        <div className="flex space-x-8 w-full justify-center">
          <button
            onClick={handleConfirmModalClose}
            className="border border-red-500 text-red-500 py-3 px-10 rounded-lg hover:bg-red-50 transition font-medium"
            disabled={isSubmitting}
          >
            Xeyr
          </button>
          <button
            onClick={handleConfirmModalYes}
            className="bg-green-500 text-white py-3 px-10 rounded-lg hover:bg-green-600 transition font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Göndərilir..." : "Bəli"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

{/* Təşəkkür Modalı */}
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
        <h2 className="text-white text-2xl font-bold">
          Müraciətiniz üçün təşəkkür edirik!
        </h2>
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

        <img
          src="/img/click.svg"
          alt="Confirmation checkmark"
          className="w-20 h-20 mx-auto mt-2"
        />
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>



        {/* Form bölməsi */}
        <div className="w-full max-w-4xl p-8 rounded-lg">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold">{page.title[language]}</h1>
          </div>
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Şirkətin dövlət reyestri faylı */}
            <div className="space-y-2">
              <label
                htmlFor="companyRegistry"
                className="block text-lg cursor-pointer font-medium"
              >
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

            {/* Maliyyə hesabatları faylı */}
            <div className="space-y-2">
              <label
                htmlFor="financialReports"
                className="block text-lg cursor-pointer font-medium"
              >
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
              <p className="text-sm text-gray-400">{page.fileFormatText[language]}</p>
            </div>

            {/* Razılıq qutuları */}
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
                <label
                  htmlFor="confirmAccuracy"
                  className="ml-2 text-sm text-gray-400"
                >
                  {page.checkboxes.confirmAccuracy[language]}
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
                <label
                  htmlFor="contactConsent"
                  className="ml-2 text-sm text-gray-400"
                >
                  {page.checkboxes.contactConsent[language]}
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
                <label
                  htmlFor="termsAgreement"
                  className="ml-2 text-sm text-gray-400"
                >
                  {page.checkboxes.termsAgreement[language]}
                </label>
              </div>
            </div>

            {/* Düymələr */}
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
                {isSubmitting
                  ? page.buttons.submitting[language]
                  : page.buttons.confirm[language]}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
