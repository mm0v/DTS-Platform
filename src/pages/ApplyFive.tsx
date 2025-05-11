"use client";

import type React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Download } from "lucide-react";
import BackgroundVideo from "../components/BackgroundVideo";
import { FormContext } from "../context/FormContext";
import axios from "axios";

interface FileState {
  companyRegistry: File | null;
  financialReports: File | null;
}

interface AgreementState {
  confirmAccuracy: boolean;
  contactConsent: boolean;
  termsAgreement: boolean;
}

interface ApiTestResult {
  success: boolean;
  message: string;
  data?: unknown; // Using unknown instead of any for better type safety
}

export default function ApplyFive() {
  const navigate = useNavigate();
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("ApplyFive must be used within a FormContext.Provider");
  }

  const { formData, setFormData } = context;

  const [files, setFiles] = useState<FileState>({
    companyRegistry: null,
    financialReports: null,
  });
  const [agreements, setAgreements] = useState<AgreementState>({
    confirmAccuracy: false,
    contactConsent: false,
    termsAgreement: false,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [testResults, setTestResults] = useState<ApiTestResult[]>([]);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [authToken, setAuthToken] = useState("");

  // Enable CORS anywhere service for development (only if needed)
  const CORS_PROXY = ""; // e.g. "https://cors-anywhere.herokuapp.com/" - leave empty to disable

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: keyof FileState
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFiles((prev) => ({
        ...prev,
        [fileType]: file,
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAgreements((prev) => ({
      ...prev,
      [name as keyof AgreementState]: checked,
    }));

    // Update the declarationConsent in formData
    if (name === "confirmAccuracy") {
      setFormData((prev) => ({
        ...prev,
        declarationConsent: {
          ...prev.declarationConsent,
          dataIsReal: checked,
        },
      }));
    } else if (name === "contactConsent") {
      setFormData((prev) => ({
        ...prev,
        declarationConsent: {
          ...prev.declarationConsent,
          permitContact: checked,
        },
      }));
    }
  };

  const handleGoBack = () => {
    navigate("/apply/four");
  };

  const addTestResult = (success: boolean, message: string, data?: unknown) => {
    setTestResults((prev) => [
      { success, message, data },
      ...prev.slice(0, 4), // Keep only the last 5 results
    ]);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setDebugInfo("Submitting form...");

    try {
      // Update form data with agreement values - IMPORTANT: Keep digitalLevel as a number (byte)
      const updatedFormData = {
        ...formData,
        digitalReadiness: {
          ...formData.digitalReadiness,
          // Important: Keep digitalLevel as a number (byte), don't convert to string
          digitalLevel: formData.digitalReadiness.digitalLevel,
        },
        declarationConsent: {
          dataIsReal: agreements.confirmAccuracy,
          permitContact: agreements.contactConsent,
        },
      };

      // Show the actual payload being sent
      console.log(
        "Digital level type:",
        typeof updatedFormData.digitalReadiness.digitalLevel
      );
      console.log(
        "Digital level value:",
        updatedFormData.digitalReadiness.digitalLevel
      );
      console.log(
        "Full request payload:",
        JSON.stringify({ companyRequest: updatedFormData }, null, 2)
      );

      // APPROACH 1: Try submitting form data with json format
      setDebugInfo("Trying JSON approach with authorization...");
      try {
        // Add auth headers if token is provided
        const headers: Record<string, string> = {};
        if (authToken) {
          headers["Authorization"] = `Bearer ${authToken}`;
        }

        await axios.post(
          `${CORS_PROXY}http://50.16.57.115:8080/api/v1/company/add`,
          { companyRequest: updatedFormData },
          { headers }
        );

        setDebugInfo("JSON submission successful!");
        addTestResult(
          true,
          "Form submitted successfully with JSON and auth token"
        );
        alert("Müraciətiniz uğurla göndərildi!");
        return;
      } catch (jsonError) {
        console.error("JSON submission failed:", jsonError);
        setDebugInfo(
          `JSON approach failed: ${
            jsonError instanceof Error ? jsonError.message : "Unknown error"
          }`
        );
        addTestResult(false, "JSON submission failed", jsonError);
      }

      // APPROACH 2: Try multipart/form-data approach
      setDebugInfo("Trying multipart/form-data approach...");
      try {
        const formDataToSubmit = new FormData();

        // Add the files if they exist
        if (files.companyRegistry) {
          formDataToSubmit.append("registerCertificate", files.companyRegistry);
        }

        if (files.financialReports) {
          formDataToSubmit.append("financialStatement", files.financialReports);
        }

        // Add the JSON data
        // Make sure digitalLevel is still a number in the JSON
        formDataToSubmit.append(
          "companyRequest",
          JSON.stringify({ companyRequest: updatedFormData })
        );

        const headers: Record<string, string> = {};
        if (authToken) {
          headers["Authorization"] = `Bearer ${authToken}`;
        }

        await axios.post(
          `${CORS_PROXY}http://50.16.57.115:8080/api/v1/company/add`,
          formDataToSubmit,
          {
            headers: {
              ...headers,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setDebugInfo("Multipart submission successful!");
        addTestResult(
          true,
          "Form submitted successfully with multipart/form-data"
        );
        alert("Müraciətiniz uğurla göndərildi!");
      } catch (multipartError) {
        console.error("Multipart submission failed:", multipartError);
        setDebugInfo(
          `Multipart approach failed: ${
            multipartError instanceof Error
              ? multipartError.message
              : "Unknown error"
          }`
        );
        addTestResult(false, "Multipart submission failed", multipartError);
        alert(
          "Müraciət zamanı xəta baş verdi. Zəhmət olmasa yenidən cəhd edin."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setDebugInfo(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
      addTestResult(false, "Overall form submission failed", error);
      alert("Müraciət zamanı xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // For testing API access with different methods
  const tryDirectApiCall = async () => {
    setIsSubmitting(true);
    setDebugInfo("Testing direct API call...");

    try {
      // Try simple GET requests to test API access
      const testEndpoints = [
        { url: "/api/health", name: "Health Check" },
        { url: "/api/", name: "API Root" },
        { url: "/", name: "Server Root" },
        { url: "/api/v1", name: "API V1" },
      ];

      for (const endpoint of testEndpoints) {
        try {
          const healthResponse = await axios.get(
            `${CORS_PROXY}http://50.16.57.115:8080${endpoint.url}`
          );
          setDebugInfo(
            `${endpoint.name} successful: ${JSON.stringify(
              healthResponse.data
            )}`
          );
          addTestResult(
            true,
            `${endpoint.name} successful`,
            healthResponse.data
          );
        } catch (endpointError) {
          setDebugInfo(
            `${endpoint.name} failed: ${
              endpointError instanceof Error
                ? endpointError.message
                : "Unknown error"
            }`
          );
          addTestResult(false, `${endpoint.name} failed`, endpointError);
        }
      }

      // Try OPTIONS request to check CORS and allowed methods
      try {
        const optionsResponse = await axios({
          method: "OPTIONS",
          url: `${CORS_PROXY}http://50.16.57.115:8080/api/v1/company/add`,
        });
        setDebugInfo(
          `OPTIONS request successful: ${JSON.stringify(
            optionsResponse.headers
          )}`
        );
        addTestResult(
          true,
          "OPTIONS request successful",
          optionsResponse.headers
        );
      } catch (corsError) {
        setDebugInfo(
          `OPTIONS request failed: ${
            corsError instanceof Error ? corsError.message : "Unknown error"
          }`
        );
        addTestResult(false, "OPTIONS request failed", corsError);
      }
    } catch (error) {
      setDebugInfo(
        `API tests failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      addTestResult(false, "API tests failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const allAgreementsChecked = Object.values(agreements).every(
    (value) => value === true
  );

  return (
    <>
      <BackgroundVideo />
      <div className="min-h-screen bg-black bg-[url('/images/space-background.jpg')] bg-cover bg-center bg-no-repeat text-white flex flex-col items-center justify-center py-10">
        {/* Progress Bar */}
        <div className="w-full max-w-4xl mb-8 px-4">
          <div className="relative w-full h-[1px] bg-blue-500">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  num <= 5 ? "bg-blue-500" : "bg-blue-900"
                }`}
                style={{ left: `${(num - 1) * 25}%` }}
              >
                {num}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <div className="text-center max-w-[100px]">
              Şirkət haqqında məlumat
            </div>
            <div className="text-center max-w-[100px]">
              Mülkiyyət və hüquqi quruluş
            </div>
            <div className="text-center max-w-[100px]">
              Rəqəmsal hüquqi və transformasiya xidmətləri
            </div>
            <div className="text-center max-w-[100px]">
              Lisenzli və əhatəlidir
            </div>
            <div className="text-center max-w-[100px] text-blue-400">
              Tələb olunan sənədlər
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="w-full max-w-4xl p-8 rounded-lg">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold">Tələb olunan sənədlər</h1>
          </div>

          {debugInfo && (
            <div className="bg-gray-800 p-4 rounded mb-6 text-sm font-mono overflow-auto max-h-40">
              <p className="text-green-400">Debug Info: {debugInfo}</p>
            </div>
          )}

          {testResults.length > 0 && (
            <div className="bg-gray-800 p-4 rounded mb-6 text-sm font-mono overflow-auto max-h-40">
              <p className="text-yellow-400 mb-2">Test Results:</p>
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`${
                    result.success ? "text-green-400" : "text-red-400"
                  } mb-1`}
                >
                  {result.message}
                </div>
              ))}
            </div>
          )}

          {/* Digital Level Type Info - NEW! */}
          <div className="bg-blue-900/50 p-4 rounded mb-6">
            <h3 className="text-blue-300 mb-2">Digital Level Info</h3>
            <p className="text-sm mb-2">
              Current digitalLevel value:{" "}
              <span className="font-mono text-white">
                {formData.digitalReadiness.digitalLevel}
              </span>{" "}
              (Type:{" "}
              <span className="font-mono text-white">
                {typeof formData.digitalReadiness.digitalLevel}
              </span>
              )
            </p>
            <p className="text-xs text-gray-300">
              Digital level is being sent as a numeric value (byte) as required
              by the API.
            </p>
          </div>

          {showAdvancedOptions && (
            <div className="bg-gray-800 p-4 rounded mb-6">
              <h3 className="text-blue-400 mb-2 text-lg">Advanced Options</h3>
              <div className="mb-4">
                <label className="block text-sm mb-1">
                  Authorization Token (if required)
                </label>
                <input
                  type="text"
                  value={authToken}
                  onChange={(e) => setAuthToken(e.target.value)}
                  className="w-full p-2 bg-gray-700 text-white rounded"
                  placeholder="Enter auth token here"
                />
              </div>
            </div>
          )}

          <form className="space-y-8" onSubmit={handleFormSubmit}>
            {/* First file upload */}
            <div className="space-y-2">
              <label className="block text-lg font-medium">
                Şirkətin dövlət reyestrindən çıxarışı
              </label>
              <div className="relative">
                <div className="w-full h-14 border border-gray-600 rounded-lg flex items-center justify-between px-4 bg-gray-800/30">
                  <span className="text-gray-400 text-sm">
                    {files.companyRegistry
                      ? files.companyRegistry.name
                      : ".doc, .docx, .pdf"}
                  </span>
                  <button
                    type="button"
                    className="text-white"
                    onClick={() =>
                      document.getElementById("companyRegistry")?.click()
                    }
                  >
                    <Download size={20} />
                  </button>
                </div>
                <input
                  id="companyRegistry"
                  type="file"
                  className="hidden"
                  accept=".doc,.docx,.pdf"
                  onChange={(e) => handleFileChange(e, "companyRegistry")}
                />
              </div>
              <p className="text-sm text-gray-400">
                Yüklənən fayl 50 mb – dan çox ola bilməz.
              </p>
            </div>

            {/* Dot separator */}
            <div className="flex justify-center">
              <div className="w-2 h-2 rounded-full bg-teal-400"></div>
            </div>

            {/* Second file upload */}
            <div className="space-y-2">
              <label className="block text-lg font-medium">
                Maliyyə hesabatları (son 2 il)
              </label>
              <div className="relative">
                <div className="w-full h-14 border border-gray-600 rounded-lg flex items-center justify-between px-4 bg-gray-800/30">
                  <span className="text-gray-400 text-sm">
                    {files.financialReports
                      ? files.financialReports.name
                      : ".doc, .docx, .pdf, .excel"}
                  </span>
                  <button
                    type="button"
                    className="text-white"
                    onClick={() =>
                      document.getElementById("financialReports")?.click()
                    }
                  >
                    <Download size={20} />
                  </button>
                </div>
                <input
                  id="financialReports"
                  type="file"
                  className="hidden"
                  accept=".doc,.docx,.pdf,.xls,.xlsx"
                  onChange={(e) => handleFileChange(e, "financialReports")}
                />
              </div>
              <p className="text-sm text-gray-400">
                Yüklənən fayl 50 mb – dan çox ola bilməz.
              </p>
            </div>

            <p className="text-sm text-gray-400 mt-6">
              Müraciətinizlə bağlı əlavə təsdiqedici sənədlərə ehtiyac olacağı
              təqdirdə sizinlə əlaqə saxlanılacaqdır.
            </p>

            {/* Dot separator */}
            <div className="flex justify-center">
              <div className="w-2 h-2 rounded-full bg-teal-400"></div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="confirmAccuracy"
                  name="confirmAccuracy"
                  checked={agreements.confirmAccuracy}
                  onChange={handleCheckboxChange}
                  className="mt-1 h-4 w-4 text-blue-500 border-gray-600 rounded bg-transparent"
                />
                <label
                  htmlFor="confirmAccuracy"
                  className="ml-2 text-sm text-gray-400"
                >
                  Təqdim olunan məlumatların doğruluğunu təsdiq edirəm.
                </label>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="contactConsent"
                  name="contactConsent"
                  checked={agreements.contactConsent}
                  onChange={handleCheckboxChange}
                  className="mt-1 h-4 w-4 text-blue-500 border-gray-600 rounded bg-transparent"
                />
                <label
                  htmlFor="contactConsent"
                  className="ml-2 text-sm text-gray-400"
                >
                  Müraciətimlə əlaqədar 4SİM tərəfindən əlaqə saxlanmasını qəbul
                  edirəm.
                </label>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="termsAgreement"
                  name="termsAgreement"
                  checked={agreements.termsAgreement}
                  onChange={handleCheckboxChange}
                  className="mt-1 h-4 w-4 text-blue-500 border-gray-600 rounded bg-transparent"
                />
                <label
                  htmlFor="termsAgreement"
                  className="ml-2 text-sm text-gray-400"
                >
                  İstifadə şərtləri və gizlilik şərtləri ilə razıyam.
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 mt-10">
              <button
                type="button"
                onClick={handleGoBack}
                className="flex-1 cursor-pointer bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Geri
              </button>
              <button
                type="submit"
                disabled={!allAgreementsChecked || isSubmitting}
                className={`flex-1 py-3 rounded-lg transition-colors ${
                  allAgreementsChecked && !isSubmitting
                    ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                    : "bg-blue-900/50 text-gray-400 cursor-not-allowed "
                }`}
              >
                {isSubmitting ? "Göndərilir..." : "Təsdiq et"}
              </button>
            </div>

            {/* Debug Tools */}
            <div className="mt-4 text-center flex justify-center space-x-4">
              <button
                type="button"
                onClick={tryDirectApiCall}
                className="text-xs text-gray-400 underline"
              >
                API Test
              </button>
              <button
                type="button"
                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                className="text-xs text-gray-400 underline"
              >
                {showAdvancedOptions
                  ? "Hide Advanced Options"
                  : "Show Advanced Options"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
