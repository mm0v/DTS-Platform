// Apply.tsx
import { Routes, Route, useNavigate } from "react-router-dom";
import ApplyOne from "./ApplyOne";
import ApplyTwo from "./ApplyTwo";
import ApplyThree from "./ApplyThree";
import ApplyFour from "./ApplyFour";
import ApplyFive from "./ApplyFive";
import { useState } from "react";
import { companyService } from "../services/companyService";
import { FormContext } from "../context/FormContext";
import type { FormContextType } from "../context/FormContext";

const Apply = () => {
  const navigate = useNavigate();
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
      digitalLevel: "",
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
  });

  const handleSubmit = async () => {
    try {
      await companyService.submitCompanyData({ companyRequest: formData });
      navigate("/success");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <FormContext.Provider value={{ formData, setFormData, handleSubmit }}>
      <Routes>
        <Route index element={<ApplyOne />} />
        <Route path="two" element={<ApplyTwo />} />
        <Route path="three" element={<ApplyThree />} />
        <Route path="four" element={<ApplyFour />} />
        <Route path="five" element={<ApplyFive />} />
      </Routes>
    </FormContext.Provider>
  );
};

export default Apply;
