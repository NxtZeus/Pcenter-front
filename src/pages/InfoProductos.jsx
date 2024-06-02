import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductos } from '../components/apis/Api';
import Carrousel from '../carrousel/Carrousel';

const InfoProducto = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const productos = await fetchProductos();
                const productoEncontrado = productos.find(p => p.id === parseInt(id));
                if (productoEncontrado) {
                    setProducto(productoEncontrado);
                } else {
                    setError('Producto no encontrado.');
                }
            } catch (error) {
                setError('Error al obtener el producto.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducto();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const imagenes = producto.imagenes ? producto.imagenes.map(img => img.imagen) : []; // Asegúrate de mapear las URLs de las imágenes correctamente

    // Formatear especificaciones
    const especificaciones = producto.especificaciones.split('\n').map((item) => {
        const [key, value] = item.split(': ');
        return { key, value };
    });

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start">
                <div className="grid gap-4">
                    <Carrousel images={imagenes} />
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">{producto.nombre_producto}</h1>
                        <div className="text-4xl font-bold">{producto.precio}€</div>
                    </div>
                    <button className="w-full bg-custom-azul px-4 py-2 rounded-md hover:bg-custom-naranja transition duration-300 mt-4 text-white" onClick={() => console.log('Añadir al carrito')}>
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
