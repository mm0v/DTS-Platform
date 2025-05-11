import axiosInstance from './axiosConfig';

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
    digitalLevel: string;
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
  submitCompanyData: async (data: { companyRequest: CompanyRequest }) => {
    try {
      const response = await axiosInstance.post('/api/company', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
}; 