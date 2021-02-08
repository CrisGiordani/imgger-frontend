import React, { useState, useEffect } from "react";
import Header from "../../components/Header";

import api from "../../services/api";

import "./styles.css";

export default function Galeria(req, res) {
  
  const [images, setImages] = useState([]);

  useEffect(() => {
    
    async function loadImages() {
      const response = await api.get('images');
      setImages(response.data);
    }
    loadImages();

  }, []);
  
  return (
    <>
      <Header />
      <div className="page-container">
        <div className="images-container">
          
          <h1>Minha Galeria</h1>
          <ul className="cards">
            {images.map((image) => (
              <li key={image.id}>
                <p><b>{image.title}</b></p>
                <img src={"http://localhost/imgger/public/storage/" + image.path} alt={image.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
