import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";

import api from "../../../services/api";
 
import "./styles.css";

export default function Users(req, res) {

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
        <div className="users-container">
          <h1>Usuários</h1>
          <table>
            <thead>
              <tr>
                <th><strong>Nome:</strong></th>
                <th><strong>E-mail:</strong></th>
              </tr>
            </thead>
            <tbody>
              {allusers && allusers.length > 0
                ? allusers.map(alluser => (
                  <tr key={alluser.id}>
                    <td>{alluser.name}</td>
                    <td>{alluser.email}</td>
                  </tr>
                  ))
                : <tr><td>Carregando...</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
