import { useEffect, useState } from "react";
import { GetPrivatePhotoAPI } from "../src/Services/UploadPhotosService";
import { Container, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
const SecretPage = () => {

    const [AllPhotos, setAllPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [showModal, setShowModal] = useState(false);
  
    const fetchAllPhoto = async () => {
      try {
        const response = await GetPrivatePhotoAPI();
        setAllPhotos(response.data || []);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleShow = (photo) => {
      setSelectedPhoto(photo);
      setShowModal(true);
    };
  
    const handleClose = () => {
      setShowModal(false);
      setSelectedPhoto(null);
    };
  
    useEffect(() => {
      fetchAllPhoto();
    }, []);
  
    return (
      <>
        <Container className="container-invite">
          <div className="photo-grid">
            {AllPhotos.map((photo) => (
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
  
        {/* Modal */}
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            {selectedPhoto && (
              <Modal.Title>
                Photo prise par <Link>{selectedPhoto.NameUser}</Link> 
              </Modal.Title>
            )}
          </Modal.Header>
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
export default SecretPage