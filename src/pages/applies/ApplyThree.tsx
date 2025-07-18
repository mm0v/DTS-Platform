

"use client";

import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { FormContext } from "../../context/FormContext";
import { useLanguage } from "../../context/LanguageContext";
import ApplySteps from "../../components/ApplySteps";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CommonApplySVG } from "../../components/SVG/Apply";

interface DigitalReadiness {
  keyChallenges: string[];
  digitalLevel: number;
  digitalTools: string[];
  companyPurpose: string;
  otherDigitalTool: string;
}

const ApplyThree = () => {
  const navigate = useNavigate();
  const context = useContext(FormContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { language, pagesTranslations } = useLanguage();
  const page = pagesTranslations.apply3;
  const buttons = pagesTranslations.applyBtns;

  const initialValue: DigitalReadiness = {
    keyChallenges: [],
    digitalLevel: 0,
    digitalTools: [],
    companyPurpose: "",
    otherDigitalTool: "",
  };
  const [formData, setFormData] = useState<DigitalReadiness>(initialValue);

  if (!context) {
    throw new Error("ApplyThree must be used within a FormContext.Provider");
  }

  useEffect(() => {
    if (!formData) {
      setFormData((prevData) => ({
        ...prevData,
        keyChallenges: [],
        digitalLevel: 0,
        digitalTools: [],
        companyPurpose: "",
        otherDigitalTool: "",
      }));
    }
  }, [formData, setFormData]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedData = JSON.parse(
      localStorage.getItem("digitalReadiness") || "null"
    );

    if (savedData) {
      try {
        setFormData(savedData);
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }
  }, [setFormData]);

  // Real-time validation function
  const validateField = (
    fieldName: string,
    value: string | number | string[]
  ) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'keyChallenges':
        if (Array.isArray(value) && value.length === 0) {
          newErrors.keyChallenges = page.errorMessages.required[language];
        } else {
          delete newErrors.keyChallenges;
        }
        break;
      case 'digitalLevel':
        if (value === 0) {
          newErrors.digitalLevel = page.errorMessages.required[language];
        } else {
          delete newErrors.digitalLevel;
        }
        break;
      case 'digitalTools':
        if (Array.isArray(value) && value.length === 0) {
          newErrors.digitalTools = page.errorMessages.required[language];
        } else {
          delete newErrors.digitalTools;
        }
        break;
      case 'otherDigitalTool':
        if (
          formData.digitalTools.includes("other") &&
          typeof value === "string" &&
          value.trim().length === 0
        ) {
          newErrors.otherDigitalTool = page.errorMessages.required[language];
        } else {
          delete newErrors.otherDigitalTool;
        }
        break;
      case 'companyPurpose':
        if (typeof value === "string" && value.trim().length === 0) {
          newErrors.companyPurpose = page.errorMessages.required[language];
        } else if (typeof value === "string" && value.trim().length < 3) {
          newErrors.companyPurpose = page.errorMessages.minLength[language];
        } else {
          delete newErrors.companyPurpose;
        }
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (formData.keyChallenges.length === 0)
      errors.keyChallenges = page.errorMessages.required[language];
    if (formData.digitalLevel === 0)
      errors.digitalLevel = page.errorMessages.required[language];
    if (formData.digitalTools.length === 0)
      errors.digitalTools = page.errorMessages.required[language];

    if (
      formData.digitalTools.includes("other") &&
      formData.otherDigitalTool.trim().length === 0
    )
      errors.otherDigitalTool = page.errorMessages.required[language];

    if (formData.companyPurpose.trim().length === 0) {
      errors.companyPurpose = page.errorMessages.required[language];
    } else if (formData.companyPurpose.trim().length < 3) {
      errors.companyPurpose = page.errorMessages.minLength[language];
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    let updatedFormData = { ...formData };

    if (name === "digitalLevel") {
      const digitalLevelMap: { [key: string]: number } = {
        "": 0,
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
      };
      const numericValue = digitalLevelMap[value] || 0;

      updatedFormData = {
        ...updatedFormData,
        digitalLevel: numericValue,
      };

      // Real-time validation
      validateField('digitalLevel', numericValue);
    } else {
      updatedFormData = {
        ...updatedFormData,
        [name]: value,
      };

      // Real-time validation
      validateField(name, value);
    }

    setFormData(updatedFormData);
    localStorage.setItem("digitalReadiness", JSON.stringify(updatedFormData));
  };

  const handleDigitalToolChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    let updatedDigitalTools;

    if (checked) {
      updatedDigitalTools = [...formData.digitalTools, value];
    } else {
      updatedDigitalTools = formData.digitalTools.filter(
        (tool) => tool !== value
      );
    }

    const updatedFormData = {
      ...formData,
      digitalTools: updatedDigitalTools,
      otherDigitalTool: updatedDigitalTools.includes("other")
        ? formData.otherDigitalTool
        : "",
    };

    setFormData(updatedFormData);
    localStorage.setItem("digitalReadiness", JSON.stringify(updatedFormData));

    // Real-time validation
    validateField('digitalTools', updatedDigitalTools);
    if (!updatedDigitalTools.includes("other")) {
      validateField('otherDigitalTool', '');
    }
  };

  const handleKeyChallengesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updatedKeyChallenges = checked
      ? [...formData.keyChallenges, value]
      : formData.keyChallenges.filter((c) => c !== value);

    const updatedFormData = {
      ...formData,
      keyChallenges: updatedKeyChallenges,
    };

    setFormData(updatedFormData);
    localStorage.setItem("digitalReadiness", JSON.stringify(updatedFormData));

    // Real-time validation
    validateField('keyChallenges', updatedKeyChallenges);
  };

  const getFinalDigitalTools = () => {
    return formData.digitalTools
      .map((tool) => {
        if (tool === "other" && formData.otherDigitalTool.trim()) {
          return formData.otherDigitalTool.trim();
        }
        return tool;
      })
      .filter((tool) => tool !== "other" || formData.otherDigitalTool.trim());
  };

  const handleGoBack = () => {
    navigate("/apply/two");
  };

  const handleGoNext = () => {
    if (validateForm()) {
      const finalFormData = {
        ...formData,
        digitalTools: getFinalDigitalTools(),
      };

      localStorage.setItem("digitalReadiness", JSON.stringify(finalFormData));

      navigate("/apply/four");
      return true;
    }
    return false;
  };

  const getDigitalLevelString = (): string => {
    return formData.digitalLevel.toString();
  };

  return (
    <>
      <div className="min-h-screen bg-[url('/images/space-background.jpg')] bg-cover bg-center text-white flex flex-col items-center justify-center py-10">
        <ApplySteps
          onClick={handleGoNext}
          step={3}
        />

        <div className="w-full max-w-4xl mb-8 px-6">
          <div className="text-center text-3xl font-semibold mb-6">
            {page.title[language]}
          </div>

          <form className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-2">
                  {page.digitalLevel[language]}
                </label>
                <select
                  name="digitalLevel"
                  value={getDigitalLevelString()}
                  onChange={handleInputChange}
                  className={`w-full p-2 bg-transparent text-white rounded
                    ${errors.digitalLevel
                      ? "border-2 border-red-500"
                      : "border border-gray-700"
                    }`}
                >
                  <option value="" className="bg-[#131021]">
                    {page.placeholder ? page.placeholder[language] : "Seçin"}
                  </option>
                  <option value="1" className="bg-[#131021]">
                    {page.digitalLevelOptions.level1[language]}
                  </option>
                  <option value="2" className="bg-[#131021]">
                    {page.digitalLevelOptions.level2[language]}
                  </option>
                  <option value="3" className="bg-[#131021]">
                    {page.digitalLevelOptions.level3[language]}
                  </option>
                  <option value="4" className="bg-[#131021]">
                    {page.digitalLevelOptions.level4
                      ? page.digitalLevelOptions.level4[language]
                      : page.digitalLevelOptions.level3[language]}
                  </option>
                  <option value="5" className="bg-[#131021]">
                    {page.digitalLevelOptions.level5[language]}
                  </option>
                </select>
                {errors.digitalLevel && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.digitalLevel}
                  </p>
                )}
              </div>

              <div className="flex-1 relative">
                <label className="block mb-2">
                  {page.digitalTools[language]}
                </label>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full p-2 bg-trasnparent text-white rounded text-left flex justify-between items-center
                    ${errors.digitalTools
                      ? "border-2 border-red-500"
                      : "border border-gray-700"
                    }`}
                >
                  <span>
                    {formData.digitalTools.length > 0
                      ? `${formData.digitalTools.length} ${page.digitalToolsOptions?.selected?.[language] ||
                      "selected"
                      }`
                      : page.placeholder?.[language] || "Select digital tools"}
                  </span>
                  <span className="ml-2">
                    {isDropdownOpen ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-[#131021] rounded shadow-lg max-h-60 overflow-auto">
                    {[
                      { value: "crm", label: "CRM" },
                      { value: "erp", label: "ERP" },
                      {
                        value: "accounting",
                        label: page.digitalToolsOptions.accounting[language],
                      },
                      {
                        value: "other",
                        label: page.digitalToolsOptions.other[language],
                      },
                    ].map((tool) => (
                      <div key={tool.value}>
                        <label className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
                          <input
                            type="checkbox"
                            value={tool.value}
                            checked={formData.digitalTools.includes(tool.value)}
                            onChange={handleDigitalToolChange}
                            className="hidden"
                          />
                          <span className="w-5 h-5 flex items-center justify-center border border-gray-400 rounded">
                            {formData.digitalTools.includes(tool.value) && (
                              <CommonApplySVG />
                            )}
                          </span>
                          <span className="ml-2">{tool.label}</span>
                        </label>

                        {tool.value === "other" &&
                          formData.digitalTools.includes("other") && (
                            <div
                              className="px-4 pb-3"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <input
                                autoComplete="off"
                                type="text"
                                name="otherDigitalTool"
                                value={formData.otherDigitalTool}
                                onChange={handleInputChange}
                                placeholder="Please specify the digital tool..."
                                className={`w-full p-2 bg-gray-800 text-white rounded text-sm
                                ${errors.otherDigitalTool
                                    ? "border-2 border-red-500"
                                    : "border border-gray-600"
                                  }`}
                                onClick={(e) => e.stopPropagation()}
                              />
                              {errors.otherDigitalTool && (
                                <p className="text-red-500 text-xs mt-1">
                                  {errors.otherDigitalTool}
                                </p>
                              )}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                )}
                {errors.digitalTools && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.digitalTools}
                  </p>
                )}
              </div>
            </div>

            <div>
              <p className="text-xl mb-2">
                {page.keyChallenges.title[language]}
              </p>
              <div className="grid grid-cols-1 gap-4">
                {[
                  "budget_shortage",
                  "technical_expertise",
                  "training_needs",
                  "digital_strategy",
                  "infrastructure_limits",
                  "other",
                ].map((challenge) => (
                  <label
                    key={challenge}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={challenge}
                      checked={formData.keyChallenges.includes(challenge)}
                      onChange={handleKeyChallengesChange}
                      className="hidden"
                    />
                    <span className="w-5 h-5 flex items-center justify-center border border-gray-400 rounded">
                      {formData.keyChallenges.includes(challenge) && (
                        <CommonApplySVG />
                      )}
                    </span>
                    <span className="ml-2">
                      {challenge === "budget_shortage" &&
                        page.keyChallenges.budget_shortage[language]}
                      {challenge === "technical_expertise" &&
                        page.keyChallenges.technical_expertise[language]}
                      {challenge === "training_needs" &&
                        page.keyChallenges.training_needs[language]}
                      {challenge === "digital_strategy" &&
                        page.keyChallenges.digital_strategy[language]}
                      {challenge === "infrastructure_limits" &&
                        page.keyChallenges.infrastructure_limits[language]}
                      {challenge === "other" &&
                        page.keyChallenges.other[language]}
                    </span>
                  </label>
                ))}
              </div>
              {errors.keyChallenges && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.keyChallenges}
                </p>
              )}
            </div>

            <div>
              <p className="text-xl mb-2">
                {page.companyPurpose.title[language]}
              </p>
              <textarea
                name="companyPurpose"
                value={formData.companyPurpose}
                onChange={handleInputChange}
                className={`w-full p-4 bg-transparent text-white rounded
                  ${errors.companyPurpose
                    ? "border-2 border-red-500"
                    : "border border-gray-700"
                  }`}
                rows={4}
                placeholder={page.companyPurpose.placeholder[language]}
                maxLength={500}
                minLength={3}
              />
              {errors.companyPurpose && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyPurpose}
                </p>
              )}
            </div>
          </form>

          <div className="flex justify-between mt-6">
            <button
              className="w-[48%] bg-blue-600 hover:bg-blue-700 cursor-pointer text-white py-3 rounded-lg transition duration-300"
              onClick={handleGoBack}
            >
              {buttons.backBtn[language]}
            </button>
            <button
              className="w-[48%] bg-blue-600 cursor-pointer hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
              onClick={handleGoNext}
            >
              {buttons.nextBtn[language]}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyThree;



// "use client";

// import { useNavigate } from "react-router-dom";
// import { useContext, useState, useEffect } from "react";
// import type { ChangeEvent } from "react";
// import { FormContext } from "../../context/FormContext";
// import { useLanguage } from "../../context/LanguageContext";
// import ApplySteps from "../../components/ApplySteps";
// import { ChevronDown, ChevronUp } from "lucide-react";
// import { CommonApplySVG } from "../../components/SVG/Apply";

// interface DigitalReadiness {
//   keyChallenges: string[];
//   digitalLevel: number;
//   digitalTools: string[];
//   companyPurpose: string;
//   otherDigitalTool: string;
// }

// const ApplyThree = () => {
//   const navigate = useNavigate();
//   const context = useContext(FormContext);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const { language, pagesTranslations } = useLanguage();
//   const page = pagesTranslations.apply3;
//   const buttons = pagesTranslations.applyBtns;

//   const initialValue: DigitalReadiness = {
//     keyChallenges: [],
//     digitalLevel: 0,
//     digitalTools: [],
//     companyPurpose: "",
//     otherDigitalTool: "",
//   };
//   const [formData, setFormData] = useState<DigitalReadiness>(initialValue);

//   if (!context) {
//     throw new Error("ApplyThree must be used within a FormContext.Provider");
//   }

//   useEffect(() => {
//     if (!formData) {
//       setFormData((prevData) => ({
//         ...prevData,
//         keyChallenges: [],
//         digitalLevel: 0,
//         digitalTools: [],
//         companyPurpose: "",
//         otherDigitalTool: "",
//       }));
//     }
//   }, [formData, setFormData]);

//   const [errors, setErrors] = useState<Record<string, string>>({});

//   useEffect(() => {
//     const savedData = JSON.parse(
//       localStorage.getItem("digitalReadiness") || "null"
//     );

//     if (savedData) {
//       try {
//         setFormData(savedData);
//       } catch (error) {
//         console.error("Error parsing saved form data:", error);
//       }
//     }
//   }, [setFormData]);

//   const validateForm = () => {
//     const errors: Record<string, string> = {};

//     if (formData.keyChallenges.length === 0)
//       errors.keyChallenges = page.errorMessages.required[language];
//     if (formData.digitalLevel === 0)
//       errors.digitalLevel = page.errorMessages.required[language];
//     if (formData.digitalTools.length === 0)
//       errors.digitalTools = page.errorMessages.required[language];

//     if (
//       formData.digitalTools.includes("other") &&
//       formData.otherDigitalTool.trim().length === 0
//     )
//       errors.otherDigitalTool = page.errorMessages.required[language];

//     if (formData.companyPurpose.trim().length === 0) {
//       errors.companyPurpose = page.errorMessages.required[language];
//     } else if (formData.companyPurpose.trim().length < 3) {
//       errors.companyPurpose = page.errorMessages.minLength[language];
//     }

//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleInputChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;

//     let updatedFormData = { ...formData };

//     if (name === "digitalLevel") {
//       const digitalLevelMap: { [key: string]: number } = {
//         "": 0,
//         "1": 1,
//         "2": 2,
//         "3": 3,
//         "4": 4,
//         "5": 5,
//       };
//       const numericValue = digitalLevelMap[value] || 0;

//       updatedFormData = {
//         ...updatedFormData,
//         digitalLevel: numericValue,
//       };
//     } else {
//       updatedFormData = {
//         ...updatedFormData,
//         [name]: value,
//       };
//     }

//     setFormData(updatedFormData);
//     localStorage.setItem("digitalReadiness", JSON.stringify(updatedFormData));

//     setErrors((prev) => ({
//       ...prev,
//       [name]: "",
//     }));
//   };

//   const handleDigitalToolChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { value, checked } = e.target;

//     let updatedDigitalTools;

//     if (checked) {
//       updatedDigitalTools = [...formData.digitalTools, value];
//     } else {
//       updatedDigitalTools = formData.digitalTools.filter(
//         (tool) => tool !== value
//       );
//     }

//     const updatedFormData = {
//       ...formData,
//       digitalTools: updatedDigitalTools,
//       otherDigitalTool: updatedDigitalTools.includes("other")
//         ? formData.otherDigitalTool
//         : "",
//     };

//     setFormData(updatedFormData);
//     localStorage.setItem("digitalReadiness", JSON.stringify(updatedFormData));

//     setErrors((prev) => ({
//       ...prev,
//       digitalTools: "",
//       otherDigitalTool: "",
//     }));
//   };

//   const getFinalDigitalTools = () => {
//     return formData.digitalTools
//       .map((tool) => {
//         if (tool === "other" && formData.otherDigitalTool.trim()) {
//           return formData.otherDigitalTool.trim();
//         }
//         return tool;
//       })
//       .filter((tool) => tool !== "other" || formData.otherDigitalTool.trim());
//   };

//   const handleGoBack = () => {
//     navigate("/apply/two");
//   };

//   const handleGoNext = () => {
//     if (validateForm()) {
//       const finalFormData = {
//         ...formData,
//         digitalTools: getFinalDigitalTools(),
//       };

//       localStorage.setItem("digitalReadiness", JSON.stringify(finalFormData));

//       navigate("/apply/four");
//       return true;
//     }
//     return false;
//   };

//   const getDigitalLevelString = (): string => {
//     return formData.digitalLevel.toString();
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-[url('/images/space-background.jpg')] bg-cover bg-center text-white flex flex-col items-center justify-center py-10">
//         <ApplySteps
//           onClick={handleGoNext}
//           step={3}
//         />

//         <div className="w-full max-w-4xl mb-8 px-6">
//           <div className="text-center text-3xl font-semibold mb-6">
//             {page.title[language]}
//           </div>

//           <form className="space-y-6">
//             <div className="flex gap-4">
//               <div className="flex-1">
//                 <label className="block mb-2">
//                   {page.digitalLevel[language]}
//                 </label>
//                 <select
//                   name="digitalLevel"
//                   value={getDigitalLevelString()}
//                   onChange={handleInputChange}
//                   className={`w-full p-2 bg-transparent text-white rounded
//                     ${
//                       errors.digitalLevel
//                         ? "border-2 border-red-500"
//                         : "border border-gray-700"
//                     }`}
//                 >
//                   <option value="" className="bg-[#131021]">
//                     {page.placeholder ? page.placeholder[language] : "Seçin"}
//                   </option>
//                   <option value="1" className="bg-[#131021]">
//                     {page.digitalLevelOptions.level1[language]}
//                   </option>
//                   <option value="2" className="bg-[#131021]">
//                     {page.digitalLevelOptions.level2[language]}
//                   </option>
//                   <option value="3" className="bg-[#131021]">
//                     {page.digitalLevelOptions.level3[language]}
//                   </option>
//                   <option value="4" className="bg-[#131021]">
//                     {page.digitalLevelOptions.level4
//                       ? page.digitalLevelOptions.level4[language]
//                       : page.digitalLevelOptions.level3[language]}
//                   </option>
//                   <option value="5" className="bg-[#131021]">
//                     {page.digitalLevelOptions.level5[language]}
//                   </option>
//                 </select>
//                 {errors.digitalLevel && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {page.errorMessages.required[language]}
//                   </p>
//                 )}
//               </div>

