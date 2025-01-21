import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Connexion from './ModuleConnexion';
import { useContext, useState } from 'react';
import Authcontext from '../src/Context/Authcontext';
import AuthServices from '../src/Services/AuthServices';
import { Link } from 'react-router-dom'; // Import de Link

const NavBar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const user = useContext(Authcontext).user;

  const handleClose = () => setShowLoginModal(false);
  const handleShow = () => setShowLoginModal(true);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary textNeon transparenceNav mobile-nav">
        <Container>
        <Navbar.Brand className='whiteText' href="/">Lorelei & Thomas - 13 Juin 2026</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto gap-5 mobile-nav">
              <Link className="nav-link" to="/Photographe">Photographe</Link>
              <Link className="nav-link" to="/Photobooth">PhotoBooth</Link>
              <Link className="nav-link" to="/InvitePhotos">Invités</Link>
              {user && user.IdUser ? (
                <div className='d-flex logout'>
                  <Link className="nav-link" to="/MonCompte">Mon Compte</Link>
                  <span className='nav-link sizeascii' onClick={AuthServices.logout}>⏼</span>
                </div>
              ) : (
                <span className="nav-link" onClick={handleShow}>Connexion</span>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Connexion show={showLoginModal} handleClose={handleClose} />
    </>
  );
};

export default NavBar;
