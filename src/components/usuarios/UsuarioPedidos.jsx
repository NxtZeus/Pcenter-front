import React from 'react';
import { cancelarPedido } from '../apis/Api';

const UsuarioPedidos = ({ pedidos, setPedidos }) => {
    const handleCancelar = async (pedidoId) => {
        try {
            await cancelarPedido(pedidoId);
            setPedidos((prevPedidos) =>
                prevPedidos.map((pedido) =>
                    pedido.id === pedidoId ? { ...pedido, estado_pedido: 'cancelado' } : pedido
                )
            );
        } catch (error) {
            console.error('Error al cancelar el pedido:', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Pedidos</h2>
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
                            <td className="py-2 px-4 border-b text-center">{pedido.fecha_pedido}</td>
                            <td className="py-2 px-4 border-b text-center">{pedido.precio_total}</td>
                            <td className="py-2 px-4 border-b text-center">{pedido.estado_pedido}</td>
                            <td className="py-2 px-4 border-b text-center">
                                {pedido.estado_pedido !== 'enviado' && pedido.estado_pedido !== 'entregado' && pedido.estado_pedido !== 'cancelado' && (
                                    <button
                                        onClick={() => handleCancelar(pedido.id)}
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

export default UsuarioPedidos;
