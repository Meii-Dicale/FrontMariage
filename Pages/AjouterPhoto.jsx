import React, { useContext, useEffect, useState } from "react";
import Authcontext from "../src/Context/Authcontext";
import UploadPhotoAPI, { DeletePhotoAPI, GetMesPhotosAPI } from "../src/Services/UploadPhotosService";

const AjoutPhoto = () => {
    const [photos, setPhotos] = useState([]);
    const [mesPhotos, setMesPhotos] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [sendToMarried, setSendToMarried] = useState([]);
    const { user } = useContext(Authcontext);

    // Gestion des photos sélectionnées
    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files);

        // Prévisualisation des photos
        const filePreviews = files.map((file) => URL.createObjectURL(file));

        setPhotos((prevPhotos) => [...prevPhotos, ...files]);
        setPreviews((prevPreviews) => [...prevPreviews, ...filePreviews]);
        setSendToMarried((prev) => [...prev, ...files.map(() => false)]);
    };

    // Gestion des cases à cocher
    const handleCheckboxChange = (index) => {
        setSendToMarried((prev) =>
            prev.map((value, i) => (i === index ? !value : value))
        );
    };

    // Gestion de l'envoi des données
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (photos.length === 0) {
            alert("Veuillez ajouter au moins une photo.");
            return;
        }

        const formData = new FormData();

        // Ajouter les fichiers et leurs métadonnées au FormData
        photos.forEach((photo, index) => {
            formData.append("files", photo); // Ajouter chaque fichier sous "files"
            formData.append(`PublicMedia-${index}`, sendToMarried[index] ? 1 : 0); // 1 si mariée uniquement
        });

        // Ajouter l'identifiant utilisateur
        formData.append("IdUser", user.IdUser);

        try {
            // Appeler le service API
            const response = await UploadPhotoAPI(formData);

            console.log("Photos téléchargées avec succès :", response.data);
            alert("Photos téléchargées avec succès !");
            setPhotos([]);
            setPreviews([]);
            setSendToMarried([]);
            fetchMesPhotos(); 
        } catch (error) {
            console.error("Erreur lors du téléchargement des photos :", error);
            alert("Une erreur est survenue lors du téléchargement.");
        }
    };

    // Suppression d'une photo durant l'upload
    const handleRemovePhoto = (index) => {
        setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
        setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
        setSendToMarried((prev) => prev.filter((_, i) => i !== index));
    };

    // Récupération des photos du connecté

    const fetchMesPhotos = async () => {
      try {
        const response = await GetMesPhotosAPI(user.IdUser);
        setMesPhotos(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des photos :", error);
      }
    }

    // Supprimer les photos 
    const handleDeletePhoto = async (IdMedia) => {
        try {
            const response = await DeletePhotoAPI(IdMedia)

            console.log("Photo supprimée avec succès :", response.data);
            alert("Photo supprimée avec succès!");
            fetchMesPhotos();
        } catch (error) {
            console.error("Erreur lors de la suppression de la photo :", error);
            alert("Une erreur est survenue lors de la suppression.");
        }
    };

    // Mise à jour des photos
    

    useEffect(() => {
        fetchMesPhotos();
    }, [])

    return (
      <>
        <div className="container mt-5 whiteText">
            <h2>Ajouter des Photos</h2>
            <small className="whiteText">Si vous cochez la case sous la photo, celle-ci sera visiblement uniquement par les mariés.</small>
            <form className="whiteText mt-5" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="photoInput" className="form-label">
                        Sélectionnez vos photos :
                    </label>
                    <input
                        type="file"
                        id="photoInput"
                        className="form-control"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoChange}
                    />
                </div>

                <div className="mb-3">
                    <h3>Aperçu des Photos</h3>
                    <div className="d-flex flex-wrap">
                        {previews.map((preview, index) => (
                            <div
                                key={index}
                                className="m-2 position-relative"
                                style={{ width: "150px" }}
                            >
                                <img
                                    src={preview}
                                    alt={`Preview ${index}`}
                                    className="img-thumbnail"
                                    style={{ width: "100%", height: "auto" }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                    onClick={() => handleRemovePhoto(index)}
                                >
                                    &times;
                                </button>
                                <div className="mt-2">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={sendToMarried[index]}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                        {" Envoyer uniquement aux mariés"}
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="btn btn-pink">
                    J'envoie mes clichés !
                </button>
            </form>
        </div>
        <div className="container mt-5 whiteText">
          <h2>Mes Photos</h2>
          <div className="d-flex flex-wrap">
            {mesPhotos.map((photo) => (
              <div key={photo.IdMedia} className="m-2 position-relative" style={{ width: "150px" }}>
                <img
                  src={`http://${import.meta.env.VITE_IP}:3001/api/Media/${photo.PathMedia}`}
                  alt={`Photo ${photo.IdMedia}`}
                  className="img-thumbnail"
                  style={{ width: "100%", height: "auto" }}
                />
                      <button
                                    type="button"
                                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                    onClick={() => handleDeletePhoto(photo.IdMedia)}
                                >
                                    &times;
                                </button>
                {photo.PublicMedia === 1 && (
                  <small className="badge bg-secondary position-absolute bottom-0 end-0">
                    Reservé pour les mariés
                  </small>
                  
                )}
              </div>
            ))}
          </div>
        </div>
        </>
    );
};

export default AjoutPhoto;
