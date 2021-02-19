import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Header from "../../../components/Header";
import api from "../../../services/api";
import "./styles.css";
import { signOut } from "../../../store/modules/auth/actions";

import iconGalery from "../../../assets/galery.png";
import iconUserDelete from "../../../assets/delete.png";

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

export default function Users(req, res) {
  const dispatch = useDispatch();

  const [allusers, setAllusers] = useState([]);
  const [token] = useState(localStorage.getItem('apiToken'));

  useEffect(() => {
    api.get('admin/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
        if(response.data.status === "Authorization Token not found") {
          dispatch(signOut());
        }
        setAllusers(response.data);
      }).catch(error => {
        console.log(error);
    })
  }, []);

  function handleDeleteUser(nome, id) {
    confirmAlert({
      title: 'Atenção',
      message: `Deseja realmente excluir o usuário ${nome} e todas as suas imagens?`,
      buttons: [
        {
          label: 'Sim, excluir',
          onClick: () => (
            api.delete(`admin/user/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            }).then(response => {
                if(response.data.status === "Authorization Token not found") {
                  dispatch(signOut());
                }
                toast("Usuário excluído com sucesso!", {
                  className: ".imgger-toast imgger-toast-success",
                  bodyClassName: "imgger-toast-success-body",
                  progressClassName: "imgger-toast-success-bar",
                });
                document.getElementById(id).remove();
              }).catch(error => {
                console.log(error);
            })
          )
        },
        {
          label: 'Não'
        }
      ]
    });
  }

  return (
    <>
      <Header />
      <div className="page-container">
        <div className="users-container">
          <h1>Administração de Usuários</h1>
          <table>
            <thead>
              <tr>
                <th><strong>Nome</strong></th>
                <th><strong>E-mail</strong></th>
                <th style={{ 'textAlign':'center'}}><strong>Imagens</strong></th>
                <th style={{ 'textAlign':'center'}}><strong>Delete</strong></th>
              </tr>
            </thead>
            <tbody>
              {allusers && allusers.length > 0
                ? allusers.map(alluser => (
                  <tr id={alluser.id} key={alluser.id}>
                    <td><Link to={`/admin/user/${alluser.id}`} style={{ 'textDecoration':'none', 'color': '#444'}}>{alluser.name}</Link></td>
                    <td>{alluser.email}</td>
                    <td style={{ 'textAlign':'center'}}><Link to={`/galeria/${alluser.id}`}><img src={iconGalery} /></Link><strong style={{ 'fontSize': 11}}></strong></td>
                    <td style={{ 'textAlign':'center', 'cursor': 'pointer'}}><img src={iconUserDelete} onClick={() => handleDeleteUser(alluser.name,alluser.id)} /></td>
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
