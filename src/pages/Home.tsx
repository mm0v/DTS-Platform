import { Link } from 'react-router-dom';

const PartnerLogo = ({ src, alt }: { src: string, alt: string }) => (
  <div className="flex items-center justify-center p-2">
    <img src={src} alt={alt} className="h-8 md:h-10" />
  </div>
);

const Home = () => {
  return (
    <div className="relative min-h-screen">
      <video className="absolute w-full h-full object-cover" autoPlay loop muted>
        <source src="img/Navbar/bg-header.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16 min-h-screen flex flex-col">
        {/* Main content */}
        <div className="flex-grow flex flex-col items-center justify-center text-white text-center py-8 md:py-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">"Sənaye 4.0 Hazırlıq" proqramı</h1>

          <div className="max-w-4xl mx-auto">
            <p className="text-base md:text-lg mb-8">
              Proqram çərçivəsində şirkətlərin mövcud rəqəmsal bacarıqlarının
              qiymətləndirilməsi, fərdiləşdirilmiş yol xəritələrinin hazırlanması, dayanıqlı inkişafa
              hazırlığa dair yol xəritəsinin tərtib edilməsi, maliyyə dəstəyinin göstərilməsi, habelə
              transformasiyanın uğurlu icrası təmin etmək üçün davamlı əsasda metodiki dəstək
              və institusional potensialın gücləndirilməsi kimi tədbirlər həyata keçirilir.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4 md:mt-8">
            <Link
              to="/apply"
              className="bg-blue-700 hover:bg-blue-600 transition-colors px-6 py-2 rounded text-center"
            >
              Müraciət et
            </Link>
            <Link
              to="/compliance"
              className="bg-white text-blue-900 hover:bg-gray-100 transition-colors px-6 py-2 rounded text-center"
            >
              Ətraflı
            </Link>
          </div>
        </div>

        {/* Partners section */}
        <div className="mt-8 md:mt-16">
          <h2 className="text-center text-gray-400 text-sm mb-6">Proqrama uğurla başa vuran şirkətlər</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-items-center">
            <PartnerLogo src="/img/Home/Metak.png" alt="METAK" />
            <PartnerLogo src="/img/Home/AzerFload.png" alt="azerfloat" />
            <PartnerLogo src="/img/Home/STP.png" alt="STP" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;