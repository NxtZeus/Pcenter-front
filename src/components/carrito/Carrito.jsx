import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TextoTruncado from '../truncarTexto/TruncarTexto';

// Componente del carrito de compras que muestra los productos añadidos al carrito y permite eliminarlos, incrementar o decrementar la cantidad de los productos y tramitar el pedido
const Carrito = ({ onCerrar, onEliminarItem, onIncrementarItem, onDecrementarItem, items }) => {
    // Estado para manejar errores en el carrito de compras
    const [error, setError] = useState(null);
    // Estado para manejar el ancho de la ventana del navegador
    const [anchoVentana, setAnchoVentana] = useState(window.innerWidth);

    // Efecto para actualizar el ancho de la ventana al redimensionar la ventana del navegador
    useEffect(() => {
        const manejarRedimension = () => setAnchoVentana(window.innerWidth);
        window.addEventListener('resize', manejarRedimension);
        return () => window.removeEventListener('resize', manejarRedimension);
    }, []);

    // Calcular el precio total de los items en el carrito de compras 
    const precioTotal = items.reduce((total, item) => total + parseFloat(item.producto.precio) * item.cantidad, 0);

    // Obtener la URL de la imagen del producto o una imagen por defecto si no hay URL o es null o undefined
    const obtenerUrlImagen = (url) => {
        const URLbase = 'https://tfg-backend-production-5a6a.up.railway.app';
        if (!url) {
            return `${URLbase}/default-image.jpg`; // Ruta de una imagen por defecto si url es undefined o null
        }
        if (url.startsWith(URLbase)) {
            return url;
        }
        return `${url}`;
    };

    // Obtener la longitud máxima del texto según el ancho de la ventana para truncar el texto si es necesario en el carrito de compras
    const obtenerMaxLongitud = (ancho) => {
        if (ancho < 1025) return 25;
        if (ancho < 1441) return 30;
        return 40;
    };

    return (
        <div className="fixed top-16 right-0 mt-2 mr-2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl max-h-96 overflow-y-auto bg-white rounded-md shadow-xl shadow-custom-azul py-2 border border-black z-50">
            <div className="flex justify-between items-center px-4 py-2">
                <h2 className="text-lg font-semibold">Carrito</h2>
                <button onClick={onCerrar} className="text-black hover:text-gray-700">&times;</button>
            </div>
            {error && <p className="px-4 text-red-500">{error}</p>}
            <ul>
                {items.map(item => (
                    <li key={item.id} className="flex justify-between items-center px-4 py-2 hover:bg-gray-100">
                        <div className="flex items-center space-x-2 flex-1">
                            <img src={obtenerUrlImagen(item.producto.imagenes[0]?.imagen)} alt={item.producto.nombre_producto} className="w-12 h-12 object-cover rounded-md" />
                            <div className="flex-1">
                                <p className="whitespace-normal md:whitespace-nowrap">
                                    <TextoTruncado text={item.producto.nombre_producto} maxLength={obtenerMaxLongitud(anchoVentana)} />
                                </p>
                                <p className="text-sm text-gray-600">{item.producto.precio}€ x {item.cantidad}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button onClick={() => onDecrementarItem(item.producto.id)} className="text-red-500 hover:text-red-700">-</button>
                            <span className="px-2">{item.cantidad}</span>
                            <button onClick={() => onIncrementarItem(item.producto.id)} className="text-green-500 hover:text-green-700">+</button>
                            <button onClick={() => onEliminarItem(item.producto.id)} className="text-red-500 hover:text-red-700">Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
            {items.length === 0 && !error && <p className="px-4 text-gray-500">El carrito está vacío</p>}
            {items.length > 0 && (
                <div className="px-4 py-2">
                    <p className="text-right font-semibold">Total: ${precioTotal.toFixed(2)}</p>
                    <Link to='/pago' className="w-full bg-custom-naranja text-white px-4 py-2 rounded-md hover:bg-orange-500 transition duration-300">
                        Tramitar Pedido
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Carrito;
