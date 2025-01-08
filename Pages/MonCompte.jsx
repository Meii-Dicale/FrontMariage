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
  const navigate = useNavigate();

  // Récupérer les info utilisateur
  const fetchInformations = async () => {
    try {
      const response = await InscriptionService.UserInfo(user.IdUser);
      setUserInfo(response.data[0]);
      setFormData(response.data[0]); // Initialiser le formulaire
      console.log(response.data[0]);
    } catch (error) {
      console.error("Erreur lors de la récupération des informations :", error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await InscriptionService.UpdateUserAPI(formData);
      console.log("Informations mises à jour :", response.data);
      setUserInfo(response.data); // Mettre à jour les données affichées
      setChangeInfo(false);

    } catch (error) {
      console.error("Erreur lors de la mise à jour des informations :", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await InscriptionService.DeleteUserAPI(user.IdUser);
      console.log(response);
      localStorage.removeItem("token"); // Supprimer le token de session
      navigate('/'); // Retour à la page de connexion
      
    } catch (error) {
      console.error("Erreur lors de la suppression du compte :", error);
    }
  };
  const handleNavigateBook = () => {
    navigate('/LivreDor');
  }

  useEffect(() => {
    if (user) {
      fetchInformations();
    }
  }, [user, changeInfo]);
  

//   if (!user || !UserInfo.NameUser) {
//     return <div>Chargement...</div>;
//   }
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
            <span>Accès V.I.P</span>
          </div>
          <div className="bouttonPhoto d-flex flex-column">
            <Button className="mt-5 ajoutBoutton" >Ajouter mes photos</Button>
            <Button className="mt-5 ajoutBoutton"onClick={handleNavigateBook}>Écrire dans le livre d'or</Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MonCompte;
