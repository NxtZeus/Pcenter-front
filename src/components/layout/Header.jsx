import { useContext, useRef, useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle, FaBars } from 'react-icons/fa';
import { RxCross1 } from "react-icons/rx";
import logo from '../../assets/logo.webp';
import Logout from '../login/Logout';
import Carrito from '../carrito/Carrito';
import { AuthContext } from '../auth/AuthContext';
import { useCarrito } from '../carritoContext/CarritoContext';
import { obtenerCategorias, realizarBusqueda } from '../apis/Api';
import { handleIncrementarItem, handleDecrementarItem, handleEliminarItem } from '../logic/FuncCarrito';
import BarraBusqueda from '../barraBusqueda/BarraBusqueda';

function Header() {
    // Estados para manejar la apertura de menús
    const [menuPerfilAbierto, setMenuPerfilAbierto] = useState(false);
    const [menuCarritoAbierto, setMenuCarritoAbierto] = useState(false);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [menuCategoriasAbierto, setMenuCategoriasAbierto] = useState(false);
    const [categorias, setCategorias] = useState([]);
    
    // Referencias a los elementos del menú para cerrarlos al hacer clic fuera
    const menuPerfilRef = useRef(null);
    const menuCarritoRef = useRef(null);
    const menuCategoriasRef = useRef(null);
    
    // Contextos de autenticación y carrito
    const { estaLogueado, logout, esSuperusuario } = useContext(AuthContext);
    const { itemsCarrito, setItemsCarrito } = useCarrito();
    const navigate = useNavigate();

    // Maneja clics fuera de los menús para cerrarlos al hacer clic fuera
    const handleClickFuera = useCallback((event) => {
        if (menuPerfilRef.current && !menuPerfilRef.current.contains(event.target)) {
            setMenuPerfilAbierto(false);
        }
        if (menuCarritoRef.current && !menuCarritoRef.current.contains(event.target)) {
            setMenuCarritoAbierto(false);
        }
        if (menuCategoriasRef.current && !menuCategoriasRef.current.contains(event.target)) {
            setMenuCategoriasAbierto(false);
        }
    }, []);

    // Agrega y remueve el event listener para clics fuera de los menús
    useEffect(() => {
        document.addEventListener('mousedown', handleClickFuera);
        return () => {
            document.removeEventListener('mousedown', handleClickFuera);
        };
    }, [handleClickFuera]);

    // Carga las categorías al montar el componente
    useEffect(() => {
        const cargarCategorias = async () => {
            try {
                const datos = await obtenerCategorias();
                setCategorias(datos);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };
        cargarCategorias();
    }, []);

    // Calcula el total de items en el carrito para mostrar en el ícono del carrito
    const totalItems = itemsCarrito.length;

    // Maneja el clic en una categoría para navegar a la página de productos con la categoría seleccionada
    const handleClickCategoria = (categoria) => {
        setMenuCategoriasAbierto(false);
        navigate('/productos', { state: { categoriaSeleccionada: categoria } });
    };

    return (
        <>
            {/* Encabezado principal */}
            <header className="bg-custom-azul sticky top-0 w-full py-2 sm:py-4 px-4 shadow-md flex justify-between items-center z-10">
                <div className='z-20'>
                    <Link to="/">
                        <img src={logo} alt="Logo de la tienda" className="h-8 sm:h-12 md:h-16 lg:h-20 mr-4" />
                    </Link>
                </div>
                <div className='hidden lg:flex flex-1 absolute inset-x-0 mx-auto justify-center'>
                    <nav className="lg:space-x-14 xl:space-x-20">
                        <Link to="/" className="text-white hover:text-custom-naranja text-xl transition duration-300">Inicio</Link>
                        <Link to="/productos" className="text-white text-xl hover:text-custom-naranja transition duration-300">Productos</Link>
                        <button onClick={() => setMenuCategoriasAbierto(!menuCategoriasAbierto)} className="text-white text-xl hover:text-custom-naranja transition duration-300">Categorías</button>
                        {/* Enlace al panel de administración si el usuario es superusuario */}
                        {esSuperusuario && (
                            <a href="https://pcenter-back-production.up.railway.app/admin/" target='_blank' className="bg-red-500 text-white text-xl px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">Admin</a>
                        )}
                    </nav>
                </div>
                <div className='flex flex-row items-center space-x-2 xl:space-x-6'>
                    <BarraBusqueda realizarBusqueda={realizarBusqueda} />
                    {/* Íconos de carrito y perfil siempre que el usuario esté logueado */}
                    {estaLogueado ? (
                        <>
                            <div className="flex items-center">
                                <button onClick={() => setMenuCarritoAbierto(!menuCarritoAbierto)} className="relative">
                                    <FaShoppingCart className="text-white text-xl sm:text-2xl" />
                                    {totalItems > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {totalItems}
                                        </span>
                                    )}
                                </button>
                                {menuCarritoAbierto && (
                                    <div ref={menuCarritoRef}>
                                        <Carrito
                                            onCerrar={() => setMenuCarritoAbierto(false)}
                                            onEliminarItem={(productoId) => handleEliminarItem(itemsCarrito, setItemsCarrito, productoId)}
                                            onIncrementarItem={(productoId) => handleIncrementarItem(itemsCarrito, setItemsCarrito, productoId)}
                                            onDecrementarItem={(productoId) => handleDecrementarItem(itemsCarrito, setItemsCarrito, productoId)}
                                            items={itemsCarrito}
                                        />
                                    </div>
                                )}
                            </div>
                            <button onClick={() => setMenuPerfilAbierto(!menuPerfilAbierto)} className="relative">
                                <FaUserCircle className="text-white text-xl sm:text-2xl" />
                            </button>
                            {menuPerfilAbierto && (
                                <div ref={menuPerfilRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl shadow-custom-azul py-2 border border-black border-opacity-40 transform translate-y-full">
                                    <Link to="/perfil" className="block px-4 py-2 text-black hover:bg-gray-200">Mi cuenta</Link>
                                    <Logout onLogout={logout} />
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {/* Botones de inicio de sesión y registro sí el usuario no está logueado */}
                            <Link to="/login" className="bg-black text-white px-4 py-2 z-10 rounded-md hover:bg-gray-500 transition duration-300 hidden lg:block">
                                Iniciar Sesión
                            </Link>
                            <Link to="/registro" className="bg-white text-black px-4 py-2 z-10 rounded-md hover:bg-gray-300 transition duration-300 hidden lg:block">
                                Regístrate
                            </Link>
                        </>
                    )}
                    <button className="lg:hidden ml-auto" onClick={() => setMenuAbierto(!menuAbierto)}>
                        <FaBars className="text-white text-xl sm:text-2xl" />
                    </button>
                </div>
            </header>

            {/* Fondo oscuro al abrir el menú de categorías */}
            <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 ${menuCategoriasAbierto ? 'block' : 'hidden'}`}></div>

            {/* Menú de categorías */}
            <div ref={menuCategoriasRef} className={`fixed top-0 left-0 lg:w-80 sm:w-64 h-full bg-custom-azul bg-opacity-80 shadow-lg z-50 transition-transform transform ease-in-out duration-300 ${menuCategoriasAbierto ? 'translate-x-0' : '-translate-x-full'}`}>
                <button onClick={() => setMenuCategoriasAbierto(false)} className="absolute top-4 right-4 text-black text-2xl"><RxCross1 className='text-white' /></button>
                <nav>
                    <img src={logo} alt="Logo de la tienda" className="h-8 sm:h-12 md:h-16 lg:h-20 mt-4 ml-4" />
                    <h2 className="text-xl text-white font-bold px-4 mt-16">Todas las categorías</h2>
                    <ul className="mt-4">
                        {/* Mapea las categorías en la base de datos */}
                        {categorias.map((categoria) => (
                            <li key={categoria} className="border-b border-gray-200">
                                <button onClick={() => handleClickCategoria(categoria)} className="block px-4 py-2 text-white hover:bg-gray-300 transition duration-300 w-full text-left">
                                    {categoria}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Menú móvil responsive*/}
            {menuAbierto && (
                <nav className="bg-custom-azul w-full py-4 px-8 shadow-md flex flex-col items-center lg:hidden space-y-4">
                    <Link to="/" className="block text-white hover:text-custom-naranja text-lg transition duration-300">Inicio</Link>
                    <Link to="/productos" className="block text-white hover:text-custom-naranja text-lg transition duration-300">Productos</Link>
                    <button onClick={() => setMenuCategoriasAbierto(!menuCategoriasAbierto)} className="block text-white hover:text-custom-naranja text-lg transition duration-300">Categorías</button>
                    {esSuperusuario && (
                        <Link to="https://pcenter-back-production.up.railway.app/admin/" className="bg-red-500 text-white text-xl px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">Admin</Link>
                    )}
                    {estaLogueado ? (
                        <>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="block bg-black text-white px-4 py-2 rounded-md hover:bg-gray-500 transition duration-300 mt-4 lg:mt-0 lg:ml-4">
                                Iniciar Sesión
                            </Link>
                            <Link to="/registro" className="block bg-white text-black px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300 mt-4 lg:mt-0 lg:ml-4">
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
