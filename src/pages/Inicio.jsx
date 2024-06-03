import { useState, useEffect, useContext } from 'react';
import { fetchProductos } from '../components/apis/Api';
import ProductCard from '../components/productCards/ProductCards';
import { agregarItemAlCarrito, loadCarrito } from '../components/logic/FuncCarrito';
import { AuthContext } from '../components/auth/AuthContext';
import banner from '../assets/banner.webp';
import { Link } from 'react-router-dom';

function Inicio() {
    const [productos, setProductos] = useState([]);
    const [itemsCarrito, setItemsCarrito] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isLoggedIn, firstNombre } = useContext(AuthContext);
    
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

    return (
        <main className="flex-1">
            <section className="bg-custom-azul2 text-white py-20 px-6 flex flex-col items-center justify-center">
                <img
                    src={banner}
                    width={1200}
                    height={600}
                    alt="banner"
                    className="w-full max-w-5xl rounded-lg shadow-lg"
                />
                <div className="mt-8 text-center space-y-4">
                    <h1 className="text-black text-4xl font-bold">Bienvenido a PCenter{isLoggedIn ? `, ` + firstNombre : ''}</h1>
                    <p className="text-black text-xl">Encuentra el mejor hardware para tu ordenador al mejor precio y según tus necesidades.</p>
                    <div>
                        <Link to='/productos' className='bg-custom-naranja px-4 py-2 rounded-md hover:bg-orange-500 transition duration-300'>
                            Compra ya
                        </Link>
                    </div>
                </div> 
            </section>
            <section className="py-12 px-6">
                <h2 className="text-3xl font-bold mb-8">Productos destacados</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-6">
                    {productos.slice(0, 8).map((producto) => (
                        <ProductCard key={producto.id} producto={producto} />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Inicio;
