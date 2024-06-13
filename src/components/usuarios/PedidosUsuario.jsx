import { cancelarPedido } from '../apis/Api';

const PedidosUsuario = ({ pedidos, setPedidos }) => {
    // Función para manejar la cancelación de un pedido por parte del usuario y actualizar el estado de los pedidos en la base de datos y en la interfaz de usuario
    const manejarCancelar = async (pedidoId) => {
        try {
            await cancelarPedido(pedidoId); // Llama a la API para cancelar el pedido con el ID especificado en la base de datos del servidor y espera a que la operación se complete con éxito antes de continuar con la siguiente instrucción
            setPedidos((prevPedidos) =>
                prevPedidos.map((pedido) =>
                    pedido.id === pedidoId ? { ...pedido, estado_pedido: 'cancelado' } : pedido
                )
            ); // Actualiza el estado de los pedidos para reflejar la cancelación del pedido con el ID especificado en la lista de pedidos del usuario en la interfaz de usuario
        } catch (error) {
            console.error('Error al cancelar el pedido:', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Pedidos</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-center">ID</th>
                        <th className="py-2 px-4 border-b text-center">Fecha</th>
                        <th className="py-2 px-4 border-b text-center">Precio Total</th>
                        <th className="py-2 px-4 border-b text-center">Estado</th>
                        <th className="py-2 px-4 border-b text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map((pedido) => (
                        <tr key={pedido.id}>
                            <td className="py-2 px-4 border-b text-center">{pedido.id}</td>
                            <td className="py-2 px-4 border-b text-center">
                                {/* Mapear los detalles de los productos para traer el nombre y el precio de cada uno con la cantidad */}
                                {pedido.detalles && Array.isArray(pedido.detalles) > 0 ? (
                                    pedido.detalles.map((detalle) => (
                                        <div key={detalle.id}>
                                            <p>{detalle.producto.nombre_producto}</p>
                                            <p>{detalle.precio_unidad}€ x {detalle.cantidad}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No hay detalles disponibles</p> // Placeholder if no details
                                )}
                            </td>
                            <td className="py-2 px-4 border-b text-center">{pedido.fecha_pedido}</td>
                            <td className="py-2 px-4 border-b text-center">{pedido.precio_total}</td>
                            <td className="py-2 px-4 border-b text-center">{pedido.estado_pedido}</td>
                            <td className="py-2 px-4 border-b text-center">
                                {pedido.estado_pedido !== 'enviado' && pedido.estado_pedido !== 'entregado' && pedido.estado_pedido !== 'cancelado' && pedido.estado_pedido !== 'procesado' && (
                                    <button
                                        onClick={() => manejarCancelar(pedido.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
                                    >
                                        Cancelar
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PedidosUsuario;
