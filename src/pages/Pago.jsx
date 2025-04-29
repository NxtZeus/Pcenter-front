import { useState, useEffect } from 'react';
import { useCarrito } from '../components/carritoContext/CarritoContext';
import { obtenerUsuario, pagar } from '../components/apis/Api';
import { Link, useNavigate } from 'react-router-dom';
import TruncarTexto from '../components/truncarTexto/TruncarTexto';

const PasarelaPago = () => {
    // Estado del carrito de compras
    const { itemsCarrito, setItemsCarrito } = useCarrito();
    // Estado del usuario
    const [usuario, setUsuario] = useState({});
    // Estado del método de pago
    const [metodoPago, setMetodoPago] = useState('tarjeta_credito');
    // Estado del mensaje de éxito
    const [mensajeExito, setMensajeExito] = useState('');
    // Estados de los campos de la tarjeta de crédito
    const [numeroTarjeta, setNumeroTarjeta] = useState('');
    const [fechaExpiracion, setFechaExpiracion] = useState('');
    const [codigoCVV, setCodigoCVV] = useState('');
    // Estado para errores en la tarjeta de crédito
    const [errorTarjeta, setErrorTarjeta] = useState('');
    // Hook de navegación para redireccionar al usuario
    const navigate = useNavigate();
    // Estado para el ancho de la ventana
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    // Calcular el precio total del carrito
    const precioTotal = itemsCarrito.reduce((total, item) => total + parseFloat(item.producto.precio) * item.cantidad, 0);

    // Efecto para obtener datos del usuario y manejar el redimensionamiento de la ventana
    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const data = await obtenerUsuario(token); // Obtener datos del usuario usando el token
                    setUsuario(data); // Actualizar el estado del usuario
                }
            } catch (error) {
                console.error('Error al obtener los detalles del usuario:', error);
            }
        };

        fetchUsuario(); // Llamar a la función para obtener los datos del usuario

        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize); // Añadir event listener para cambios en el tamaño de la ventana
        return () => window.removeEventListener('resize', handleResize); // Limpiar el event listener cuando el componente se desmonte
    }, []);

    // Función para validar los datos de la tarjeta de crédito
    const validarTarjetaCredito = () => {
        const regexNumeroTarjeta = /^[0-9]{16}$/; // Regex para número de tarjeta (16 dígitos)
        const regexFechaExpiracion = /^(0[1-9]|1[0-2])\/[0-9]{2}$/; // Regex para fecha de expiración (MM/YY)
        const regexCVV = /^[0-9]{3,4}$/; // Regex para CVV (3-4 dígitos)

        return (
            regexNumeroTarjeta.test(numeroTarjeta) &&
            regexFechaExpiracion.test(fechaExpiracion) &&
            regexCVV.test(codigoCVV)
        );
    };

    // Función para manejar el pago
    const handlePago = async () => {
        if (metodoPago === 'tarjeta_credito' && !validarTarjetaCredito()) {
            setErrorTarjeta('Por favor, introduzca los datos correctos de la tarjeta.');
            return;
        }

        try {
            // Llamar a la API para procesar el pago con los datos del usuario y el carrito
            await pagar({
                direccion_envio: direccionFormateada(usuario),
                direccion_facturacion: direccionFormateada(usuario),
                metodo_pago: metodoPago,
                numero_tarjeta: metodoPago === 'tarjeta_credito' ? numeroTarjeta : null,
                fecha_expiracion: metodoPago === 'tarjeta_credito' ? fechaExpiracion : null,
                codigo_cvv: metodoPago === 'tarjeta_credito' ? codigoCVV : null,
                itemsCarrito
            });
            setItemsCarrito([]);
            setErrorTarjeta(null);
            setMensajeExito('Pedido realizado correctamente, será redirigido a su perfil en 5 segundos.');

            setTimeout(() => {
                navigate('/perfil');
            }, 5000);
        } catch (error) {
            alert('Hubo un problema al procesar el pago. Inténtalo de nuevo.');
        }
    };

    // Función para obtener la longitud máxima del texto a truncar según el ancho de la ventana
    const getMaxLength = (width) => {
        if (width < 1025) return 25;
        if (width < 1441) return 30;
        return 40;
    };

    // Obtener la URL de la imagen del producto o una imagen por defecto si no hay URL o es null o undefined
    const imagenUrl = (url) => {
        const URLbase = 'https://pcenter-back-production.up.railway.app';
        if (!url) {
            return `${URLbase}/default-image.jpg`; // Ruta de una imagen por defecto si url es undefined o null
        }
        else if (url.startsWith(URLbase)) {
            return url;
        }
        return `${URLbase}${url}`; // Ruta de la imagen si no es una URL completa
    };

    // Función para formatear la dirección del usuario en un solo string
    const direccionFormateada = (usuario) => {
        if (!usuario.direccion || !usuario.ciudad || !usuario.codigo_postal || !usuario.pais) return 'No disponible';
        return `${usuario.direccion}, ${usuario.ciudad}, ${usuario.codigo_postal}, ${usuario.pais}`;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-full bg-gray-100 py-12">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-8 md:mb-0">
                    <h2 className="text-3xl font-bold mb-6 text-custom-azul">Tramitar Pedido</h2>

                    {mensajeExito && (
                        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
                            {mensajeExito}
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Nombre:</label>
                        <p className="text-lg text-gray-900 mb-2">{`${usuario.first_name} ${usuario.last_name}`}</p>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Dirección de Envío:</label>
                        <p className="text-lg text-gray-900 mb-2">{direccionFormateada(usuario)}</p>
                        <Link to='/perfil' className="bg-custom-azul text-white px-4 py-2 rounded-md hover:bg-custom-naranja transition duration-300">
                            Modificar Dirección
                        </Link>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Dirección de Facturación:</label>
                        <p className="text-lg text-gray-900 mb-2">{direccionFormateada(usuario)}</p>
                        <Link to='/perfil' className="bg-custom-azul text-white px-4 py-2 rounded-md hover:bg-custom-naranja transition duration-300">
                            Modificar Facturación
                        </Link>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Método de Pago:</label>
                        <select
                            value={metodoPago}
                            onChange={(e) => setMetodoPago(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-custom-azul"
                        >
                            <option value="tarjeta_credito" selected>Tarjeta de Crédito</option>
                        </select>
                    </div>
                    {metodoPago === 'tarjeta_credito' && (
                        <div className="mt-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Número de Tarjeta:</label>
                            <input
                                type="text"
                                value={numeroTarjeta}
                                onChange={(e) => setNumeroTarjeta(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-custom-azul"
                                maxLength="16"
                                placeholder="1234 5678 9123 4567"
                            />
                            <label className="block text-gray-700 text-sm font-semibold mb-2 mt-4">Fecha de Expiración (MM/YY):</label>
                            <input
                                type="text"
                                value={fechaExpiracion}
                                onChange={(e) => setFechaExpiracion(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-custom-azul"
                                maxLength="5"
                                placeholder="MM/YY"
                            />
                            <label className="block text-gray-700 text-sm font-semibold mb-2 mt-4">Código CVV:</label>
                            <input
                                type="text"
                                value={codigoCVV}
                                onChange={(e) => setCodigoCVV(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-custom-azul"
                                maxLength="4"
                                placeholder="3-4 dígitos"
                            />
                            {errorTarjeta && (
                                <p className="text-red-500 text-sm mt-2">{errorTarjeta}</p>
                            )}
                        </div>
                    )}

                </div>
                <div className="w-full md:w-1/2 pl-0 md:pl-4">
                    <h2 className="text-3xl font-bold mb-6 text-custom-azul">Resumen del Carrito</h2>
                    <ul>
                        {itemsCarrito.map(item => (
                            <li key={item.id} className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 border-b">
                                <div className="flex items-center space-x-2 flex-1">
                                    <img src={imagenUrl(item.producto.imagenes[0]?.imagen)} alt={item.producto.nombre_producto} className="w-12 h-12 object-cover rounded-md" />
                                    <div className="flex-1">
                                        <p className="whitespace-normal md:whitespace-nowrap">
                                            <TruncarTexto text={item.producto.nombre_producto} maxLength={getMaxLength(windowWidth)} />
                                        </p>
                                        <p className="text-sm text-gray-600">{item.producto.precio}€ x {item.cantidad}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 text-right">
                        <p className="text-xl font-semibold">Total: {precioTotal.toFixed(2)}€</p>
                    </div>
                    <button
                        onClick={handlePago}
                        className="bg-custom-naranja text-white px-4 py-2 rounded-md w-full hover:bg-orange-500 transition duration-300 self-end mt-6"
                    >
                        Realizar Pago
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PasarelaPago;