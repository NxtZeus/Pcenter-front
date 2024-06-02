import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // Corrige la URL base eliminando la barra al final

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return { headers: { 'Authorization': `Token ${token}` } };
};

export const getUsuario = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/usuarios/detalles/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchProductos = async () => {
    try {
        const response = await axios.get(`${API_URL}/productos/`);
        return response.data; // Devolver solo response.data
    } catch (error) {
        console.error('Error fetching productos:', error);
        throw error;
    }
};

export const handleSearch = async (query) => {
    try {
        const response = await axios.get(`${API_URL}/search/?search=${query}`);
        return response.data;
    } catch (error) {
        console.error('Error al buscar productos:', error);
        return { error: true, message: 'Error al buscar productos' };
    }
};

export const fetchCategorias = async () => {
    try {
        const response = await axios.get(`${API_URL}/categorias/`);
        return response.data.map(categoria => {
            switch (categoria) {
                case 'ordenadores':
                    return 'Ordenadores';
                case 'portatiles':
                    return 'Portátiles';
                case 'moviles':
                    return 'Móviles';
                case 'perifericos':
                    return 'Periféricos';
                case 'componentes':
                    return 'Componentes';
                case 'accesorios':
                    return 'Accesorios';
                default:
                    return categoria;
            }
        });
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        throw error;
    }
};

export const fetchCarrito = async () => {
    try {
        const response = await axios.get(`${API_URL}/ver-carrito/`, getAuthHeaders());
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateCarritoItem = async (productoId, cantidad) => {
    try {
        await axios.patch(`${API_URL}/actualizar-carrito/`, {
            producto_id: productoId,
            cantidad
        }, getAuthHeaders());
    } catch (error) {
        throw error;
    }
};

export const deleteCarritoItem = async (productoId) => {
    try {
        await axios.delete(`${API_URL}/eliminar-carrito/${productoId}/`, getAuthHeaders());
    } catch (error) {
        throw error;
    }
};

export const añadirAlCarrito = async (productoId, setItemsCarrito) => {
    try {
        const response = await axios.post(`${API_URL}/añadir-carrito/`, { producto_id: productoId, cantidad: 1 }, getAuthHeaders());
        setItemsCarrito(prevItems => [...prevItems, response.data]);
    } catch (error) {
        console.error('Error al añadir el producto al carrito:', error);
    }
};
