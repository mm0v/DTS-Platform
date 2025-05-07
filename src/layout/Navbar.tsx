import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [language, setLanguage] = useState('AZ');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleLanguage = () => {
        setLanguage(language === 'AZ' ? 'EN' : 'AZ');
    };

    return (
        <nav className=" bg-black text-white top-0 z-50">
            <div className="container mx-auto px-4 py-3">
                {/* Desktop Navigation */}
                <div className="hidden lg:flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        {/* Logo */}
                        <div className="flex items-center">
                            <img src="img/Navbar/economy_logo.png" alt="Logo" />
                            <img src="img/Navbar/4SIM_logo.png" alt="Logo" className="ml-4" />
                        </div>
                        <div className="ml-8 text-sm">
                            <span>SƏNAYE 4.0 <br /> HAZIRLIQ <br /> PROQRAMI</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                        <Link to="/compliance" className="hover:text-blue-300 whitespace-nowrap">Uyğunluq və Prioritetləşdirmə</Link>
                        <Link to="/success" className="hover:text-blue-300">Uğurlarımız</Link>
                        <Link to="/fag" className="hover:text-blue-300">FAQ</Link>
                        <Link to="/apply" className="bg-blue-700 px-4 py-1 rounded">Müraciət et</Link>
                        <button
                            className="border border-white px-2 py-1 rounded"
                            onClick={toggleLanguage}
                        >
                            {language}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="lg:hidden flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <img src="img/Navbar/economy_logo.png" alt="Logo" />
                    </div>

                    {/* Language and Menu Toggle */}
                    <div className="flex items-center space-x-2">
                        <button
                            className="border border-white px-2 py-1 rounded text-xs"
                            onClick={toggleLanguage}
                        >
                            {language}
                        </button>
                        <button
                            className="text-white p-1"
                            onClick={toggleMenu}
                        >
                            {isMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden pt-6 mt-4 max-h-screen pb-4 space-y-2 text-sm">
                        <Link to="/" className="block py-2 hover:bg-blue-800 px-2 rounded">Ana Səhifə</Link>
                        <Link to="/compliance" className="block py-2 hover:bg-blue-800 px-2 rounded">Uyğunluq və Prioritetləşdirmə</Link>
                        <Link to="/success" className="block py-2 hover:bg-blue-800 px-2 rounded">Uğurlarımız</Link>
                        <Link to="/fag" className="block py-2 hover:bg-blue-800 px-2 rounded">FAQ</Link>
                        <Link to="/apply" className="block bg-blue-700 px-4 py-2 rounded text-center">Müraciət et</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;