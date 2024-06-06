import { useState } from "react";
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { realizarBusqueda } from "../apis/Api";

// Componente de barra de búsqueda
const BarraBusqueda = ({  }) => {
    const [query, setQuery] = useState('');  // Estado para almacenar el término de búsqueda ingresado por el usuario
    const navigate = useNavigate();  // Hook para la navegación entre páginas de React

    // Función que se ejecuta al enviar el formulario de búsqueda
    const onSubmit = async (e) => {
        e.preventDefault();  // Previene el comportamiento por defecto del formulario al enviarlo (recargar la página)
        try {
            const response = await realizarBusqueda(query);  // Realiza la búsqueda usando la API y el término de búsqueda almacenado en el estado 
            navigate('/productos', { state: { resultados: response } });  // Navega a la página de productos con los resultados de la búsqueda como estado de la ubicación
        } catch (error) {
            console.error('Error al buscar los productos:', error);  // Muestra un error en la consola si la búsqueda falla
        }
    };

    // Función que se ejecuta al presionar una tecla en el input
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSubmit(e);  // Ejecuta la búsqueda si se presiona Enter en el input 
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="relative flex items-center">
                    <input 
                        type="text" 
                        value={query}  // Vincula el valor del input al estado query para poder mostrarlo y actualizarlo en tiempo real
                        onChange={(e) => setQuery(e.target.value)}  // Actualiza el estado query cuando el usuario escribe en el input
                        placeholder="Buscar..." 
                        className="px-2 py-1 rounded-md w-32 sm:px-4 sm:py-2 sm:w-80 lg:w-96 pr-10"  // Estilos del input usando Tailwind CSS
                        onKeyDown={handleKeyDown}  // Maneja la pulsación de teclas
                    />
                    <button 
                        type="submit" 
                        className="absolute right-2 text-black"  // Estilos del botón usando Tailwind CSS
                    >
                        <FaSearch />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BarraBusqueda;
