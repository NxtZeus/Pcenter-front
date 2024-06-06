import { useState, useEffect } from 'react';
import { obtenerCategorias, obtenerProductos } from '../components/apis/Api';
import { agregarItemAlCarrito } from '../components/logic/FuncCarrito';
import TarjetaProducto from '../components/tarjetasProducto/TarjetasProducto';
import { useCarrito } from '../components/carritoContext/CarritoContext';
import { useLocation } from 'react-router-dom';

const Productos = () => {
    // Estados para manejar productos, categorías, categoría seleccionada y resultados de búsqueda
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const { itemsCarrito, setItemsCarrito } = useCarrito();
    const location = useLocation();
    const [resultadosBusqueda, setResultadosBusqueda] = useState([]);

    // Efecto para obtener productos y categorías al montar el componente y actualizar los estados de productos y categorías con los datos obtenidos
    useEffect(() => {
        const obtenerDatosProductos = async () => {
            try {
                const response = await obtenerProductos();
                setProductos(response);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
                setProductos([]);
            }
        };

        const obtenerDatosCategorias = async () => {
            try {
                const data = await obtenerCategorias();
                setCategorias(data);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
                setCategorias([]);
            }
        };

        obtenerDatosProductos();
        obtenerDatosCategorias();
    }, []);

    // Efecto para manejar cambios en el estado de la ubicación y actualizar los resultados de búsqueda y la categoría seleccionada
    useEffect(() => {
        if (location.state?.resultados) {
            setResultadosBusqueda(location.state.resultados);
            setCategoriaSeleccionada('');
        } else if (location.state?.categoriaSeleccionada) {
            setCategoriaSeleccionada(location.state.categoriaSeleccionada);
            setResultadosBusqueda([]);
        }
    }, [location.state]);

    // Función para manejar el cambio de categoría y limpiar los resultados de búsqueda
    const manejarCambioCategoria = (event) => {
        setCategoriaSeleccionada(event.target.value);
        setResultadosBusqueda([]);
    };

    // Función para normalizar cadenas de texto (eliminar acentos) y compararlas en minúsculas
    const normalizarString = (str) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    // Filtra los productos según la categoría seleccionada
    const productosFiltradosPorCategoria = categoriaSeleccionada
        ? productos.filter(producto =>
            normalizarString(producto.categoria).toLowerCase() === normalizarString(categoriaSeleccionada).toLowerCase())
        : productos;

    // Determina qué productos mostrar (filtrados o resultados de búsqueda)
    const productosAMostrar = resultadosBusqueda.length > 0 ? resultadosBusqueda : productosFiltradosPorCategoria;

    // Función para manejar la adición de un producto al carrito y actualizar el estado del carrito con el nuevo item añadido
    const manejarAgregarAlCarrito = async (productoId) => {
        try {
            await agregarItemAlCarrito(productoId, setItemsCarrito);
            console.log(`Producto añadido al carrito: ${productoId}`);
        } catch (error) {
            console.error('Error al añadir el producto al carrito:', error);
        }
    };

    return (
        <div className="container mt-4 mx-auto px-4 py-8 bg-gray-200 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mb-8 text-custom-azul text-center">
                {resultadosBusqueda.length > 0 ? 'Resultados de la Búsqueda' : 'Todos los Productos'}
            </h1>
            <div className="flex flex-col sm:flex-row justify-center items-center mb-8">
                <label htmlFor="categoria" className="text-lg font-medium text-custom-azul mb-2 sm:mb-0 sm:mr-4">
                    Filtrar por categoría:
                </label>
                <select
                    id="categoria"
                    name="categoria"
                    value={categoriaSeleccionada}
                    onChange={manejarCambioCategoria}
                    className="block w-full sm:w-64 pl-3 pr-10 py-2 text-base border border-custom-azul bg-white focus:outline-none focus:ring-custom-azul focus:border-custom-azul sm:text-sm rounded-md shadow-sm"
                >
                    <option value="">Todas las categorías</option>
                    {categorias.map((categoria, index) => (
                        <option key={index} value={categoria}>
                            {categoria}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex justify-center mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {productosAMostrar.map((producto) => (
                        <TarjetaProducto key={producto.id} producto={producto} onAddToCart={manejarAgregarAlCarrito} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Productos;
