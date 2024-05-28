import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return { headers: { 'Authorization': `Token ${token}` } };
};

export const fetchProductos = async () => {
    try {
        const response = await axios.get(`${API_URL}productos/`);
        return response; // No devolver solo response.data, sino todo el objeto de respuesta
    } catch (error) {
        console.error('Error fetching productos:', error);
        throw error;
    }
};

export const fetchCarrito = async () => {
    try {
        const response = await axios.get(`${API_URL}ver-carrito/`, getAuthHeaders());
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateCarritoItem = async (productoId, cantidad) => {
    try {
        await axios.patch(`${API_URL}actualizar-carrito/`, {
            producto_id: productoId,
            cantidad
        }, getAuthHeaders());
    } catch (error) {
        throw error;
    }
};

export const deleteCarritoItem = async (productoId) => {
    try {
        await axios.delete(`${API_URL}eliminar-carrito/${productoId}/`, getAuthHeaders());
    } catch (error) {
        throw error;
    }
};

export const añadirAlCarrito = async (productoId, setItemsCarrito) => {
    try {
        const response = await axios.post(`${API_URL}añadir-carrito/`, { producto_id: productoId, cantidad: 1 }, getAuthHeaders());
        setItemsCarrito(prevItems => [...prevItems, response.data]);
    } catch (error) {
        console.error('Error al añadir el producto al carrito:', error);
    }
};
