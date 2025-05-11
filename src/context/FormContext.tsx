import { createContext } from "react";

// Define Byte type if not already defined elsewhere
type Byte = number; // 8-bit integer (0-255)

export interface FormContextType {
  formData: {
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
      digitalLevel: Byte; // Changed from string to Byte
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
  };
  setFormData: React.Dispatch<
    React.SetStateAction<FormContextType["formData"]>
  >;
  handleSubmit: () => Promise<void>;
}

export const FormContext = createContext<FormContextType | undefined>(
  undefined
);
