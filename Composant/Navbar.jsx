import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Connexion from './ModuleConnexion';
import { useContext, useState } from 'react';
import Authcontext from '../src/Context/Authcontext';
import AuthServices from '../src/Services/AuthServices';

const NavBar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const user = useContext(Authcontext).user;

  const handleClose = () => setShowLoginModal(false);
  const handleShow = () => setShowLoginModal(true);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary textNeon transparenceNav">
        <Container>
          <Navbar.Brand href="/">Lorelei & Thomas - 13 Juin 2026</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto gap-5">
              <Nav.Link  href="#Photographe">Photographe</Nav.Link>
              <Nav.Link href="#Photobooth">PhotoBooth</Nav.Link>
              <Nav.Link href="#Guest">Invités</Nav.Link>
              {user && user.IdUser ?(
                <div className='d-flex logout'>
                <Nav.Link href="/MonCompte">Mon Compte</Nav.Link>
                <Nav.Link className='sizeascii' onClick={AuthServices.logout}>⏼</Nav.Link>
                </div>
                 ) : (<Nav.Link onClick={handleShow}>Connexion</Nav.Link>)}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Connexion show={showLoginModal} handleClose={handleClose} />
    </>
  );
};

export default NavBar;
