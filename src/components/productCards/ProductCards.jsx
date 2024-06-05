import { Link } from 'react-router-dom';
import TruncatedText from "../truncarTexto/TruncarTexto";

function ProductCard({ producto, onAddToCart }) {
    const imagenUrl = producto.imagenes && producto.imagenes.length > 0 ? producto.imagenes[0].imagen : 'default-image-url';

    return (
        <div className="border p-4 bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between min-h-[24rem] w-72">
            <img src={imagenUrl} alt={producto.nombre_producto} width={400} height={300} className="w-full h-48 object-contain" />
            <div className='p-4'>
                <h2 className="text-lg font-bold text-custom-azul"><TruncatedText text={producto.nombre_producto} maxLength={50} /></h2>
                <p className="text-lg text-right font-semibold mt-4 text-custom-azul">{producto.precio}€</p>
                <Link to={`/producto/${producto.id}`} >
                    <button className="bg-custom-azul px-4 py-2 rounded-md hover:bg-custom-naranja transition duration-300 mt-4">
                        <p className="text-white">Ver más</p>
                    </button>
                </Link>
            </div>
            <div className="flex justify-end mt-4">
            </div>
        </div>
    );
}

export default ProductCard;
