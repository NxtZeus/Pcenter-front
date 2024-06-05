import { Link } from 'react-router-dom';
import logo from '../../assets/logo.webp';
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 px-6">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to="#">
                        <img src={logo} alt="Logo de la tienda" className="h-6 sm:h-10 md:h-14 lg:h-18 mr-4" />
                    </Link>
                </div>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <Link to="https://es.linkedin.com/" className="hover:underline" target='_blank'>
                        <FaLinkedin className="text-white h-6 w-6" />
                    </Link>
                    <Link to="https://x.com/home" className="hover:underline" target='_blank'>
                        <FaXTwitter className="text-white h-6 w-6" />
                    </Link>
                    <Link to="https://www.instagram.com/" className="hover:underline" target='_blank'>
                        <FaInstagram className="text-white h-6 w-6" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
