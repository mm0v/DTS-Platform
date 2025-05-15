"use client";

import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, type ChangeEvent } from "react";
import BackgroundVideo from "../components/BackgroundVideo";
import { FormContext } from "../context/FormContext";
import { useLanguage } from "../context/LanguageContext";
import ApplySteps from "../components/ApplySteps";
import { ChevronDown, ChevronUp } from "lucide-react";

const ApplyThree = () => {
  const navigate = useNavigate();
  const context = useContext(FormContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { language, pagesTranslations } = useLanguage();
  const page = pagesTranslations.apply3;
  const buttons = pagesTranslations.applyBtns;

  if (!context) {
    throw new Error("ApplyThree must be used within a FormContext.Provider");
  }

  const { formData, setFormData } = context;

  /* ---------- localStorage yükü ---------- */
  useEffect(() => {
    const saved = localStorage.getItem("formData");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing saved form data:", e);
      }
    }
  }, [setFormData]);

  /* ---------- util ---------- */
  const saveToLS = (data: typeof formData) =>
    localStorage.setItem("formData", JSON.stringify(data));

  /* ---------- input handlers ---------- */
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    let updated = { ...formData };

    if (name === "digitalLevel") {
      updated = {
        ...updated,
        digitalReadiness: {
          ...updated.digitalReadiness,
          digitalLevel: Number(value) || 0,
        },
      };
    } else {
      updated = {
        ...updated,
        digitalReadiness: {
          ...updated.digitalReadiness,
          [name]: value,
        },
      };
    }

    setFormData(updated);
    saveToLS(updated);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const { keyChallenges } = formData.digitalReadiness;

    const updated = {
      ...formData,
      digitalReadiness: {
        ...formData.digitalReadiness,
        keyChallenges: checked
          ? [...keyChallenges, value]
          : keyChallenges.filter((c) => c !== value),
      },
    };

    setFormData(updated);
    saveToLS(updated);
  };

  const handleDigitalToolChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const { digitalTools } = formData.digitalReadiness;

    const updated = {
      ...formData,
      digitalReadiness: {
        ...formData.digitalReadiness,
        digitalTools: checked
          ? [...digitalTools, value]
          : digitalTools.filter((t) => t !== value),
      },
    };

    setFormData(updated);
    saveToLS(updated);
  };

  /* ---------- navigation ---------- */
  const handleGoBack = () => navigate("/apply/two");
  const handleGoNext = () => navigate("/apply/four");

  /* ---------- helpers ---------- */
  const digitalLevelStr = String(formData.digitalReadiness.digitalLevel || "");

  /* ---------- UI ---------- */
  return (
    <>
      <BackgroundVideo />

      <div className="min-h-screen bg-[url('/images/space-background.jpg')] bg-cover bg-center text-white flex flex-col items-center justify-center py-10">
        <ApplySteps step={3} />

        <div className="w-full max-w-4xl mb-8 px-6">
          <h1 className="text-center text-3xl font-semibold mb-6">
            {page.title[language]}
          </h1>

          {/* ----------- FORM ----------- */}
          <form className="space-y-6">
            {/* Digital Level */}
            <div>
              <label className="block mb-2">{page.digitalLevel[language]}</label>

              {/* relative div + appearance-none select + icon */}
              <div className="relative">
                <select
                  name="digitalLevel"
                  value={digitalLevelStr}
                  onChange={handleInputChange}
                  className="appearance-none w-full p-2 bg-gray-800 text-white rounded pr-10"
                >
                  <option value="1">
                    {page.digitalLevelOptions.level1[language]}
                  </option>
                  <option value="2">
                    {page.digitalLevelOptions.level2[language]}
                  </option>
                  <option value="3">
                    {page.digitalLevelOptions.level3[language]}
                  </option>
                </select>
                <span className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none">
                  <ChevronDown size={18} />
                </span>
              </div>
            </div>

            {/* Digital Tools (dropdown) */}
            <div>
              <label className="block mb-2">{page.digitalTools[language]}</label>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((o) => !o)}
                  className="w-full p-2 bg-gray-800 text-white rounded text-left flex justify-between items-center"
                >
                  <span>
                    {formData.digitalReadiness.digitalTools.length > 0
                      ? `${formData.digitalReadiness.digitalTools.length} ${page.digitalToolsOptions.selected[language]}`
                      : page.placeholder[language]}
                  </span>

                  {/* icon span */}
                  <span className="ml-2">
                    {isDropdownOpen ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-800 rounded shadow-lg">
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
                      <label
                        key={tool.value}
                        className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={tool.value}
                          checked={formData.digitalReadiness.digitalTools.includes(
                            tool.value
                          )}
                          onChange={handleDigitalToolChange}
                          className="form-checkbox text-blue-500 rounded"
                        />
                        <span className="ml-2">{tool.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Key Challenges */}
            <div>
              <p className="text-xl mb-2">{page.keyChallenges.title[language]}</p>
              <div className="grid grid-cols-1 gap-4">
                {[
                  "budget_shortage",
                  "technical_expertise",
                  "training_needs",
                  "digital_strategy",
                  "infrastructure_limits",
                  "other",
                ].map((c) => (
                  <label key={c} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={c}
                      checked={formData.digitalReadiness.keyChallenges.includes(
                        c
                      )}
                      onChange={handleCheckboxChange}
                      className="form-checkbox text-blue-500"
                    />
                    <span className="ml-2">
                      {page.keyChallenges[c as keyof typeof page.keyChallenges][
                        language
                      ]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Company Purpose */}
            <div>
              <p className="text-xl mb-2">{page.companyPurpose.title[language]}</p>
              <textarea
                name="companyPurpose"
                value={formData.digitalReadiness.companyPurpose}
                onChange={handleInputChange}
                className="w-full p-4 bg-gray-800 text-white rounded"
                rows={4}
                placeholder={page.companyPurpose.placeholder[language]}
                maxLength={500}
                minLength={3}
              />
            </div>
          </form>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              className="w-[48%] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
              onClick={handleGoBack}
            >
              {buttons.backBtn[language]}
            </button>
            <button
              className="w-[48%] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
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
