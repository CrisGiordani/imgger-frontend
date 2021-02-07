import React, { useState, useEffect } from "react";

//import { toast } from "react-toastify";
import Header from "../../components/Header";

import api from "../../services/api";

import "./styles.css";

export default function AllImages(req, res) {
  
  const [allimages, setAllimages] = useState([]);

  useEffect(() => {
    api.get("images").then((response) => {
      setAllimages(response.data);
    })
  }, []);

  return (
    <>
      <Header />
      <div className="page-container">

        <div className="images-container">
          <h1>Todas as Imagens</h1>
          <ul class="cards">
            {allimages.map((allimage) => (
              <li key={allimage.id}>
                <p><b>{allimage.title}</b></p>
                <img src={"http://localhost/imgger/public/storage/" + allimage.path} alt={allimage.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
