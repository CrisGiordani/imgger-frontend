import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { SRLWrapper } from "simple-react-lightbox";
import api from "../../services/api";

import "./styles.css";

export default function Galeria(req, res) {
  
  const [images, setImages] = useState([]);

  useEffect(() => {
    api.get('images').then(response=> {
      setImages(response.data);
    })
  }, []);
  
  return (
    <>
      <Header />
      <div className="page-container">
          <h1>Minha Galeria</h1>

          <div className="images-container">
            
              <SRLWrapper>
              {images && images.length > 0
                ? images.map(image => (
           
                    <a key={image.id} href={"http://localhost/imgger/public/storage/" + image.path}>
                      <img src={"http://localhost/imgger/public/storage/thumb_" + image.path} className="imgger" alt={image.title} />
                    </a>
            
                  ))
                : "Carregando..."
              }
              </SRLWrapper>
         
          </div>
          
      </div>
    </>
  );
}
