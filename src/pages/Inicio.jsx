import { useState, useEffect, useContext } from 'react';
import { fetchProductos } from '../components/apis/Api';
import ProductCard from '../components/productCards/ProductCards';
import { agregarItemAlCarrito, loadCarrito } from '../components/logic/FuncCarrito';
import { AuthContext } from '../components/auth/AuthContext';
import banner from '../assets/banner.webp';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';
import banner4 from '../assets/banner4.jpeg';
import Carousel from '../components/carrousel/Carrousel';

function Inicio() {
    const [productos, setProductos] = useState([]);
    const [itemsCarrito, setItemsCarrito] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const productos = await fetchProductos();
                setProductos(productos);
            } catch (error) {
                console.error('Error al cargar los productos:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        obtenerProductos();
        if (isLoggedIn) {
            loadCarrito(setItemsCarrito);
        }
    }, [isLoggedIn]);

    const manejarAgregarAlCarrito = async (productoId) => {
        await agregarItemAlCarrito(productoId, setItemsCarrito);
    };

    if (loading) {
        return <div>Cargando productos...</div>;
    }

    if (error) {
        return <div>Error al cargar los productos: {error.message}</div>;
    }

    const images = [
        banner,
        banner2,
        banner3,
        banner4
    ];

    return (
        <>
            <Carousel images={images} />
            <div className="container mx-auto mt-12 mb-8 px-4 bg-gray-200 rounded-lg">
                <h1 className="pl-4 pt-6 text-2xl text-custom-azul font-bold mb-8">Productos Destacados</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
                    {productos.map((producto) => (
                        <ProductCard key={producto.id} producto={producto} onAddToCart={manejarAgregarAlCarrito} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Inicio;