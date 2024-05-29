import TruncatedText from "../truncarTexto/TruncarTexto";

function ProductCard({ producto, onAddToCart }) {
    return (
        <div className="border p-4 bg-custom-celeste rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between min-h-[24rem] w-72">
            <div>
                <img src={`${producto.imagen}`} alt={producto.nombre_producto} className="w-full h-48 object-cover mb-4 rounded-md" />
                <h2 className="text-lg font-bold text-gray-800">{producto.nombre_producto}</h2>
                <p className="text-lg text-right font-semibold mt-4 text-custom-azul">{producto.precio}€</p>
            </div>
            <div className="flex justify-end mt-4">
                <button
                    className="bg-custom-azul px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
                    onClick={() => onAddToCart(producto.id)}
                >
                    <p className="text-white">Añadir al carrito</p>
                </button>
            </div>
        </div>
    );
}

export default ProductCard;