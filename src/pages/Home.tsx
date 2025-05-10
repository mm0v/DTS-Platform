import { Link } from 'react-router-dom';
import { useLanguage } from "../context/LanguageContext";
import LogoCarousel from '../components/LogoCarousel';
import BasicModal from '../components/ModalMui';
import Timeline from '../components/Timeline';
import BackgroundVideo from '../components/BackgroundVideo';
import VideoSection from '../components/VideoSection';

const PartnerLogo = ({ src, alt }: { src: string, alt: string }) => (
  <div className="flex items-center justify-center p-2">
    <img src={src} alt={alt} className="h-8 md:h-10" />
  </div>
);

const Home = () => {
  const { language, pagesTranslations } = useLanguage();
  const page = pagesTranslations.home;

  return (
    <>
      <div className="relative min-h-screen">

        {/* <div className="video-background">
          <video className="absolute w-full h-full object-cover" autoPlay loop muted>
            <source src="img/Navbar/bg-header.mp4" type="video/mp4" />
          </video>
        </div> */}

        <BackgroundVideo />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-8 md:py-32 min-h-screen flex flex-col">
          {/* Main content */}
          <div className="flex-grow flex flex-col items-center justify-center text-white text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{page.title[language]}</h1>

            <div className="max-w-4xl mx-auto">
              <p className="text-base md:text-lg mb-8">
                {page.description[language]}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4 md:mt-8">
              <Link
                to="/apply"
                className="bg-[#275AA8] hover:bg-blue-600 transition-colors px-6 py-2 rounded text-center"
              >
                {page.applyBtn[language]}
              </Link>
              <div>
                <BasicModal />
              </div>
            </div>
          </div>

          {/* Partners section */}
          <div className="mt-8 md:mt-16 px-4">
            <h2 className="text-center text-white text-base md:text-2xl font-medium mb-6">
              {page.companiesTitle[language]}
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-y-6 md:gap-x-10">
              <div className="w-40">
                <PartnerLogo src="/img/Home/Metak.png" alt="METAK" />
              </div>
              <div className="w-40">
                <PartnerLogo src="/img/Home/AzerFload.png" alt="Azerfloat" />
              </div>
              <div className="w-40">
                <PartnerLogo src="/img/Home/STP.png" alt="STP" />
              </div>
            </div>
          </div>


        </div>

        {/* TimeLine Section */}
        <div>
          <Timeline />
        </div>

        {/* Video section */}
        <div>
          <VideoSection />
        </div>

        {/* Mission section */}
        <div className="bg-gray-200 py-12 md:py-16 lg:py-24">
          <div className="container mx-auto px-4">
            {/* Section heading - can be added if needed */}

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 lg:gap-8">
              {/* Mission Card */}
              <div className="bg-white rounded-lg shadow-md p-5 lg:p-8 w-full md:w-1/2 lg:w-1/3 flex flex-col justify-start items-start transform transition-all duration-300 hover:shadow-lg">
                <img className="h-12 w-auto mb-3" src="/img/Home/mission.gif" alt="Mission icon" />
                <h3 className="text-xl md:text-2xl font-semibold mb-3">{page.missionTitle[language]}</h3>
                <p className="text-sm md:text-base text-gray-700">
                  {page.missionDescription[language]}
                </p>
              </div>

              {/* Vision Card */}
              <div className="bg-white rounded-lg shadow-md p-5 lg:p-8 w-full md:w-1/2 lg:w-1/3 flex flex-col justify-start items-start transform transition-all duration-300 hover:shadow-lg">
                <img className="h-12 w-auto mb-3" src="/img/Home/vision.gif" alt="Vision icon" />
                <h3 className="text-xl md:text-2xl font-semibold mb-3">{page.visionTitle[language]}</h3>
                <p className="text-sm md:text-base text-gray-700">
                  {page.visionDescription[language]}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className='bg-gray-200 py-12 md:py-16 lg:py-24'>
        <LogoCarousel />
      </div>
    </>
  );
};

export default Home;