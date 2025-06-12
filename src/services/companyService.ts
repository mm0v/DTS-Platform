// import API from "./axiosConfig";
// interface CompanyRequest {
//   companyData: {
//     companyName: string;
//     companyRegisterNumber: string;
//     createYear: number;
//     workerCount: string;
//     annualTurnover: string;
//     address: string;
//     cityAndRegion: string;
//     website: string;
//     contactName: string;
//     contactEmail: string;
//     contactPhone: string;
//   };
//   declarationConsent: {
//     dataIsReal: boolean;
//     permitContact: boolean;
//     privacyAcceptance: boolean;
//   };
//   digitalLeadership: {
//     digitalTeamOrLead: boolean;
//     digitalPath: boolean;
//     digitalTransformationLoyality: boolean;
//   };
//   financialNeeding: {
//     financialNeed: boolean;
//     neededBudget: string;
//   };
//   digitalReadiness: {
//     keyChallenges: string[];
//     digitalLevel: number;
//     digitalTools: string[];
//     companyPurpose: string;
//   };
//   propertyLaw: {
//     businessOperations: string;
//     companyLawType: string;
//     products: string;
//     exportActivity: boolean;
//     exportBazaar: string[];
//   };
// }

// export const companyService = {
//   submitCompanyData: async (
//     companyRequest: CompanyRequest,
//     files: {
//       propertyLawCertificate: File | null;
//       registerCertificate?: File | null;
//       financialStatement?: File | null;
//     },
//     recaptchaToken: string // ADDED: reCAPTCHA token parameter
//   ): Promise<unknown> => {
//     const formData = new FormData();

//     const jsonBlob = new Blob([JSON.stringify(companyRequest)], {
//       type: "application/json",
//     });
//     formData.append("companyRequest", jsonBlob);

//     if (files.propertyLawCertificate) {
//       formData.append("propertyLawCertificate", files.propertyLawCertificate);
//     }

//     if (files.registerCertificate) {
//       formData.append("registerCertificate", files.registerCertificate);
//     }

//     if (files.financialStatement) {
//       formData.append("financialStatement", files.financialStatement);
//     }

//     // ADDED: Append reCAPTCHA token to FormData
//     formData.append("recaptchaToken", recaptchaToken);

//     try {
//       const response = await API.post("/api/v1/company/add", formData);
//       return response.data;
//     } catch (error) {
//       console.error("FormData submission failed:", error);
//       throw error;
//     }
//   },
// };
import API from "./axiosConfig";

interface CompanyRequest {
  companyData: {
    companyName: string;
    companyRegisterNumber: string;
    createYear: number;
    workerCount: string;
    annualTurnover: string;
    address: string;
    cityAndRegion: string;
    website: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
  };
  declarationConsent: {
    dataIsReal: boolean;
    permitContact: boolean;
    privacyAcceptance: boolean;
  };
  digitalLeadership: {
    digitalTeamOrLead: boolean;
    digitalPath: boolean;
    digitalTransformationLoyality: boolean;
  };
  financialNeeding: {
    financialNeed: boolean;
    neededBudget: string;
  };
  digitalReadiness: {
    keyChallenges: string[];
    digitalLevel: number;
    digitalTools: string[];
    companyPurpose: string;
  };
  propertyLaw: {
    businessOperations: string;
    companyLawType: string;
    products: string;
    exportActivity: boolean;
    exportBazaar: string[];
  };
}

export const companyService = {
  submitCompanyData: async (
    companyRequest: CompanyRequest,
    files: {
      propertyLawCertificate: File | null;
      registerCertificate?: File | null;
      financialStatement?: File | null;
    },
    recaptchaToken: string
  ): Promise<unknown> => {
    // Validate reCAPTCHA token before making request
    if (!recaptchaToken || recaptchaToken.trim().length === 0) {
      throw new Error("reCAPTCHA token is required");
    }

    console.log(
      "🔐 Submitting with reCAPTCHA token:",
      recaptchaToken.substring(0, 20) + "..."
    );

    // Check if we're getting test tokens
    if (recaptchaToken.startsWith("03AF") || recaptchaToken.startsWith("09A")) {
      console.warn("⚠️ Sending test token to backend - may fail validation");
    } else {
      console.log("✅ Sending production token to backend");
    }

    const formData = new FormData();

    // Add the JSON data as a blob
    const jsonBlob = new Blob([JSON.stringify(companyRequest)], {
      type: "application/json",
    });
    formData.append("companyRequest", jsonBlob);

    // Add required property law certificate
    if (files.propertyLawCertificate) {
      formData.append("propertyLawCertificate", files.propertyLawCertificate);
    } else {
      throw new Error("Property law certificate is required");
    }

    // Add optional register certificate
    if (files.registerCertificate) {
      formData.append("registerCertificate", files.registerCertificate);
    }

    // Add optional financial statement
    if (files.financialStatement) {
      formData.append("financialStatement", files.financialStatement);
    }

    // CRITICAL: Add reCAPTCHA token - this is essential for backend validation
    formData.append("recaptchaToken", recaptchaToken);

    try {
      const response = await API.post("/api/v1/company/add", formData, {
        headers: {
          // Let axios set the content-type automatically for FormData
          // This ensures proper multipart/form-data boundary is set
        },
        timeout: 60000, // Increase timeout for file uploads
      });

      console.log("✅ Backend submission successful:", response.status);
      return response.data;
    } catch (error: any) {
      console.error("❌ FormData submission failed:", error);

      // Handle specific error types
      if (error.name === "CaptchaError") {
        throw new Error("reCAPTCHA verification failed. Please try again.");
      }

      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const message = error.response.data?.message || error.message;

        console.error("Backend error response:", {
          status,
          message,
          data: error.response.data,
        });

        switch (status) {
          case 400:
            if (
              message.toLowerCase().includes("recaptcha") ||
              message.toLowerCase().includes("captcha")
            ) {
              console.error("🚨 Backend reCAPTCHA validation failed");
              throw new Error(
                "reCAPTCHA verification failed. Please complete the reCAPTCHA and try again."
              );
            }
            throw new Error(`Validation error: ${message}`);
          case 413:
            throw new Error(
              "File size too large. Please reduce file size and try again."
            );
          case 429:
            throw new Error(
              "Too many requests. Please wait a moment and try again."
            );
          case 500:
            console.error("🚨 Backend internal server error");
            throw new Error("Server error occurred. Please try again later.");
          default:
            throw new Error(`Request failed with status ${status}: ${message}`);
        }
      } else if (error.request) {
        // Network error
        console.error("🌐 Network error:", error.request);
        throw new Error(
          "Network error. Please check your connection and try again."
        );
      } else {
        // Other error
        console.error("❓ Unknown error:", error);
        throw error;
      }
    }
  },
};
