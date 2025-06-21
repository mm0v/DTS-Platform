import AccordionExpandDefault from "../components/shared/AccordionSimpleMui"
import BackgroundVideo from "../components/videos/BackgroundVideo";
import ToContact from "../components/ToContact";
import { useLanguage } from "../context/LanguageContext";

const FAG = () => {
  const { language, pagesTranslations } = useLanguage();

  return (
    <div>
      <div className="mt-24">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-white pl-2 pr-2 pb-20 mb-10">{pagesTranslations.fag.title[language]}</h1>
        </div>

        <ToContact />

        <div style={{
          background: "linear-gradient(180deg, rgba(35, 42, 96, 0.90) -4.83%, rgba(0, 0, 0, 0.00) 102.71%), var(--surface-white-primary, #FFF)",
        }}>

          <BackgroundVideo />

          <div className="max-w-2xl mx-auto pt-10 pb-10">
            <div className="mr-2 ml-2">
              <AccordionExpandDefault />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FAG;