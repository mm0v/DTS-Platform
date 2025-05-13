import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import BackgroundVideo from "../components/BackgroundVideo";
import { FormContext } from "../context/FormContext";

const ApplyThree = () => {
  const navigate = useNavigate();
  const context = useContext(FormContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!context) {
    throw new Error("ApplyThree must be used within a FormContext.Provider");
  }

  const { formData, setFormData } = context;

  // Debug current value of digitalLevel on component mount
  useEffect(() => {
    console.log(
      "Current digitalLevel value:",
      formData.digitalReadiness.digitalLevel
    );
    console.log(
      "Current digitalLevel type:",
      typeof formData.digitalReadiness.digitalLevel
    );
  }, [formData.digitalReadiness.digitalLevel]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "digitalLevel") {
      // Convert digitalLevel to a number (Byte)
      const digitalLevelMap: { [key: string]: number } = {
        "": 0,
        "1": 1, // Make sure to use string keys for string values from the select
        "2": 2,
        "3": 3,
      };

      // Ensure we're setting a number value by using Number()
      const numericValue = digitalLevelMap[value] || 0;

      console.log(
        `Setting digitalLevel to ${numericValue} (${typeof numericValue})`
      );

      setFormData((prev) => ({
        ...prev,
        digitalReadiness: {
          ...prev.digitalReadiness,
          digitalLevel: numericValue,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        digitalReadiness: {
          ...prev.digitalReadiness,
          [name]: value,
        },
      }));
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      digitalReadiness: {
        ...prev.digitalReadiness,
        keyChallenges: checked
          ? [...prev.digitalReadiness.keyChallenges, value]
          : prev.digitalReadiness.keyChallenges.filter(
            (challenge) => challenge !== value
          ),
      },
    }));
  };

  const handleDigitalToolChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      digitalReadiness: {
        ...prev.digitalReadiness,
        digitalTools: checked
          ? [...prev.digitalReadiness.digitalTools, value]
          : prev.digitalReadiness.digitalTools.filter((tool) => tool !== value),
      },
    }));
  };

  const handleGoBack = () => {
    navigate("/apply/two");
  };

  const handleGoNext = () => {
    // Add validation if needed
    navigate("/apply/four");
  };

  // Convert the numeric digitalLevel back to string for the select input
  const getDigitalLevelString = (): string => {
    const levelValue = formData.digitalReadiness.digitalLevel;

    console.log(
      `Getting digital level string for value: ${levelValue} (${typeof levelValue})`
    );

    switch (Number(levelValue)) {
      case 1:
        return "1";
      case 2:
        return "2";
      case 3:
        return "3";
      default:
        return "";
    }
  };

  return (
    <>
      <BackgroundVideo />
      <div className="min-h-screen bg-black bg-[url('/images/space-background.jpg')] bg-cover bg-center text-white flex flex-col items-center justify-center py-10">
        <div className="w-full max-w-4xl mb-8 px-4">
          <div className="relative w-full h-[1px] bg-blue-500">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm ${num <= 3 ? "bg-blue-500" : "bg-blue-900"
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
            <div className="text-center max-w-[100px] text-blue-400">

              Rəqəmsal hazırlıq və transformasiya ehtiyacları
            </div>
            <div className="text-center max-w-[100px]">
              Liderlik və öhdəliklər
            </div>
            <div className="text-center max-w-[100px]">
              Tələb olunan sənədlər
            </div>
          </div>
        </div>

        <div className="w-full max-w-4xl mb-8 px-6">
          <div className="text-center text-3xl font-semibold mb-6">
            Rəqəmsal hazırlıq və transformasiya ehtiyacları
          </div>

          {/* Digital Level Debug Info */}
          {/* <div className="mb-4 p-3 bg-blue-900/30 rounded">
            <p className="text-sm">
              Current digitalLevel: {formData.digitalReadiness.digitalLevel}{" "}
              (type: {typeof formData.digitalReadiness.digitalLevel})
            </p>
          </div> */}

          <form className="space-y-6">
            <div className="flex justify-between items-center space-x-4">
              <label className="w-1/3">Mövcud rəqəmsallaşma səviyyəsi:</label>
              <select
                name="digitalLevel"
                value={getDigitalLevelString()}
                onChange={handleInputChange}
                className="w-2/3 p-2 bg-gray-800 text-white rounded"
              >
                <option value="1">Başlanğıc</option>
                <option value="2">Orta</option>
                <option value="3">İnkişaf etmiş</option>
              </select>
            </div>

            <div className="flex justify-between items-center space-x-4">
              <label className="w-1/3">Mövcud rəqəmsal alətlər:</label>
              <div className="w-2/3 relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full p-2 bg-gray-800 text-white rounded text-left flex justify-between items-center"
                >
                  <span>
                    {formData.digitalReadiness.digitalTools.length > 0
                      ? `${formData.digitalReadiness.digitalTools.length} seçilib`
                      : "Seçin"}
                  </span>
                  <span className="ml-2">▼</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-800 rounded shadow-lg">
                    {[
                      { value: "crm", label: "CRM" },
                      { value: "erp", label: "ERP" },
                      { value: "accounting", label: "Mühasibat proqramları" },
                      { value: "other", label: "Digər" },
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

            <div className="space-y-2">
              <p className="text-xl">
                Rəqəmsal transformasiyada əsas çətinliklər:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "budget_shortage",
                  "technical_expertise",
                  "training_needs",
                  "digital_strategy",
                  "infrastructure_limits",
                  "other",
                ].map((challenge) => (
                  <label key={challenge} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={challenge}
                      checked={formData.digitalReadiness.keyChallenges.includes(
                        challenge
                      )}
                      onChange={handleCheckboxChange}
                      className="form-checkbox text-blue-500"
                    />
                    <span className="ml-2">
                      {challenge === "budget_shortage" && "Büdcə çatışmazlığı"}
                      {challenge === "technical_expertise" &&
                        "Texniki təcrübənin çatışmazlığı"}
                      {challenge === "training_needs" && "Təlimə ehtiyac"}
                      {challenge === "digital_strategy" &&
                        "Rəqəmsal strategiyanın çatışmazlığı"}
                      {challenge === "infrastructure_limits" &&
                        "İnfrastruktur məhdudiyyətləri"}
                      {challenge === "other" && "Digər"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xl">
                Şirkətinizin əsas rəqəmsal transformasiya məqsədləri nədir?
              </p>
              <textarea
                name="companyPurpose"
                value={formData.digitalReadiness.companyPurpose}
                onChange={handleInputChange}
                className="w-full p-4 bg-gray-800 text-white rounded"
                rows={4}
                placeholder="Minimum 3 simvol, maksimum 500 simvol daxil edə bilərsiniz."
                maxLength={500}
                minLength={3}
              />
            </div>
          </form>

          <div className="flex justify-between space-x-4 mt-8">
            <button
              onClick={handleGoBack}
              className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Geri
            </button>
            <button
              onClick={handleGoNext}
              className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Növbəti
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyThree
