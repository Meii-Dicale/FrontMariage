import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect, useRef } from 'react';
import { GetAllPublicPhotosAPI, GetPublicPhotosAPI } from '../src/Services/UploadPhotosService';

// Fonction pour mélanger un tableau
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const HomePage = () => {
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState(null);
    const carouselRef = useRef(null); // Référence pour le carousel

    // Fetch les photos publiques
    useEffect(() => {
        const fetchPublicPhotos = async () => {
            try {
                const response = await GetAllPublicPhotosAPI();
                const shuffledPhotos = shuffleArray(response.data);
                setPhotos(shuffledPhotos);
            } catch (error) {
                setError('Failed to fetch photos');
                console.error(error);
            }
        };

        fetchPublicPhotos();
    }, []);

    // Contrôler le carousel avec les flèches du clavier
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (carouselRef.current) {
                if (event.key === 'ArrowLeft') {
                    carouselRef.current.prev(); // Défiler vers la gauche
                } else if (event.key === 'ArrowRight') {
                    carouselRef.current.next(); // Défiler vers la droite
                }
            }
        };

        // Ajouter l'écouteur d'événements
        window.addEventListener('keydown', handleKeyDown);

        // Nettoyer l'écouteur d'événements à la désactivation du composant
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            <Carousel 
                ref={carouselRef}
                interval={3000} // 3 secondes entre les défilements
                pause={false}
                indicators={false} // Supprime les indicateurs
                className="mt-5">
                {photos.map((photo, index) => (
                    <Carousel.Item key={index}>
                        <img
                            src={`http://${import.meta.env.VITE_IP}:3001/api/Media/${photo.PathMedia}`}
                            alt={`Photo ${index + 1}`}
                            className="d-block carousel-photo"
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
};

export default HomePage;
