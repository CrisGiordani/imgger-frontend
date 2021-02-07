import React, { useState, useEffect } from "react";

//import { toast } from "react-toastify";
import Header from "../../components/Header";

import api from "../../services/api";

import "./styles.css";

export default function Galeria(req, res) {
  
  const [images, setImages] = useState([]);

  useEffect(() => {
    api.get("images").then((response) => {
        setImages(response.data);
    })
  }, []);

  return (
    <>
      <Header />
      <div className="page-container">

        <div className="images-container">
          <h1>Minha Galeria</h1>
          <ul class="cards">
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
