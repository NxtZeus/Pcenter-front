import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TruncatedText from '../truncarTexto/TruncarTexto';

const Carrito = ({ onClose, onEliminarItem, onIncrementItem, onDecrementItem, items }) => {
    const [error, setError] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const precioTotal = items.reduce((total, item) => total + parseFloat(item.producto.precio) * item.cantidad, 0);

    const getImageUrl = (url) => {
        const baseURL = 'http://127.0.0.1:8000';
        if (!url) {
            return `${baseURL}/default-image.jpg`; // Ruta de una imagen por defecto si url es undefined
        }
        if (url.startsWith(baseURL)) {
            return url;
        }
        return `${baseURL}${url}`;
    };

    const getMaxLength = (width) => {
        if (width < 1025) return 25;
        if (width < 1441) return 30;
        return 40;
    };

    return (
        <div className="fixed top-16 right-0 mt-2 mr-2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl max-h-96 overflow-y-auto bg-white rounded-md shadow-xl shadow-custom-azul py-2 border border-black z-50">
            <div className="flex justify-between items-center px-4 py-2">
                <h2 className="text-lg font-semibold">Carrito</h2>
                <button onClick={onClose} className="text-black hover:text-gray-700">&times;</button>
            </div>
            {error && <p className="px-4 text-red-500">{error}</p>}
            <ul>
                {items.map(item => (
                    <li key={item.id} className="flex justify-between items-center px-4 py-2 hover:bg-gray-100">
                        <div className="flex items-center space-x-2 flex-1">
                            <img src={getImageUrl(item.producto.imagenes[0]?.imagen)} alt={item.producto.nombre_producto} className="w-12 h-12 object-cover rounded-md" />
                            <div className="flex-1">
                                <p className="whitespace-normal md:whitespace-nowrap">
                                    <TruncatedText text={item.producto.nombre_producto} maxLength={getMaxLength(windowWidth)} />
                                </p>
                                <p className="text-sm text-gray-600">{item.producto.precio}€ x {item.cantidad}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button onClick={() => onDecrementItem(item.producto.id)} className="text-red-500 hover:text-red-700">-</button>
                            <span className="px-2">{item.cantidad}</span>
                            <button onClick={() => onIncrementItem(item.producto.id)} className="text-green-500 hover:text-green-700">+</button>
                            <button onClick={() => onEliminarItem(item.producto.id)} className="text-red-500 hover:text-red-700">Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
            {items.length === 0 && !error && <p className="px-4 text-gray-500">El carrito está vacío</p>}
            {items.length > 0 && (
                <div className="px-4 py-2">
                    <p className="text-right font-semibold">Total: ${precioTotal.toFixed(2)}</p>
                    <Link to='/pago' className="w-full bg-custom-naranja px-4 py-2 rounded-md hover:bg-orange-500 transition duration-300">
                        Tramitar Pedido
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Carrito;
