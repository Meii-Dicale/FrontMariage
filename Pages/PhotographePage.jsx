import { useEffect, useState } from "react";
import { GetPhotosAdminAPI } from "../src/Services/UploadPhotosService";
import { Container, Modal } from "react-bootstrap";

const PhotographePage = () => {
    const [photos, setPhotos] = useState([]); // Initialise un tableau vide pour les photos
    const [showModal, setShowModal] = useState(false); // État pour contrôler l'affichage du modal
    const [selectedPhoto, setSelectedPhoto] = useState(null); // Photo sélectionnée pour le modal

    // Fonction pour récupérer les photos
    const PhotoAdmin = async () => {
        try {
            const response = await GetPhotosAdminAPI();
            setPhotos(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des photos :", error);
        }
    };

    // Appelle la fonction PhotoAdmin() au démarrage
    useEffect(() => {
        PhotoAdmin();
    }, []);

    // Gestion du modal
    const handleShow = (photo) => {
        setSelectedPhoto(photo);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedPhoto(null);
    };

    return (
        <>
            {photos.length > 0 ? (
                <Container className="container-invite">
                    <div className="photo-grid">
                        {photos.map((photo) => (
                            <img
                                className="photo-thumbnail"
                                key={photo.IdMedia}
                                src={`http://${import.meta.env.VITE_IP}:3001/api/Media/${photo.PathMedia}`}
                                alt=""
                                onClick={() => handleShow(photo)}
                            />
                        ))}
                    </div>
                </Container>
            ) : (
                <span className="d-flex whiteText justify-content-center align-items-center taille">
                    Encore un peu de patience, les photos arrivent bientôt !
                </span>
            )}

            {/* Modal */}
            <Modal show={showModal} onHide={handleClose} centered>
    
                <Modal.Body>
                    {selectedPhoto && (
                        <img
                            className="photo-large"
                            src={`http://${import.meta.env.VITE_IP}:3001/api/Media/${selectedPhoto.PathMedia}`}
                            alt=""
                        />
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default PhotographePage;
