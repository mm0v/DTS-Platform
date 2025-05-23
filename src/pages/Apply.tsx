import { Routes, Route } from "react-router-dom";
import ApplyOne from "./ApplyOne";
import ApplyTwo from "./ApplyTwo";
import ApplyThree from "./ApplyThree";
import ApplyFour from "./ApplyFour";
import { useState } from "react";
import { FormContext } from "../context/FormContext";
import type { FormContextType } from "../context/FormContext";
import ApplyFiveCopy from "./ApplyFive copy";

const Apply = () => {
  const [isSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const [formData, setFormData] = useState<FormContextType["formData"]>({
    companyData: {
      companyName: "",
      companyRegisterNumber: "",
      createYear: null as number | null,
      workerCount: "",
      annualTurnover: "",
      address: "",
      cityAndRegion: "",
      website: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      declarationConsent: {
        dataIsReal: false,
        permitContact: false,
        privacyAcceptance: false,
      },
      digitalLeadership: {
        digitalTeamOrLead: false,
        digitalPath: false,
        digitalTransformationLoyality: false,
      },
      digitalReadiness: {
        keyChallenges: [],
        digitalLevel: 1,
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
    },
  });

  const setFilesToUpload = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const handleSubmit = async () => {
    return;
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        handleSubmit,
        isSubmitting,
        files,
        setFiles: setFilesToUpload,
      }}
    >
      <Routes>
        <Route index element={<ApplyOne />} />
        <Route path="two" element={<ApplyTwo />} />
        <Route path="three" element={<ApplyThree />} />
        <Route path="four" element={<ApplyFour />} />
        <Route path="five" element={<ApplyFiveCopy />} />
      </Routes>
    </FormContext.Provider>
  );
};

export default Apply;
