import { useState } from "react";
import { Button, Container, InputGroup, Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import InscriptionService from "../src/Services/InscriptionService";

const Inscription = () => {
  const [errorMessage, setErrorMessage] = useState(''); // message d'erreur
  const navigate = useNavigate();

    const [User, setUser] = useState({
      NameUser:'',
      TelUser: '',
      MailUser: '',
      RelationUser:'',
      PasswordUser: '',
      ConfirmPasswordUser: ''
    
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...User, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (User.PasswordUser!== User.ConfirmPasswordUser) {
          setErrorMessage('Les mots de passe ne sont pas identiques');
          return;
        }
        InscriptionService.InscriptionAPI(User);
        navigate('/');
      };
    
      return (
        <form onSubmit={handleSubmit} className="container mt-4 whiteText">
          <div className="mb-3">
            <label  className="form-label">Nom / Prénom ou Surnom</label>
            <input
              type="text"
              className="form-control"
              id="NameUser"
              name="NameUser"
              value={User.NameUser}
              onChange={handleChange}
              required
            />
          </div>
    
          <div className="mb-3">
            <label className="form-label">Téléphone</label>
            <input
              type="tel"
              className="form-control"
              id="TelUser"
              name="TelUser"
              value={User.TelUser}
              onChange={handleChange}
              required
            />
          </div>
    
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="MailUser"
              name="MailUser"
              value={User.MailUser}
              onChange={handleChange}
              required
            />
          </div>
    
          <div className="mb-3">
            <label className="form-label">Quelle est votre relation avec les mariés ?</label>
            <input
              type="text"
              className="form-control"
              id="RelationUser"
              name="RelationUser"
              value={User.RelationUser}
              onChange={handleChange}
              placeholder="Je suis ton père ..."
              required
            />
          </div>
    
          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              id="PasswordUser"
              name="PasswordUser"
              value={User.PasswordUser}
              onChange={handleChange}
              required
            />
          </div>
    
          <div className="mb-3">
            <label className="form-label">Confirmez le mot de passe</label>
            <input
              type="password"
              className="form-control"
              id="ConfirmPasswordUser"
              name="ConfirmPasswordUser"
              value={User.ConfirmPasswordUser}
              onChange={handleChange}
              required
            />
          </div>
    
          <button type="submit" className="btn btn-primary">Envoyer</button>
        </form>
      );
    };
    
export default Inscription;