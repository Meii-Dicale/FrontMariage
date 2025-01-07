import { Button, Container } from "react-bootstrap"
import { useContext, useState } from 'react';
import Authcontext from '../src/Context/Authcontext';

const MonCompte = () => {
    const user = useContext(Authcontext).user;
    return <>
    <Container className="d-flex justify-content-center moncompte">

   <div className="borneArcade col-6 d-flex flex-column align-items-center justify-content-center">

    <span>Player : {user.NameUser}</span>
    <span>Email : {user.MailUser}</span>
    <span>Téléphone : +33{user.TelUser}</span>
    <span>Relation avec les mariés : </span>
    <span>{user.RelationUser}</span>
    <Button className="mt-3 ajoutBoutton"> Modifier mes informations</Button>
    <Button className="mt-2 ajoutBoutton"> Supprimer mon compte</Button>
   </div>
<div className="d-flex flex-column align-items-center justify-content-center ">
   <div className="neon-sign d-flex  mt-5 align-items-center justify-content-center">
  <span >Accès V.I.P</span>
  

</div>
<div className="bouttonPhoto">
<Button className="mt-5 ajoutBoutton"> Ajouter mes photos</Button>
</div>
</div>

    </Container>
    </>
}
export default MonCompte