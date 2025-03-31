// https://photobooth-app.org 
// https://photobooth-app.org/reference/api/

import { useContext, useEffect, useState, useRef } from "react";
import { GetPhotosAdminAPI, PushPrivateAPI } from "../src/Services/UploadPhotosService";
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
  import Connexion from "../Composant/ModuleConnexion";
  import FileSaver from 'file-saver';
  import axios from 'axios';
  import { useReactToPrint } from "react-to-print";
  import Favoris from "../src/Services/Favoris";
import GetAllPhotoboothAPI from "../src/Services/PhotoboothServices";
const PhotoBooth = () => {
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
    const [filter, setFilter] = useState(""); // État pour le filtre
    const [isFavorite, setIsFavorite] = useState(false);
    const [IdFavoris, setIdFavoris] = useState();

    const [showConnexionModal, setShowConnexionModal] = useState(false);

    const handleShowConnexion = () => setShowConnexionModal(true);
    const handleCloseConnexion = () => setShowConnexionModal(false);

    const [showLoginModal, setShowLoginModal] = useState(false);
    
  

   
   // IMPRESSION //

   const contentRef = useRef(null);
   const reactToPrint = useReactToPrint({contentRef})
   
   // téléchargement de la photo //
   
   const downloadImage = async (url) => {
   
    console.log(url)
     try {
         const response = await axios.get(url, { responseType: 'blob' });
         FileSaver.saveAs(response.data, `${selectedPhoto.original}`);
         
     } catch (error) {
         console.error("Erreur lors du téléchargement : ", error);
     }
   };
   const applyFilter = (filterType) => {
     setFilter(filterType);
   };

    // Gestion du modal
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
     
            if (response.status === 200) {
              fetchComments(); // Rafraîchir les commentaires après suppression
            } else {
              console.error("Erreur lors de la suppression du commentaire");
         
            }
          } catch (error) {
            
          }
      
        }
        
    useEffect(() => {
      fetchComments();
    }, [selectedPhoto]);
  
    const getPhotoURL = () => {
      return selectedPhoto
        ? `http://${import.meta.env.VITE_IPPHOTOBOOTH}/${selectedPhoto.original}`
        : "";
    };
    const PushPrivate = async (IdMedia) => {
      try {
        const response = await PushPrivateAPI(IdMedia)
        if (response.status === 200) {
          window.location.reload();
        } else {
          console.error("Erreur");
        }
        
      } catch (error) {
        
        console.error("Erreur : ", error);
      }
  
    }
  
    // Récupération des photos de la vm

    const fetchPhotos = async () => {
        try {
            const response = await GetAllPhotoboothAPI();
            console.log(response.data);
            setAllPhotos(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des photos :", error);
        }
    };
    useEffect(() => {
        fetchPhotos();
      }, []);

    if (!user.IdUser) {
        return (
            <>         
                <div className="d-flex whiteText justify-content-center align-items-center taille tailleMobile"> <span>Si tu veux retrouver les photos du photomaton, je t'invite à te <Link onClick={handleShow}> connecter</Link> </span></div>
                <Connexion show={showLoginModal} handleClose={handleClose} />

            </>
        )
    }
    return (
        <>
{AllPhotos.length >0 ?(
    
    <Container className="container-invite">
    <div className="photo-grid">
      {AllPhotos.map((photo, index) => (
        <img
          className="photo-thumbnail"
          key={index}
          src={`http://${import.meta.env.VITE_IPPHOTOBOOTH}/${photo.thumbnail}`}
          alt=""
          onClick={() => handleShow(photo)}
        />
      ))}
    </div>
  </Container>)

    :( <div className="d-flex whiteText justify-content-center align-items-center taille">Pas encore de photos ? Va vite au photomaton pour le tester ! </div>)}
       
       
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
                src={`http://192.168.0.92:8000/${selectedPhoto.original}`}
                alt=""
                style={{ filter }} // Appliquer le filtre
              />
          


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
    downloadImage(`http://192.168.1.92:8000/${selectedPhoto.original}`)}}>Télécharger une image</Button>

)}



                
          </div>
             
        </Modal.Title>
       
      </Modal>
       
        </>
    );
}


export default PhotoBooth;