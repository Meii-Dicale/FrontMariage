import React, { useEffect, useState } from "react";
import "../src/App.css";
import { fetchMessagesAPI } from "../src/Services/GuestBookService";

const Footer = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await fetchMessagesAPI();
      setMessages(response.data || []); // Assurez-vous que `response.data` est un tableau
      console.log(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des messages :", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Sélection aléatoire d'une citation
  const randomQuote =
    messages.length > 0
      ? messages[Math.floor(Math.random() * messages.length)]
      : null;

  return (
    <footer className="footer bg-black text-white py-4">
      <div className="container">
        <div className="row">
          {/* Section Citations */}
          <div className="col-md-4 text-center">
            {randomQuote ? (
              <p>
                "{randomQuote.TextGuestBook}" <br />
                <small>{randomQuote.NameUser}</small>
                <small> , {randomQuote.RelationUser}</small>
              </p>
            ) : (
              <p>Laissez vite un message dans le livre d'or !</p>
            )}
          </div>

          {/* Section CGU */}
          <div className="col-md-4 text-center">
            <a href="/cgu" className="text-white text-decoration-none">
              Conditions Générales d'Utilisation
            </a>
          </div>

          {/* Section Copyright */}
          <div className="col-md-4 text-center">
            <p>&copy; Lorelei WANNYN 2025-2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
