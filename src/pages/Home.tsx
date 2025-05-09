import { Link } from 'react-router-dom';
import LogoCarousel from '../components/LogoCarousel';
import BasicModal from '../components/ModalMui';
import Timeline from './Timeline';

const PartnerLogo = ({ src, alt }: { src: string, alt: string }) => (
  <div className="flex items-center justify-center p-2">
    <img src={src} alt={alt} className="h-8 md:h-10" />
  </div>
);

const Home = () => {
  return (
    <>
      <div className="relative min-h-screen">

        <div className="video-background">
          <video className="absolute w-full h-full object-cover" autoPlay loop muted>
            <source src="img/Navbar/bg-header.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-8 md:py-16 min-h-screen flex flex-col">
          {/* Main content */}
          <div className="flex-grow flex flex-col items-center justify-center text-white text-center py-8 md:py-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">"Sənaye 4.0 Hazırlıq" proqramı</h1>

<<<<<<< HEAD

      </div>
      {/* Video */}
      <div>
        <Timeline />
      </div>

      <div className="relative w-full aspect-video md:h-screen md:aspect-auto">
  <video className="w-full h-full object-cover" autoPlay loop muted>
    <source src="video/video-section.mp4" type="video/mp4" />
  </video>
</div>


      {/* Mission section */}
      <div className="bg-gray-200 py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4">
          {/* Section heading - can be added if needed */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
            {/* Mission Card */}
            <div className="bg-white rounded-lg shadow-md p-5 lg:p-8 h-full flex flex-col justify-start items-start transform transition-all duration-300 hover:shadow-lg">
              <img className="h-12 w-auto mb-3" src="img/Home/mission.svg" alt="Mission icon" />
              <h3 className="text-xl md:text-2xl font-semibold mb-3">Missiyamız</h3>
              <p className="text-sm md:text-base text-gray-700">
                Proqramın məqsədi bizneslərin rəqəmsallaşma və innovasiya yolu ilə səmərəliliyinin və uzunmüddətli artımının dəstəklənməsi, bununla da Azərbaycan iqtisadiyyatının ümumi inkişafına töhfə verməkdir.
=======
            <div className="max-w-4xl mx-auto">
              <p className="text-base md:text-lg mb-8">
                Proqram çərçivəsində şirkətlərin mövcud rəqəmsal bacarıqlarının
                qiymətləndirilməsi, fərdiləşdirilmiş yol xəritələrinin hazırlanması, dayanıqlı inkişafa
                hazırlığa dair yol xəritəsinin tərtib edilməsi, maliyyə dəstəyinin göstərilməsi, habelə
                transformasiyanın uğurlu icrası təmin etmək üçün davamlı əsasda metodiki dəstək
                və institusional potensialın gücləndirilməsi kimi tədbirlər həyata keçirilir.
>>>>>>> main
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4 md:mt-8">
              <Link
                to="/apply"
                className="bg-[#275AA8] hover:bg-blue-600 transition-colors px-6 py-2 rounded text-center"
              >
                Müraciət et
              </Link>
              <div>
                <BasicModal />
              </div>
            </div>
          </div>

          {/* Partners section */}
          <div className="mt-8 md:mt-16">
            <h2 className="text-center text-white text-sm mb-6">Proqramı uğurla başa vuran şirkətlər</h2>
            <div className="flex justify-around items-center flex-wrap gap-x-1 gap-y-2">
              <div>
                <PartnerLogo src="/img/Home/Metak.png" alt="METAK" />
              </div>
              <div>
                <PartnerLogo src="/img/Home/AzerFload.png" alt="azerfloat" />
              </div>
              <div>
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
        <div className="relative w-full h-screen">
          <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted>
            <source src="video/video-section.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Mission section */}
        <div className="bg-gray-200 py-12 md:py-16 lg:py-24">
          <div className="container mx-auto px-4">
            {/* Section heading - can be added if needed */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
              {/* Mission Card */}
              <div className="bg-white rounded-lg shadow-md p-5 lg:p-8 h-full flex flex-col justify-start items-start transform transition-all duration-300 hover:shadow-lg">
                <img className="h-12 w-auto mb-3" src="img/Home/mission.svg" alt="Mission icon" />
                <h3 className="text-xl md:text-2xl font-semibold mb-3">Missiyamız</h3>
                <p className="text-sm md:text-base text-gray-700">
                  Proqramın məqsədi bizneslərin rəqəmsallaşma və innovasiya yolu ilə səmərəliliyinin və uzunmüddətli artımının dəstəklənməsi, bununla da Azərbaycan iqtisadiyyatının ümumi inkişafına töhfə verməkdir.
                </p>
              </div>

              {/* Vision Card */}
              <div className="bg-white rounded-lg shadow-md p-5 lg:p-8 h-full flex flex-col justify-start items-start transform transition-all duration-300 hover:shadow-lg">
                <img className="h-12 w-auto mb-3" src="img/Home/vision.svg" alt="Vision icon" />
                <h3 className="text-xl md:text-2xl font-semibold mb-3">Vizyonumuz</h3>
                <p className="text-sm md:text-base text-gray-700">
                  "Sənaye 4.0 Hazırlıq" Proqramı 2030-cu ilədək İqtisadiyyat Nazirliyinin dəstəyi ilə ölkəmizin istehsal yönümlü müəssisələrinin rəqəmsal transformasiyasına hədəflənmişdir.
                </p>
              </div>
            </div>
          </div>

          {/* Logo Carousel Section */}
        </div>



      </div>
      <div className='bg-gray-200 py-12 md:py-16 lg:py-24'>
        <LogoCarousel />
      </div>
    </>
  );
};

export default Home;