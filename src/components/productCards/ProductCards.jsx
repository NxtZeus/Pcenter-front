import React from 'react';
import TruncatedText from "../truncarTexto/TruncarTexto";

function ProductCard({ producto, onAddToCart }) {
    return (
        <div className="border p-4 bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between min-h-[24rem] w-72">
            <img src={`${producto.imagen}`} alt={producto.nombre_producto} width={400} height={300} className="w-full h-48 object-cover " />
            <div className='p-4'>
                <h2 className="text-lg font-bold text-custom-azul"><TruncatedText text={producto.nombre_producto} maxLength={50} /></h2>
                <p className="text-lg text-right font-semibold mt-4 text-custom-azul">{producto.precio}€</p>
                <button
                    className="bg-custom-azul px-4 py-2 rounded-md hover:bg-custom-naranja transition duration-300">
                    <p className="text-white">Ver más.</p>
                </button>
            </div>
            <div className="flex justify-end mt-4">
            </div>
        </div>
    );
}

export default ProductCard;
