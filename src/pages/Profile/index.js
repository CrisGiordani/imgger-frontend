import React from "react";
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
  password: Yup.string()
    .min(4, "A senha precisa ter no mínimo 4 caracteres")
    .required("A senha é obrigatória"),
  confirmPassword: Yup.string().when("password", (password, field) =>
    password
      ? field
          .required()
          .oneOf([Yup.ref("password")], "A senha de confirmação está diferente")
      : field
  ),
});

export default function RegisterUser() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.user.user);

  function handleSubmit({ name, email, password }) {
    const performer = 0;
    const description = "";
    dispatch(
		updateUserRequest(name, email, password)
    );
  }

  return (
    <>
    <Header />
    <div className="register-container">
      <div className="content">
        <section>
          <h1>Perfil</h1>
        </section>
        <Form schema={schema} onSubmit={handleSubmit}>
          <Input placeholder="Seu nome" name="name" value={user.name} />
          <Input placeholder="E-mail" name="email" type="email" value={user.email} />
          <Input placeholder="Senha atual" name="password" type="password" />
          <Input placeholder="Nova senha" name="password" type="password" />
          <Input
            placeholder="Confirmação de nova senha"
            name="confirmPassword"
            type="password"
          />
          <button className="button" type="submit">
            {loading ? "Enviando..." : "Atualizar"}
          </button>
        </Form>
      </div>
    </div>
  </>
  );
}
