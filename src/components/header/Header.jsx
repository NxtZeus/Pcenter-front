import React, { useContext, useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaUserCircle, FaBars } from 'react-icons/fa';
import logo from '../../assets/logo.webp';
import Logout from '../login/Logout';
import Carrito from '../carrito/Carrito';
import { AuthContext } from '../../components/auth/AuthContext';
import { loadCarrito, handleIncrementItem, handleDecrementItem, handleEliminarItem } from '../logic/funcCarrito';

function Header() {
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const [isCarritoMenuOpen, setCarritoMenuOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [itemsCarrito, setItemsCarrito] = useState([]);
    const profileMenuRef = useRef(null);
    const carritoMenuRef = useRef(null);
    const { isLoggedIn, logout } = useContext(AuthContext);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setProfileMenuOpen(false);
            }
            if (carritoMenuRef.current && !carritoMenuRef.current.contains(event.target)) {
                setCarritoMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        loadCarrito(setItemsCarrito, isLoggedIn);
    }, [isLoggedIn]);

    console.log(localStorage.getItem('token'))

    const totalItems = itemsCarrito.reduce((sum, item) => sum + 1, 0);

    return (
        <>
            <header className="bg-yellow-400 w-full py-4 px-4 shadow-md flex justify-between items-center flex-wrap">
                <div className="flex items-center w-full lg:w-auto">
                    <img src={logo} alt="Logo de la tienda" className="h-12 md:h-16 lg:h-20 mr-4" />
                    <button className="lg:hidden ml-auto" onClick={() => setMenuOpen(!isMenuOpen)}>
                        <FaBars className="text-black text-2xl" />
                    </button>
                </div>

                <div className="flex-1 flex justify-center lg:hidden">
                    <nav className="space-x-8 text-center">
                        <Link to="/" className="text-black hover:text-white text-lg transition duration-300">Inicio</Link>
                        <Link to="/productos" className="text-black hover:text-white text-lg transition duration-300">Productos</Link>
                        <Link to="/contacto" className="text-black hover:text-white text-lg transition duration-300">Contacto</Link>
                    </nav>
                </div>

                <div className="hidden lg:flex flex-1 justify-center">
                    <nav className="space-x-8">
                        <Link to="/" className="text-black hover:text-white text-lg transition duration-300">Inicio</Link>
                        <Link to="/productos" className="text-black hover:text-white text-lg transition duration-300">Productos</Link>
                        <Link to="/contacto" className="text-black hover:text-white text-lg transition duration-300">Contacto</Link>
                    </nav>
                </div>

                <div className="flex items-center space-x-4 lg:space-x-8">
                    <div className="relative flex-1 lg:flex-none lg:ml-4">
                        <input type="text" placeholder="Buscar..." className="px-4 py-2 rounded-md w-full lg:w-auto" />
                        <FaSearch className="absolute right-2 top-2 text-black" />
                    </div>
                    {isLoggedIn ? (
                        <>
                            <div className="relative">
                                <button onClick={() => setCarritoMenuOpen(!isCarritoMenuOpen)} className="relative ml-4 lg:ml-0">
                                    <FaShoppingCart className="text-black text-2xl" />
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
                            <div className="relative">
                                <button onClick={() => setProfileMenuOpen(!isProfileMenuOpen)} className="relative ml-4 lg:ml-0">
                                    <FaUserCircle className="text-black text-2xl" />
                                </button>
                                {isProfileMenuOpen && (
                                    <div ref={profileMenuRef} className="absolute right-0 mt-2 mr-2 w-48 bg-white rounded-md shadow-lg py-2">
                                        <Link to="/perfil" className="block px-4 py-2 text-black hover:bg-gray-200">Mi cuenta</Link>
                                        <Logout onLogout={logout} />
                                    </div>
                                )}
                            </div>
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
                </div>
            </header>

            {isMenuOpen && (
                <div className="bg-yellow-400 w-full py-4 px-8 shadow-md flex flex-col items-center lg:hidden">
                    <nav className="space-y-4 text-center w-full">
                        <Link to="/" className="block text-black hover:text-white text-lg transition duration-300">Inicio</Link>
                        <Link to="/productos" className="block text-black hover:text-white text-lg transition duration-300">Productos</Link>
                        <Link to="/contacto" className="block text-black hover:text-white text-lg transition duration-300">Contacto</Link>
                        {isLoggedIn ? (
                            <>
                                <Link to="/carrito" className="block text-black hover:text-white text-lg transition duration-300">Carrito</Link>
                                <Link to="/perfil" className="block text-black hover:text-white text-lg transition duración-300">Perfil</Link>
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
                </div>
            )}
        </>
    );
}

export default Header;
