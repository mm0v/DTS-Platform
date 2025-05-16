"use client"

import type React from "react"

import { createContext, useState, type ReactNode } from "react"
import { companyService } from "../services/companyService"

// Update the FormContextType to include the file state
export interface FormContextType {
  formData: {
    companyData: {
      companyName: string
      companyRegisterNumber: string
      createYear: number | null
      workerCount: string
      annualTurnover: string
      address: string
      cityAndRegion: string
      website: string
      contactName: string
      contactEmail: string
      contactPhone: string
    }
    declarationConsent: {
      dataIsReal: boolean
      permitContact: boolean
    }
    digitalLeadership: {
      digitalTeamOrLead: boolean
      digitalPath: boolean
      digitalTransformationLoyality: boolean
    }
    digitalReadiness: {
      keyChallenges: string[]
      digitalLevel: number
      digitalTools: string[]
      companyPurpose: string
    }
    financialNeeding: {
      financialNeed: boolean
      neededBudget: string
    }
    propertyLaw: {
      businessOperations: string
      companyLawType: string
      products: string
      exportActivity: boolean
      exportBazaar: string | string[]
    }
  }
  setFormData: React.Dispatch<React.SetStateAction<FormContextType["formData"]>>
  handleSubmit: () => Promise<any>
  isSubmitting: boolean
  submitError: string | null
  submitSuccess: boolean
}

// Create the context with a default value
export const FormContext = createContext<FormContextType | null>(null)

// Create a provider component
export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const [formData, setFormData] = useState<FormContextType["formData"]>({
    companyData: {
      companyName: "",
      companyRegisterNumber: "",
      createYear: null,
      workerCount: "",
      annualTurnover: "",
      address: "",
      cityAndRegion: "",
      website: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
    },
    declarationConsent: {
      dataIsReal: false,
      permitContact: false,
    },
    digitalLeadership: {
      digitalTeamOrLead: false,
      digitalPath: false,
      digitalTransformationLoyality: false,
    },
    digitalReadiness: {
      keyChallenges: [],
      digitalLevel: 0,
      digitalTools: [],
      companyPurpose: "",
    },
    financialNeeding: {
      financialNeed: false,
      neededBudget: "",
    },
    propertyLaw: {
      businessOperations: "",
      companyLawType: "",
      products: "",
      exportActivity: false,
      exportBazaar: "",
    },
  })

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      setSubmitError(null)

      // Get files from localStorage if they exist
      const filesData = JSON.parse(localStorage.getItem("files") || "{}")
      const files = {
        companyRegistry: filesData.companyRegistry || null,
        financialReports: filesData.financialReports || null,
      }

      // Prepare API data
      const apiData = {
        companyData: {
          companyName: formData.companyData.companyName,
          companyRegisterNumber: formData.companyData.companyRegisterNumber,
          createYear: formData.companyData.createYear || new Date().getFullYear(),
          workerCount: formData.companyData.workerCount,
          annualTurnover: formData.companyData.annualTurnover,
          address: formData.companyData.address,
          cityAndRegion: formData.companyData.cityAndRegion,
          website: formData.companyData.website,
          contactName: formData.companyData.contactName,
          contactEmail: formData.companyData.contactEmail,
          contactPhone: formData.companyData.contactPhone,
        },
        declarationConsent: {
          dataIsReal: Boolean(formData.declarationConsent.dataIsReal),
          permitContact: Boolean(formData.declarationConsent.permitContact),
        },
        digitalLeadership: {
          digitalTeamOrLead: Boolean(formData.digitalLeadership.digitalTeamOrLead),
          digitalPath: Boolean(formData.digitalLeadership.digitalPath),
          digitalTransformationLoyality: Boolean(formData.digitalLeadership.digitalTransformationLoyality),
        },
        digitalReadiness: {
          ...formData.digitalReadiness,
          digitalLevel: Number(formData.digitalReadiness.digitalLevel),
          keyChallenges: formData.digitalReadiness.keyChallenges || [],
          digitalTools: formData.digitalReadiness.digitalTools || [],
        },
        financialNeeding: {
          financialNeed: Boolean(formData.financialNeeding.financialNeed),
          neededBudget: formData.financialNeeding.neededBudget,
        },
        propertyLaw: {
          businessOperations: formData.propertyLaw.businessOperations,
          companyLawType: formData.propertyLaw.companyLawType,
          products: formData.propertyLaw.products,
          exportActivity: Boolean(formData.propertyLaw.exportActivity),
          exportBazaar: Array.isArray(formData.propertyLaw.exportBazaar)
            ? formData.propertyLaw.exportBazaar.join(", ")
            : formData.propertyLaw.exportBazaar,
        },
      }

      console.log("Submitting form data:", apiData)

      // Submit data using the service
      const response = await companyService.submitCompanyData(apiData, files)
      console.log("Submission successful!", response)

      setSubmitSuccess(true)
      return response
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitError("Məlumatların göndərilməsi zamanı xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.")
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        handleSubmit,
        isSubmitting,
        submitError,
        submitSuccess,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}
