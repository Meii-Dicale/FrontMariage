import { Button, Container, Form } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import Authcontext from "../src/Context/Authcontext";
import InscriptionService from "../src/Services/InscriptionService";
import { useNavigate } from "react-router-dom";

const MonCompte = () => {
  const { user } = useContext(Authcontext);
  const [changeInfo, setChangeInfo] = useState(false);
  const [UserInfo, setUserInfo] = useState({});
  const [formData, setFormData] = useState({});
  const [phoneError, setPhoneError] = useState(''); 
  const navigate = useNavigate();

  // Récupérer les info utilisateur
  const fetchInformations = async () => {
    try {
      const response = await InscriptionService.UserInfo(user.IdUser);
      setUserInfo(response.data[0]);
      setFormData(response.data[0]); // Initialiser le formulaire
    } catch (error) {
      console.error("Erreur lors de la récupération des informations :", error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "TelUser") {
      if (/^\d*$/.test(value)) { // Vérifie si la saisie est uniquement composée de chiffres
        setFormData({ ...formData, [name]: value });
        setPhoneError(''); // Réinitialise le message d'erreur si la saisie est valide
      } else {
        setPhoneError('Veuillez saisir uniquement des chiffres.');
      }
    } else {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))}}

  const handleSaveChanges = async () => {
    try {
      const response = await InscriptionService.UpdateUserAPI(formData);
      setUserInfo(response.data); // Mettre à jour les données affichées
      setChangeInfo(false);

    } catch (error) {
      console.error("Erreur lors de la mise à jour des informations :", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await InscriptionService.DeleteUserAPI(user.IdUser);
      localStorage.removeItem("token"); // Supprimer le token de session
      navigate('/'); // Retour à la page de connexion
      
    } catch (error) {
      console.error("Erreur lors de la suppression du compte :", error);
    }
  };
  const handleNavigateBook = () => {
    navigate('/LivreDor');
  }
  const handleNavigateMedia = () => {
    navigate('/AjoutPhoto');
  }
  const handleNavigateFav = () => {
    navigate('/MesFavoris');
  }

  useEffect(() => {
    if (user) {
      fetchInformations();
    }
  }, [user, changeInfo]);
  

  return (
    <>
      <Container className="d-flex justify-content-center moncompte">
        {changeInfo ? (
          <div className="borneArcade col-6 d-flex flex-column align-items-center justify-content-center">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  name="NameUser"
                  value={formData.NameUser }
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="MailUser"
                  value={formData.MailUser }
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control
                  type="tel"
                  name="TelUser"
                  value={formData.TelUser }
                  onChange={handleInputChange}
                  id="TelUser"
                  required
                  maxLength={10}
                />
                
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Relation avec les mariés</Form.Label>
                <Form.Control
                  type="text"
                  name="RelationUser"
                  value={formData.RelationUser }
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button className="mt-3 ajoutBoutton" onClick={handleSaveChanges}>
                Sauvegarder
              </Button>
              <Button
                className="mt-3 ajoutBoutton"
                variant="secondary"
                onClick={() => setChangeInfo(false)}
              >
                Annuler
              </Button>
            </Form>
          </div>
        ) : (
          <div className="borneArcade col-6 d-flex flex-column align-items-center justify-content-center">
            <span>Player : {UserInfo.NameUser}</span>
            <span>Email : {UserInfo.MailUser}</span>
            <span>Téléphone : +33{UserInfo.TelUser}</span>
            <span>Relation avec les mariés : {UserInfo.RelationUser}</span>
            <Button
              className="mt-3 ajoutBoutton"
              onClick={() => setChangeInfo(true)}
            >
              Modifier mes informations
            </Button>
            <Button
              className="mt-2 ajoutBoutton"
              variant="danger"
              onClick={handleDeleteAccount}
            >
              Supprimer mon compte
            </Button>
          </div>
        )}

        <div className="d-flex flex-column align-items-center justify-content-center ">
          <div className="neon-sign d-flex mt-5 align-items-center justify-content-center">
            <span >Accès V.I.P <br />
            アクセス
            </span>
          </div>
          {user.RoleUser === 1 && (         <div className="secret-sign d-flex mt-2 align-items-center justify-content-center">
            <a className="secretlink" href="/secretPage"> Accès Secret
            
            </a>
          </div>)}
          <div className="bouttonPhoto d-flex flex-column">
            <Button className="mt-5 ajoutBoutton" onClick={handleNavigateMedia}>Ajouter mes photos</Button>
            <Button className="mt-5 ajoutBoutton" onClick={handleNavigateFav}>Mes photo préférés </Button>
            <Button className="mt-5 ajoutBoutton"onClick={handleNavigateBook}>Écrire dans le livre d'or</Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MonCompte;
