import { Modal } from "react-bootstrap";

const CGU = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-90w" size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Conditions Générales d'Utilisation</Modal.Title>
      </Modal.Header>
      <Modal.Body className="ModalColor d-flex flex-column">
        <h2>En vigueur au 19/01/2025</h2>
        <p className="whiteText" >
          Les présentes conditions générales d'utilisation (dites « CGU ») ont pour objet l'encadrement juridique des modalités de mise à disposition du site et des services et de définir les conditions d’accès et d’utilisation des services par « l'Utilisateur ».
        </p>
        <p className="whiteText">
          Toute inscription ou utilisation du site implique l'acceptation sans réserve des présentes CGU. Lors de l'inscription sur le site, chaque utilisateur accepte expressément les CGU en cochant une case.
        </p>
        <p className="whiteText">
          En cas de non-acceptation, l'Utilisateur se doit de renoncer à l'accès des services proposés. Le site <strong>revivremonmariage.com</strong> se réserve le droit de modifier unilatéralement et à tout moment le contenu des présentes CGU.
        </p>

        <h3>Article 1 : Mentions légales</h3>
        <ul>
          <li className="whiteText"><strong>Éditeur :</strong> WANNYN Loreleï</li>
          <li className="whiteText"><strong>Adresse :</strong> 30 Rue Paul Lafargue</li>
          <li className="whiteText"><strong>Téléphone :</strong> 0658654729</li>
          <li className="whiteText"><strong>Email :</strong> meii7@hotmail.fr</li>
          <li className="whiteText">
            <strong>Hébergeur :</strong> OVHcloud, 2 rue Kellerman, Roubaix (Tél : 1007)
          </li>
        </ul>

        <h3>Article 2 : Accès au site</h3>
        <p className="whiteText">
          Le site <strong>revivremonmariage.com</strong> permet un accès gratuit aux services comme l'upload de photos de l'évènement du 13.06.2026.
        </p>
        <ul>
          <li className="whiteText">Le site est accessible à tout utilisateur ayant une connexion Internet.</li>
          <li className="whiteText">
            Les services réservés nécessitent une inscription et l'identification avec un identifiant et un mot de passe.
          </li>
        </ul>

        <h3>Article 3 : Collecte des données</h3>
        <p className="whiteText">
          Le site respecte la vie privée et applique la loi Informatique et Libertés du 6 janvier 1978. Les utilisateurs disposent d'un droit d'accès, de rectification et de suppression de leurs données personnelles.
        </p>

        <h3>Article 4 : Propriété intellectuelle</h3>
        <p className="whiteText">
          Les contenus du site (textes, images, logos, etc.) sont protégés par le Code de la propriété intellectuelle. Toute reproduction ou utilisation à des fins commerciales est interdite.
        </p>

        <h3>Article 5 : Responsabilité</h3>
        <p className="whiteText">
          Le site <strong>revivremonmariage.com</strong> décline toute responsabilité en cas de :
        </p>
        <ul>
          <li className="whiteText">Virus infectant le matériel informatique de l'utilisateur.</li>
          <li className="whiteText">Dysfonctionnement dû à un cas de force majeure.</li>
        </ul>

        <h3>Article 6 : Liens hypertextes</h3>
        <p className="whiteText">
          Le site peut contenir des liens vers d'autres sites web sur lesquels il n'a aucun contrôle. Le site ne saurait être tenu responsable du contenu de ces sites tiers.
        </p>

        <h3>Article 7 : Cookies</h3>
        <p className="whiteText">
          Les cookies utilisés sur le site visent à améliorer l'expérience utilisateur. L'utilisateur peut configurer son navigateur pour désactiver les cookies.
        </p>

        <h3>Article 8 : Publication par l'utilisateur</h3>
        <p className="whiteText">
          Les utilisateurs peuvent publier des photos et des textes sur le site, sous réserve du respect des règles de bonne conduite et des lois en vigueur.
        </p>

        <h3>Article 9 : Droit applicable</h3>
        <p className="whiteText">
          Le droit français s'applique. En cas de litige, les tribunaux français seront compétents.
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default CGU;
