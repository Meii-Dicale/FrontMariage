import React from "react";
import "../src/App.css"


const BackgroundVideo = () => {
  return (
    <div className="video-background">
       <video autoPlay muted loop playsInline>
        <source src={`/Images/fondAnime.mp4`} type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo.
      </video>
      <div className="content">
        <h1>Bienvenue</h1>
        <p>Ceci est un fond vidéo fixe avec React.</p>
      </div>
    </div>
  );
};

export default BackgroundVideo;