//               <div className="flex-1 relative">
//                 <label className="block mb-2">
//                   {page.digitalTools[language]}
//                 </label>
//                 <button
//                   type="button"
//                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                   className={`w-full p-2 bg-trasnparent text-white rounded text-left flex justify-between items-center
//                     ${
//                       errors.digitalTools
//                         ? "border-2 border-red-500"
//                         : "border border-gray-700"
//                     }`}
//                 >
//                   <span>
//                     {formData.digitalTools.length > 0
//                       ? `${formData.digitalTools.length} ${
//                           page.digitalToolsOptions?.selected?.[language] ||
//                           "selected"
//                         }`
//                       : page.placeholder?.[language] || "Select digital tools"}
//                   </span>
//                   <span className="ml-2">
//                     {isDropdownOpen ? (
//                       <ChevronUp size={20} />
//                     ) : (
//                       <ChevronDown size={20} />
//                     )}
//                   </span>
//                 </button>
//                 {isDropdownOpen && (
//                   <div className="absolute z-10 w-full mt-1 bg-[#131021] rounded shadow-lg max-h-60 overflow-auto">
//                     {[
//                       { value: "crm", label: "CRM" },
//                       { value: "erp", label: "ERP" },
//                       {
//                         value: "accounting",
//                         label: page.digitalToolsOptions.accounting[language],
//                       },
//                       {
//                         value: "other",
//                         label: page.digitalToolsOptions.other[language],
//                       },
//                     ].map((tool) => (
//                       <div key={tool.value}>
//                         <label className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             value={tool.value}
//                             checked={formData.digitalTools.includes(tool.value)}
//                             onChange={handleDigitalToolChange}
//                             className="hidden"
//                           />
//                           <span className="w-5 h-5 flex items-center justify-center border border-gray-400 rounded">
//                             {formData.digitalTools.includes(tool.value) && (
//                               <CommonApplySVG />
//                             )}
//                           </span>
//                           <span className="ml-2">{tool.label}</span>
//                         </label>

