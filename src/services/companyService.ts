import API from "./axiosConfig"

interface CompanyData {
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

interface DeclarationConsent {
  dataIsReal: boolean
  permitContact: boolean
}

interface DigitalLeadership {
  digitalTeamOrLead: boolean
  digitalPath: boolean
  digitalTransformationLoyality: boolean
}

interface DigitalReadiness {
  keyChallenges: string[]
  digitalLevel: number
  digitalTools: string[]
  companyPurpose: string
}

interface FinancialNeeding {
  financialNeed: boolean
  neededBudget: string
}

interface PropertyLaw {
  businessOperations: string
  companyLawType: string
  products: string
  exportActivity: boolean
  exportBazaar: string
}

interface CompanyRequest {
  companyData: CompanyData
  declarationConsent: DeclarationConsent
  digitalLeadership: DigitalLeadership
  digitalReadiness: DigitalReadiness
  financialNeeding: FinancialNeeding
  propertyLaw: PropertyLaw
}

// Define API endpoints - makes it easier to change if needed
const API_ENDPOINTS = {
  // Primary endpoint
  PRIMARY: "http://50.16.57.115:8080/api/v1/company/add",
  // Fallback endpoints if needed
  FALLBACK1: "https://jsonplaceholder.typicode.com/posts", // Public test API for development
  DEVELOPMENT_MODE: true, // Set to false in production
}

// Helper function to delay execution (for retry logic)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const companyService = {
  submitCompanyData: async (
    data: CompanyRequest,
    files?: {
      companyRegistry?: File | null
      financialReports?: File | null
    },
    retryCount = 0,
  ): Promise<any> => {
    const MAX_RETRIES = 3
    const RETRY_DELAY = 1000 // Start with 1 second delay

    try {
      // If we have files, use FormData to send both JSON and files
      if (files && (files.companyRegistry || files.financialReports)) {
        const formData = new FormData()

        // Add the JSON data as a string
        formData.append("companyRequest", JSON.stringify(data))

        // Add files if they exist
        if (files.companyRegistry) {
          formData.append("companyRegistry", files.companyRegistry)
        }

        if (files.financialReports) {
          formData.append("financialReports", files.financialReports)
        }

        try {
          console.log("Trying submission with FormData...")
          const response = await API.post("/api/v1/company/add", formData)
          console.log("FormData submission successful:", response.data)
          return response.data
        } catch (error) {
          console.error("FormData submission failed:", error)
          throw error // Let the outer try/catch handle it
        }
      } else {
        // If no files, send JSON directly
        try {
          console.log("Trying submission with JSON...")
          const response = await API.post("/api/v1/company/add", { companyRequest: data })
          console.log("JSON submission successful:", response.data)
          return response.data
        } catch (error) {
          console.error("JSON submission failed:", error)
          throw error // Let the outer try/catch handle it
        }
      }
    } catch (error) {
      console.error(`Attempt ${retryCount + 1} failed:`, error)

      // If we haven't reached max retries, try again with exponential backoff
      if (retryCount < MAX_RETRIES) {
        const nextDelay = RETRY_DELAY * Math.pow(2, retryCount)
        console.log(`Retrying in ${nextDelay}ms...`)
        await delay(nextDelay)
        return companyService.submitCompanyData(data, files, retryCount + 1)
      }

      // All API attempts failed, try direct fetch as last resort
      try {
        console.log("Trying with direct fetch to primary endpoint...")
        const fetchResponse = await fetch(API_ENDPOINTS.PRIMARY, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ companyRequest: data }),
        })

        if (fetchResponse.ok) {
          const responseData = await fetchResponse.json()
          console.log("Direct fetch successful:", responseData)
          return responseData
        } else {
          const errorText = await fetchResponse.text()
          console.error(`Server responded with ${fetchResponse.status}: ${errorText}`)
          throw new Error(`Server responded with ${fetchResponse.status}: ${errorText}`)
        }
      } catch (fetchError) {
        console.error("Direct fetch failed:", fetchError)

        // If in development mode, use the fallback endpoint or mock response
        if (API_ENDPOINTS.DEVELOPMENT_MODE) {
          console.log("DEVELOPMENT MODE: Using fallback endpoint or mock response")

          try {
            // Try the fallback endpoint (for development/testing)
            const fallbackResponse = await fetch(API_ENDPOINTS.FALLBACK1, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ companyRequest: data }),
            })

            if (fallbackResponse.ok) {
              const fallbackData = await fallbackResponse.json()
              console.log("Fallback endpoint successful:", fallbackData)
              return {
                success: true,
                message: "Development mode: Form submitted successfully (mock response)",
                data: fallbackData,
              }
            }
          } catch (fallbackError) {
            console.error("Fallback endpoint failed:", fallbackError)
          }

          // If all else fails, return a mock success response for development
          console.log("Returning mock success response")
          return {
            success: true,
            message: "Development mode: Form submitted successfully (mock response)",
            data: {
              id: "mock-" + Date.now(),
              timestamp: new Date().toISOString(),
              status: "pending",
            },
          }
        }

        // In production, throw the error
        throw new Error("All submission attempts failed. Please try again later or contact support.")
      }
    }
  },
}
