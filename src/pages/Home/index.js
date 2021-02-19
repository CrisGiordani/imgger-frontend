import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SRLWrapper } from "simple-react-lightbox";
import { toast } from "react-toastify";

import Header from "../../components/Header";
import api from "../../services/api";
import history from "../../services/history";
import { FiSearch } from "react-icons/fi";
import { signOut } from "../../store/modules/auth/actions";

import "./styles.css";

export default function Home(req, res) {

  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
 
  const search = useLocation().search;
  const [busca, setBusca] = useState(new URLSearchParams(search).get('search') || "");

  const [token] = useState(localStorage.getItem('apiToken'));
  const [userId] = useState(localStorage.getItem('apiUserId'));
  
  const [userAdmin, setUserAdmin] = useState(false);
  useEffect(()=> {
    if (localStorage.getItem('apiUserAdmin') === "1") { setUserAdmin(true); };
  }, [])

  useEffect(() => {
    api.get("images", { "search" : busca }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
        console.log(response.data.data);
        setImages(response.data.data);
      }).catch(error => {
        console.log(error);
        dispatch(signOut());
    })
  }, []);
  
  const options = {
    settings: {
      overlayColor: "rgb(31, 40, 91, 0.9)",
      autoplaySpeed: 1500,
      transitionSpeed: 900,
    },
    buttons: {
      showAutoplayButton: false,
      backgroundColor: "#2660a3",
      iconColor: "white",
    },
    caption: {
      captionColor: "#fff",
      captionFontFamily: "Raleway, sans-serif",
      captionFontWeight: "500",
    },
    progressBar: {
      backgroundColor: '#f2f2f2',
      fillColor: '#000000',
      height: '3px',
      showProgressBar: true
    }
  };

  function handleDeleteImage(path, id) {
    api.delete(`images/${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
        console.log(response.data);
        document.getElementById(id).remove();
        toast(response.data.message, {
          className: ".imgger-toast imgger-toast-success",
          bodyClassName: "imgger-toast-success-body",
          progressClassName: "imgger-toast-success-bar",
        });
      }).catch(error => {
        console.log(error);
        toast(error.status, {
          className: ".imgger-toast imgger-toast-error",
          bodyClassName: "imgger-toast-error-body",
          progressClassName: "imgger-toast-error-bar",
        });
    })
  }
  function handleGoToGaleria(id) {
    history.push(`/galeria/${id}`)
  }

  function handleSubmitSearch() {
    alert(busca);
  }
  return (
    <>
      <Header />
      <div className="page-container">
          <div id="divBar">
            <h1 id="h1Bar">Galeria Pública</h1>
            <form id="formBar" action=""> 
              <input type="text"
                  placeholder=" Buscar imagens..."
                  name="search" 
                  onChange={e => setBusca(e.target.value)}
                  /> 
              <button onClick={() => handleSubmitSearch}> 
                  <FiSearch />
              </button> 
            </form>
          </div>
          <div className="images-container">
              <SRLWrapper options = {options}>
              {images
                ? images.length > 0 
                  ? images.map(image => (
                        <span key={image.id} id={image.id} className="imgger_span">
                        <a href={"http://localhost/imgger/public/storage/" + image.path}>
                          <img src={"http://localhost/imgger/public/storage/thumb_" + image.path} className="imgger" alt={image.title} />
                        </a>
                        {(userAdmin || (image.user_id === userId)) && <span className="excluir" onClick={() => handleDeleteImage(image.path,image.id)}>X</span> }
                        <div className="legenda"  onClick={() => handleGoToGaleria(image.user_id)}>
                          <span className="title">{image.title}</span>
                          <span className="autor">{image.name}</span>
                        </div>
                      </span>
                    ))
                  : "Galeria vazia"
                : "Carregando..."
              }
              </SRLWrapper>
        
          </div>
          
      </div>
    </>
  );
  
}
