import { useState } from 'react';

export default function Timeline() {
    const [hoveredStep, setHoveredStep] = useState<number | null>(null);

    const steps = [
        {
            id: 1,
            title: "Rəqəmsal hazırlıq səviyyəsinin qiymətləndirilməsi",
            content: "Rəqəmsal hazırlıq səviyyəsinin qiymətləndirilməsi haqqında ətraflı məlumat burada göstəriləcək.",
            position: "left"
        },
        {
            id: 2,
            title: "Rəqəmsal transformasiya yol xəritəsinin hazırlanması",
            content: "Rəqəmsal transformasiya yol xəritəsinin hazırlanması haqqında ətraflı məlumat burada göstəriləcək.",
            position: "right"
        },
        {
            id: 3,
            title: "Maliyyə dəstəyinin göstərilməsi",
            content: "Maliyyə dəstəyinin göstərilməsi haqqında ətraflı məlumat burada göstəriləcək.",
            position: "left"
        },
        {
            id: 4,
            title: "Rəqəmsal bilik və bacarıqların gücləndirilməsi",
            content: "Rəqəmsal bilik və bacarıqların gücləndirilməsi haqqında ətraflı məlumat burada göstəriləcək.",
            position: "right"
        },
        {
            id: 5,
            title: "İcra dəstəyinin göstərilməsi",
            content: "İcra dəstəyinin göstərilməsi haqqında ətraflı məlumat burada göstəriləcək.",
            position: "left"
        }
    ];

    return (
        <div style={{ background: "linear-gradient(180deg, #1A4381 -96.34%, #FFF 99.92%)" }} className="flex flex-col items-center text-white min-h-screen w-full p-8">
            <div className="max-w-4xl w-full">
                <h1 className="text-2xl font-bold text-center mb-2">Proqramın əhatə dairəsi</h1>
                <p className="text-center mb-12 text-sm">
                    Proqram çərçivəsində rəqəmsal transformasiya dəstəyi alan hədəf şirkətlər,
                    <br /> 5 əsas istiqamətdə dəstək alacaqlar:
                </p>

                <div className="relative">
                    {/* Center line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300"></div>

                    {/* Hover content display in center */}
                    {hoveredStep && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 bg-blue-800 p-4 rounded-lg text-white shadow-lg z-20 w-64 text-center transition-all duration-300">
                            {steps.find(step => step.id === hoveredStep)?.content}
                        </div>
                    )}

                    {/* Timeline steps */}
                    <div className="relative">
                        {steps.map((step) => (
                            <div key={step.id} className="flex items-center mb-16 relative">
                                {/* Left or right item */}
                                <div className={`flex-1 ${step.position === 'left' ? 'pr-8 text-right' : 'pl-8 order-last'}`}>
                                    <div
                                        className={`bg-blue-900 text-white p-3 rounded-lg inline-block hover:bg-blue-700 transition-all duration-300 shadow-lg cursor-pointer`}
                                        onMouseEnter={() => setHoveredStep(step.id)}
                                        onMouseLeave={() => setHoveredStep(null)}
                                    >
                                        <p className="text-sm font-medium">{step.title}</p>
                                    </div>
                                </div>

                                {/* Circle in middle */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                    <div className="bg-blue-600 rounded-full h-10 w-10 z-10 flex items-center justify-center shadow-lg">
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