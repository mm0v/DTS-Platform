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
      digitalLevel: 0, // Using Byte (number) in the form state
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
      // Prepare form data with the correct types
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
          declarationConsent: formData.declarationConsent,
          digitalLeadership: formData.digitalLeadership,
          digitalReadiness: {
            ...formData.digitalReadiness,
            digitalLevel: formData.digitalReadiness.digitalLevel.toString(), // Convert to string for API
          },
          financialNeeding: formData.financialNeeding,
          propertyLaw: formData.propertyLaw,
        },
      };

      console.log("Submitting form data:", apiData);

      // Try different API URL variations to see which works
      try {
        // Attempt 1: Use the full URL path
        console.log("Trying full URL path...");
        const response = await API.post("/api/v1/company/add", apiData);
        console.log("Success with full URL path:", response.data);
        return response.data;
      } catch (error1) {
        console.error("Error with full URL path:", error1);

        try {
          // Attempt 2: Use the path without /api
          console.log("Trying path without /api...");
          const response = await API.post("/v1/company/add", apiData);
          console.log("Success with path without /api:", response.data);
          return response.data;
        } catch (error2) {
          console.error("Error with path without /api:", error2);

          // Attempt 3: Final attempt with a different approach
          console.log("Trying with XMLHttpRequest for debugging...");
          return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "http://50.16.57.115:8080/api/v1/company/add");
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = function () {
              if (xhr.status >= 200 && xhr.status < 300) {
                console.log("XHR Success:", xhr.responseText);
                resolve(JSON.parse(xhr.responseText));
              } else {
                console.error(
                  "XHR Error:",
                  xhr.status,
                  xhr.statusText,
                  xhr.responseText
                );
                reject(new Error(`XHR Error: ${xhr.status} ${xhr.statusText}`));
              }
            };

            xhr.onerror = function () {
              console.error("XHR Network Error");
              reject(new Error("Network Error"));
            };

            xhr.send(JSON.stringify(apiData));
          });
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
