import { createContext, useState, useContext, useEffect } from 'react';
import { cargarCarrito } from '../logic/FuncCarrito';
import { AuthContext } from '../auth/AuthContext';

// Crear el contexto del carrito de compras para traerlo en otros componentes
const CarritoContext = createContext();

// Custom hook para usar el contexto del carrito
export const useCarrito = () => {
    return useContext(CarritoContext);
};

// Proveedor del contexto del carrito de compras
export const CarritoProvider = ({ children }) => {
    // Estado para manejar los items del carrito
    const [itemsCarrito, setItemsCarrito] = useState([]);
    const { estaLogueado } = useContext(AuthContext); // Desestructurar para obtener `estaLogueado` directamente

    // Efecto para cargar los items del carrito cuando se monta el componente y actualizar el estado de los items del carrito
    useEffect(() => {
        if (estaLogueado) {
            cargarCarrito(setItemsCarrito);
        }
    }, [estaLogueado]);

    // Valor que se pasa a los consumidores del contexto del carrito
    const valor = {
        itemsCarrito,
        setItemsCarrito
    };

    // Proveer el contexto del carrito a los componentes hijos para envolver la aplicación y el carrito de compras esté disponible en toda la aplicación
    return (
        <CarritoContext.Provider value={valor}>
            {children}
        </CarritoContext.Provider>
    );
};
