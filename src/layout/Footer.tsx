import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className=" text-white py-8 bg-gradient-to-r from-[rgba(26,67,129,1)] to-[rgba(5,14,27,1)]">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex">
                        <div className="flex items-center">
                            <img src="img/Navbar/economy_logo.png" alt="Logo" />
                        </div>
                        <div className="flex items-center ml-4">
                            <img src="img/Navbar/4SIM_logo.png" alt="Logo" />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Faydalı keçidlər</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>
                                <Link to="/" className="hover:text-white">Ana səhifə</Link>
                            </li>
                            <li>
                                <Link to="/compliance" className="hover:text-white">Uyğunluq və Prioritetləşdirmə</Link>
                            </li>
                            <li>
                                <Link to="/success" className="hover:text-white">Uğurlarımız</Link>
                            </li>
                            <li>
                                <Link to="/fag" className="hover:text-white">FAQ</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-white">Əlaqə</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Əlaqə</h3>
                        <address className="not-italic text-sm text-gray-300 space-y-2">
                            <p>Bakı şəhəri, Azərbaycan</p>
                            <p>{"Tel: +994 12 310 28 00 (daxili 2419)"}</p>
                            <a href="mailto:office@4sim.gov.az" className="text-sm md:text-base hover:text-blue-300 transition-colors">
                                office@4sim.gov.az
                            </a>
                        </address>
                        <div className="mt-4 flex space-x-4">
                            <a href="https://www.facebook.com/economy.gov.az" target='_blank' className="text-gray-300 hover:text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/iqtisadiyyat.nazirliyi/?hl=en" target='_blank' className="text-gray-300 hover:text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="https://twitter.com/INazirliyi" target='_blank' className="text-gray-300 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none">
                                    <path d="M18.3263 1.90381H21.6998L14.3297 10.3273L23 21.7898H16.2112L10.894 14.8378L4.80995 21.7898H1.43443L9.31743 12.7799L1 1.90381H7.96111L12.7674 8.25814L18.3263 1.90381ZM17.1423 19.7706H19.0116L6.94539 3.81694H4.93946L17.1423 19.7706Z" fill="#CBD5E1" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-blue-800 text-center text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} Bütün hüquqlar qorunur.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;