import { fetchCarrito, updateCarritoItem, deleteCarritoItem } from '../apis/Api';

export const loadCarrito = async (setItemsCarrito, isLoggedIn) => {
    if (isLoggedIn) {
        try {
            const data = await fetchCarrito();
            setItemsCarrito(data.productos_carrito || []);
        } catch (error) {
            console.error('Error al cargar el carrito:', error);
        }
    }
};

export const handleIncrementItem = async (itemsCarrito, setItemsCarrito, productoId) => {
    const item = itemsCarrito.find(item => item.producto.id === productoId);
    const newCantidad = item.cantidad + 1;
    try {
        await updateCarritoItem(productoId, newCantidad);
        setItemsCarrito(prevItems =>
            prevItems.map(item =>
                item.producto.id === productoId ? { ...item, cantidad: newCantidad } : item
            )
        );
    } catch (error) {
        console.error('Error al actualizar la cantidad:', error);
    }
};

export const handleDecrementItem = async (itemsCarrito, setItemsCarrito, productoId) => {
    const item = itemsCarrito.find(item => item.producto.id === productoId);
    if (item.cantidad > 1) {
        const newCantidad = item.cantidad - 1;
        try {
            await updateCarritoItem(productoId, newCantidad);
            setItemsCarrito(prevItems =>
                prevItems.map(item =>
                    item.producto.id === productoId ? { ...item, cantidad: newCantidad } : item
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
