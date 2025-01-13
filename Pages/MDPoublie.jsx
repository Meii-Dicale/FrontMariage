import { useState } from "react";
import { SendMailAPI } from "../src/Services/Reset";

const MdpOublie = () => {
    const [data, setData] = useState({
        MailUser: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        try {
            const response = await SendMailAPI(data);
            console.log("Mail envoyé avec succès", response);
            alert("Un lien de réinitialisation a été envoyé à votre adresse mail.");
            setData({ MailUser: "" }); // Réinitialisation du formulaire
            window.location.href = "/"; // Redirection vers la page de connexion
        } catch (error) {
            console.error("Erreur lors de l'envoi du mail", error);
        }
    };

    const handleChange = (e) => {
        setData({ ...data, MailUser: e.target.value });
    };

    return (
        <div className="whiteText d-flex flex-column align-items-center">
            <h1>Réinitialisation du mot de passe</h1>
            <p>
                Veuillez renseigner votre adresse mail pour recevoir un lien de
                réinitialisation.
            </p>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Adresse Mail
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={data.MailUser}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn ajoutBoutton">
                    Envoyer
                </button>
            </form>
        </div>
    );
};

export default MdpOublie;
