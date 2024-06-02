import { Link } from 'react-router-dom';
import logo from '../../assets/logo.webp';
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 px-6">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="Logo de la tienda" className="h-6 sm:h-10 md:h-14 lg:h-18 mr-4" />
                </div>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <Link to="#" className="hover:underline" >
                        Política de Privacidad
                    </Link>
                    <Link to="#" className="hover:underline" >
                        Términos y Condiciones
                    </Link>
                </div>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <Link to="#" className="hover:underline" >
                        <FaLinkedin className="text-white h-6 w-6" />
                    </Link>
                    <Link to="#" className="hover:underline" >
                        <FaTwitter className="text-white h-6 w-6" />
                    </Link>
                    <Link to="#" className="hover:underline" >
                        <FaInstagram className="text-white h-6 w-6" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
