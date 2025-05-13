import { MapPin, Phone, Mail } from "lucide-react";
import BackgroundVideo from "../components/BackgroundVideo";
import { useLanguage } from "../context/LanguageContext";

const Contact = () => {
  const { language, pagesTranslations } = useLanguage();
  const page = pagesTranslations.contact;

  return (

    <div className="mt-24" >
      {/* <div className="video-background">
        <video className="absolute w-full h-full object-cover" autoPlay loop muted>
          <source src="img/Navbar/bg-header.mp4" type="video/mp4" />
        </video>
      </div> */}

      <BackgroundVideo />

      <div style={{
        // background: 'linear-gradient(to top, rgba(255, 255, 255, 1), rgba(52, 96, 220, .99)'
        background: "linear-gradient(180deg, rgba(35, 42, 96, 0.90) -4.83%, rgba(0, 0, 0, 0.00) 102.71%), var(--surface-white-primary, #FFF)",

      }}>
        <div className="w-full max-w-6xl mx-auto px-4 py-12" >
          <div className="w-full flex flex-col items-center">

            <div className="w-full bg-slate-900 text-white flex justify-center items-center text-center rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="p-6 md:p-8 flex flex-col space-y-4">
                <h1 className="text-3xl font-bold mb-8 text-center text-white">{page.title[language]}</h1>
                <div className="flex items-start space-x-3">
                  <MapPin className="flex-shrink-0 h-5 w-5 text-gray-300 mt-0.5" />
                  <p className="text-sm md:text-base">
                    {page.address[language]}
                    <br className="hidden md:block" />
                    (Government House)
                  </p>
                </div>

                <div className="flex items-center justify-center space-x-3">
                  <Phone className="flex-shrink-0 h-5 w-5 text-gray-300" />
                  <p className="text-sm md:text-base ">{page.phone[language]}</p>
                </div>

                <div className="flex items-center justify-center space-x-3">
                  <Mail className="flex-shrink-0 h-5 w-5 text-gray-300" />
                  <a href="mailto:office@4sim.gov.az" className="text-sm md:text-base hover:text-blue-300 transition-colors">
                    office@4sim.gov.az
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg relative">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.1871836112623!2d49.85043177582512!3d40.3737646714466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307dabc3b06953%3A0x64d0daa228312c9e!2sThe%20Azerbaijan%20Government%20House!5e1!3m2!1sen!2saz!4v1746639197195!5m2!1sen!2saz"
                width="1200" height="450"
                // allowfullscreen=""
                loading="lazy"
              // referrerpolicy="no-referrer-when-downgrade"
              >
              </iframe>
              <div className="absolute bottom-4 right-4">
                <a
                  href="https://maps.app.goo.gl/6DmsavEDHe614hpF6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-600 px-3 py-2 rounded-md text-sm font-medium shadow-md hover:bg-blue-50 transition-colors"
                >
                  {page.mapBtn[language]}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contact;