//                         {tool.value === "other" &&
//                           formData.digitalTools.includes("other") && (
//                             <div
//                               className="px-4 pb-3"
//                               onClick={(e) => e.stopPropagation()}
//                             >
//                               <input
//                                 autoComplete="off"
//                                 type="text"
//                                 name="otherDigitalTool"
//                                 value={formData.otherDigitalTool}
//                                 onChange={handleInputChange}
//                                 placeholder="Please specify the digital tool..."
//                                 className={`w-full p-2 bg-gray-800 text-white rounded text-sm
//                                 ${
//                                   errors.otherDigitalTool
//                                     ? "border-2 border-red-500"
//                                     : "border border-gray-600"
//                                 }`}
//                                 onClick={(e) => e.stopPropagation()}
//                               />
//                               {errors.otherDigitalTool && (
//                                 <p className="text-red-500 text-xs mt-1">
//                                   {page.errorMessages.required[language]}
//                                 </p>
//                               )}
//                             </div>
//                           )}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//                 {errors.digitalTools && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {page.errorMessages.required[language]}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <p className="text-xl mb-2">
//                 {page.keyChallenges.title[language]}
//               </p>
//               <div className="grid grid-cols-1 gap-4">
//                 {[
//                   "budget_shortage",
//                   "technical_expertise",
//                   "training_needs",
//                   "digital_strategy",
//                   "infrastructure_limits",
//                   "other",
//                 ].map((challenge) => (
//                   <label
//                     key={challenge}
//                     className="flex items-center space-x-2 cursor-pointer"
//                   >
//                     <input
//                       type="checkbox"
//                       value={challenge}
//                       checked={formData.keyChallenges.includes(challenge)}
//                       onChange={(e) => {
//                         const { value, checked } = e.target;
//                         const updatedKeyChallenges = checked
//                           ? [...formData.keyChallenges, value]
//                           : formData.keyChallenges.filter((c) => c !== value);
//                         const updatedFormData = {
//                           ...formData,
//                           keyChallenges: updatedKeyChallenges,
//                         };
//                         setFormData(updatedFormData);
//                         localStorage.setItem(
//                           "digitalReadiness",
//                           JSON.stringify(updatedFormData)
//                         );
//                       }}
//                       className="hidden"
//                     />
//                     <span className="w-5 h-5 flex items-center justify-center border border-gray-400 rounded">
//                       {formData.keyChallenges.includes(challenge) && (
//                         <CommonApplySVG />
//                       )}
//                     </span>
//                     <span className="ml-2">
//                       {challenge === "budget_shortage" &&
//                         page.keyChallenges.budget_shortage[language]}
//                       {challenge === "technical_expertise" &&
//                         page.keyChallenges.technical_expertise[language]}
//                       {challenge === "training_needs" &&
//                         page.keyChallenges.training_needs[language]}
//                       {challenge === "digital_strategy" &&
//                         page.keyChallenges.digital_strategy[language]}
//                       {challenge === "infrastructure_limits" &&
//                         page.keyChallenges.infrastructure_limits[language]}
//                       {challenge === "other" &&
//                         page.keyChallenges.other[language]}
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <p className="text-xl mb-2">
//                 {page.companyPurpose.title[language]}
//               </p>
//               <textarea
//                 name="companyPurpose"
//                 value={formData.companyPurpose}
//                 onChange={handleInputChange}
//                 className={`w-full p-4 bg-transparent text-white rounded
//                   ${
//                     errors.companyPurpose
//                       ? "border-2 border-red-500"
//                       : "border border-gray-700"
//                   }`}
//                 rows={4}
//                 placeholder={page.companyPurpose.placeholder[language]}
//                 maxLength={500}
//                 minLength={3}
//               />
//               {errors.companyPurpose && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {page.errorMessages.minLength[language]}
//                 </p>
//               )}
//             </div>
//           </form>

//           <div className="flex justify-between mt-6">
//             <button
//               className="w-[48%] bg-blue-600 hover:bg-blue-700 cursor-pointer text-white py-3 rounded-lg transition duration-300"
//               onClick={handleGoBack}
//             >
//               {buttons.backBtn[language]}
//             </button>
//             <button
//               className="w-[48%] bg-blue-600 cursor-pointer hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
//               onClick={handleGoNext}
//             >
//               {buttons.nextBtn[language]}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ApplyThree;

// ----------------------------------------------------------------------------------------------------

