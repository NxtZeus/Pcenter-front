import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerProductos } from '../components/apis/Api';
import Carrousel from '../components/carrousel/Carrousel';
import { AuthContext } from '../components/auth/AuthContext';
import { agregarItemAlCarrito } from '../components/logic/FuncCarrito';
import { useCarrito } from '../components/carritoContext/CarritoContext';

const InfoProducto = () => {

    // Obtiene el estado de autenticación del contexto de autenticación
    const { estaLogueado } = useContext(AuthContext);
    // Hook para navegar a otras páginas
    const navigate = useNavigate();
    // Obtiene el ID del producto desde los parámetros de la URL usando el hook useParams
    const { id } = useParams();
    
    // Estados para manejar el producto, el estado de carga y los errores al obtener el producto desde la API del servidor 
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    
    // Obtener el estado del carrito del contexto del carrito y la función para actualizar el estado del carrito
    const { itemsCarrito, setItemsCarrito } = useCarrito();

    // Efecto para obtener los detalles del producto al cargar el componente y actualizar el estado del producto, el estado de carga y los errores en consecuencia al obtener el producto desde la API del servidor
    useEffect(() => {
        const obtenerProducto = async () => {
            try {
                const productos = await obtenerProductos();
                const productoEncontrado = productos.find(p => p.id === parseInt(id));
                if (productoEncontrado) {
                    setProducto(productoEncontrado);
                } else {
                    setError('Producto no encontrado.');
                }
            } catch (error) {
                setError('Error al obtener el producto.');
            } finally {
                setCargando(false);
            }
        };

        obtenerProducto();
    }, [id]);

    // Función para manejar la adición del producto al carrito y actualizar el estado del carrito en el contexto del carrito
    const manejarAgregarAlCarrito = async () => {
        if (!estaLogueado) {
            navigate('/login')
        }
        else if (producto) {
            try {
                await agregarItemAlCarrito(producto.id, setItemsCarrito);
                console.log('Producto añadido al carrito');
            } catch (error) {
                console.error('Error al añadir el producto al carrito:', error);
            }
        }
    };

    // Mostrar un mensaje de carga mientras se obtiene el producto
    if (cargando) {
        return <div>Cargando...</div>;
    }

    // Mostrar un mensaje de error si ocurre un error al obtener el producto
    if (error) {
        return <div>{error}</div>;
    }

    // Obtener las URL de las imágenes del producto o establecer un array vacío si no hay imágenes
    const imagenes = producto.imagenes ? producto.imagenes.map(img => img.imagen) : [];

    // Formatear especificaciones del producto en un array de objetos con claves y valores para mostrar en la interfaz de usuario
    const especificaciones = producto.especificaciones.split('\n').map((item) => {
        const [key, value] = item.split(': ');
        return { key, value };
    });

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start">
                <div className="grid gap-4">
                    {/* Carrusel de imágenes del producto */}
                    <Carrousel imagenes={imagenes} />
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">{producto.nombre_producto}</h1>
                        <div className="text-4xl font-bold">{producto.precio}€</div>
                    </div>
                    <button
                        className="w-full bg-custom-naranja px-4 py-2 rounded-md hover:bg-orange-500 transition duration-300 mt-4 text-white"
                        onClick={manejarAgregarAlCarrito}
                    >
                        Añadir al carrito
                    </button>
                </div>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <h2 className="text-xl font-bold">Descripción del Producto</h2>
                        <p className="text-gray-500 dark:text-gray-400">{producto.descripcion}</p>
                    </div>
                    <div className="grid gap-2">
                        <div className="font-medium">Stock</div>
                        <div>{producto.stock > 0 ? 'Disponible' : 'Agotado'}</div>
                    </div>
                </div>
            </div>
            <div className="mt-8 p-4 bg-gray-200 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Especificaciones</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-r border-gray-200">
                    {especificaciones.map((especificacion, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:justify-between">
                            <div className="font-medium sm:w-1/2">{especificacion.key}</div>
                            <div className="sm:w-1/2">{especificacion.value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InfoProducto;
