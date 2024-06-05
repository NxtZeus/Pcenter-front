import axios from 'axios';

const URL_API = 'http://127.0.0.1:8000/api';

const obtenerHeadersAuth = () => {
    const token = localStorage.getItem('token');
    return { headers: { 'Authorization': `Token ${token}` } };
};

export const obtenerUsuario = async (token) => {
    try {
        const respuesta = await axios.get(`${URL_API}/usuarios/detalles/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return respuesta.data;
    } catch (error) {
        throw error;
    }
};

export const actualizarUsuario = async (datos) => {
    try {
        const respuesta = await axios.put(`${URL_API}/usuarios/detalles/`, datos, obtenerHeadersAuth());
        return respuesta.data;
    } catch (error) {
        throw error;
    }
};

export const eliminarUsuario = async () => {
    try {
        const respuesta = await axios.delete(`${URL_API}/usuarios/detalles/`, obtenerHeadersAuth());
        return respuesta.data;
    } catch (error) {
        throw error;
    }
};

export const obtenerProductos = async () => {
    try {
        const respuesta = await axios.get(`${URL_API}/productos/`);
        return respuesta.data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
};

export const realizarBusqueda = async (consulta) => {
    try {
        const respuesta = await axios.get(`${URL_API}/search/?search=${consulta}`);
        return respuesta.data;
    } catch (error) {
        console.error('Error al buscar productos:', error);
        return { error: true, mensaje: 'Error al buscar productos' };
    }
};

export const obtenerCategorias = async () => {
    try {
        const respuesta = await axios.get(`${URL_API}/categorias/`);
        return respuesta.data.map(categoria => {
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

export const obtenerCarrito = async () => {
    try {
        const respuesta = await axios.get(`${URL_API}/ver-carrito/`, obtenerHeadersAuth());
        return respuesta.data;
    } catch (error) {
        throw error;
    }
};

export const actualizarItemCarrito = async (productoId, cantidad) => {
    try {
        await axios.patch(`${URL_API}/actualizar-carrito/`, {
            producto_id: productoId,
            cantidad
        }, obtenerHeadersAuth());
    } catch (error) {
        throw error;
    }
};

export const eliminarItemCarrito = async (productoId) => {
    try {
        await axios.delete(`${URL_API}/eliminar-carrito/${productoId}/`, obtenerHeadersAuth());
    } catch (error) {
        throw error;
    }
};

export const añadirAlCarrito = async (productoId, setItemsCarrito) => {
    try {
        const respuesta = await axios.post(`${URL_API}/añadir-carrito/`, { producto_id: productoId, cantidad: 1 }, obtenerHeadersAuth());
        setItemsCarrito(prevItems => [...prevItems, respuesta.data]);
    } catch (error) {
        console.error('Error al añadir el producto al carrito:', error);
    }
};

export const obtenerPedidos = async () => {
    try {
        const respuesta = await axios.get(`${URL_API}/usuario/pedidos/`, obtenerHeadersAuth());
        return respuesta.data;
    } catch (error) {
        throw error;
    }
};

export const cancelarPedido = async (pedidoId) => {
    try {
        const respuesta = await axios.patch(`${URL_API}/pedidos/${pedidoId}/`, { estado_pedido: 'cancelado' }, obtenerHeadersAuth());
        return respuesta.data;
    } catch (error) {
        throw error;
    }
};

export const pagar = async (datos) => {
    try {
        const respuesta = await axios.post(`${URL_API}/pago/`, datos, obtenerHeadersAuth());
        return respuesta.data;
    } catch (error) {
        throw error;
    }
};
