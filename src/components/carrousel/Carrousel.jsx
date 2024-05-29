import { useState, useEffect } from 'react';

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [images.length]);

    return (
        <div className="flex justify-center items-center w-full mt-4 lg:mt-12 xl:mx-4 md:mx-0">
            <div className="relative overflow-hidden h-auto w-full max-w-screen-xl">
                <div
                    className={`flex transition-transform duration-500`}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                            <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
