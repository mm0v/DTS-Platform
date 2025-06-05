// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------
"use client";
import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Download } from "lucide-react";
import BackgroundVideo from "../components/BackgroundVideo";
import { FormContext } from "../context/FormContext";
import { useLanguage } from "../context/LanguageContext";
import ApplySteps from "../components/ApplySteps";
import { motion, AnimatePresence } from "framer-motion";
import { companyService } from "../services/companyService";
import ReCAPTCHA from "react-google-recaptcha";

// Replace with your actual reCAPTCHA site key
const RECAPTCHA_SITE_KEY = "6LerN1MrAAAAAHK3l-g1D8z0377xlEUT9_SbfQv-";

// Enhanced file type configuration with strict security
const ALLOWED_FILE_TYPES = {
  propertyLawCertificate: {
    mimeTypes: [
      "application/pdf",
      "application/msword", // .doc
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    ],
    extensions: ['.pdf', '.doc', '.docx'],
    accept: ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  },
  financialStatement: {
    mimeTypes: [
      "application/pdf",
      "application/msword", // .doc
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "application/vnd.ms-excel", // .xls
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    ],
    extensions: ['.pdf', '.doc', '.docx', '.xls', '.xlsx'],
    accept: ".pdf,.doc,.docx,.xls,.xlsx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  }
} as const;

// File signature validation for enhanced security
const FILE_SIGNATURES = {
  'application/pdf': [0x25, 0x50, 0x44, 0x46], // %PDF
  'application/msword': [0xD0, 0xCF, 0x11, 0xE0], // MS Office legacy
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [0x50, 0x4B, 0x03, 0x04], // ZIP-based
  'application/vnd.ms-excel': [0xD0, 0xCF, 0x11, 0xE0], // MS Office legacy
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [0x50, 0x4B, 0x03, 0x04] // ZIP-based
} as const;

const DB_NAME = "ALL files";
const STORE_NAME = "files";

function openDB(): Promise<IDBDatabase> {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
}

async function saveFileToIndexedDB(file: File, FILE_KEY: string): Promise<void> {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const putRequest = store.put(file, FILE_KEY);
    putRequest.onsuccess = () => resolve();
    putRequest.onerror = () => reject(putRequest.error);
  });
}

async function getFileFromIndexedDB(
  FILE_KEY:
    | "propertyLawCertificate"
    | "financialStatement"
    | "registerCertificate"
): Promise<File | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const getRequest = store.get(FILE_KEY);
    getRequest.onsuccess = () => resolve(getRequest.result || null);
    getRequest.onerror = () => reject(getRequest.error);
  });
}

interface DeclarationAndFileState {
  files: FileState;
  declaration: DeclarationConsent;
}

interface FileState {
  propertyLawCertificate: Pick<File, "size" | "name" | "type"> | null;
  financialStatement: Pick<File, "size" | "name" | "type"> | null;
}

interface DeclarationConsent {
  dataIsReal: boolean;
  permitContact: boolean;
  privacyAcceptance: boolean;
}

type FileType = "propertyLawCertificate" | "financialStatement";

interface FileValidationResult {
  isValid: boolean;
  errors: string[];
}

