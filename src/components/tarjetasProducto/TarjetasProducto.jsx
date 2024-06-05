import { Link } from 'react-router-dom';
import TruncarTexto from "../truncarTexto/TruncarTexto";

function TarjetaProducto({ producto, onAddToCart }) {
    const imagenUrl = producto.imagenes && producto.imagenes.length > 0 ? producto.imagenes[0].imagen : 'default-image-url';

    return (
        <div className="border p-4 bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col justify-between min-h-[24rem] w-72">
            <img src={imagenUrl} alt={producto.nombre_producto} width={400} height={300} className="w-full h-48 object-contain" />
            <div className="flex flex-col justify-between flex-1 p-4">
                <div>
                    <h2 className="text-lg font-bold text-custom-azul"><TruncarTexto text={producto.nombre_producto} maxLength={50} /></h2>
                    <p className="text-lg text-right font-semibold mt-4 text-custom-azul">{producto.precio}€</p>
                </div>
                <div className="flex justify-start mt-4">
                    <Link to={`/producto/${producto.id}`} className="self-end">
                        <button className="bg-custom-azul px-4 py-2 rounded-md hover:bg-custom-naranja transition duration-300">
                            <p className="text-white">Ver más</p>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default TarjetaProducto;
