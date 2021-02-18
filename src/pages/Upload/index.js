import React, { useState } from "react";
import history from "../../services/history";

import Header from "../../components/Header";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Form, Input } from "@rocketseat/unform";

import { useSelector } from "react-redux";
import Dropzone from '../../components/Dropzone';
import api from "../../services/api";
import "./styles.css";


const schema = Yup.object().shape({
  title: Yup.string().required("O título é obrigatório"),
  description: Yup.string().required("A descrição é obrigatória"),
  tags: Yup.string().required("Tags são importantes, não deixe em branco"),
});

export default function Upload() {
  const loading = useSelector((state) => state.auth.loading);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [selectedFile, setSelectedFile] = useState();

  const [id] = useState(localStorage.getItem('apiUserId'));

  async function handleSubmit() {

    const data = new FormData();

    data.append('title', title); 
    data.append('description', description); 
    data.append('tags', tags); 

    if (selectedFile) {
      data.append('photo', selectedFile)
    } else {
      toast("Opa, parece que você esqueceu do princial: a imagem :)", {
        className: ".imgger-toast imgger-toast-alert",
        bodyClassName: "imgger-toast-alert-body",
        progressClassName: "imgger-toast-alert-bar",
      });
      return;
    }

    await api.post('images', data);
    toast("Legal, imagem enviada com sucesso!", {
      className: ".imgger-toast imgger-toast-success",
      bodyClassName: "imgger-toast-success-body",
      progressClassName: "imgger-toast-success-bar",
    });
    history.push(`/galeria/${id}`)

  }
  return (
    <> 
    <Header />
    <div className="page-container upload-container">
      <h1>Envio de Imagem</h1>
      <div className="content">
        <Dropzone onFileUploaded={setSelectedFile} />
        <Form schema={schema} onSubmit={handleSubmit}>
          <Input placeholder="Título" name="title" onChange={e => setTitle(e.target.value)} />
          <Input placeholder="Descrição" name="description" onChange={e => setDescription(e.target.value)} />
          <Input placeholder="Tags" name="tags" type="tags" onChange={e => setTags(e.target.value)} />
          <button className="button" type="submit">
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </Form>
      </div>
    </div>
    </>
  );
}
