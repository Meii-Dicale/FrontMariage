import React from "react";
import "../src/App.css";

const Footer = () => {
  // Exemple de citations
  const quotes = [
    "La simplicité est la sophistication suprême. - Léonard de Vinci",
    "Le succès n'est pas final, l'échec n'est pas fatal : c'est le courage de continuer qui compte. - Winston Churchill",
    "L'imagination est plus importante que le savoir. - Albert Einstein",
  ];

  // Sélection aléatoire d'une citation
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <footer className="footer bg-black text-white py-4">
      <div className="container">
        <div className="row">
          {/* Section Citations */}
          <div className="col-md-4 text-center">
            <p>{randomQuote}</p>
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
