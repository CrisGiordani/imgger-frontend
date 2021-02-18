import React, { useState } from "react";
import Header from "../../components/Header";
import * as Yup from "yup";
import { Form, Input } from "@rocketseat/unform";

import { useDispatch } from "react-redux";
import { updateUserRequest } from "../../store/modules/user/actions";

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

export default function RegisterUser() {

  const dispatch = useDispatch();

  const [loading] = useState(localStorage.getItem('apiLoading') || false);
  const [userName, setUserName] = useState(localStorage.getItem('apiUserName'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('apiUserEmail'));
  
  const [password, setPassword] = useState('');  

  function handleSubmit() {
    dispatch(
      updateUserRequest({ userName, userEmail, password })
    );
  }
  return (
    <>
    <Header />
    <div className="page-container profile-container">
          <h1>Perfil</h1>
          <div className="content">
            {userName && (
              <Form schema={schema} onSubmit={handleSubmit} style={{ 'width':'100%' }}>
                <section className="campo">
                  <label>Nome</label>
                  <Input placeholder="Seu nome" name="name" value={userName} onChange={e => setUserName(e.target.value)} />
                </section>
                <section className="campo">
                  <label>E-mail</label>
                <Input placeholder="E-mail" name="email" type="email" value={userEmail} onChange={e => setUserEmail(e.target.value)} />
                </section>
                <hr />
                <section className="campo">
                  <label>Nova senha (opcional)</label>
                <Input placeholder="Nova senha" name="password" type="password" onChange={e => setPassword(e.target.value)} />
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
            )}
          </div>
      </div>
    </>
  );
}
