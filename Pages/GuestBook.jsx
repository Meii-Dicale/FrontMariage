import React, { useContext, useEffect, useState } from "react";
import BookVideo from "../Composant/BookVideo";
import "../src/App.css";
import Authcontext from "../src/Context/Authcontext";
import SendMessage from "../src/Services/GuestBookService";
import { fetchMessagesAPI } from "../src/Services/GuestBookService";
import 'bootstrap/dist/css/bootstrap.min.css';

// flèche &larr; et &rarr; en HTML 

const GuestBook = () => {
  const { user } = useContext(Authcontext);
  const [message, setMessage] = useState({
    TextGuestBook: "",
    IdUser: user.IdUser,
  });
  const [AllMessages, setAllMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessage({ ...message, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await SendMessage(message);
      console.log("Message envoyé :", message);
      fetchMessages();
      alert("Votre petit mot à bien été ajouté");

      // Réinitialisation du formulaire
      setMessage({
        TextGuestBook: "",
        IdUser: user.IdUser,
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetchMessagesAPI();
      console.log("Messages récupérés :", response.data);
      setAllMessages(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des messages :", error);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % AllMessages.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + AllMessages.length) % AllMessages.length
    );
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
      <div className="bookVideo-container">
        <BookVideo />
        <div className="overlay-container">
        <div className="message-display-container">
  <button className="btn btn-pink mt-3" onClick={handlePrev}>
    &larr; 
  </button>

  {AllMessages.length > 0 && (
    <div className="message-container">
      <p>{AllMessages[currentIndex]?.TextGuestBook}</p>
      <span>De : {AllMessages[currentIndex]?.NameUser}</span>
      <span> - {AllMessages[currentIndex]?.RelationUser}</span>
    </div>
  )}

  <button className="btn btn-pink mt-3" onClick={handleNext}>
     &rarr;
  </button>
</div>

<div className="form-overlay formulaire">
  <h2>Livre d'or</h2>
  <span>
    Ce message sera visible par les mariés et peut apparaître de façon aléatoire
    en bas de page.
  </span>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        name="TextGuestBook"
        className="form-control"
        rows="4"
        placeholder="Votre message"
        required
        onChange={handleChange}
        value={message.TextGuestBook}
      ></textarea>
    </div>

    <button type="submit" className="btn btn-pink mt-3">
      Envoyer
    </button>
  </form>
</div>

      

      </div>
      </div>
    </>
  );
};

export default GuestBook;
