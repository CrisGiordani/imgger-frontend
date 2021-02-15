import React from "react";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import * as Yup from "yup";
import { Form, Input } from "@rocketseat/unform";

import { useDispatch, useSelector } from "react-redux";
import { signInRequest } from "../../store/modules/auth/actions";

import "./styles.css";

import logoImg from "../../assets/logo.svg";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail inválido")
    .required("O campo e-mail é obrigatório"),
  password: Yup.string().required("A senha é obrigatória"),
});

export default function Login(req, res) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const userEmail = localStorage.getItem("userEmail") || "";

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <div className="login-container">
      <div className="content">
        <section className="form">
          <img src={logoImg} alt="imgger" style={{maxWidth: '80%'}} />
          <Form
            initialData={{ email: userEmail }}
            schema={schema}
            onSubmit={handleSubmit}
          >
            <h3>Sistema de gerenciamento de imagens</h3>
            <Input placeholder="Seu e-mail" name="email" type="email" />
            <Input placeholder="Sua senha" name="password" type="password" />
            <button type="submit" className="button">
              {loading ? "Carregando..." : "Acessar"}
            </button>
            <Link className="back-link" to="/register/user">
              <FiLogIn size={16} color="#4A90E2" />
              Cadastro rápido
            </Link>
          </Form>
        </section>
      </div>
    </div>
  );
}
