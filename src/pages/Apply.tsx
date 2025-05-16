import { Routes, Route } from "react-router-dom";
import ApplyOne from "./ApplyOne";
import ApplyTwo from "./ApplyTwo";
import ApplyThree from "./ApplyThree";
import ApplyFour from "./ApplyFour";
import ApplyFive from "./ApplyFive";
import { useState, useRef } from "react";
import API from "../services/axiosConfig";
import { FormContext } from "../context/FormContext";
import type { FormContextType } from "../context/FormContext";

const Apply = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
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

      // Restructure data to match the required format
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
          dataIsReal: Boolean(formData.companyData.declarationConsent.dataIsReal),
          permitContact: Boolean(formData.companyData.declarationConsent.permitContact),
        },
        digitalLeadership: {
          digitalTeamOrLead: Boolean(
            formData.companyData.digitalLeadership.digitalTeamOrLead
          ),
          digitalPath: Boolean(formData.companyData.digitalLeadership.digitalPath),
          digitalTransformationLoyality: Boolean(
            formData.companyData.digitalLeadership.digitalTransformationLoyality
          ),
        },
        digitalReadiness: {
          keyChallenges: formData.companyData.digitalReadiness.keyChallenges || [],
          digitalLevel: Number(formData.companyData.digitalReadiness.digitalLevel),
          digitalTools: formData.companyData.digitalReadiness.digitalTools || [],
          companyPurpose: formData.companyData.digitalReadiness.companyPurpose,
        },
        financialNeeding: {
          financialNeed: Boolean(formData.companyData.financialNeeding.financialNeed),
          neededBudget: formData.companyData.financialNeeding.neededBudget,
        },
        propertyLaw: {
          businessOperations: formData.companyData.propertyLaw.businessOperations,
          companyLawType: formData.companyData.propertyLaw.companyLawType,
          products: formData.companyData.propertyLaw.products,
          exportActivity: Boolean(formData.companyData.propertyLaw.exportActivity),
          exportBazaar: formData.companyData.propertyLaw.exportBazaar,
        },
      };

      console.log("Submitting form data:", apiData);
      console.log(
        "Digital level type:",
        typeof apiData.digitalReadiness.digitalLevel
      );
      console.log(
        "Digital level value:",
        apiData.digitalReadiness.digitalLevel
      );

      // Check if there are files to upload
      if (files && files.length > 0) {
        // Create FormData for multipart/form-data submission with files
        const formDataWithFiles = new FormData();

        // Add JSON data as a string in a field called 'data'
        formDataWithFiles.append('data', JSON.stringify(apiData));

        // Add each file with a unique field name
        files.forEach((file, index) => {
          formDataWithFiles.append(`file${index + 1}`, file);
        });

        try {
          console.log("Submitting form with files...");
          const response = await API.post("/api/v1/company/add", formDataWithFiles, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log("Submission with files successful!", response.data);
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
    <FormContext.Provider value={{
      formData,
      setFormData,
      handleSubmit,
      isSubmitting,
      files,
      setFiles: setFilesToUpload
    }}>
      {/* Hidden file input for file selection (can be triggered from any child component) */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        multiple
        onChange={(e) => {
          if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setFiles(filesArray);
          }
        }}
      />

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