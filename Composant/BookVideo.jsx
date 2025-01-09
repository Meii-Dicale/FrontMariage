import React from "react";
import "../src/App.css";
import { Container } from "react-bootstrap";

const BookVideo = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center col-10">
      <div className="bookVideo">
        <video autoPlay muted playsInline>
          {/* <source src="/Images/book.mp4" type="video/mp4" /> */}
          <source src="./Images/fondlivre.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
      </div>
    </Container>
  );
};

export default BookVideo;
