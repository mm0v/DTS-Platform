import { useState } from 'react';

export default function Timeline() {
    const [hoveredStep, setHoveredStep] = useState<number | null>(null);

    const steps = [
        {
            id: 1,
            title: "Rəqəmsal hazırlıq səviyyəsinin <br />qiymətləndirilməsi",
            content: "<h6> Rəqəmsal hazırlıq səviyyəsinin qiymətləndirilməsi </h6> <br /> <small>Hədəf Şirkətlərin mövcud rəqəmsal potensialının, infrastrukturunun və hazırlıq səviyyəsinin qiymətləndirilməsi, müvafiq çatışmazlıqların və təkmilləşmə üçün imkanlarının müəyyən edilməsi. </small>",
            position: "left"
        },
        {
            id: 2,
            title: "Rəqəmsal transformasiya yol <br /> xəritəsinin hazırlanması",
            content: "<h6> Rəqəmsal hazırlıq səviyyəsinin qiymətləndirilməsi </h6> <br /> <small>Hədəf Şirkətlərin mövcud rəqəmsal potensialının, infrastrukturunun və hazırlıq səviyyəsinin qiymətləndirilməsi, müvafiq çatışmazlıqların və təkmilləşmə üçün imkanlarının müəyyən edilməsi. </small>",
            position: "right"
        },
        {
            id: 3,
            title: "Maliyyə dəstəyinin <br /> göstərilməsi",
            content: "<h6> Rəqəmsal hazırlıq səviyyəsinin qiymətləndirilməsi </h6> <br /> <small>Hədəf Şirkətlərin mövcud rəqəmsal potensialının, infrastrukturunun və hazırlıq səviyyəsinin qiymətləndirilməsi, müvafiq çatışmazlıqların və təkmilləşmə üçün imkanlarının müəyyən edilməsi. </small>",
            position: "left"
        },
        {
            id: 4,
            title: "Rəqəmsal bilik və bacarıqların <br />gücləndirilməsi",
            content: "<h6> Rəqəmsal hazırlıq səviyyəsinin qiymətləndirilməsi </h6> <br /> <small>Hədəf Şirkətlərin mövcud rəqəmsal potensialının, infrastrukturunun və hazırlıq səviyyəsinin qiymətləndirilməsi, müvafiq çatışmazlıqların və təkmilləşmə üçün imkanlarının müəyyən edilməsi. </small>",
            position: "right"
        },
        {
            id: 5,
            title: "İcra dəstəyinin <br />göstərilməsi",
            content: "<h6> Rəqəmsal hazırlıq səviyyəsinin qiymətləndirilməsi </h6> <br /> <small>Hədəf Şirkətlərin mövcud rəqəmsal potensialının, infrastrukturunun və hazırlıq səviyyəsinin qiymətləndirilməsi, müvafiq çatışmazlıqların və təkmilləşmə üçün imkanlarının müəyyən edilməsi. </small>",
            position: "left"
        }
    ];

    return (
        <div style={{ background: "linear-gradient(180deg, #666a84 -96.34%, #9fa0aa 99.92%)" }} className="flex flex-col items-center text-white min-h-screen w-full p-8">
            <div className="max-w-4xl w-full">
                <h1 className="text-2xl font-bold text-center mb-2">Proqramın əhatə dairəsi</h1>
                <p className="text-center mb-12 text-sm">
                    Proqram çərçivəsində rəqəmsal transformasiya dəstəyi alan hədəf şirkətlər,
                    <br /> 5 əsas istiqamətdə dəstək alacaqlar:
                </p>

                <div className="relative">
                    {/* Center line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white"></div>

                    {/* Timeline steps */}
                    <div className="relative">
                        {steps.map((step) => (
                            <div key={step.id} className="flex items-center mb-16 relative">
                                {/* Left or right item */}
                                <div className={`flex-1 ${step.position === 'left' ? 'pr-8 text-right' : 'pl-8 order-last'}`}>
                                    <div
                                        className={`bg-gradient-to-r from-[#1A4381] to-[#050E1B] text-white px-8 py-5 mx-3 w-full max-w-[336px] rounded-[36px] inline-block hover:bg-blue-700 transition-all duration-300 shadow-lg cursor-pointer relative`}
                                        onMouseEnter={() => setHoveredStep(step.id)}
                                        onMouseLeave={() => setHoveredStep(null)}
                                    >
                                        <p
                                            className="text-sm font-medium text-center whitespace-pre-line"
                                            dangerouslySetInnerHTML={{ __html: step.title }}
                                        ></p>

                                        {/* Hover content */}
                                        {hoveredStep === step.id && (
                                            <div
                                                className={`absolute top-1/2 transform -translate-y-1/2 z-20 w-[336px] text-white text-center shadow-lg p-4 rounded-[24px] bg-gradient-to-r from-[#1A4381] to-[#050E1B] transition-all duration-300
                                                ${step.position === 'left' ? 'left-full ml-4' : 'right-full mr-4 text-left'}`}
                                                dangerouslySetInnerHTML={{ __html: step.content }}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Circle in middle */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                    <div className="bg-gradient-to-r from-[#1A4381] to-[#050E1B] rounded-full h-10 w-10 z-10 flex items-center justify-center shadow-lg">
                                        <span className="text-white font-bold">{step.id}</span>
                                    </div>
                                </div>

                                {/* Empty space for the other side */}
                                <div className="flex-1"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
