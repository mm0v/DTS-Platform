import ControlledAccordions from "../components/shared/AccordionMui";
import BackgroundVideo from "../components/videos/BackgroundVideo";
import ToContact from "../components/ToContact";
import { useLanguage } from "../context/LanguageContext";

const ComplianceAndPrioritization = () => {
  const { language, pagesTranslations } = useLanguage();
  const page = pagesTranslations.compliance;

  return (
    <div className="mt-24">
      <BackgroundVideo />
      <ToContact />

      <div className="text-center">
        <h1 className="text-2xl pl-2 pr-2 md:text-5xl font-semibold text-[#FAFAFA] pb-18 mb-10 leading-[36px] md:leading-[48px]">
          {page.title[language]}
        </h1>
      </div>

      <div className="bg-[#FAFAFA] pt-10 pb-10 ">
        <div className="text-center mb-6 p-3 max-w-5xl mx-auto">
          <h1 className="mb-2 font-medium text-[24px] md:text-[36px] leading-[32px] md:leading-[40px] text-[#323232]">
            {page.criteriaTitle[language]}
          </h1>
          <p className=" mx-auto mt-4 text-[16px] md:text-[18px] leading-[140%] md:leading-[120%] text-[#323232]">
            {page.criteriaIntro[language]}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto">
          <div className="bg-white rounded-lg p-6 m-4 shadow-[2px_2px_12px_0px_#2323234D] border-[1px] border-[#D0D0D0] flex flex-col">
            <div className="flex items-center mb-4 flex-wrap sm:flex-nowrap">
              <div className=" p-2  mr-4">
                <img
                  alt="logo"
                  src="/img/Comp_Prior/1.gif"
                  className="w-28 h-28 object-contain"
                />
              </div>
              <div>
                <h3 className=" text-[#323232] mb-2 font-medium text-[30px]">
                  {page.cards[0].title[language]}
                </h3>
                <p className="  font-medium text-[18px] leading-[28px] text-[#323232]">
                  {page.cards[0].description[language]}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 m-4 shadow-[2px_2px_12px_0px_#2323234D] border-[1px] border-[#D0D0D0] flex flex-col">
            <div className="flex items-center mb-4 flex-wrap sm:flex-nowrap">
              <div className=" p-2 mr-4">
                <img
                  alt="logo"
                  src="/img/Comp_Prior/2.gif"
                  className="w-28 h-28 object-contain"
                />
              </div>
              <div>
                <h3 className=" text-[#323232] mb-2 font-medium text-[30px]">
                  {page.cards[1].title[language]}
                </h3>
                <p className="font-medium text-[18px] leading-[28px] text-[#323232]">
                  {page.cards[1].description[language]}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 m-4 shadow-[2px_2px_12px_0px_#2323234D] border-[1px] border-[#D0D0D0] flex flex-col">
            <div className="flex items-start mb-4 flex-wrap sm:flex-nowrap">
              <div className=" mr-4 flex items-start">
                <img
                  alt="logo"
                  src="/img/Comp_Prior/3.gif"
                  className="w-24 h-24 object-contain"
                />
              </div>
              <div>
                <h3 className=" text-[#323232] mb-2 font-medium text-[30px]">
                  {page.cards[2].title[language]}
                </h3>
                <p className="font-medium text-[18px] leading-[28px] text-[#323232]">
                  {page.cards[2].description[language]}
                </p>
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className="w-full sm:w-1/2">
                    <ul className="list-disc pl-5 text-base leading-5 font-medium text-gray-800 mt-3 space-y-2">
                      {page.cards[2]?.list?.[language]?.map((item, index) => (
                        <li key={`list1-${index}`} className="">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <ul className="list-disc pl-5 text-base leading-5 font-medium text-gray-800 mt-3 space-y-2">
                      {page.cards[2]?.list2?.[language]?.map((item, index) => (
                        <li key={`list2-${index}`} className="">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 m-4 shadow-[2px_2px_12px_0px_#2323234D] border-[1px] border-[#D0D0D0] flex flex-col">
            <div className="flex items-start mb-4 flex-wrap sm:flex-nowrap">
              <div className=" mr-4 flex items-start">
                <img
                  alt="logo"
                  src="/img/Comp_Prior/4.gif"
                  className="w-24 h-24 object-contain"
                />
              </div>
              <div>
                <h3 className=" text-[#323232] mb-2 font-medium text-[30px]">
                  {page.cards[3].title[language]}
                </h3>
                <p className="font-medium text-[18px] leading-[28px] text-[#323232]">
                  {page.cards[3].description[language]}
                </p>
                <ul className="list-disc pl-5 text-[16px] leading-[20px] font-medium text-[#323232] mt-3">
                  <li>{page.cards[3]?.list?.[language]?.[0]}</li>
                  <li>{page.cards[3]?.list?.[language]?.[1]}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-20 mb-4 p-3 max-w-5xl mx-auto ">
          <h1 className="mb-2 font-medium text-[24px] md:text-[36px] leading-[32px] md:leading-[40px] text-[#323232]">
            {page.methodologyTitle[language]}
          </h1>
          <p className=" mx-auto mt-5 text-[16px] md:text-[18px] leading-[140%] md:leading-[120%] text-[#323232] ">
            {page.methodologyText[language]}
          </p>
        </div>

        <div className="max-w-7xl mx-auto mt-10 mb-10">
          <ControlledAccordions />
        </div>
      </div>
    </div>
  );
};

export default ComplianceAndPrioritization;
