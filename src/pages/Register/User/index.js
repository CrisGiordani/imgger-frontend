import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
//import { toast } from "react-toastify";
import * as Yup from "yup";
import { Form, Input } from "@rocketseat/unform";

import { useDispatch, useSelector } from "react-redux";
import { signUpRequest } from "../../../store/modules/auth/actions";

import "./styles.css";

import logoImg from "../../../assets/logo.svg";

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

  function handleSubmit({ name, email, password }) {
    dispatch(
      signUpRequest(name, email, password)
    );
  }

  return (
      <div className="register-container">
        <div className="content">
          <div className="form_esquerda">
            <img src={logoImg} alt="imgger" />
            <h1>Cadastro</h1>
            <p>
              Faça seu cadastro no imgger para pesquisar, armazenar e baixar imagens.
            </p>
            <Link className="back-link" to="/">
              <FiArrowLeft size={16} color="#4A90E2" />
              Já tenho cadastro
            </Link>
          </div>
          <div className="form_direita">
            <Form schema={schema} onSubmit={handleSubmit}>
            <Input placeholder="Seu nome" name="name" />
            <Input placeholder="E-mail" name="email" type="email" />
            <Input placeholder="Senha" name="password" type="password" />
            <Input
              placeholder="Confirmação de senha"
              name="confirmPassword"
              type="password"
            />
            <button className="button" type="submit">
              {loading ? "Carregando..." : "Cadastrar"}
            </button>
          </Form>
          </div>
        </div>
      </div>
  );
}
