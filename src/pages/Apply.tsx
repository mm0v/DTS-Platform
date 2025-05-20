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
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    try {
      setIsSubmitting(true);

      const apiData = {
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
          dataIsReal: formData.companyData.declarationConsent.dataIsReal, // Note by Rash why we cast here
          permitContact: Boolean(
            formData.companyData.declarationConsent.permitContact // Note by Rash why we cast here
          ),
          privacyAcceptance: Boolean(
            formData.companyData.declarationConsent.privacyAcceptance // Note by Rash why we cast here
          ),
        },
        digitalLeadership: {
          digitalTeamOrLead: Boolean(
            formData.companyData.digitalLeadership.digitalTeamOrLead
          ),
          digitalPath: Boolean(
            formData.companyData.digitalLeadership.digitalPath
          ),
          digitalTransformationLoyality: Boolean(
            formData.companyData.digitalLeadership.digitalTransformationLoyality
          ),
        },
        digitalReadiness: {
          keyChallenges:
            formData.companyData.digitalReadiness.keyChallenges || [],
          digitalLevel: formData.companyData.digitalReadiness.digitalLevel,
          digitalTools:
            formData.companyData.digitalReadiness.digitalTools || [],
          companyPurpose: formData.companyData.digitalReadiness.companyPurpose,
        },
        financialNeeding: {
          financialNeed: Boolean(
            formData.companyData.financialNeeding.financialNeed
          ),
          neededBudget: formData.companyData.financialNeeding.neededBudget,
        },
        propertyLaw: {
          businessOperations:
            formData.companyData.propertyLaw.businessOperations,
          companyLawType: formData.companyData.propertyLaw.companyLawType,
          products: formData.companyData.propertyLaw.products,
          exportActivity: Boolean(
            formData.companyData.propertyLaw.exportActivity
          ),
          exportBazaar: formData.companyData.propertyLaw.exportBazaar,
        },
      };

      if (files && files.length > 0) {
        const formDataWithFiles = new FormData();
        formDataWithFiles.append("data", JSON.stringify(apiData));
        files.forEach((file, index) => {
          formDataWithFiles.append(`file${index + 1}`, file);
        });

        try {
          const response = await API.post(
            "/api/v1/company/add",
            formDataWithFiles,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          setIsSubmitting(false);
          return response.data;
        } catch (error) {
          console.error("Submission with files via API failed:", error);
          // Fallback: try direct fetch
          console.log("Trying direct fetch with files...");
          const fetchResponse = await fetch(
            "http://50.16.57.115:8080/api/v1/company/add",
            {
              method: "POST",
              body: formDataWithFiles, // No need to set Content-Type, fetch will set it automatically with boundary
            }
          );

          if (fetchResponse.ok) {
            const data = await fetchResponse.json();
            console.log("Direct fetch with files successful!", data);
            setIsSubmitting(false);
            return data;
          } else {
            const errorText = await fetchResponse.text();
            console.error(
              "Direct fetch with files failed:",
              fetchResponse.status,
              errorText
            );
            setIsSubmitting(false);
            throw new Error(
              `Server responded with ${fetchResponse.status}: ${errorText}`
            );
          }
        }
      } else {
        // No files, just submit JSON data
        try {
          console.log("Submitting JSON data only...");
          const response = await API.post("/api/v1/company/add", apiData);
          console.log("JSON submission successful!", response.data);
          setIsSubmitting(false);
          return response.data;
        } catch (error) {
          console.error("JSON submission via API failed:", error);

          // Fallback: try direct fetch
          console.log("Trying direct fetch with JSON...");
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
            console.log("Direct fetch with JSON successful!", data);
            setIsSubmitting(false);
            return data;
          } else {
            const errorText = await fetchResponse.text();
            console.error(
              "Direct fetch with JSON failed:",
              fetchResponse.status,
              errorText
            );
            setIsSubmitting(false);
            throw new Error(
              `Server responded with ${fetchResponse.status}: ${errorText}`
            );
          }
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      throw error;
    }
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
        <Route path="five" element={<ApplyFive />} />
      </Routes>
    </FormContext.Provider>
  );
};

export default Apply;
