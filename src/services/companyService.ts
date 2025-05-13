import axiosInstance from "./axiosConfig";

interface CompanyRequest {
  companyData: {
    companyName: string;
    companyRegisterNumber: string;
    createYear: number | null;
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
  };
  digitalLeadership: {
    digitalTeamOrLead: boolean;
    digitalPath: boolean;
    digitalTransformationLoyality: boolean;
  };
  digitalReadiness: {
    keyChallenges: string[];
    digitalLevel: number; // Changed from string to number
    digitalTools: string[];
    companyPurpose: string;
  };
  financialNeeding: {
    financialNeed: boolean;
    neededBudget: string;
  };
  propertyLaw: {
    businessOperations: string;
    companyLawType: string;
    products: string;
    exportActivity: boolean;
    exportBazaar: string;
  };
}

export const companyService = {
  // Removed unnecessary try/catch wrapper
  submitCompanyData: async (data: { companyRequest: CompanyRequest }) => {
    // Update endpoint URL to match your actual API
    const response = await axiosInstance.post("/v1/company/add", data);
    return response.data;
  },
};

// import axiosInstance from './axiosConfig';

// export const companyService = {
//   submitCompanyData: async (data) => {
//     try {
//       const response = await axiosInstance.post('/api/company', data);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   },
// };
