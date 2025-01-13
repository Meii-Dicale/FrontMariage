import { useEffect, useState } from "react";
import { GetPublicPhotosAPI } from "../src/Services/UploadPhotosService";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FacebookShareButton, FacebookIcon, FacebookMessengerIcon, FacebookMessengerShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton} from "react-share";

const PhotoInvite = () => {
  const [AllPhotos, setAllPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchAllPhoto = async () => {
    try {
      const response = await GetPublicPhotosAPI();
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

  // pour partager sur les réseaux il faut une URL 

  const getPhotoURL = () => {
    return selectedPhoto
      ? `http://${import.meta.env.VITE_IP}:3001/api/Media/${selectedPhoto.PathMedia}`
      : "";
  };

  return (
    <>
    {AllPhotos.length >0 ? ( <Container className="container-invite">
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
      </Container>) : ( <span className="d-flex whiteText justify-content-center align-items-center taille">
                    Pas encore de photo ici ? Inscris-toi et télécharge tes photos du mariage !
                </span>)}
     

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header className="ModalColor2 icon-zone" closeButton>
   
          {selectedPhoto && (
            <Modal.Title  className=" icon-zone" >
              Photo prise par <Link>{selectedPhoto.NameUser}</Link> 

            </Modal.Title>
          )}
          </Modal.Header>
        <Modal.Body className="ModalColor">
          {selectedPhoto && (
            <div className="photo-commentaires"><img
              className="photo-large"
              src={`http://${import.meta.env.VITE_IP}:3001/api/Media/${selectedPhoto.PathMedia}`}
              alt=""
            />
            <div className="zone-commentaires">
              <div className="all-commentaires"></div>
              <Form>
            <label> Laisser un commentaire </label>
            <input type="text" />
            <Button>Envoyer</Button>
            </Form>
            </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Title className="ModalColor2 icon-zone">
          Partagez cette photo :

        <FacebookShareButton url={getPhotoURL()}> <FacebookIcon className="icon"/></FacebookShareButton>
        <FacebookMessengerShareButton url={getPhotoURL()}> <FacebookMessengerIcon className="icon"/> </FacebookMessengerShareButton>
        <TwitterShareButton url={getPhotoURL()}> <TwitterIcon className="icon"/> </TwitterShareButton>
        <WhatsappShareButton url={getPhotoURL()}> <WhatsappIcon className="icon" /> </WhatsappShareButton>
      
            </Modal.Title>
      </Modal>
    </>
  );
};

export default PhotoInvite;
