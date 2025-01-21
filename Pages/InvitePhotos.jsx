// https://www.npmjs.com/package/react-to-print

import React, { useContext, useEffect, useRef, useState } from "react";
import { GetPublicPhotosAPI, PushPrivateAPI } from "../src/Services/UploadPhotosService";
import { Button, Container, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from "react-router-dom";
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

import { useReactToPrint } from "react-to-print";
import FileSaver from 'file-saver';
import axios from 'axios';
import Connexion from "../Composant/ModuleConnexion";
import Favoris from "../src/Services/Favoris";

const PhotoInvite = () => {
  const { user } = useContext(Authcontext);
  const [AllPhotos, setAllPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState(""); // État pour le filtre
  const [data, setData] = useState({
    IdMedia: null,
    TextCommentaire: "",
    IdUser: user?.IdUser,
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [IdFavoris, setIdFavoris] = useState();
  const navigate = useNavigate()

  const [showConnexionModal, setShowConnexionModal] = useState(false);

    const handleShowConnexion = () => setShowConnexionModal(true);
    const handleCloseConnexion = () => setShowConnexionModal(false);

// IMPRESSION //

const contentRef = useRef(null);
const reactToPrint = useReactToPrint({contentRef})

// téléchargement de la photo //

const downloadImage = async (url) => {

  try {
      const response = await axios.get(url, { responseType: 'blob' });
      FileSaver.saveAs(response.data, `${selectedPhoto.PathMedia}`);
  } catch (error) {
      console.error("Erreur lors du téléchargement : ", error);
  }
};
  
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
    searchFavorites(photo); // Passez la photo directement
  };
  
  const searchFavorites = async (selectedPhoto) => {
    if (!selectedPhoto || !user) return; // Vérifie que les données nécessaires sont présentes
    try {
      const response = await Favoris.IsFavorisAPI(user.IdUser, selectedPhoto.IdMedia);
      console.log(response.data);
      if (response.data.length > 0) {
        setIdFavoris(response.data.IdFavoris);
        setIsFavorite(true);
        
      } else {
        setIsFavorite(false);
        
      }
    } catch (error) {
      console.error("Erreur lors de la recherche des favoris :", error);
    }
  };
  
  
  const handleAddFavorite = async () => {
    if (!selectedPhoto && !user) return; // Vérifiez que les données nécessaires sont présentes
    try {
      const response = await Favoris.AddFavorisAPI({
        IdMedia: selectedPhoto.IdMedia,
        IdUser: user.IdUser,
      });
      if (response.status) {
        console.log("Favoris :", response.data);
        setIsFavorite(true);
        setIdFavoris(response.data.IdFavoris); // Mettez à jour l'ID du favori
        searchFavorites(selectedPhoto)
        console.log(isFavorite);
        
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout aux favoris :", error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedPhoto(null);
    setComments([]);
    setFilter(""); // Réinitialiser le filtre à la fermeture du modal
  };

  const fetchComments = async () => {
    if (!selectedPhoto || !selectedPhoto.IdMedia) return;
    try {
      const response = await GetCommentaireAPI(selectedPhoto.IdMedia);
      setComments(response.data.sort((a, b) => a.IdCommentaire - b.IdCommentaire));
    } catch (error) {
      console.error(error);
    }
  };

  const addComment = async () => {
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

  const handleRemoveComment = async (IdCommentaire) => {
    try {
      const response = await DeleteCommentaireAPI(IdCommentaire);
      if (response.status === 200) {
        fetchComments(); // Rafraîchir les commentaires après suppression
      } else {
        console.error("Erreur lors de la suppression du commentaire");
      }
    } catch (error) {
      console.error("Erreur : ", error);
    }
  };

  const PushPrivate = async (IdMedia) => {
    try {
      const response = await PushPrivateAPI(IdMedia);
      if (response.status === 200) {
        window.location.reload();
      } else {
        console.error("Erreur");
      }
    } catch (error) {
      console.error("Erreur : ", error);
    }
  };

  const applyFilter = (filterType) => {
    setFilter(filterType);
  };

  const getPhotoURL = () => {
    return selectedPhoto
      ? `http://${import.meta.env.VITE_IP}:3001/api/Media/${selectedPhoto.PathMedia}`
      : "";
  };

  useEffect(() => {
    fetchAllPhoto();
  }, []);

  useEffect(() => {
    fetchComments();
  }, [selectedPhoto]);

  return (
    <>
      {AllPhotos.length > 0 ? (
        <Container className="container-invite">
          <div  className="photo-grid">
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
          Pas encore de photo ici ? &nbsp;<Link to="/Inscription">Inscris-toi</Link>&nbsp; et télécharge tes photos du mariage !
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
              ref={contentRef} 
                className="photo-large"
                src={`http://${import.meta.env.VITE_IP}:3001/api/Media/${selectedPhoto.PathMedia}`}
                alt=""
                style={{ filter }} // Appliquer le filtre
              />
            {user.IdUser ?  (<Button
  className={`favoris-btn ${isFavorite ? 'actived' : ''}`}
  onClick={handleAddFavorite}
>
  ❤️
</Button> ) : null}

              <div className="zone-commentaires">
              

                <div className="all-commentaires mt-3">
                  {comments.length > 0 ? (
                    comments.map((comment, index) => (
                      <div key={index} className="commentaire">
                        <div className="d-flex flex-row gap-3">
                          <strong>{comment.NameUser}:</strong> {comment.TextCommentaire}
                        </div>
                        {(comment.IdUser === user.IdUser || user.RoleUser === "1") && (
                          <button
                            type="button"
                            className="btn btn-danger btn-sm top-0 end-0"
                            onClick={() => handleRemoveComment(comment.IdCommentaire)}
                          >
                            X
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>Pas encore de commentaires.</p>
                  )}
                </div>

                {user.IdUser ? (
                  <Form className="mt-5" onSubmit={(e) => e.preventDefault()}>
                    <Form.Group>
                      <Form.Label>Laisser un commentaire</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Votre commentaire..."
                        value={data.TextCommentaire}
                        onChange={(e) => setData({ ...data, TextCommentaire: e.target.value })}
                        maxLength={250}
                      />
                    </Form.Group>
                    <Button onClick={addComment} className="mt-2">Envoyer</Button>
                

                    {user.RoleUser === 1 && (
                      <Button onClick={() => PushPrivate(selectedPhoto.IdMedia)}>Rendre Privé</Button>
                    )}
                  </Form>
                ) : (
                  <span> <span
                  style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={handleShowConnexion}
              >
                  connectez-vous
              </span> pour laisser un commentaire</span>
                )}
                            <Connexion show={showConnexionModal} handleClose={handleCloseConnexion} />

              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Title className="ModalColor2 icon-zone d-flex flex-column">
          <div className="d-flex ">
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
          </div>
          <div className="d-flex gap-3 flex-wrap">     
            <span> Ajouter un filtre :</span> 
                 <Button className="btn btn-pink" onClick={() => applyFilter("grayscale(100%)")}>Noir et blanc</Button>
                <Button className="btn btn-pink" onClick={() => applyFilter("sepia(100%)")}>Sepia</Button>
                <Button className="btn btn-pink" onClick={() => applyFilter("")}>Sans filtre</Button>
                <br/>
                <Button className="btn btn-pink"  onClick={()=> reactToPrint()}>Imprimer la photo</Button>
                {selectedPhoto && (

  
  <Button className="btn btn-pink" onClick={() => {
    downloadImage(`http://${import.meta.env.VITE_IP}:3001/api/Media/${selectedPhoto.PathMedia}`)}}>Télécharger une image</Button>

)}



                
          </div>
             
        </Modal.Title>
       
      </Modal>
    </>
  );
};

export default PhotoInvite;
