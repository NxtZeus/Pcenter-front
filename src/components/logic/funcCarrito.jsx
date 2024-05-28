import { fetchCarrito, updateCarritoItem, deleteCarritoItem } from '../apis/Api';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return { headers: { 'Authorization': `Token ${token}` } };
};

export const loadCarrito = async (setItemsCarrito) => {
    try {
        const data = await fetchCarrito();
        setItemsCarrito(data.productos_carrito || []);
    } catch (error) {
        console.error('Error al cargar el carrito:', error);
    }
};

export const handleIncrementItem = async (itemsCarrito, setItemsCarrito, productoId) => {
    const item = itemsCarrito.find(item => item.producto.id === productoId);
    const nuevaCantidad = item.cantidad + 1;
    try {
        await updateCarritoItem(productoId, nuevaCantidad);
        setItemsCarrito(prevItems =>
            prevItems.map(item =>
                item.producto.id === productoId ? { ...item, cantidad: nuevaCantidad } : item
            )
        );
    } catch (error) {
        console.error('No hay stock.');
    }
};

export const handleDecrementItem = async (itemsCarrito, setItemsCarrito, productoId) => {
    const item = itemsCarrito.find(item => item.producto.id === productoId);
    if (item.cantidad > 1) {
        const nuevaCantidad = item.cantidad - 1;
        try {
            await updateCarritoItem(productoId, nuevaCantidad);
            setItemsCarrito(prevItems =>
                prevItems.map(item =>
                    item.producto.id === productoId ? { ...item, cantidad: nuevaCantidad } : item
                )
            );
        } catch (error) {
            console.error('Error al actualizar la cantidad:', error);
        }
    }
};

export const handleEliminarItem = async (itemsCarrito, setItemsCarrito, productoId) => {
    try {
        await deleteCarritoItem(productoId);
        setItemsCarrito(prevItems => prevItems.filter(item => item.producto.id !== productoId));
    } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error);
    }
};

export const agregarItemAlCarrito = async (productoId, setItemsCarrito) => {
    try {
        const response = await axios.post(`${API_URL}añadir-carrito/`, { producto_id: productoId, cantidad: 1 }, getAuthHeaders());
        const nuevoProducto = response.data;
        setItemsCarrito(prevItems => {
            const itemExistente = prevItems.find(item => item.producto.id === productoId);
            if (itemExistente) {
                return prevItems.map(item =>
                    item.producto.id === productoId ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            } else {
                return [...prevItems, nuevoProducto];
            }
        });
    } catch (error) {
        console.error('Error al añadir el producto al carrito:', error);
    }
};
