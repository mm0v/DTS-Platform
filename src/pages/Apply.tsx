import { Routes, Route } from "react-router-dom";
import ApplyOne from "./ApplyOne";
import ApplyTwo from "./ApplyTwo";
import ApplyThree from "./ApplyThree";
import ApplyFour from "./ApplyFour";
import ApplyFive from "./ApplyFive";
import { useState } from "react";
import API from "../services/axiosConfig";
import { FormContext } from "../context/FormContext";
import type { FormContextType } from "../context/FormContext";

const Apply = () => {
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
      digitalLevel: 0, // This is a Byte (number between 0-255)
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
      // Ensure digitalLevel is properly formatted as a byte
      const apiData = {
        companyRequest: {
          companyData: {
            companyName: formData.companyData.companyName,
            companyRegisterNumber: formData.companyData.companyRegisterNumber,
            createYear:
              formData.companyData.createYear || new Date().getFullYear(),
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
            digitalTeamOrLead: Boolean(
              formData.digitalLeadership.digitalTeamOrLead
            ),
            digitalPath: Boolean(formData.digitalLeadership.digitalPath),
            digitalTransformationLoyality: Boolean(
              formData.digitalLeadership.digitalTransformationLoyality
            ),
          },
          digitalReadiness: {
            ...formData.digitalReadiness,
            // Keep digitalLevel as a number for the API
            digitalLevel: Number(formData.digitalReadiness.digitalLevel),
            // Ensure arrays are properly formatted
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
            exportBazaar: formData.propertyLaw.exportBazaar,
          },
        },
      };

      console.log("Submitting form data:", apiData);
      console.log(
        "Digital level type:",
        typeof apiData.companyRequest.digitalReadiness.digitalLevel
      );
      console.log(
        "Digital level value:",
        apiData.companyRequest.digitalReadiness.digitalLevel
      );

      // First attempt: standard API call
      try {
        console.log("Trying submission with API...");
        const response = await API.post("/api/v1/company/add", apiData);
        console.log("Submission successful!", response.data);
        return response.data;
      } catch (error) {
        console.error("Standard submission failed:", error);

        // Second attempt: direct fetch
        console.log("Trying with direct fetch...");
        const fetchResponse = await fetch(
          "http://50.16.57.115:8080/api/v1/company/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(apiData),
          }
        );

        if (fetchResponse.ok) {
          const data = await fetchResponse.json();
          console.log("Direct fetch successful!", data);
          return data;
        } else {
          const errorText = await fetchResponse.text();
          console.error(
            "Direct fetch failed:",
            fetchResponse.status,
            errorText
          );
          throw new Error(
            `Server responded with ${fetchResponse.status}: ${errorText}`
          );
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
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
