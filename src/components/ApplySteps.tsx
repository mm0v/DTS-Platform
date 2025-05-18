"use client";

import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface ApplyStepsProps {
  /** Cari addım (1-dən başlayır) */
  step: number;
}

const ApplySteps = ({ step }: ApplyStepsProps) => {
  const navigate = useNavigate();
  const { language, componentsTranslations } = useLanguage();
  const steps = componentsTranslations.applySteps;

  // Keep track of the furthest step reached
  useEffect(() => {
    const saved = Number(localStorage.getItem("maxStep") || 0);
    const updated = Math.max(saved, step);
    localStorage.setItem("maxStep", String(updated));
  }, [step]);

  // Determine which steps are allowed based on the max reached
  const maxStep = Number(localStorage.getItem("maxStep") || step);

  /* Hər addımın route-u */
  const routes = [
    "/apply",     // 1
    "/apply/two", // 2
    "/apply/three", // 3
    "/apply/four", // 4
    "/apply/five", // 5
  ];

  /* Toast mesajı */
  const showFillToast = () =>
    toast.warning(steps.fillFieldsWarning[language], {
      position: "top-center",
    });

  return (
    <div className="relative z-20 w-full mt-2 max-w-7xl mb-12 px-4">
      <div className="relative flex justify-between items-start">
        {[...Array(5)].map((_, index) => {
          const num = index + 1;
          const isCurrent = num === step;
          const isAllowed = num <= maxStep;

          const circle = (
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center text-m z-10
                ${isCurrent ? "bg-[#373176] text-white" : "bg-[#ECECEC33] border border-[#373176]"}
                ${isAllowed && !isCurrent ? "hover:opacity-80 cursor-pointer" : "cursor-default"}
              `}
            >
              {num}
            </div>
          );

          const handleClick = () => {
            if (isAllowed && !isCurrent) {
              navigate(routes[index]);
            } else if (!isAllowed) {
              showFillToast();
            }
          };

          return (
            <div key={num} className="flex flex-col items-center w-1/5">
              {isCurrent ? (
                circle
              ) : (
                <button
                  type="button"
                  onClick={handleClick}
                  className="focus:outline-none"
                  title={Object.values(steps)[index][language]}
                  disabled={!isAllowed}
                >
                  {circle}
                </button>
              )}
              <div className={`text-xs text-center mt-2 max-w-[225px] ${isCurrent ? "text-[#F9F9F9]" : "text-gray-400"}`}>
                {Object.values(steps)[index][language]}
              </div>
            </div>
          );
        })}

        {/* Progress bar */}
        <div className="absolute top-5 left-0 w-full h-[2px] z-0">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`absolute h-[2px] ${index + 1 < maxStep ? "bg-[#FFFFFF]" : "bg-[#ECECECA1]"}`}
              style={{
                left: `calc(${(index + 0.5) * 20}% + 28px)`,
                width: `calc(20% - 56px)`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplySteps;
