const ModalConfirmacion = ({ mostrar, onCerrar, onConfirmar }) => {
    // Si no se debe mostrar el modal, retorna null
    if (!mostrar) return null;

    return (
        // Contenedor del modal
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {/* Contenido del modal */}
            <div className="bg-white p-6 rounded-lg shadow-md w-11/12 md:w-1/3">
                {/* Título del modal */}
                <h2 className="text-2xl font-bold mb-4">Confirmar Eliminación</h2>
                {/* Mensaje de confirmación */}
                <p className="mb-4">¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.</p>
                {/* Botones de acción */}
                <div className="flex justify-end">
                    {/* Botón para cerrar el modal */}
                    <button
                        onClick={onCerrar}
                        className="text-gray-700 bg-gray-300 px-4 py-2 rounded-md mr-2 hover:bg-gray-400 transition duration-300"
                    >
                        Cancelar
                    </button>
                    {/* Botón para confirmar la acción */}
                    <button
                        onClick={onConfirmar}
                        className="text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmacion;
