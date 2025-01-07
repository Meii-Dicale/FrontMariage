import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ConnexionAPI from '../src/Services/ConnexionService';

function Connexion({ show, handleClose }) {
    const navigate = useNavigate();
    const [User, setUser] = useState({
        MailUser: '',
        PasswordUser: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...User, [name]: value });
    };

    const handleSubmit = async (e)  => {
        e.preventDefault();

      await  ConnexionAPI(User)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('token', response.data.token);
                handleClose();
                if (response) {
                    navigate('/MonCompte'); 
                }
                
            })
            .catch((error) => {
                console.error('Erreur lors de la connexion:', error);
                alert(' Veuillez vérifier vos identifiants.');
            });
            
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Connexion</Modal.Title>
            </Modal.Header>

            <Modal.Body className="ModalColor">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Adresse Mail</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Exemple : chamalow@rose.fr"
                            name="MailUser" // Ajout du nom
                            value={User.MailUser}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Mot de Passe</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Votre mot de passe"
                            name="PasswordUser" // Ajout du nom
                            value={User.PasswordUser}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <div className="d-flex align-items-center flex-column">
                        <Button variant="primary" type="submit">
                            Se connecter
                        </Button>
                        <br />
                        <Link to="/Inscription" onClick={handleClose}>
                            Je n'ai pas encore de compte
                        </Link>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default Connexion;
