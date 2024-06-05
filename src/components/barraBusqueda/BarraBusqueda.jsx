import { useState } from "react";
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { realizarBusqueda } from "../apis/Api";

const BarraBusqueda = ({ handleSearch }) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await realizarBusqueda(query);
            console.log('Resultados de la búsqueda:', response);
            navigate('/productos', { state: { resultados: response } });
        } catch (error) {
            console.error('Error al buscar productos:', error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSubmit(e);
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="relative flex items-center">
                    <input 
                        type="text" 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                        placeholder="Buscar..." 
                        className="px-2 py-1 rounded-md w-32 sm:px-4 sm:py-2 sm:w-80 lg:w-96 pr-10" 
                        onKeyDown={handleKeyDown}
                    />
                    <button 
                        type="submit" 
                        className="absolute right-2 text-black"
                    >
                        <FaSearch />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BarraBusqueda;
