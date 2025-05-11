"use client";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundVideo from "../components/BackgroundVideo";
import { FormContext } from "../context/FormContext";

export default function ApplyFour() {
  const navigate = useNavigate();
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("ApplyFour must be used within a FormContext.Provider");
  }

  const { formData, setFormData } = context;

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isYes = value === "Bəli";

    // Update the appropriate leadership property
    if (name === "digitalTransformationLeader") {
      setFormData((prev) => ({
        ...prev,
        digitalLeadership: {
          ...prev.digitalLeadership,
          digitalTeamOrLead: isYes,
        },
      }));
    } else if (name === "hasStrategy") {
      setFormData((prev) => ({
        ...prev,
        digitalLeadership: {
          ...prev.digitalLeadership,
          digitalPath: isYes,
        },
      }));
    } else if (name === "highLevelManagementSupport") {
      setFormData((prev) => ({
        ...prev,
        digitalLeadership: {
          ...prev.digitalLeadership,
          digitalTransformationLoyality: isYes,
        },
      }));
    } else if (name === "financialNeeds") {
      setFormData((prev) => ({
        ...prev,
        financialNeeding: {
          ...prev.financialNeeding,
          financialNeed: isYes,
        },
      }));
    }
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      financialNeeding: {
        ...prev.financialNeeding,
        neededBudget: value,
      },
    }));
  };

  // Check if a radio button should be checked based on the form data
  const isChecked = (fieldName: string, value: string) => {
    const isYes = value === "Bəli";

    switch (fieldName) {
      case "digitalTransformationLeader":
        return isYes === formData.digitalLeadership.digitalTeamOrLead;
      case "hasStrategy":
        return isYes === formData.digitalLeadership.digitalPath;
      case "highLevelManagementSupport":
        return (
          isYes === formData.digitalLeadership.digitalTransformationLoyality
        );
      case "financialNeeds":
        return isYes === formData.financialNeeding.financialNeed;
      default:
        return false;
    }
  };

  // Geri butonuna basıldığında ApplyThree sayfasına git
  const handleGoBack = () => {
    navigate("/apply/three");
  };

  // Növbəti butonuna basıldığında ApplyFive sayfasına git
  const handleNext = () => {
    navigate("/apply/five");
  };

  return (
    <>
      <BackgroundVideo />
      <div className="min-h-screen w-full bg-black bg-[url('/images/space-background.jpg')] bg-cover bg-center bg-no-repeat text-white flex flex-col  items-center justify-center py-10">
        {/* Progress Steps */}
        <div className="w-full max-w-4xl mb-8 px-4">
          <div className="relative w-full h-[1px] bg-blue-500">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  num <= 4 ? "bg-blue-500" : "bg-blue-900"
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
              Hüquqi və hüquqi quruluş
            </div>
            <div className="text-center max-w-[100px]">
              Rəqəmsal hazırlıq və transformasiya ehtiyacları
            </div>
            <div className="text-center max-w-[100px] text-blue-400">
              Liderlik və öhdəliklər
            </div>
            <div className="text-center max-w-[100px]">
              Tələb olunan sənədlər
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="text-xs text-blue-400">1333 x 96</div>
          <h1 className="text-2xl md:text-3xl font-medium">
            Liderlik və öhdəliklər
          </h1>
        </div>

        <div className="w-full max-w-2xl space-y-4">
          {/* Digital Transformation Leader */}
          <div className="space-y-1">
            <label className="text-sm">
              Şirkətinizin rəqəmsal transformasiya lideri və ya komandası var
              mı?
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="digitalTransformationLeader"
                  value="Bəli"
                  checked={isChecked("digitalTransformationLeader", "Bəli")}
                  onChange={handleRadioChange}
                  className="text-blue-500"
                />
                <label className="text-sm">Bəli</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="digitalTransformationLeader"
                  value="Xeyr"
                  checked={isChecked("digitalTransformationLeader", "Xeyr")}
                  onChange={handleRadioChange}
                  className="text-blue-500"
                />
                <label className="text-sm">Xeyr</label>
              </div>
            </div>
          </div>

          {/* Strategy and Roadmap */}
          <div className="space-y-1">
            <label className="text-sm">
              Şirkətiniz əvvəllər rəqəmsal transformasiya strategiyası və ya yol
              xəritəsi hazırlayıbmı?
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="hasStrategy"
                  value="Bəli"
                  checked={isChecked("hasStrategy", "Bəli")}
                  onChange={handleRadioChange}
                  className="text-blue-500"
                />
                <label className="text-sm">Bəli</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="hasStrategy"
                  value="Xeyr"
                  checked={isChecked("hasStrategy", "Xeyr")}
                  onChange={handleRadioChange}
                  className="text-blue-500"
                />
                <label className="text-sm">Xeyr</label>
              </div>
            </div>
          </div>

          {/* High-Level Management Support */}
          <div className="space-y-1">
            <label className="text-sm">
              Yüksək səviyyəli rəhbərlər rəqəmsal transformasiya strategiyasının
              həyata keçirilməsinə sadiqdirmi?
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="highLevelManagementSupport"
                  value="Bəli"
                  checked={isChecked("highLevelManagementSupport", "Bəli")}
                  onChange={handleRadioChange}
                  className="text-blue-500"
                />
                <label className="text-sm">Bəli</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="highLevelManagementSupport"
                  value="Xeyr"
                  checked={isChecked("highLevelManagementSupport", "Xeyr")}
                  onChange={handleRadioChange}
                  className="text-blue-500"
                />
                <label className="text-sm">Xeyr</label>
              </div>
            </div>
          </div>

          {/* Financial Needs */}
          <div className="space-y-1">
            <label className="text-sm">
              Şirkətinizin rəqəmsal halleri tətbiq etmək üçün maliyyə dəstəyinə
              ehtiyacı varmı?
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="financialNeeds"
                  value="Bəli"
                  checked={isChecked("financialNeeds", "Bəli")}
                  onChange={handleRadioChange}
                  className="text-blue-500"
                />
                <label className="text-sm">Bəli</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="financialNeeds"
                  value="Xeyr"
                  checked={isChecked("financialNeeds", "Xeyr")}
                  onChange={handleRadioChange}
                  className="text-blue-500"
                />
                <label className="text-sm">Xeyr</label>
              </div>
            </div>
          </div>

          {/* Transformation Budget */}
          <div className="space-y-1">
            <label className="text-sm">
              Rəqəmsal transformasiya üçün tələb olunan texniki büdcə (əgər
              məlumdur)
            </label>
            <input
              type="number"
              name="transformationBudget"
              value={formData.financialNeeding.neededBudget}
              onChange={handleBudgetChange}
              className="w-full bg-transparent border border-gray-700 rounded p-2 focus:outline-none focus:border-blue-500"
              placeholder="AZN"
            />
          </div>

          {/* Geri və Növbəti Butonları */}
          <div className="flex justify-between mt-6">
            <button
              className="w-[48%] cursor-pointer bg-gray-600 text-white py-3 rounded transition duration-200"
              onClick={handleGoBack}
            >
              Geri
            </button>
            <button
              className="w-[48%] cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition duration-200"
              onClick={handleNext}
            >
              Növbəti
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
