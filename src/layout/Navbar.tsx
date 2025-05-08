import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [language, setLanguage] = useState('AZ');

    // Handle body scroll lock when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleLanguage = () => {
        setLanguage(language === 'AZ' ? 'EN' : 'AZ');
    };

    return (
        <nav className="text-white top-0 z-50 relative">
            <div className="container mx-auto px-4 py-3">
                {/* Desktop Navigation */}
                <div className="hidden lg:flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to={""}>
                                <img src="img/Navbar/economy_logo.png" alt="Logo" />
                            </Link>
                            <img src="img/Navbar/4SIM_logo.png" alt="Logo" className="ml-4" />
                        </div>
                        <div className="ml-8 text-sm border-l-2 border-gray-300 pl-5">
                            <span>SƏNAYE 4.0 <br /> HAZIRLIQ <br /> PROQRAMI</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                        <Link to="/compliance" className="hover:text-blue-400 whitespace-nowrap">Uyğunluq və Prioritetləşdirmə</Link>
                        <Link to="/success" className="hover:text-blue-400">Uğurlarımız</Link>
                        <Link to="/fag" className="hover:text-blue-400">FAQ</Link>
                        <Link to="/contact" className="hover:text-blue-400">Əlaqə</Link>
                        <Link to="/apply" className="bg-blue-700 px-4 py-1 rounded">Müraciət et</Link>
                        <button
                            className="border border-white px-2 py-1 rounded"
                            onClick={toggleLanguage}
                        >
                            {language}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Header */}
                <div className="lg:hidden flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <img src="img/Navbar/economy_logo.png" alt="Logo" className="h-8" />
                    </div>

                    {/* Language and Menu Toggle */}
                    <div className="flex items-center space-x-3">
                        <button
                            className="border border-white px-2 py-1 rounded text-xs"
                            onClick={toggleLanguage}
                        >
                            {language}
                        </button>
                        <button
                            className="text-white p-1 focus:outline-none z-50"
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            <div className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}>
                                <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                                <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Slide-in */}
                <div
                    className={`lg:hidden fixed top-0 left-0 w-full h-full bg-blue-900 transform transition-transform duration-300 ease-in-out z-40 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                >
                    <div className="flex flex-col h-full pt-20 px-6">
                        <div className="mb-8">
                            <div className="flex items-center mb-6">
                                <img src="img/Navbar/4SIM_logo.png" alt="Logo" className="h-10" />
                            </div>
                            <div className="text-sm border-l-2 border-gray-300 pl-4">
                                <span>SƏNAYE 4.0 <br /> HAZIRLIQ <br /> PROQRAMI</span>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-4 text-lg">
                            <Link
                                to="/"
                                className="py-3 border-b border-blue-800 flex items-center justify-between"
                                onClick={toggleMenu}
                            >
                                <span>Ana Səhifə</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link
                                to="/compliance"
                                className="py-3 border-b border-blue-800 flex items-center justify-between"
                                onClick={toggleMenu}
                            >
                                <span>Uyğunluq və Prioritetləşdirmə</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link
                                to="/success"
                                className="py-3 border-b border-blue-800 flex items-center justify-between"
                                onClick={toggleMenu}
                            >
                                <span>Uğurlarımız</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link
                                to="/fag"
                                className="py-3 border-b border-blue-800 flex items-center justify-between"
                                onClick={toggleMenu}
                            >
                                <span>FAQ</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link
                                to="/contact"
                                className="py-3 border-b border-blue-800 flex items-center justify-between"
                                onClick={toggleMenu}
                            >
                                <span>Əlaqə</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>

                        <div className="mt-auto mb-12">
                            <Link
                                to="/apply"
                                className="bg-blue-700 px-6 py-3 rounded text-center block w-full font-medium text-lg"
                                onClick={toggleMenu}
                            >
                                Müraciət et
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;