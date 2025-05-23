"use client";

import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { toast } from "react-toastify";

interface ApplyStepsProps {
  /** Cari addım (1-dən başlayır) */
  step: number;
}

const ApplySteps = ({ step }: ApplyStepsProps) => {
  const navigate = useNavigate();
  const { language, componentsTranslations } = useLanguage();
  const steps = componentsTranslations.applySteps;

  /* Hər addımın route-u */
  const routes = [
    "/apply", // 1
    "/apply/two", // 2
    "/apply/three", // 3
    "/apply/four", // 4
    "/apply/five", // 5
  ];

  /* Toast mesajı (istəsən translations-a ata bilərsən) */
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
          const isPast = num < step;
          const isFuture = num > step;

          const circle = (
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center text-m z-10
              ${
                isCurrent
                  ? "bg-[#373176] text-white"
                  : "bg-[#ECECEC33] border border-[#373176]"
              }
              ${isPast ? "hover:opacity-80 cursor-pointer" : ""}
              ${isFuture ? "cursor-pointer" : ""}
              `}
            >
              {num}
            </div>
          );

          const hasAllValues = (obj: unknown): boolean => {
            if (obj == null || obj === "" || obj === undefined) return false;

            if (typeof obj === "string") return obj.trim().length > 0;

            if (Array.isArray(obj))
              return obj.length > 0 && obj.every(hasAllValues);

            if (typeof obj === "object") {
              const keys = Object.keys(obj as object);
              if (keys.length === 0) return false;
              return keys.every((key) => hasAllValues((obj as Record<string, unknown>)[key]));
            }

            return true;
          };

          const handleClick = () => {
            if (isPast) navigate(routes[index]);
            redirectToAccessibleStep(num);
          };

          const redirectToAccessibleStep = (stepNum: number) => {
            const storageName = getStepsStorageName(stepNum);
            const relatedStepData = localStorage.getItem(`${storageName}`);
            const canAccessibleRelatedStep = !hasAllValues(relatedStepData);
            return canAccessibleRelatedStep
              ? showFillToast()
              : navigate(routes[index]);
          };

          const getStepsStorageName = (stepNum: number): string => {
            switch (stepNum) {
              case 1:
                return "companyData";
              case 2:
                return "propertyLaw";
              case 3:
                return "digitalReadiness";
              case 4:
                return "digitalAndFinancial";
              case 5:
                return "restOfData";
              default:
                return "";
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
                  title={Object.values(steps)[index][language]}
                  className="focus:outline-none"
                >
                  {circle}
                </button>
              )}

              <div
                className={`text-xs text-center mt-2 max-w-[225px] 
                ${isCurrent ? "text-[#F9F9F9]" : "text-gray-400"}`}
              >
                {Object.values(steps)[index][language]}
              </div>
            </div>
          );
        })}

        <div className="absolute top-5 left-0 w-full h-[2px] z-0">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`absolute h-[2px] ${
                index + 1 <= step ? "bg-[#FFFFFF]" : "bg-[#ECECECA1]"
              }`}
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
