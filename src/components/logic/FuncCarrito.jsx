import { obtenerCarrito, actualizarItemCarrito, eliminarItemCarrito } from '../apis/Api';
import axios from 'axios';

// URL base de la API
const URL_API = 'https://tfg-backend-production-5a6a.up.railway.app/api/';

// Función para obtener los encabezados de autenticación usando el token almacenado en localStorage
const obtenerHeadersAuth = () => {
    const token = localStorage.getItem('token');
    return { headers: { 'Authorization': `Token ${token}` } };
};

// Función para cargar los items del carrito y establecer el estado correspondiente con los productos del carrito del usuario autenticado
export const cargarCarrito = async (setItemsCarrito) => {
    try {
        const data = await obtenerCarrito(); // Llama a la API para obtener los items del carrito del usuario autenticado
        setItemsCarrito(data.productos_carrito || []); // Establece el estado con los productos del carrito obtenidos de la API
    } catch (error) {
        console.error('Error al cargar el carrito:', error);
    }
};

// Función para incrementar la cantidad de un item en el carrito
export const handleIncrementarItem = async (itemsCarrito, setItemsCarrito, productoId) => {
    const item = itemsCarrito.find(item => item.producto.id === productoId);
    const nuevaCantidad = item.cantidad + 1;
    try {
        await actualizarItemCarrito(productoId, nuevaCantidad); // Actualiza la cantidad en la API 
        setItemsCarrito(prevItems =>
            prevItems.map(item =>
                item.producto.id === productoId ? { ...item, cantidad: nuevaCantidad } : item
            )
        ); // Actualiza el estado local del carrito con la nueva cantidad del item
    } catch (error) {
        console.error('No hay stock.');
    }
};

// Función para decrementar la cantidad de un item en el carrito
export const handleDecrementarItem = async (itemsCarrito, setItemsCarrito, productoId) => {
    const item = itemsCarrito.find(item => item.producto.id === productoId);
    if (item.cantidad > 1) {
        const nuevaCantidad = item.cantidad - 1;
        try {
            await actualizarItemCarrito(productoId, nuevaCantidad); // Actualiza la cantidad en la API
            setItemsCarrito(prevItems =>
                prevItems.map(item =>
                    item.producto.id === productoId ? { ...item, cantidad: nuevaCantidad } : item
                )
            ); // Actualiza el estado local del carrito
        } catch (error) {
            console.error('Error al actualizar la cantidad:', error);
        }
    }
};

// Función para eliminar un item del carrito 
export const handleEliminarItem = async (itemsCarrito, setItemsCarrito, productoId) => {
    try {
        await eliminarItemCarrito(productoId); // Elimina el item de la API por su id de producto (producto_id) 
        setItemsCarrito(prevItems => prevItems.filter(item => item.producto.id !== productoId)); // Actualiza el estado local del carrito eliminando el item eliminado de la API
    } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error);
    }
};

// Función para agregar un nuevo item al carrito o incrementar la cantidad si ya existe en el carrito
export const agregarItemAlCarrito = async (productoId, setItemsCarrito) => {
    try {
        const response = await axios.post(`${URL_API}añadir-carrito/`, { producto_id: productoId, cantidad: 1 }, obtenerHeadersAuth());
        const nuevoProducto = response.data;
        setItemsCarrito(prevItems => {
            const itemExistente = prevItems.find(item => item.producto.id === productoId);
            if (itemExistente) {
                return prevItems.map(item =>
                    item.producto.id === productoId ? { ...item, cantidad: item.cantidad + 1 } : item
                ); // Si el item ya existe, incrementa la cantidad
            } else {
                return [...prevItems, nuevoProducto]; // Si el item no existe, añádelo al carrito
            }
        });
    } catch (error) {
        console.error('Error al añadir el producto al carrito:', error);
    }
};
