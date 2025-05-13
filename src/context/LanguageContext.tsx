import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import { layoutTranslations } from "../i18n/layoutTranslations";
import { pagesTranslations } from "../i18n/pagesTranslations";
import { componentsTranslations } from "../i18n/componentsTranslations";

type Language = "AZ" | "EN";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  layoutTranslations: typeof layoutTranslations;
  pagesTranslations: typeof pagesTranslations;
  componentsTranslations: typeof componentsTranslations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("AZ");

  const toggleLanguage = () => {
    setLanguage(prev => (prev === "AZ" ? "EN" : "AZ"));
  };

  const value: LanguageContextType = {
    language,
    toggleLanguage,
    layoutTranslations,
    pagesTranslations,
    componentsTranslations
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("error");
  return context;
};

