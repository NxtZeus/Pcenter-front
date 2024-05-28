import { useState, useEffect, useContext } from 'react';
import { fetchProductos } from '../components/apis/Api';
import ProductCard from './productCards/ProductCards';
import { agregarItemAlCarrito, loadCarrito } from '../components/logic/FuncCarrito';
import { AuthContext } from '../components/auth/AuthContext';
import banner from '../assets/iphone.jpg';

function Inicio() {
    const [productos, setProductos] = useState([]);
    const [itemsCarrito, setItemsCarrito] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const response = await fetchProductos();
                setProductos(response.data);
            } catch (error) {
                console.error('Error al cargar los productos:', error);
                setError(error);
            } finally {
                setCargando(false);
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

    if (cargando) {
        return <div>Cargando productos...</div>;
    }

    if (error) {
        return <div>Error al cargar los productos: {error.message}</div>;
    }

    return (
        <div className="container mx-auto mt-8 mb-8">
            <img src={banner} className='w-full'/>
            <h1 className="mt-20 text-2xl font-bold mb-8">Productos Destacados</h1>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
                {productos.map((producto) => (
                    <ProductCard key={producto.id} producto={producto} onAddToCart={manejarAgregarAlCarrito} />
                ))}
            </div>
        </div>
    );
}

export default Inicio;