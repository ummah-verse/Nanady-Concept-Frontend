import { useState, useEffect } from 'react';

const images = [
    "https://ik.imagekit.io/eoeykxtr4/AloBro%20-%20Google%20Chrome%2030_10_2024%2018_24_29.png?updatedAt=1730287646656",
    "https://ik.imagekit.io/eoeykxtr4/AloBro%20-%20Google%20Chrome%2030_10_2024%2018_09_08.png?updatedAt=1730287603557",
    "https://ik.imagekit.io/eoeykxtr4/AloBro%20-%20Google%20Chrome%2030_10_2024%2018_09_27.png?updatedAt=1730287603806", 
    "https://ik.imagekit.io/eoeykxtr4/AloBro%20-%20Google%20Chrome%2030_10_2024%2018_08_59.png?updatedAt=1730287603488"
];

const ImageCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Set up an interval to update the index every 2 seconds
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="pt-0 relative w-full overflow-hidden">
            <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex}`}
                className="block w-full object-contain h-[500px] transition-opacity duration-500 opacity-90 shadow-md"
                style={{ boxShadow: '4px 4px 15px rgba(0, 0, 0, 0.2)' }}
            />

        </div>


    );
};

export default ImageCarousel;