// Enhanced file validation function with security checks
const validateFileTypeAndSignature = async (file: File, fileType: FileType): Promise<FileValidationResult> => {
  const allowedConfig = ALLOWED_FILE_TYPES[fileType];
  const errors: string[] = [];

  // Sanitize file name
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  if (sanitizedName !== file.name) {
    console.warn('File name was sanitized for security');
  }

  // Check file extension
  const fileExtension = file.name.toLowerCase().split('.').pop();
  const allowedExtensions = allowedConfig.extensions.map(ext => ext.slice(1));

  if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
    errors.push('Invalid or missing file extension');
  }

  // Check MIME type
  if (!(allowedConfig.mimeTypes as readonly string[]).includes(file.type)) {
    errors.push('Invalid file MIME type');
  }

  // Verify MIME type matches extension
  const expectedExtensions: Record<string, string[]> = {
    'application/pdf': ['pdf'],
    'application/msword': ['doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx'],
    'application/vnd.ms-excel': ['xls'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['xlsx']
  };

  if (fileExtension && expectedExtensions[file.type] && !expectedExtensions[file.type].includes(fileExtension)) {
    errors.push('File extension does not match MIME type');
  }

  // Check file signature (magic numbers) for additional security
  try {
    const arrayBuffer = await file.slice(0, 8).arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const expectedSignature = FILE_SIGNATURES[file.type as keyof typeof FILE_SIGNATURES];
    if (expectedSignature) {
      const matches = expectedSignature.every((byte, index) => uint8Array[index] === byte);
      if (!matches) {
        errors.push('File signature validation failed - potential malicious file');
      }
    }
  } catch (error) {
    console.warn('Could not validate file signature:', error);
    errors.push('Could not validate file integrity');
  }

  // Additional security checks
  if (file.name.includes('..') || file.name.includes('/') || file.name.includes('\\')) {
    errors.push('Invalid characters in file name');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export default function ApplyFive() {
  const navigate = useNavigate();
  const context = useContext(FormContext);
  const { language, pagesTranslations } = useLanguage();
  const page = pagesTranslations.apply5;

  if (!context) {
    throw new Error("ApplyFive must be used within a FormContext.Provider");
  }

  const initialValue: DeclarationAndFileState = {
    files: {
      propertyLawCertificate: null,
      financialStatement: null,
    },
    declaration: {
      dataIsReal: false,
      permitContact: false,
      privacyAcceptance: false,
    },
  };

  const [formData, setFormData] = useState<DeclarationAndFileState>(initialValue);

  // reCAPTCHA state and ref
  const [recaptchaToken, setRecaptchaToken] = useState<string>("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const propertyLawCertificateRef = useRef<HTMLInputElement>(null);
  const financialStatementRef = useRef<HTMLInputElement>(null);

  // Form submission states
  const [localIsSubmitting, setLocalIsSubmitting] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showThankYouModal, setShowThankYouModal] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("restOfData") || "null");
    Promise.all([
      getFileFromIndexedDB("propertyLawCertificate").catch(() => null),
      getFileFromIndexedDB("financialStatement").catch(() => null),
    ])
      .then(([propertyFile, financialFile]) => {
        if (savedData) {
          const updatedData = {
            ...savedData,
            files: {
              ...savedData.files,
              ...(propertyFile && {
                propertyLawCertificate: {
                  name: propertyFile.name,
                  size: propertyFile.size,
                  type: propertyFile.type,
                },
              }),
              ...(financialFile && {
                financialStatement: {
                  name: financialFile.name,
                  size: financialFile.size,
                  type: financialFile.type,
                },
              }),
            },
          };

          setFormData(updatedData);

          if (propertyFile && propertyLawCertificateRef.current) {
            propertyLawCertificateRef.current.name = propertyFile.name;
          }
          if (financialFile && financialStatementRef.current) {
            financialStatementRef.current.name = financialFile.name;
          }
        }
      })
      .catch(console.error);
  }, []);

  const [errors, setErrors] = useState<Record<string, string>>({
    propertyLawCertificate: "",
    financialStatement: "",
    recaptcha: "",
  });

  // reCAPTCHA handlers
  const handleRecaptchaChange = (token: string | null): void => {
    setRecaptchaToken(token || "");
    if (token) {
      setErrors(prev => ({ ...prev, recaptcha: "" }));
    }
  };

  const resetRecaptcha = (): void => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
      setRecaptchaToken("");
    }
  };

  const getErrorMessage = (key: string): string => {
    if (language as string === 'az') {
      switch (key) {
        case 'recaptcha_required':
          return "reCAPTCHA təsdiq edilməlidir";
        case 'recaptcha_expired':
          return "reCAPTCHA müddəti bitdi, yenidən təsdiq edin";
        case 'recaptcha_error':
          return "reCAPTCHA xətası baş verdi";
        default:
          return "Bu sahə tələb olunur";
      }
    } else {
      switch (key) {
        case 'recaptcha_required':
          return "reCAPTCHA verification required";
        case 'recaptcha_expired':
          return "reCAPTCHA expired, please verify again";
        case 'recaptcha_error':
          return "reCAPTCHA error occurred";
        default:
          return "This field is required";
      }
    }
  };

  // Enhanced form validation with strict security
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Property law certificate validation (REQUIRED)
    if (!formData.files.propertyLawCertificate) {
      newErrors.propertyLawCertificate = page.errorMessages.propertyLawCertificateRequired[language];
    } else {
      const file = formData.files.propertyLawCertificate;
      const allowedTypes = ALLOWED_FILE_TYPES.propertyLawCertificate.mimeTypes;

      if (!allowedTypes.includes(file.type as ("application/pdf" | "application/msword" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"))) {
        newErrors.propertyLawCertificate = page.errorMessages.propertyLawCertificateType[language];
      }

      if (file.size >= 20000000) {
        newErrors.propertyLawCertificate = page.errorMessages.fileLimit[language];
      }
    }

    // Financial statement validation (OPTIONAL)
    if (formData.files.financialStatement) {
      const file = formData.files.financialStatement;
      const allowedTypes = ALLOWED_FILE_TYPES.financialStatement.mimeTypes;

      if (!allowedTypes.includes(file.type as ("application/pdf" | "application/msword" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document" | "application/vnd.ms-excel" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))) {
        newErrors.financialStatement = page.errorMessages.financialStatementType[language];
      }

      if (file.size >= 20000000) {
        newErrors.financialStatement = page.errorMessages.fileLimit[language];
      }
    }

    // reCAPTCHA validation
    if (!recaptchaToken) {
      newErrors.recaptcha = getErrorMessage('recaptcha_required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGoBack = (): void => {
    navigate("/apply/four");
  };

  const handleConfirmModalYes = async (): Promise<void> => {
    if (!validateForm()) {
      setLocalIsSubmitting(false);
      return;
    }

    setLocalIsSubmitting(true);
    try {
      const companyData = JSON.parse(localStorage.getItem("companyData")!);
      const digitalAndFinancial = JSON.parse(
        localStorage.getItem("digitalAndFinancial")!
      );
      const digitalReadiness = JSON.parse(
        localStorage.getItem("digitalReadiness")!
      );
      const propertyLaw = JSON.parse(localStorage.getItem("propertyLaw")!);
      const restOfData = JSON.parse(localStorage.getItem("restOfData")!);

      const dataToSubmit = {
        companyData: {
          companyName: companyData.companyName,
          companyRegisterNumber: companyData.companyRegisterNumber,
          createYear: Number(companyData.createYear),
          workerCount: companyData.companySize,
          annualTurnover: companyData.annualTurnover,
          address: companyData.companyAddress,
          cityAndRegion: companyData.location,
          website: companyData.website,
          contactName: companyData.contactPerson,
          contactEmail: companyData.email,
          contactPhone: companyData.phone,
        },
        declarationConsent: {
          dataIsReal: restOfData.declaration.dataIsReal,
          permitContact: restOfData.declaration.permitContact,
          privacyAcceptance: restOfData.declaration.privacyAcceptance,
        },
        digitalLeadership: {
          digitalTeamOrLead: digitalAndFinancial.digital.digitalTeamOrLead,
          digitalPath: digitalAndFinancial.digital.digitalPath,
          digitalTransformationLoyality:
            digitalAndFinancial.digital.digitalTransformationLoyality,
        },
        financialNeeding: {
          financialNeed: digitalAndFinancial.finance.financialNeed,
          neededBudget: digitalAndFinancial.finance.neededBudget,
        },
        digitalReadiness: {
          keyChallenges: digitalReadiness.keyChallenges,
          digitalLevel: Number(digitalReadiness.digitalLevel),
          digitalTools: digitalReadiness.digitalTools,
          companyPurpose: digitalReadiness.companyPurpose,
        },
        propertyLaw: {
          businessOperations: propertyLaw.businessOperations,
          companyLawType: propertyLaw.companyLawType,
          products: propertyLaw.products,
          exportActivity: propertyLaw.exportActivity,
          exportBazaar: propertyLaw.exportBazaar,
        },
      };

      const files: {
        propertyLawCertificate: File | null;
        registerCertificate: File | null;
        financialStatement: File | null;
      } = {
        propertyLawCertificate: null,
        registerCertificate: null,
        financialStatement: null,
      };

      const fileKeys = [
        "propertyLawCertificate",
        "financialStatement",
        "registerCertificate",
      ] as const;

      await Promise.all(
        fileKeys.map(async (key) => {
          try {
            const file = await getFileFromIndexedDB(key);
            files[key] = file;
          } catch {
            files[key] = null;
          }
        })
      );

      // Pass reCAPTCHA token to service
      await companyService.submitCompanyData(dataToSubmit, files, recaptchaToken);

      setShowConfirmModal(false);
      setShowThankYouModal(true);
      setSubmitSuccess(true);

      // Reset reCAPTCHA
      resetRecaptcha();
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmissionError(page.submissionErrorMessage[language]);
      setRetryCount((prev) => prev + 1);
      // Reset reCAPTCHA on error
      resetRecaptcha();
    } finally {
      setLocalIsSubmitting(false);
    }
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    const updatedValue = value === "on" ? true : false;
    const updatedData = {
      ...formData,
      declaration: {
        ...formData.declaration,
        [name]: updatedValue,
      },
    };
    setFormData(updatedData);
    localStorage.setItem("restOfData", JSON.stringify(updatedData));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Enhanced file change handler with strict security validation
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: FileType
  ): Promise<void> => {
    const file: File | undefined = e.target.files?.[0];

    // Clear previous errors
    setErrors(prev => ({
      ...prev,
      [type]: "",
    }));

    if (!file) return;

    // Size validation (20MB limit)
    const MAX_FILE_SIZE = 20 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      setErrors(prev => ({
        ...prev,
        [type]: page.errorMessages.fileLimit[language]
      }));
      e.target.value = '';
      return;
    }

    // Enhanced file type validation with security checks
    const validation = await validateFileTypeAndSignature(file, type);

    if (!validation.isValid) {
      setErrors(prev => ({
        ...prev,
        [type]: `${page.errorMessages[`${type}Type`][language]}. Security validation failed: ${validation.errors.join(', ')}`
      }));
      e.target.value = '';
      return;
    }

    // If validation passes, save the file
    try {
      await saveFileToIndexedDB(file, type);
      const updatedData = {
        ...formData,
        files: {
          ...formData.files,
          [type]: { name: file.name, size: file.size, type: file.type },
        },
      };
      setFormData(updatedData);
      localStorage.setItem("restOfData", JSON.stringify(updatedData));
    } catch (error) {
      console.error("Failed to save file to IndexedDB", error);
      setErrors(prev => ({
        ...prev,
        [type]: "Failed to save file securely"
      }));
    }
  };

  const downloadPDF = (e: React.MouseEvent<HTMLLabelElement>): void => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = "/Privacy.pdf";
    link.download = "Privacy.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (submitSuccess) {
      setShowConfirmModal(false);
      setShowThankYouModal(true);
    }
  }, [submitSuccess]);

  const handleConfirmModalClose = (): void => {
    setShowConfirmModal(false);
    setSubmissionError(null);
  };

  const handleThankYouModalClose = (): void => {
    setShowThankYouModal(false);
    navigate("/");
  };

  const handleRetry = (): void => {
    handleConfirmModalYes();
  };

  const handleSubmitForm = (): void => {
    if (validateForm()) {
      setShowConfirmModal(true);
      setSubmissionError(null);
      setRetryCount(0);
    }
  };

  // Updated form validation
  const isFormValid =
    formData.declaration?.dataIsReal &&
    formData.declaration?.privacyAcceptance &&
    formData.declaration?.permitContact &&
    recaptchaToken.length > 0;

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
                <h2 className="text-white text-xl font-semibold text-center">
                  {page.confirmModal.title[language]}
                </h2>
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {submissionError && (
                  <div className="bg-red-500/20 border border-red-500 text-red-500 p-4 rounded-md text-sm mb-4 w-full">
                    <p className="font-medium mb-2">
                      {page.submissionError.errorTitle[language]}
                    </p>
                    <p>{submissionError}</p>

                    {retryCount < 3 && (
                      <button
                        onClick={handleRetry}
                        className="mt-3 bg-red-500 text-white py-2 px-4 rounded-md text-sm hover:bg-red-600 transition-colors w-full"
                      >
                        {page.submissionError.retryButton[language]} (
                        {retryCount}/3)
                      </button>
                    )}

                    {retryCount >= 3 && (
                      <div className="mt-3 text-amber-400 text-xs">
                        <p>{page.submissionError.maxRetryMessage[language]}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex space-x-8 w-full justify-center">
                  <button
                    onClick={handleConfirmModalClose}
                    className="border cursor-pointer border-red-500 text-red-500 py-3 px-10 rounded-lg hover:bg-red-50 transition font-medium"
                    disabled={localIsSubmitting}
                  >
                    {page.confirmModal.noBtn[language]}
                  </button>
                  <button
                    onClick={handleConfirmModalYes}
                    className="bg-green-500 cursor-pointer text-white py-3 px-10 rounded-lg hover:bg-green-600 transition font-medium"
                    disabled={localIsSubmitting}
                  >
                    {localIsSubmitting ? (
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
                        {page.buttons.submitting[language]}
                      </span>
                    ) : (
                      page.confirmModal.yesBtn[language]
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
                <h2 className="text-white text-2xl font-bold">
                  {page.thankYouModal.title[language]}
                </h2>
                <p className="text-white text-base max-w-[360px] mx-auto">
                  {page.thankYouModal.message[language]}
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <img
                  src="/img/click.svg"
                  alt="Confirmation checkmark"
                  className="w-20 h-20 mx-auto mt-2"
                />

                <button
                  onClick={handleThankYouModalClose}
                  className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  {page.thankYouModal.backToHome[language]}
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
          <form className="space-y-8">
            {/* Company registry file */}
            <div className="space-y-2">
              <label
                htmlFor="companyRegistry"
                className="block text-lg cursor-pointer font-medium"
              >
                {page.companyRegistry[language]}
              </label>
              <div className="relative">
                <label
                  htmlFor="propertyLawCertificate"
                  className="w-full h-14 border border-gray-600 rounded-lg flex items-center justify-between px-4 bg-gray-800/30 text-gray-400 text-sm cursor-pointer select-none"
                >
                  <span className="truncate">
                    {formData.files?.propertyLawCertificate
                      ? formData.files.propertyLawCertificate.name
                      : "No file selected"}
                  </span>
                  <Download size={20} className="text-white ml-2" />
                </label>
                <button
                  type="button"
                  className={`w-full bg-transparent border text-white absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none sr-only ${errors.propertyLawCertificate
                    ? "border-red-400"
                    : "border-gray-700"
                    } rounded p-3 focus:outline-none focus:border-blue-500`}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                </button>
                <input
                  id="propertyLawCertificate"
                  type="file"
                  className="hidden"
                  accept={ALLOWED_FILE_TYPES.propertyLawCertificate.accept}
                  ref={propertyLawCertificateRef}
                  onChange={(e) => {
                    handleFileChange(e, "propertyLawCertificate");
                  }}
                />
              </div>
              <p className="text-sm text-gray-400">
                {page.fileFormatText[language]} (PDF, DOC, DOCX only)
              </p>

              {errors.propertyLawCertificate && (
                <p className="text-red-500 font-medium text-sm mt-1">
                  {errors.propertyLawCertificate}
                </p>
              )}
            </div>

            {/* Financial reports file */}
            <div className="space-y-2">
              <label
                htmlFor="financialReports"
                className="block text-lg cursor-pointer font-medium"
              >
                {page.financialReports[language]}
              </label>
              <div className="relative">
                <label
                  htmlFor="financialStatement"
                  className="w-full h-14 border border-gray-600 rounded-lg flex items-center justify-between px-4 bg-gray-800/30 text-gray-400 text-sm cursor-pointer select-none"
                >
                  <span className="truncate">
                    {formData.files?.financialStatement
                      ? formData.files?.financialStatement.name
                      : "No file selected"}
                  </span>
                  <Download size={20} className="text-white ml-2" />
                </label>
                <button
                  type="button"
                  className={`w-full bg-transparent border text-white absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none sr-only ${errors.financialStatement
                    ? "border-red-400"
                    : "border-gray-700"
                    } rounded p-3 focus:outline-none focus:border-blue-500`}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                </button>
                <input
                  id="financialStatement"
                  type="file"
                  className="hidden"
                  accept={ALLOWED_FILE_TYPES.financialStatement.accept}
                  ref={financialStatementRef}
                  onChange={(e) => {
                    handleFileChange(e, "financialStatement");
                  }}
                />
              </div>
              <p className="text-sm text-gray-400">
                {page.fileFormatText[language]} (PDF, DOC, DOCX, XLS, XLSX only)
              </p>

              <p className="text-sm italic text-[#F9F9F9]">
                {page.applyNeedText[language]}
              </p>

              {errors.financialStatement && (
                <p className="text-red-500 font-medium text-sm mt-1">
                  {errors.financialStatement}
                </p>
              )}
            </div>

            {/* Agreement checkboxes */}
            <div className="space-y-4">
              <div className="flex items-start">
                <label
                  htmlFor="dataIsReal"
                  className="flex items-start cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="dataIsReal"
                    name="dataIsReal"
                    checked={formData.declaration?.dataIsReal}
                    onChange={handleCheckboxChange}
                    className="hidden"
                  />
                  <span className="mt-1 w-5 h-5 flex items-center justify-center border border-gray-400 rounded">
                    {formData.declaration?.dataIsReal && (
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
                    {page.checkboxes.dataIsReal[language]}
                  </span>
                </label>
              </div>

              <div className="flex items-start">
                <label
                  htmlFor="permitContact"
                  className="flex items-start cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="permitContact"
                    name="permitContact"
                    checked={formData.declaration?.permitContact}
                    onChange={handleCheckboxChange}
                    className="hidden"
                  />
                  <span className="mt-1 w-5 h-5 flex items-center justify-center border border-gray-400 rounded">
                    {formData.declaration?.permitContact && (
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
                    {page.checkboxes.permitContact[language]}
                  </span>
                </label>
              </div>

              <div className="flex items-start">
                <label
                  htmlFor="privacyAcceptance"
                  className="flex items-start cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="privacyAcceptance"
                    name="privacyAcceptance"
                    checked={formData.declaration?.privacyAcceptance}
                    onChange={handleCheckboxChange}
                    className="hidden"
                  />
                  <span className="mt-1 w-5 h-5 flex items-center justify-center border border-gray-400 rounded">
                    {formData.declaration?.privacyAcceptance && (
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
                    {page.checkboxes.privacyAcceptance[language]}
                  </span>
                </label>
              </div>
            </div>

            {/* reCAPTCHA Component */}
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="transform scale-90 sm:scale-100">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={handleRecaptchaChange}
                    onExpired={() => {
                      setRecaptchaToken("");
                      setErrors(prev => ({
                        ...prev,
                        recaptcha: getErrorMessage('recaptcha_expired')
                      }));
                    }}
                    onError={() => {
                      setRecaptchaToken("");
                      setErrors(prev => ({
                        ...prev,
                        recaptcha: getErrorMessage('recaptcha_error')
                      }));
                    }}
                    theme="dark"
                    size="normal"
                  />
                </div>
              </div>
              {errors.recaptcha && (
                <p className="text-red-500 font-medium text-sm mt-1 text-center">
                  {errors.recaptcha}
                </p>
              )}
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
                type="button"
                onClick={handleSubmitForm}
                disabled={!isFormValid}
                className={`flex-1 py-3 rounded-lg transition-colors ${isFormValid
                  ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  : "bg-blue-900/50 text-gray-400 cursor-not-allowed"
                  }`}
              >
                {localIsSubmitting
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