import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ResetPasswordAPI from "../src/Services/Reset";

const ResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [PasswordUser, setPasswordUser] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [data, setData] = useState({
        token: token,
        PasswordUser: PasswordUser,
    })

    if (!token) {
        navigate("/");
        return null;
    }

    let decodedToken;
    try {
        decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (!decodedToken.IdUser) {
            alert("Token invalide");
            navigate("/");
            throw new Error("Token invalide");
        }
        if (decodedToken.exp < currentTime) {
            alert("Le lien n'est plus valide");
            navigate("/");
            throw new Error("Token expiré");
        }
    } catch (error) {
        console.error("Token invalide ou expiré", error);
        navigate("/");
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log( PasswordUser);
        if (PasswordUser !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const response = await ResetPasswordAPI(data);
            console.log(response);
            alert("Votre mot de passe a été réinitialisé avec succès.");
            navigate("/");
            setPasswordUser("");
            setConfirmPassword("");
        } catch (error) {
            console.error("Erreur lors de la réinitialisation du mot de passe:", error);
            alert("Une erreur est survenue lors de la réinitialisation.");
        }
    };
    const handlePasswordChange = (e) => {
        setPasswordUser(e.target.value);
        setData({ ...data, PasswordUser: e.target.value });
    };
    

    return (
        <div className="whiteText d-flex flex-column align-items-center ">
            <h1>Réinitialiser votre mot de passe</h1>
            <form onSubmit={handleSubmit}>
                <div >
                    <label htmlFor="PasswordUser">Nouveau mot de passe :</label>
                    <input
                        type="password"
                        id="PasswordUser"
                        name="PasswordUser"
                        value={PasswordUser}
                        onChange={handlePasswordChange}
                                                required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirmer le mot de passe :</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="btn ajoutBoutton"type="submit">Réinitialiser</button>
            </form>
        </div>
    );
};

export default ResetPassword;
