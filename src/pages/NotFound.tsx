import { useEffect, useState } from 'react';
import { ArrowLeft, RefreshCw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const [animationClass, setAnimationClass] = useState('');

    // Animation effect for the astronaut
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationClass(prev => prev === 'translate-y-2' ? 'translate-y-0' : 'translate-y-2');
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Counter effect for the stars
    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => (prev + 1) % 5);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-screen w-full overflow-hidden bg-gradient-to-b from-slate-900 to-indigo-950 flex flex-col items-center justify-center text-white px-4 relative">
            {/* Stars - randomly placed */}
            {Array.from({ length: 50 }).map((_, i) => (
                <div
                    key={i}
                    className={`absolute rounded-full bg-white ${i % 5 === count ? 'animate-pulse' : ''
                        }`}
                    style={{
                        width: `${Math.random() * 3 + 1}px`,
                        height: `${Math.random() * 3 + 1}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.8 + 0.2,
                    }}
                />
            ))}

            {/* Main content */}
            <div className="z-10 text-center max-w-lg flex flex-col items-center justify-center">
                {/* Animated Astronaut */}
                <div className={`transition-transform duration-1000 ease-in-out ${animationClass} mb-6 flex justify-center w-full`}>
                    <div className="w-48 h-48 relative">
                        <svg viewBox="0 0 200 200" className="w-full h-full">
                            {/* Astronaut body */}
                            <rect x="80" y="80" width="40" height="60" rx="20" fill="#e2e8f0" />

                            {/* Astronaut helmet */}
                            <circle cx="100" cy="70" r="30" fill="#cbd5e1" />
                            <circle cx="100" cy="70" r="25" fill="#1e293b" />
                            <circle cx="85" cy="65" r="5" fill="white" opacity="0.5" />

                            {/* Backpack */}
                            <rect x="75" y="100" width="50" height="25" rx="5" fill="#94a3b8" />

                            {/* Arms */}
                            <rect x="60" y="85" width="20" height="10" rx="5" fill="#e2e8f0" />
                            <rect x="120" y="85" width="20" height="10" rx="5" fill="#e2e8f0" />

                            {/* Legs */}
                            <rect x="85" y="140" width="10" height="20" rx="5" fill="#e2e8f0" />
                            <rect x="105" y="140" width="10" height="20" rx="5" fill="#e2e8f0" />
                        </svg>

                        {/* Flag with 404 */}
                        <div className="absolute top-12 right-0">
                            <div className="w-2 h-32 bg-gray-300"></div>
                            <div className="w-20 h-12 bg-red-500 absolute -right-20 top-0 flex items-center justify-center">
                                <span className="font-bold text-white text-xs">404</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Text content */}
                <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                    404
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
                <p className="text-lg text-gray-300 mb-8">
                    Sorry, we couldn't find the page you were looking for.
                </p>

                {/* Navigation options */}
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-300"
                    >
                        <ArrowLeft size={18} />
                        <span>Go Back</span>
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors duration-300"
                    >
                        <Home size={18} />
                        <span>Home</span>
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-300"
                    >
                        <RefreshCw size={18} />
                        <span>Refresh</span>
                    </button>
                </div>
            </div>

            {/* Small planet at the bottom */}
            <div className="absolute bottom-0 w-full h-32 bg-slate-800 rounded-t-full opacity-30"></div>
        </div>
    );
};

export default NotFound;