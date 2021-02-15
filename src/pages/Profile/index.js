import React, { useState } from "react";
import Header from "../../components/Header";
import * as Yup from "yup";
import { Form, Input } from "@rocketseat/unform";

import { useDispatch, useSelector } from "react-redux";
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
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.user.user);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  function handleSubmit() {
    dispatch(
      updateUserRequest({ name, email, password })
    );
  }
  return (
    <>
    <Header />
    <div className="page-container">
      
          <h1>Perfil</h1>
          <Form schema={schema} onSubmit={handleSubmit}>
            <Input placeholder="Seu nome" name="name" value={name} onChange={e => setName(e.target.value)} />
            <Input placeholder="E-mail" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            <Input placeholder="Nova senha" name="password" type="password" onChange={e => setPassword(e.target.value)} />
            <Input placeholder="Confirmação de nova senha" name="confirmPassword" type="password" />
            <button className="button" type="submit">
              {loading ? "Enviando..." : "Atualizar"}
            </button>
          </Form>

      </div>
  </>
  );
}
