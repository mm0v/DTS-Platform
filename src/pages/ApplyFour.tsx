"use client";

import { useState, useContext, useEffect } from "react";
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

  // Initialize local form state from context
  const [localFormData, setLocalFormData] = useState({
    digitalTeamOrLead: formData.digitalLeadership.digitalTeamOrLead
      ? "Bəli"
      : "Xeyr",
    digitalPath: formData.digitalLeadership.digitalPath ? "Bəli" : "Xeyr",
    digitalTransformationLoyality: formData.digitalLeadership
      .digitalTransformationLoyality
      ? "Bəli"
      : "Xeyr",
    financialNeed: formData.financialNeeding.financialNeed ? "Bəli" : "Xeyr",
    neededBudget: formData.financialNeeding.neededBudget,
  });

  // Update local state when context changes
  useEffect(() => {
    setLocalFormData({
      digitalTeamOrLead: formData.digitalLeadership.digitalTeamOrLead
        ? "Bəli"
        : "Xeyr",
      digitalPath: formData.digitalLeadership.digitalPath ? "Bəli" : "Xeyr",
      digitalTransformationLoyality: formData.digitalLeadership
        .digitalTransformationLoyality
        ? "Bəli"
        : "Xeyr",
      financialNeed: formData.financialNeeding.financialNeed ? "Bəli" : "Xeyr",
      neededBudget: formData.financialNeeding.neededBudget,
    });
  }, [formData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLocalFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Update the global form context based on the input name
    if (
      name === "digitalTeamOrLead" ||
      name === "digitalPath" ||
      name === "digitalTransformationLoyality"
    ) {
      setFormData((prev) => ({
        ...prev,
        digitalLeadership: {
          ...prev.digitalLeadership,
          [name]: value === "Bəli", // Convert to boolean
        },
      }));
    } else if (name === "financialNeed") {
      setFormData((prev) => ({
        ...prev,
        financialNeeding: {
          ...prev.financialNeeding,
          financialNeed: value === "Bəli", // Convert to boolean
        },
      }));
    } else if (name === "neededBudget") {
      setFormData((prev) => ({
        ...prev,
        financialNeeding: {
          ...prev.financialNeeding,
          neededBudget: value,
        },
      }));
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
      <div className="min-h-screen w-full bg-black bg-[url('/images/space-background.jpg')] bg-cover bg-center bg-no-repeat text-white flex flex-col items-center justify-center py-10">
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
                  name="digitalTeamOrLead"
                  value="Bəli"
                  checked={localFormData.digitalTeamOrLead === "Bəli"}
                  onChange={handleInputChange}
                  className="text-blue-500"
                />
                <label className="text-sm">Bəli</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="digitalTeamOrLead"
                  value="Xeyr"
                  checked={localFormData.digitalTeamOrLead === "Xeyr"}
                  onChange={handleInputChange}
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
                  name="digitalPath"
                  value="Bəli"
                  checked={localFormData.digitalPath === "Bəli"}
                  onChange={handleInputChange}
                  className="text-blue-500"
                />
                <label className="text-sm">Bəli</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="digitalPath"
                  value="Xeyr"
                  checked={localFormData.digitalPath === "Xeyr"}
                  onChange={handleInputChange}
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
                  name="digitalTransformationLoyality"
                  value="Bəli"
                  checked={
                    localFormData.digitalTransformationLoyality === "Bəli"
                  }
                  onChange={handleInputChange}
                  className="text-blue-500"
                />
                <label className="text-sm">Bəli</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="digitalTransformationLoyality"
                  value="Xeyr"
                  checked={
                    localFormData.digitalTransformationLoyality === "Xeyr"
                  }
                  onChange={handleInputChange}
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
                  name="financialNeed"
                  value="Bəli"
                  checked={localFormData.financialNeed === "Bəli"}
                  onChange={handleInputChange}
                  className="text-blue-500"
                />
                <label className="text-sm">Bəli</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="financialNeed"
                  value="Xeyr"
                  checked={localFormData.financialNeed === "Xeyr"}
                  onChange={handleInputChange}
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
              name="neededBudget"
              value={localFormData.neededBudget}
              onChange={handleInputChange}
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
