const LaDemande = () => {
    return (
        <>
            <div className="d-flex flex-column flex-md-row justify-content-between py-5">
                <div className="text-center text-md-start w-100 w-md-75 px-3 d-flex flex-column ">
                    <h1 className="text-white">La demande</h1>
                    <p className="text-white">
                        C'était le 2 février, et il a dit "oui".
                        C'était son anniversaire, il pensait que nous organisions une simple après-midi de tournoi de jeux vidéo avec ses amis.
                        Il se croyait maître de tous les jeux.
                        <br />
                        <br />
                        Quand soudain, je lui ai offert un jeu créé par mes soins, retraçant notre rencontre et notre vie commune jusqu'à l'effondrement de notre réalité. Plusieurs choix s'offraient à lui, et il a pris celui qui consistait à sauver la princesse.
                        <br />
                        <br />
                        Ce ne fut pas un "Game Over", mais un "To be continued..."
                        Et il a dit "oui".
                    </p>
                    <a 
                        href="https://lorelei.wannyn.fr/HappyBirthday-1.0-web/index.html" 
                        target="blank" 
                        className="btn btn-pink mt-3"
                    >
                        Vous aussi, essayez de retracer notre vie commune en cliquant ICI
                    </a>
                    <div className="mt-4 videmande">
                        <video 
                            className="img-fluid rounded " 
                            src="/Images/Anneau.mp4" 
                            controls
                        ></video>
                    </div>
                </div>
                <div className=" w-100  px-3 ">
                    <img 
                        src="/Images/430029959_10234191183221445_3850413529214723431_n.jpg" 
                        alt="La demande" 
                        className="img-fluid rounded"
                    />
                </div>
            </div>
        </>
    );
};

export default LaDemande;
