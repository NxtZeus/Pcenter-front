import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return { headers: { 'Authorization': `Token ${token}` } };
};

export const fetchCarrito = async () => {
    try {
        const response = await axios.get(`${API_URL}ver_carrito/`, getAuthHeaders());
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateCarritoItem = async (productoId, cantidad) => {
    try {
        await axios.patch(`${API_URL}actualizar_carrito/`, {
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
