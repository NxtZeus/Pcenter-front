import { useState, useEffect } from 'react';

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Cambiar cada 5 segundos

        return () => clearInterval(interval); // Limpiar intervalo en desmontaje del componente
    }, [images.length]);

    return (
        <div className="flex justify-center items-center w-full pt-4 lg:pt-12">
            <div className="relative overflow-hidden w-full max-w-screen-xl">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <div key={index} className="w-full flex-shrink-0 flex justify-center items-center">
                            <img src={image} alt={`Slide ${index}`} className="w-[1366px] h-[911px] object-cover" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
