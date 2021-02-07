import React, { useState, useEffect } from "react";

//import { toast } from "react-toastify";
import Header from "../../components/Header";

import api from "../../services/api";

import "./styles.css";

export default function AllUsers(req, res) {
  
  const [allusers, setAllusers] = useState([]);

  useEffect(() => {
    api.get("users").then((response) => {
      setAllusers(response.data);
    })
  }, []);

  return (
    <>
      <Header />
      <div className="page-container">

        <div className="performers-container">
          <h1>Usuários</h1>
          <ul>
            {allusers.map((alluser) => (
              <li key={alluser.id}>
                <strong>Nome:</strong>
                <p>{alluser.name}</p>
                <strong>E-mail:</strong>
                <p>{alluser.email}</p>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </>
  );
}
