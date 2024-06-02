import { createContext, useState, useContext, useEffect } from 'react';
import { loadCarrito } from '../logic/FuncCarrito';

const CarritoContext = createContext();

export const useCarrito = () => {
    return useContext(CarritoContext);
};

export const CarritoProvider = ({ children }) => {
    const [itemsCarrito, setItemsCarrito] = useState([]);

    
    useEffect(() => {
        loadCarrito(setItemsCarrito);
    }, []);

    const value = {
        itemsCarrito,
        setItemsCarrito
    };

    return (
        <CarritoContext.Provider value={value}>
            {children}
        </CarritoContext.Provider>
    );
};
