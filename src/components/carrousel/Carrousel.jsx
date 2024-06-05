import React, { useState } from 'react';

const Carrusel = ({ imagenes = [] }) => {
    const [indiceActivo, setIndiceActivo] = useState(0);

    const manejarPrevio = () => {
        setIndiceActivo((prevIndice) => (prevIndice === 0 ? imagenes.length - 1 : prevIndice - 1));
    };

    const manejarSiguiente = () => {
        setIndiceActivo((prevIndice) => (prevIndice === imagenes.length - 1 ? 0 : prevIndice + 1));
    };

    return (
        <div id="carrusel-default" className="relative w-full" data-carousel="slide">
            <div className="relative h-72 md:h-96 overflow-hidden rounded-lg">
                {imagenes.map((imagen, indice) => (
                    <div
                        key={indice}
                        className={`absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover ${
                            indice === indiceActivo ? 'block' : 'hidden'
                        } duration-700 ease-in-out`}
                        data-carousel-item
                    >
                        <img
                            src={imagen}
                            className="block w-full h-full object-contain"
                            alt={`Slide ${indice + 1}`}
                        />
                    </div>
                ))}
            </div>
            <div className="absolute flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                {imagenes.map((_, indice) => (
                    <button
                        key={indice}
                        type="button"
                        className={`w-3 h-3 rounded-full ${indice === indiceActivo ? 'bg-custom-azul' : 'bg-gray-300'}`}
                        aria-current={indice === indiceActivo}
                        aria-label={`Slide ${indice + 1}`}
                        onClick={() => setIndiceActivo(indice)}
                        data-carousel-slide-to={indice}
                    ></button>
                ))}
            </div>
            <button
                type="button"
                className="absolute top-0 left-0 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={manejarPrevio}
                data-carousel-prev
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg
                        className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                    </svg>
                    <span className="sr-only">Anterior</span>
                </span>
            </button>
            <button
                type="button"
                className="absolute top-0 right-0 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={manejarSiguiente}
                data-carousel-next
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg
                        className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                    </svg>
                    <span className="sr-only">Siguiente</span>
                </span>
            </button>
        </div>
    );
};

export default Carrusel;
