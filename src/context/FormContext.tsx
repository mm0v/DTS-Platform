// // Update your FormContext.tsx to include the new properties

// import { createContext } from "react";

// // Update the FormContextType to include the file state
// export interface FormContextType {
//   formData: {
//     companyData: {
//       companyName: string;
//       companyRegisterNumber: string;
//       createYear: number | null;
//       workerCount: string;
//       annualTurnover: string;
//       address: string;
//       cityAndRegion: string;
//       website: string;
//       contactName: string;
//       contactEmail: string;
//       contactPhone: string;
//       declarationConsent: {
//         dataIsReal: boolean;
//         permitContact: boolean;
//         privacyAcceptance: boolean;
//       };
//       digitalLeadership: {
//         digitalTeamOrLead: boolean;
//         digitalPath: boolean;
//         digitalTransformationLoyality: boolean;
//       };
//       digitalReadiness: {
//         keyChallenges: string[];
//         digitalLevel: number;
//         digitalTools: string[];
//         companyPurpose: string;
//       };
//       financialNeeding: {
//         financialNeed: boolean;
//         neededBudget: string;
//       };
//       propertyLaw: {
//         businessOperations: string;
//         companyLawType: string;
//         products: string;
//         exportActivity: boolean;
//         exportBazaar: string | string[];
//       };
//     };
//   };
//   setFormData: React.Dispatch<
//     React.SetStateAction<FormContextType["formData"]>
//   >;
//   handleSubmit: () => Promise<void>;
//   isSubmitting: boolean;
//   files: File[];
//   setFiles: (files: File[]) => void;
// }

// export const FormContext = createContext<FormContextType | undefined>(
//   undefined
// );


// Update your FormContext.tsx to include the new properties

import { createContext } from "react";

// Update the FormContextType to include the file state
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
      digitalReadiness: {
        keyChallenges: string[];
        digitalLevel: number;
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
        exportBazaar: string | string[];
      };
    };
  };
  setFormData: React.Dispatch<
    React.SetStateAction<FormContextType["formData"]>
  >;
  handleSubmit: () => Promise<void>;
  isSubmitting: boolean;
  files: File[];
  setFiles: (files: File[]) => void;
}

export const FormContext = createContext<FormContextType | undefined>(
  undefined
);