import React, { useState } from 'react';

const Carrito = ({ onClose, onEliminarItem, onIncrementItem, onDecrementItem, items }) => {
    const [error, setError] = useState(null);

    const precioTotal = items.reduce((total, item) => total + parseFloat(item.producto.precio) * item.cantidad, 0);

    return (
        <div className="absolute right-0 mt-2 mr-2 min-w-max bg-white rounded-md shadow-lg py-2">
            <div className="flex justify-between items-center px-4 py-2">
                <h2 className="text-lg font-semibold">Carrito</h2>
                <button onClick={onClose} className="text-black hover:text-gray-700">&times;</button>
            </div>
            {error && <p className="px-4 text-red-500">{error}</p>}
            <ul>
                {items.map(item => (
                    <li key={item.id} className="flex justify-between items-center px-4 py-2 hover:bg-gray-100">
                        <div className="flex-1">
                            <p className="whitespace-nowrap">{item.producto.nombre_producto}</p>
                            <p className="text-sm text-gray-600">${item.producto.precio} x {item.cantidad}</p>
                        </div>
                        <div className="flex items-center">
                            <button onClick={() => onDecrementItem(item.producto.id)} className="px-2 text-red-500 hover:text-red-700">-</button>
                            <span className="px-2">{item.cantidad}</span>
                            <button onClick={() => onIncrementItem(item.producto.id)} className="px-2 text-green-500 hover:text-green-700">+</button>
                            <button onClick={() => onEliminarItem(item.producto.id)} className="px-2 text-red-500 hover:text-red-700">Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
            {items.length === 0 && !error && <p className="px-4 text-gray-500">El carrito está vacío</p>}
            {items.length > 0 && (
                <div className="px-4 py-2">
                    <p className="text-right font-semibold">Total: ${precioTotal.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
};

export default Carrito;
