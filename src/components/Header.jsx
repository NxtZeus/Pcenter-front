import { useContext, useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaUserCircle, FaBars } from 'react-icons/fa';
import { RxCross1 } from "react-icons/rx";
import logo from '../assets/logo.webp';
import Logout from '../components/login/Logout';
import Carrito from '../components/carrito/Carrito';
import { AuthContext } from '../components/auth/AuthContext';
import { loadCarrito, handleIncrementItem, handleDecrementItem, handleEliminarItem } from '../components/logic/FuncCarrito';
import axios from 'axios';

function Header() {
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const [isCarritoMenuOpen, setCarritoMenuOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isCategoriasMenuOpen, setCategoriesMenuOpen] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [itemsCarrito, setItemsCarrito] = useState([]);
    const profileMenuRef = useRef(null);
    const carritoMenuRef = useRef(null);
    const categoriesMenuRef = useRef(null);
    const { isLoggedIn, logout } = useContext(AuthContext);

    const handleClickOutside = useCallback((event) => {
        if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
            setProfileMenuOpen(false);
        }
        if (carritoMenuRef.current && !carritoMenuRef.current.contains(event.target)) {
            setCarritoMenuOpen(false);
        }
        if (categoriesMenuRef.current && !categoriesMenuRef.current.contains(event.target)) {
            setCategoriesMenuOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    useEffect(() => {
        if (isLoggedIn) {
            loadCarrito(setItemsCarrito);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/categorias/');
                setCategorias(response.data);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };
        fetchCategorias();
    }, []);

    const totalItems = itemsCarrito.reduce((sum, item) => sum + 1, 0);

    return (
        <>
            {/* <div className="flex items-center">
                    <Link to="/">
                        <img src={logo} alt="Logo de la tienda" className="h-8 sm:h-12 md:h-16 lg:h-20 mr-4" />
                    </Link>
                </div>

                <div className="hidden lg:flex flex-1 justify-center">
                    <nav className="space-x-16">
                        <Link to="/" className="text-white hover:text-custom-naranja text-xl transition duration-300">Inicio</Link>
                        <button onClick={() => setCategoriesMenuOpen(!isCategoriasMenuOpen)} className="text-white text-xl hover:text-custom-naranja transition duration-300">Categorías</button>
                        <Link to="/contacto" className="text-white hover:text-custom-naranja text-xl transition duration-300">Contacto</Link>
                    </nav>
                </div>

                <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8 ml-auto">
                    <div className="relative">
                        <input type="text" placeholder="Buscar..." className="px-2 py-1 rounded-md w-32 sm:px-4 sm:py-2 sm:w-80 lg:w-96" />
                        <FaSearch className="absolute right-1 top-2 sm:right-2 sm:top-2 text-black" />
                    </div>
                    {isLoggedIn ? (
                        <>
                            <div className="flex items-center">
                                <button onClick={() => setCarritoMenuOpen(!isCarritoMenuOpen)} className="relative">
                                    <FaShoppingCart className="text-white text-xl sm:text-2xl" />
                                    {totalItems > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {totalItems}
                                        </span>
                                    )}
                                </button>
                                {isCarritoMenuOpen && (
                                    <div ref={carritoMenuRef}>
                                        <Carrito
                                            onClose={() => setCarritoMenuOpen(false)}
                                            onEliminarItem={(productoId) => handleEliminarItem(itemsCarrito, setItemsCarrito, productoId)}
                                            onIncrementItem={(productoId) => handleIncrementItem(itemsCarrito, setItemsCarrito, productoId)}
                                            onDecrementItem={(productoId) => handleDecrementItem(itemsCarrito, setItemsCarrito, productoId)}
                                            items={itemsCarrito}
                                        />
                                    </div>
                                )}
                            </div>
                            <button onClick={() => setProfileMenuOpen(!isProfileMenuOpen)} className="relative">
                                <FaUserCircle className="text-white text-xl sm:text-2xl" />
                            </button>
                            {isProfileMenuOpen && (
                                <div ref={profileMenuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl shadow-custom-azul py-2 border border-black border-opacity-40 transform translate-y-full">
                                    <Link to="/perfil" className="block px-4 py-2 text-black hover:bg-gray-200">Mi cuenta</Link>
                                    <Logout onLogout={logout} />
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-500 transition duration-300 hidden lg:block">
                                Iniciar Sesión
                            </Link>
                            <Link to="/registro" className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300 hidden lg:block">
                                Registrarse
                            </Link>
                        </>
                    )}

                    <button className="lg:hidden ml-auto" onClick={() => setMenuOpen(!isMenuOpen)}>
                        <FaBars className="text-white text-xl sm:text-2xl" />
                    </button>
                </div> */}
            <header className="bg-custom-azul sticky top-0 w-full py-2 sm:py-4 px-4 shadow-md flex justify-between items-center z-10">
                <div>
                    <Link to="/">
                        <img src={logo} alt="Logo de la tienda" className="h-8 sm:h-12 md:h-16 lg:h-20 mr-4" />
                    </Link>
                </div>
                <div className='hidden lg:flex flex-1 absolute inset-x-0 mx-auto justify-center'>
                    <nav className="lg:space-x-24 xl:space-x-32">
                        <Link to="/" className="text-white hover:text-custom-naranja text-xl transition duration-300">Inicio</Link>
                        <button onClick={() => setCategoriesMenuOpen(!isCategoriasMenuOpen)} className="text-white text-xl hover:text-custom-naranja transition duration-300">Categorías</button>
                        <Link to="/contacto" className="text-white hover:text-custom-naranja text-xl transition duration-300">Contacto</Link>
                    </nav>
                </div>
                <div className='flex flex-row items-center space-x-2 xl:space-x-6'>
                    <div className="relative flex items-center">
                        <input type="text" placeholder="Buscar..." className="px-2 py-1 rounded-md w-32 sm:px-4 sm:py-2 sm:w-80 lg:w-96 pr-10" />
                        <FaSearch className="absolute right-2 text-black" />
                    </div>
                    {isLoggedIn ? (
                        <>
                            <div className="flex items-center">
                                <button onClick={() => setCarritoMenuOpen(!isCarritoMenuOpen)} className="relative">
                                    <FaShoppingCart className="text-white text-xl sm:text-2xl" />
                                    {totalItems > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {totalItems}
                                        </span>
                                    )}
                                </button>
                                {isCarritoMenuOpen && (
                                    <div ref={carritoMenuRef}>
                                        <Carrito
                                            onClose={() => setCarritoMenuOpen(false)}
                                            onEliminarItem={(productoId) => handleEliminarItem(itemsCarrito, setItemsCarrito, productoId)}
                                            onIncrementItem={(productoId) => handleIncrementItem(itemsCarrito, setItemsCarrito, productoId)}
                                            onDecrementItem={(productoId) => handleDecrementItem(itemsCarrito, setItemsCarrito, productoId)}
                                            items={itemsCarrito}
                                        />
                                    </div>
                                )}
                            </div>
                            <button onClick={() => setProfileMenuOpen(!isProfileMenuOpen)} className="relative">
                                <FaUserCircle className="text-white text-xl sm:text-2xl" />
                            </button>
                            {isProfileMenuOpen && (
                                <div ref={profileMenuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl shadow-custom-azul py-2 border border-black border-opacity-40 transform translate-y-full">
                                    <Link to="/perfil" className="block px-4 py-2 text-black hover:bg-gray-200">Mi cuenta</Link>
                                    <Logout onLogout={logout} />
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-500 transition duration-300 hidden lg:block">
                                Iniciar Sesión
                            </Link>
                            <Link to="/registro" className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300 hidden lg:block">
                                Registrarse
                            </Link>
                        </>
                    )}
                    <button className="lg:hidden ml-auto" onClick={() => setMenuOpen(!isMenuOpen)}>
                        <FaBars className="text-white text-xl sm:text-2xl" />
                    </button>
                </div>
            </header>

            <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 ${isCategoriasMenuOpen ? 'block' : 'hidden'}`}></div>

            <div ref={categoriesMenuRef} className={`fixed top-0 left-0 lg:w-80 sm:w-64 h-full bg-custom-azul bg-opacity-80 shadow-lg z-50 transition-transform transform ease-in-out duration-300 ${isCategoriasMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <button onClick={() => setCategoriesMenuOpen(false)} className="absolute top-4 right-4 text-black text-2xl"><RxCross1 className='text-white' /></button>
                <nav>
                    <img src={logo} alt="Logo de la tienda" className="h-8 sm:h-12 md:h-16 lg:h-20 mt-4 ml-4" />
                    <h2 className="text-xl text-white font-bold px-4 mt-16">Todas las categorías</h2>
                    <ul className="mt-4">
                        {categorias.map((categoria) => (
                            <li key={categoria} className="border-b border-gray-200">
                                <Link to={`/categoria/${categoria}`} className="block px-4 py-2 text-white hover:bg-gray-300 transition duration-300">
                                    {categoria}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {isMenuOpen && (
                <nav className="bg-custom-azul w-full py-4 px-8 shadow-md flex flex-col items-center lg:hidden space-y-4">
                    <Link to="/" className="block text-white hover:text-custom-naranja text-lg transition duration-300">Inicio</Link>
                    <button onClick={() => setCategoriesMenuOpen(!isCategoriasMenuOpen)} className="block text-white hover:text-custom-naranja text-lg transition duration-300">Categorías</button>
                    <Link to="/contacto" className="block text-white hover:text-custom-naranja text-lg transition duration-300">Contacto</Link>
                    {isLoggedIn ? (
                        <>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="block bg-black text-white px-4 py-2 rounded-md hover:bg-gray-500 transition duración-300 mt-4 lg:mt-0 lg:ml-4">
                                Iniciar Sesión
                            </Link>
                            <Link to="/registro" className="block bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300 transition duración-300 mt-4 lg:mt-0 lg:ml-4">
                                Registrarse
                            </Link>
                        </>
                    )}
                </nav>
            )}
        </>
    );
}

export default Header;
