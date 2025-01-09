import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from 'react';
import { GetPublicPhotosAPI } from '../src/Services/UploadPhotosService';

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

    // Fetch les photos publics
    useEffect(() => {
        const fetchPublicPhotos = async () => {
            try {
                const response = await GetPublicPhotosAPI();
                const shuffledPhotos = shuffleArray(response.data || []);
                setPhotos(shuffledPhotos);
            } catch (error) {
                setError('Failed to fetch photos');
                console.error(error);
            }
        };

        fetchPublicPhotos();
    }, []); // Le tableau vide signifie que cela s'exécute uniquement au montage

    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}
            <Carousel interval={3000} className='mt-5'>
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
