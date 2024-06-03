import { useState, useEffect } from 'react';
import { fetchCategorias, fetchProductos } from '../components/apis/Api';
import { agregarItemAlCarrito } from '../components/logic/FuncCarrito';
import ProductCard from '../components/productCards/ProductCards';
import { useCarrito } from '../components/carritoContext/CarritoContext';
import { useLocation } from 'react-router-dom';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const { itemsCarrito, setItemsCarrito } = useCarrito();
    const location = useLocation();
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchProductosData = async () => {
            try {
                const response = await fetchProductos();
                setProductos(response);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
                setProductos([]);
            }
        };

        const fetchCategoriasData = async () => {
            try {
                const data = await fetchCategorias();
                setCategorias(data);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
                setCategorias([]);
            }
        };

        fetchProductosData();
        fetchCategoriasData();
    }, []);

    useEffect(() => {
        if (location.state?.results) {
            setSearchResults(location.state.results);
            setCategoriaSeleccionada('');
        } else if (location.state?.categoriaSeleccionada) {
            setCategoriaSeleccionada(location.state.categoriaSeleccionada);
            setSearchResults([]);
        }
    }, [location.state]);

    const handleCategoriaChange = (event) => {
        setCategoriaSeleccionada(event.target.value);
        setSearchResults([]);
    };

    const normalizeString = (str) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    const productosFiltradosPorCategoria = categoriaSeleccionada
        ? productos.filter(producto => 
            normalizeString(producto.categoria).toLowerCase() === normalizeString(categoriaSeleccionada).toLowerCase())
        : productos;

    const productosAMostrar = searchResults.length > 0 ? searchResults : productosFiltradosPorCategoria;

    const handleAddToCart = async (productoId) => {
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
                {searchResults.length > 0 ? 'Resultados de la Búsqueda' : 'Todos los Productos'}
            </h1>
            <div className="flex flex-col sm:flex-row justify-center items-center mb-8">
                <label htmlFor="categoria" className="text-lg font-medium text-custom-azul mb-2 sm:mb-0 sm:mr-4">
                    Filtrar por categoría:
                </label>
                <select
                    id="categoria"
                    name="categoria"
                    value={categoriaSeleccionada}
                    onChange={handleCategoriaChange}
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
                        <ProductCard key={producto.id} producto={producto} onAddToCart={handleAddToCart} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Productos;
