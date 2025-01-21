import React, { useEffect, useState } from "react";
import "../src/App.css";
import { fetchMessagesAPI } from "../src/Services/GuestBookService";
import CGU from "./CGU";
import { useLocation } from "react-router-dom";
const Footer = () => {
  const [messages, setMessages] = useState([]);
  const [showCGU, setShowCGU] = useState(false);
  const [randomQuote, setRandomQuote] = useState("");
  const location = useLocation()

  const fetchMessages = async () => {
    try {
      const response = await fetchMessagesAPI();
      setRandomQuote (
        response.data.length > 0
          ? response.data[Math.floor(Math.random() * response.data.length)]
          : null);
      setMessages(response.data ); 
    } catch (error) {
      console.error("Erreur lors de la récupération des messages :", error);
    }
  };

  useEffect(() => {
    fetchMessages();
    
  }, []);

  // Sélection aléatoire d'une citation
  useEffect(() =>{
    setRandomQuote (
    messages.length > 0
      ? messages[Math.floor(Math.random() * messages.length)]
      : null);
  }, [location])


  return (
    <footer className="footer bg-black text-white py-4">
      <div className="container">
        <div className="row">
          
          <div className="col-md-9 text-center">
            {randomQuote ? (
              <p>
                "{randomQuote.TextGuestBook}" 
                <small> {randomQuote.NameUser}</small>
                <small> , {randomQuote.RelationUser}</small>
              </p>
            ) : (
              <p>Laissez vite un message dans le livre d'or !</p>
            )}
          </div>

          <div className="col-md-1 text-center">
            <a
              onClick={() => setShowCGU(true)}
              className="text-white text-decoration-none"
              style={{ cursor: "pointer" }}
            >
              CGU
            </a>
          </div>

          <div className="col-md-2 text-center">
            <p>&copy; Lorelei WANNYN 2025-2026</p>
          </div>
        </div>
      </div>


      <CGU show={showCGU} handleClose={() => setShowCGU(false)} />
    </footer>
  );
};

export default Footer;