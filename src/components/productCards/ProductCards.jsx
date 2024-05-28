import TruncatedText from "../truncarTexto/TruncarTexto";

function ProductCard({ producto, onAddToCart }) {
    return (
        <div className="border p-4 rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between">
            <div>
                <img src={`${producto.imagen}`} alt={producto.nombre_producto} className="w-full h-48 object-cover mb-4 rounded-md" />
                <h2 className="text-lg font-bold text-gray-800">{producto.nombre_producto}</h2>
                <p className="text-gray-600 mt-2"><TruncatedText text={producto.descripcion} maxLength={208} /></p>
                <p className="text-lg font-semibold mt-4 text-yellow-600">${producto.precio}</p>
            </div>
            <div className="flex justify-end mt-4">
                <button
                    className="bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
                    onClick={() => onAddToCart(producto.id)}
                >
                    Añadir al carrito
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
