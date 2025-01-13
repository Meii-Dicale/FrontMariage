import { useContext, useEffect, useState } from "react";
import { GetPhotosAdminAPI } from "../src/Services/UploadPhotosService";
import { Button, Container, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import {
    FacebookShareButton,
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
  } from "react-share";
  import AjouterCommentaireAPI, { DeleteCommentaireAPI, GetCommentaireAPI } from "../src/Services/Commentaires";
  import Authcontext from "../src/Context/Authcontext";
  

const PhotographePage = () => {
    const { user } = useContext(Authcontext);
    const [AllPhotos, setAllPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [comments, setComments] = useState([]);
    const [data, setData] = useState({
      IdMedia: null,
      TextCommentaire: "",
      IdUser: user?.IdUser,
    });
    // Fonction pour récupérer les photos
    const PhotoAdmin = async () => {
        try {
            const response = await GetPhotosAdminAPI();
            setAllPhotos(response.data);
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

    const fetchComments = async () => {
        if (!selectedPhoto || !selectedPhoto.IdMedia) return;
        try {
          const response = await GetCommentaireAPI(selectedPhoto.IdMedia);
          setComments(response.data.sort((a, b) => a.IdCommentaire - b.IdCommentaire) );
        } catch (error) {
          console.error(error);
        }
      };
    
      const addComment = async () => {
        console.log(data)
        try {
          if (!data.IdMedia || !data.TextCommentaire.trim()) {
            alert("Veuillez sélectionner une photo et saisir un commentaire !");
            return;
          }
    
          const response = await AjouterCommentaireAPI(data);
          if (response.status === 200) {
            setData({ ...data, TextCommentaire: "" }); // Réinitialiser le champ après envoi
            fetchComments(); // Rafraîchir les commentaires après ajout
          } else {
            console.error("Erreur lors de l'ajout du commentaire");
          }
        } catch (error) {
          console.error("Erreur : ", error);
        }
      };
      const handleRemoveComment = async(IdCommentaire) => {
        try {
          const response = await DeleteCommentaireAPI(IdCommentaire)
          console.log(response)
          if (response.status === 200) {
            fetchComments(); // Rafraîchir les commentaires après suppression
          } else {
            console.error("Erreur lors de la suppression du commentaire");
            console.log(IdCommentaire)
          }
        } catch (error) {
          
        }
    
      }
      
  useEffect(() => {
    fetchComments();
  }, [selectedPhoto]);

  const getPhotoURL = () => {
    return selectedPhoto
      ? `http://${import.meta.env.VITE_IP}:3001/api/Media/${selectedPhoto.PathMedia}`
      : "";
  };
    

  return (
    <>
      {AllPhotos.length > 0 ? (
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
      ) : (
        <span className="d-flex whiteText justify-content-center align-items-center taille">
          Pas encore de photo ici ? Inscris-toi et télécharge tes photos du mariage !
        </span>
      )}

      <Modal show={showModal} onHide={handleClose} dialogClassName="modal-90w" centered>
        <Modal.Header className="ModalColor2 icon-zone" closeButton>
          {selectedPhoto && (
            <Modal.Title className="icon-zone">
              Photo prise par <Link to={`/photo/${selectedPhoto.IdUser}`}>{selectedPhoto.NameUser}</Link>
            </Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body className="ModalColor">
          {selectedPhoto && (
            <div className="photo-commentaires">
              <img
                className="photo-large"
                src={`http://${import.meta.env.VITE_IP}:3001/api/Media/${selectedPhoto.PathMedia}`}
                alt=""
              />
              <div className="zone-commentaires">
                <div className="all-commentaires">
                  {comments.length > 0 ? (
                    comments.map((comment, index) => (
                      <div key={index} className="commentaire">
                        <div className="d-flex flex-row gap-3">
                        <strong>{comment.NameUser}:</strong> {comment.TextCommentaire}
                        </div>
                        {comment.IdUser === user.IdUser ? (   <button
                                    type="button"
                                    className="btn btn-danger btn-sm top-0 end-0"
                                    onClick={() => handleRemoveComment(comment.IdCommentaire)}
                                >X</button>): null}
                      </div>
                    ))
                  ) : (
                    <p>Pas encore de commentaires.</p>
                  )}
                </div>
                {!user.IdUser ? (<span>Connectez-vous pour laisser un commentaire</span>) : (<Form className="mt-5"onSubmit={(e) => e.preventDefault()}>
                  <Form.Group >
                    <Form.Label>Laisser un commentaire</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Votre commentaire..."
                      value={data.TextCommentaire}
                      onChange={(e) => setData({ ...data, TextCommentaire: e.target.value })}
                      maxLength={250}
                    />
                  </Form.Group>
                  <Button onClick={addComment} className="mt-2">
                    Envoyer
                  </Button>
                </Form>)}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Title className="ModalColor2 icon-zone">
          Partagez cette photo :
          <FacebookShareButton url={getPhotoURL()}>
            <FacebookIcon className="icon" />
          </FacebookShareButton>
          <FacebookMessengerShareButton url={getPhotoURL()}>
            <FacebookMessengerIcon className="icon" />
          </FacebookMessengerShareButton>
          <TwitterShareButton url={getPhotoURL()}>
            <TwitterIcon className="icon" />
          </TwitterShareButton>
          <WhatsappShareButton url={getPhotoURL()}>
            <WhatsappIcon className="icon" />
          </WhatsappShareButton>
        </Modal.Title>
      </Modal>
    </>
  );
};

export default PhotographePage;
