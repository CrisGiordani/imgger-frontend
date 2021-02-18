import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Header from "../../../components/Header";
import api from "../../../services/api";
import * as Yup from "yup";
import { Form, Input } from "@rocketseat/unform";

import { signOut } from "../../../store/modules/auth/actions";

import "./styles.css";

const schema = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatório"),
  email: Yup.string()
    .email("E-mail inválido")
    .required("O campo e-mail é obrigatório"),
  password: Yup.string().notRequired(),
  confirmPassword: Yup.string().when("password", (password, field) =>
    password
      ? field
          .required()
          .oneOf([Yup.ref("password")], "A senha de confirmação está diferente")
          .min(4)
      : field
  ),
});

export default function UserProfile() {

  const dispatch = useDispatch();

  const [loading] = useState(localStorage.getItem('apiLoading') || false);
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [profilePassword, setProfilePassword] = useState('');
  
  const [token] = useState(localStorage.getItem('apiToken'));
  const { id } = useParams();

  useEffect(() => {
    api.get(`user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
        if(response.data.status === "Authorization Token not found") {
          dispatch(signOut());
        }
        setProfileName(response.data[0].name);
        setProfileEmail(response.data[0].email);

      }).catch(error => {
        console.log(error);
    })
  }, []);

  function handleSubmit() {
    api.put(`admin/user/${id}`, {
        "name" : profileName,
        "email" : profileEmail,
        'password' : profilePassword
      }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
        if(response.data.status === "Authorization Token not found") {
          dispatch(signOut());
        }
        toast("Usuário atualizado com sucesso!", {
          className: ".imgger-toast imgger-toast-success",
          bodyClassName: "imgger-toast-success-body",
          progressClassName: "imgger-toast-success-bar",
        });
      }).catch(error => {
        console.log(error);
    })

  }
  return (
    <>
    <Header />
    <div className="page-container profile-container">
          {profileName && (
            <>
              <h1>Perfil de {profileName}</h1>
              <div className="content">
                <Form schema={schema} onSubmit={handleSubmit} style={{ 'width':'100%' }}>
                <section className="campo">
                  <label>Nome</label>
                  <Input placeholder="Seu nome" name="name" value={profileName} onChange={e => setProfileName(e.target.value)} />
                </section>
                <section className="campo">
                  <label>E-mail</label>
                <Input placeholder="E-mail" name="email" type="email" value={profileEmail} onChange={e => setProfileEmail(e.target.value)} />
                </section>
                <hr />
                <section className="campo">
                  <label>Nova senha (opcional)</label>
                <Input placeholder="Nova senha" name="password" type="password" onChange={e => setProfilePassword(e.target.value)} />
                </section>
                <section className="campo">
                  <label>Confirme a nova senha</label>
                <Input placeholder="Confirmação de nova senha" name="confirmPassword" type="password" />
                </section>
                <section className="campo">
                  <button className="button" type="submit">
                    {!loading ? "Enviando..." : "Atualizar"}
                  </button>
                </section>
              </Form>

              </div>
            </>
          )}
      </div>
    </>
  );
}
