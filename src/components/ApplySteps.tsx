"use client";

import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { toast } from "react-toastify";

interface ApplyStepsProps {
  step: number;
  onClick: () => boolean;
}

const ApplySteps = ({ step, onClick }: ApplyStepsProps) => {
  const navigate = useNavigate();
  const { language, componentsTranslations } = useLanguage();
  const steps = componentsTranslations.applySteps;

  const routes = [
    "/apply",
    "/apply/two",
    "/apply/three",
    "/apply/four",
    "/apply/five",
  ];

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

          const handleClick = () => {
            return onClick() || isPast
              ? navigate(routes[index])
              : showFillToast();
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
