import { useState, useEffect } from 'react';
import { obtenerCategorias, obtenerProductos } from '../components/apis/Api';
import { agregarItemAlCarrito } from '../components/logic/FuncCarrito';
import TarjetaProducto from '../components/tarjetasProducto/TarjetasProducto';
import { useCarrito } from '../components/carritoContext/CarritoContext';
import { useLocation } from 'react-router-dom';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const { itemsCarrito, setItemsCarrito } = useCarrito();
    const location = useLocation();
    const [resultadosBusqueda, setResultadosBusqueda] = useState([]);

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

    useEffect(() => {
        if (location.state?.resultados) {
            setResultadosBusqueda(location.state.resultados);
            setCategoriaSeleccionada('');
        } else if (location.state?.categoriaSeleccionada) {
            setCategoriaSeleccionada(location.state.categoriaSeleccionada);
            setResultadosBusqueda([]);
        }
    }, [location.state]);

    const manejarCambioCategoria = (event) => {
        setCategoriaSeleccionada(event.target.value);
        setResultadosBusqueda([]);
    };

    const normalizarString = (str) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    const productosFiltradosPorCategoria = categoriaSeleccionada
        ? productos.filter(producto =>
            normalizarString(producto.categoria).toLowerCase() === normalizarString(categoriaSeleccionada).toLowerCase())
        : productos;

    const productosAMostrar = resultadosBusqueda.length > 0 ? resultadosBusqueda : productosFiltradosPorCategoria;

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
