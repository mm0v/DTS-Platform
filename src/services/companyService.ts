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
    files?: {
      propertyLawCertificate: File | null;
      registerCertificate?: File | null;
      financialStatement?: File | null;
    }
  ): Promise<unknown> => {
    const formData = new FormData();

    formData.append("companyRequest", JSON.stringify(companyRequest));

    if (files?.propertyLawCertificate) {
      formData.append("propertyLawCertificate", files.propertyLawCertificate);
    }

    if (files?.registerCertificate) {
      formData.append("registerCertificate", files.registerCertificate);
    }

    if (files?.financialStatement) {
      formData.append("financialStatement", files.financialStatement);
    }

    try {
      const response = await API.post("/api/v1/company/add", formData);
      return response.data;
      return;
    } catch (error) {
      console.error("FormData submission failed:", error);
      throw error;
    }
  },
};
