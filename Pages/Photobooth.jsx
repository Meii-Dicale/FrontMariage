// https://photobooth-app.org 
// https://photobooth-app.org/reference/api/

import { Link } from "react-router-dom";
import Authcontext from "../src/Context/Authcontext";
import { useContext, useState } from "react";
import Connexion from "../Composant/ModuleConnexion";
const PhotoBooth = () => {
    const { user } = useContext(Authcontext);
    const [showLoginModal, setShowLoginModal] = useState(false);
    
  
    const handleClose = () => setShowLoginModal(false);
    const handleShow = () => setShowLoginModal(true);
    const [photos, setPhotos] = useState([]);



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
{photos.lenght > 0 ?(<div className="d-flex whiteText justify-content-center align-items-center taille" > Cool des photos</div>):( <div className="d-flex whiteText justify-content-center align-items-center taille">Pas encore de photos ? Va vite au photomaton pour le tester ! </div>)}
        </>
    );
}


export default PhotoBooth;