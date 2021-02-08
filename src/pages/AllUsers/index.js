import React, { useState, useEffect } from "react";
import HeaderAdm from "../../components/HeaderAdm";

import api from "../../services/api";
 
import "./styles.css";

export default function Allusers(req, res) {

  const [vallusers, setAllusers] = useState([]);

  useEffect(() => {
    
    async function loadAllusers() {
      const response = await api.get('users');
      console.log(response.data);
      // setAllusers(response.data);
    }
    loadAllusers();

  }, []);

  return (
    <>
      <HeaderAdm />
      <div className="page-container">
        <div className="users-container">
          <h1>Usuários</h1>
          <ul>
            {/* {vallusers.map((alluser) => (
              <li key={alluser.id}>
                <strong>Nome:</strong>
                <p>{alluser.name}</p>
                <strong>E-mail:</strong>
                <p>{alluser.email}</p>
              </li>
            ))} */}
          </ul>
        </div>
      </div>
    </>
  );
}
