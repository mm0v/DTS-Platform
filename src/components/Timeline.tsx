import React, { useState, useEffect } from "react";
import type { ReactElement } from "react";
import { useLanguage } from "../context/LanguageContext";

interface TitleContent {
  line1: string;
  line2: string;
}

interface StepContent {
  heading: string;
  description: string;
}

interface Step {
  id: number;
  title: TitleContent;
  content: StepContent;
  position: "left" | "right";
}

interface StepContentProps {
  heading: string;
  description: string;
}

interface DropdownArrowProps {
  isOpen: boolean;
}

const Timeline: React.FC = (): ReactElement => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { language, componentsTranslations } = useLanguage();
  const page = componentsTranslations.timeline;
  const stepsRaw = page.steps;

  const steps: Step[] = stepsRaw.map((step) => ({
    id: step.id,
    position:
      step.position === "left" || step.position === "right"
        ? step.position
        : "left",
    title: {
      line1: step.title[language].line1,
      line2: step.title[language].line2,
    },
    content: {
      heading: step.content[language].heading,
      description: step.content[language].description,
    },
  }));

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleStepClick = (stepId: number): void => {
    if (isMobile) {
      setSelectedStep(selectedStep === stepId ? null : stepId);
    }
  };

  const handleStepBoxMouseEnter = (stepId: number): void => {
    if (!isMobile) {
      setHoveredStep(stepId);
    }
  };

  const handleStepMouseLeave = (): void => {
    if (!isMobile) {
      setHoveredStep(null);
    }
  };

  const StepContent: React.FC<StepContentProps> = ({
    heading,
    description,
  }): ReactElement => (
    <div className="flex flex-col">
      <h6 className="text-lg font-bold mb-2">{heading}</h6>
      <p className="text-sm">{description}</p>
    </div>
  );

  const DropdownArrow: React.FC<DropdownArrowProps> = ({
    isOpen,
  }): ReactElement => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-5 w-5 transform transition-transform duration-300 ${
        isOpen ? "rotate-180" : ""
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #1A4381 -96.34%, #FFF 99.92%)",
      }}
      className="flex flex-col items-center text-white min-h-screen w-full p-4 md:p-8"
    >
      <div className="max-w-4xl w-full">
        <div className="mb-18 mt-10">
          <h1 className="text-2xl md:text-4xl font-bold text-center mb-2">
            {page.title[language]}
          </h1>
          <p className="text-center mt-8 mb-8 md:mb-12 text-xs md:text-lg">
            {page.description[language][0]}
            <br className="hidden md:block" /> {page.description[language][1]}
          </p>
        </div>

        {!isMobile && (
          <div className="hidden md:block relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white"></div>

            <div className="relative">
              {steps.map((step) => {
                const isActive = hoveredStep === step.id;

                return (
                  <div
                    key={step.id}
                    className="flex items-center mb-24 relative"
                  >
                    <div
                      className={`w-5/12 flex ${
                        step.position === "left"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {step.position === "left" && (
                        <div
                          className={`bg-gradient-to-r from-[#1A4381] to-[#050E1B] text-white px-6 py-5 rounded-3xl transition-all duration-300 shadow-lg cursor-pointer w-72 h-24 flex items-center
                                                    ${
                                                      isActive
                                                        ? "from-[#2255a7] to-[#0a1e3e] shadow-xl"
                                                        : "hover:from-[#1d4b92] hover:to-[#071528]"
                                                    }`}
                          onMouseEnter={() => handleStepBoxMouseEnter(step.id)}
                          onMouseLeave={handleStepMouseLeave}
                        >
                          <div className="flex flex-col items-center md:items-start">
                            <p className="text-sm font-medium mb-1">
                              {step.title.line1}
                            </p>
                            <p className="text-sm font-medium">
                              {step.title.line2}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                      <div
                        className={`flex items-center justify-center h-12 w-12 transition-all duration-300 ${
                          isActive ? "scale-110" : ""
                        }`}
                      >
                        <div
                          className="absolute h-8 w-8 bg-white rounded-full opacity-20 animate-ping"
                          style={{
                            animationDuration: "3s",
                            display: isActive ? "block" : "none",
                          }}
                        ></div>
                        <div className="bg-gradient-to-r from-[#1A4381] to-[#050E1B] rounded-full h-full w-full flex items-center justify-center shadow-lg">
                          <span className="text-white text-base font-bold">
                            {step.id}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`w-5/12 ml-14 flex ${
                        step.position === "right"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {step.position === "right" && (
                        <div
                          className={`bg-gradient-to-r from-[#1A4381] to-[#050E1B] text-white px-6 py-5 rounded-3xl transition-all duration-300 shadow-lg cursor-pointer ml-16 w-72 h-24 flex items-center
                                                    ${
                                                      isActive
                                                        ? "from-[#2255a7] to-[#0a1e3e] shadow-xl"
                                                        : "hover:from-[#1d4b92] hover:to-[#071528]"
                                                    }`}
                          onMouseEnter={() => handleStepBoxMouseEnter(step.id)}
                          onMouseLeave={handleStepMouseLeave}
                        >
                          <div className="flex flex-col items-center md:items-start">
                            <p className="text-sm font-medium mb-1">
                              {step.title.line1}
                            </p>
                            <p className="text-sm font-medium">
                              {step.title.line2}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div
                      className={`absolute z-20 w-80 bg-gradient-to-r from-[#1A4381] to-[#050E1B] text-white p-6 rounded-3xl shadow-xl transition-all duration-300 
                                                ${
                                                  step.position === "left"
                                                    ? "left-[calc(50%+40px)]"
                                                    : "right-[calc(50%+40px)]"
                                                }
                                                ${
                                                  isActive
                                                    ? "opacity-100 scale-100 translate-y-0"
                                                    : "opacity-0 scale-95 translate-y-2 pointer-events-none"
                                                }`}
                      onMouseEnter={() => handleStepBoxMouseEnter(step.id)}
                      onMouseLeave={handleStepMouseLeave}
                    >
                      <StepContent
                        heading={step.content.heading}
                        description={step.content.description}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {isMobile && (
          <div className="md:hidden relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-white"></div>

            <div className="relative">
              {steps.map((step) => {
                const isActive = selectedStep === step.id;

                return (
                  <div
                    key={step.id}
                    className="flex flex-col items-center mb-14"
                  >
                    <div className="flex justify-center mb-3">
                      <div
                        className={`flex items-center justify-center h-10 w-10 transition-all duration-300 ${
                          isActive ? "scale-110" : ""
                        }`}
                      >
                        <div
                          className="absolute h-6 w-6 bg-white rounded-full opacity-20 animate-ping"
                          style={{
                            animationDuration: "3s",
                            display: isActive ? "block" : "none",
                          }}
                        ></div>
                        <div className="bg-gradient-to-r from-[#1A4381] to-[#050E1B] rounded-full h-full w-full flex items-center justify-center shadow-lg">
                          <span className="text-white text-sm font-bold">
                            {step.id}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full px-4">
                      <div
                        className={`bg-gradient-to-r from-[#1A4381] to-[#050E1B] text-white px-4 py-7 rounded-xl w-full transition-all duration-300 shadow-lg cursor-pointer
                                                ${
                                                  isActive
                                                    ? "from-[#2255a7] to-[#0a1e3e] shadow-xl"
                                                    : ""
                                                }`}
                        onClick={() => handleStepClick(step.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <p className="text-base font-medium">
                              {step.title.line1}
                            </p>
                            <p className="text-base font-medium">
                              {step.title.line2}
                            </p>
                          </div>

                          <div className="ml-2">
                            <DropdownArrow isOpen={isActive} />
                          </div>
                        </div>

                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out 
                                                        ${
                                                          isActive
                                                            ? "max-h-60 opacity-100 mt-4 pt-4 border-t border-blue-400"
                                                            : "max-h-0 opacity-0 mt-0 pt-0 border-none"
                                                        }`}
                        >
                          <StepContent
                            heading={step.content.heading}
                            description={step.content.description}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;
