import { ClipboardList, Briefcase, BarChart3, UsersRound } from "lucide-react";
import ControlledAccordions from "../components/AccordionMui";

const Compliance_And_Prioritization = () => {
    return (

        <div className="py-10 px-4">
            <div className="video-background">


                <video className="absolute w-full h-full object-cover" autoPlay loop muted>
                    <source src="img/Navbar/bg-header.mp4" type="video/mp4" />
                </video>

            </div>

            <div className="text-center mb-6">

                <h1 className="text-2xl font-semibold mb-2">Uyğunluq üçün kriteriyalar</h1>
                <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
                    "Sənaye 4.0 Hazırlıq" Proqramından faydalanmaq üçün şirkətlər aşağıdakı kriteriyalara cavab verməlidir:
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {/* Card 1 */}
                <div className="bg-white rounded-lg p-6 shadow-md flex flex-col">
                    <div className="flex items-start mb-4">
                        <div className="bg-blue-100 p-2 rounded-full mr-4">
                            <ClipboardList size={24} className="text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">Qanuni qeydiyyat ünvanı</h3>
                            <p className="text-gray-600 text-sm">
                                Şirkət Azərbaycan Respublikasında qanunvericiliyə uyğun şəkildə qeydiyyatdan keçmiş və aktiv fəaliyyət göstərməlidir.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-lg p-6 shadow-md flex flex-col">
                    <div className="flex items-start mb-4">
                        <div className="bg-blue-100 p-2 rounded-full mr-4">
                            <Briefcase size={24} className="text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">Yerli mülkiyyətlilik</h3>
                            <p className="text-gray-600 text-sm">
                                Şirkətin nizamnamə kapitalının minimum 51%-i yerli şəxslərə məxsus olmalıdır.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-lg p-6 shadow-md flex flex-col">
                    <div className="flex items-start mb-4">
                        <div className="bg-blue-100 p-2 rounded-full mr-4">
                            <BarChart3 size={24} className="text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">Prioritet sektorlar</h3>
                            <p className="text-gray-600 text-sm mb-2">
                                Şirkət aşağıdakı prioritet sektorlar üzrə fəaliyyət göstərməlidir:
                            </p>
                            <ul className="list-disc pl-5 text-gray-600 text-sm">
                                <li>İstehsalat</li>
                                <li>İnformasiya texnologiyaları və rabitə</li>
                                <li>Səhiyyə</li>
                                <li>Digər uyğun sahələr</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Card 4 */}
                <div className="bg-white rounded-lg p-6 shadow-md flex flex-col">
                    <div className="flex items-start mb-4">
                        <div className="bg-blue-100 p-2 rounded-full mr-4">
                            <UsersRound size={24} className="text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-2">Şirkətin ölçüsü</h3>
                            <p className="text-gray-600 text-sm mb-2">
                                Şirkət aşağıdakı meyarlara əsasən müəyyən edilmiş ölçü tələblərinə cavab verməlidir:
                            </p>
                            <ul className="list-disc pl-5 text-gray-600 text-sm">
                                <li>Əməkdaş sayı: minimum 10 nəfər</li>
                                <li>İllik dövriyyə: minimum 5 milyon manat</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-20 mb-4">
                <h1 className="text-2xl font-semibold mb-2">Prioritetləşdirmə metodologiyası</h1>
                <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
                    Proqram çərçivəsində hər il müəyyən sayda şirkətlər iştirak üçün seçilərək proqrama dəvət olunacaq. Uyğun hesab edilən müraciətçilər iştiraklarının başlanmasından əvvəl rəsmi şəkildə məlumatlandırılacaq. Bu vaxt çərçivəsi, iştirakçılara ilkin müzakirələrin aparılması və zəruri hazırlıqların görülməsi üçün kifayət qədər imkan yaradır. Proqramın növbəti mərhələlərində digər şirkətlər də iştirak etmək imkanı əldə edəcəkdir.
                </p>
            </div>

            <div className="max-w-2xl mx-auto mt-10 mb-10">
                <ControlledAccordions />
            </div>
        </div>
    );
};

export default Compliance_And_Prioritization;