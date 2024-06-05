import { createContext, useState, useContext, useEffect } from 'react';
import { cargarCarrito } from '../logic/FuncCarrito';

const CarritoContext = createContext();

export const useCarrito = () => {
    return useContext(CarritoContext);
};

export const CarritoProvider = ({ children }) => {
    const [itemsCarrito, setItemsCarrito] = useState([]);

    useEffect(() => {
        cargarCarrito(setItemsCarrito);
    }, []);

    const valor = {
        itemsCarrito,
        setItemsCarrito
    };

    return (
        <CarritoContext.Provider value={valor}>
            {children}
        </CarritoContext.Provider>
    );
};
