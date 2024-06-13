import axios from 'axios';

// URL base de la API
const URL_API = 'https://tfg-backend-production-5a6a.up.railway.app/api';

// Función para obtener los encabezados de autenticación usando el token almacenado en localStorage
const obtenerHeadersAuth = () => {
    const token = localStorage.getItem('token');
    return { headers: { 'Authorization': `Token ${token}` } };
};

// Función para obtener los detalles del usuario autenticado
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

// Función para actualizar la información del usuario autenticado
export const actualizarUsuario = async (datos) => {
    try {
        const respuesta = await axios.put(`${URL_API}/usuarios/detalles/`, datos, obtenerHeadersAuth());
        return respuesta.data;
    } catch (error) {
        throw error;
    }
};

// Función para eliminar la cuenta del usuario autenticado
export const eliminarUsuario = async () => {
    try {
        const respuesta = await axios.delete(`${URL_API}/usuarios/detalles/`, obtenerHeadersAuth());
        return respuesta.data;
    } catch (error) {
        throw error;
    }
};

// Función para obtener la lista de productos
export const obtenerProductos = async () => {
    try {
        const respuesta = await axios.get(`${URL_API}/productos/`);
        return respuesta.data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
};

// Función para realizar una búsqueda de productos
export const realizarBusqueda = async (consulta) => {
    try {
        const respuesta = await axios.get(`${URL_API}/search/?search=${consulta}`);
        return respuesta.data;
    } catch (error) {
        console.error('Error al buscar productos:', error);
        return { error: true, mensaje: 'Error al buscar productos' };
    }
};

// Función para obtener la lista de categorías de productos
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

// Función para obtener el carrito de compras del usuario autenticado
export const obtenerCarrito = async () => {
    try {
        const respuesta = await axios.get(`${URL_API}/ver-carrito/`, obtenerHeadersAuth());
        return respuesta.data;
    } catch (error) {
        throw error;
    }
};

// Función para actualizar la cantidad de un item en el carrito de compras
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

// Función para eliminar un item del carrito de compras
export const eliminarItemCarrito = async (productoId) => {
    try {
        await axios.delete(`${URL_API}/eliminar-carrito/${productoId}/`, obtenerHeadersAuth());
    } catch (error) {
        throw error;
    }
};

// Función para añadir un producto al carrito de compras
export const añadirAlCarrito = async (productoId, setItemsCarrito) => {
    try {
        const respuesta = await axios.post(`${URL_API}/añadir-carrito/`, { producto_id: productoId, cantidad: 1 }, obtenerHeadersAuth());
        setItemsCarrito(prevItems => [...prevItems, respuesta.data]);
    } catch (error) {
        console.error('Error al añadir el producto al carrito:', error);
    }
};

// Función para obtener los pedidos del usuario autenticado
export const obtenerPedidos = async () => {
    try {
        const respuesta = await axios.get(`${URL_API}/usuario/pedidos/`, obtenerHeadersAuth());
        return respuesta.data;
    } catch (error) {
        throw error;
    }
};

// Función para cancelar un pedido del usuario autenticado
export const cancelarPedido = async (pedidoId) => {
    try {
        const respuesta = await axios.patch(`${URL_API}/pedidos/${pedidoId}/cancelar/`, { estado_pedido: 'cancelado' }, obtenerHeadersAuth());        
        if (respuesta.status === 200) {
            // Pedido cancelado y stock restaurado correctamente
            console.log(respuesta.data.mensaje);
        } else {
            // Error al cancelar el pedido
            console.error(respuesta.data.error); 
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
};

// Función para realizar el pago de una compra comprobando el token de autenticación 
export const pagar = async (datos) => {
    try {
        const respuesta = await axios.post(`${URL_API}/pago/`, datos, obtenerHeadersAuth());
        return respuesta.data;
    } catch (error) {
        throw error;
    }
};
