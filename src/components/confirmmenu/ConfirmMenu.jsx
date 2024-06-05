const ConfirmModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-11/12 md:w-1/3">
                <h2 className="text-2xl font-bold mb-4">Confirmar Eliminación</h2>
                <p className="mb-4">¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.</p>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="text-gray-700 bg-gray-300 px-4 py-2 rounded-md mr-2 hover:bg-gray-400 transition duration-300"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
