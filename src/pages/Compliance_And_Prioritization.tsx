import ControlledAccordions from "../components/AccordionMui";
import gif1 from "../../public/img/Comp_Prior/ccf568541b193233fb9e3e6c868b3cb2ed09cc41.gif";
import gif2 from "../../public/img/Comp_Prior/10ba024cb528d82f11d09e2ab8ea9d467241d3fb.gif";
import gif3 from "../../public/img/Comp_Prior/7c12dee339a0796d4f49232e6f68531d944fdd3d.gif";
import gif4 from "../../public/img/Comp_Prior/8bc14bdaaeec72bb08e93c6d73b4476b5ae8bdc5.gif";
const Compliance_And_Prioritization = () => {
  return (
    <div className="mt-24">
      <div className="video-background filter brightness-70">
        <video
          className="absolute w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src="img/Navbar/bg-header.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="text-center">
        <h1 className="text-2xl md:text-5xl font-semibold text-[#FAFAFA] pb-20 mb-10 leading-[36px] md:leading-[48px]">
          Uyğunluq və Prioritetləşdirmə
        </h1>
      </div>

      <div className="bg-[#FAFAFA] pt-10 pb-10 ">
        <div className="text-center mb-6 p-3 max-w-5xl mx-auto">
          <h1 className="mb-2 font-medium text-[24px] md:text-[36px] leading-[32px] md:leading-[40px] text-[#323232]">
            Uyğunluq üçün kriteriyalar
          </h1>
          <p className=" mx-auto mt-4 text-[16px] md:text-[18px] leading-[140%] md:leading-[120%] text-[#323232]">
            "Sənaye 4.0 Hazırlıq" Proqramından faydalanmaq üçün şirkətlər
            aşağıdakı kriteriyalara cavab verməlidir:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white rounded-lg p-6 m-4 shadow-[2px_2px_12px_0px_#2323234D] border-[1px] border-[#D0D0D0] flex flex-col">
            <div className="flex items-center mb-4 flex-wrap sm:flex-nowrap">
              <div className=" p-2  mr-4">
                {/* <ClipboardList size={24} className="text-blue-600" />*/}
                <img src={gif1} className="w-28 h-28 object-contain" />
              </div>
              <div>
                <h3 className=" text-[#323232] mb-2 font-medium text-[30px]">
                  Qanuni qeydiyyat ünvanı
                </h3>
                <p className="  font-medium text-[18px] leading-[28px] text-[#323232]">
                  Şirkət Azərbaycan Respublikasında qanunvericiliyə uyğun
                  şəkildə qeydiyyatdan keçmiş və aktiv fəaliyyət göstərməlidir.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg p-6 m-4 shadow-[2px_2px_12px_0px_#2323234D] border-[1px] border-[#D0D0D0] flex flex-col">
            <div className="flex items-center mb-4 flex-wrap sm:flex-nowrap">
              <div className=" p-2 mr-4">
                {/*<Briefcase size={24} className="text-blue-600" />*/}
                <img src={gif2} className="w-28 h-28 object-contain" />
              </div>
              <div>
                <h3 className=" text-[#323232] mb-2 font-medium text-[30px]">
                  Yerli mülkiyyətlilik
                </h3>
                <p className="font-medium text-[18px] leading-[28px] text-[#323232]">
                  Şirkətin nizamnamə kapitalının minimum 51%-i yerli şəxslərə
                  məxsus olmalıdır.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg p-6 m-4 shadow-[2px_2px_12px_0px_#2323234D] border-[1px] border-[#D0D0D0] flex flex-col">
            <div className="flex items-start mb-4 flex-wrap sm:flex-nowrap">
              <div className=" mr-4 flex items-start">
                {/* <BarChart3 size={24} className="text-blue-600" />*/}
                <img src={gif3} className="w-24 h-24 object-contain" />
              </div>
              <div>
                <h3 className=" text-[#323232] mb-2 font-medium text-[30px]">
                  Prioritet sektorlar
                </h3>
                <p className="font-medium text-[18px] leading-[28px] text-[#323232]">
                  Şirkət aşağıdakı prioritet sektorlar üzrə fəaliyyət
                  göstərməlidir:
                </p>
                <ul className="list-disc pl-5 text-[16px] leading-[20px] font-medium text-[#323232] mt-3">
                  <li>İstehsalat</li>
                  <li>İnformasiya texnologiyaları və rabitə</li>
                  <li>Səhiyyə</li>
                  <li>Digər uyğun sahələr</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-lg p-6 m-4 shadow-[2px_2px_12px_0px_#2323234D] border-[1px] border-[#D0D0D0] flex flex-col">
            <div className="flex items-start mb-4 flex-wrap sm:flex-nowrap">
              <div className=" mr-4 flex items-start">
                {/*   <UsersRound size={24} className="text-blue-600" />*/}
                <img src={gif4} className="w-24 h-24 object-contain" />
              </div>
              <div>
                <h3 className=" text-[#323232] mb-2 font-medium text-[30px]">
                  Şirkətin ölçüsü
                </h3>
                <p className="font-medium text-[18px] leading-[28px] text-[#323232]">
                  Şirkət aşağıdakı meyarlara əsasən müəyyən edilmiş ölçü
                  tələblərinə cavab verməlidir:
                </p>
                <ul className="list-disc pl-5 text-[16px] leading-[20px] font-medium text-[#323232] mt-3">
                  <li>Əməkdaş sayı: minimum 10 nəfər</li>
                  <li>İllik dövriyyə: minimum 5 milyon manat</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-20 mb-4 p-3 max-w-5xl mx-auto ">
          <h1 className="mb-2 font-medium text-[24px] md:text-[36px] leading-[32px] md:leading-[40px] text-[#323232]">
            Prioritetləşdirmə metodologiyası
          </h1>
          <p className=" mx-auto mt-5 text-[16px] md:text-[18px] leading-[140%] md:leading-[120%] text-[#323232] ">
            Proqram çərçivəsində hər il müəyyən sayda şirkətlər iştirak üçün
            seçilərək proqrama dəvət olunacaq. Uyğun hesab edilən müraciətçilər
            iştiraklarının başlanmasından əvvəl rəsmi şəkildə
            məlumatlandırılacaq. Bu vaxt çərçivəsi, iştirakçılara ilkin
            müzakirələrin aparılması və zəruri hazırlıqların görülməsi üçün
            kifayət qədər imkan yaradır. Proqramın növbəti mərhələlərində digər
            şirkətlər də iştirak etmək imkanı əldə edəcəkdir.
          </p>
        </div>

        <div className="max-w-7xl mx-auto mt-10 mb-10">
          <ControlledAccordions />
        </div>
      </div>
    </div>
  );
};

export default Compliance_And_Prioritization;
