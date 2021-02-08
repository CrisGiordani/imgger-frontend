import React, { useState, useEffect } from "react";
//import { toast } from "react-toastify";
import Header from "../../components/Header";
import { Form, Input } from "@rocketseat/unform";

import { useDispatch, useSelector } from "react-redux";
import Dropzone from '../../components/Dropzone';
import api from "../../services/api";
import "./styles.css";

export default function Upload() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const [formData, setFormData] = useState({
    title: '', 
    description: '', 
    tags: '',
  })
  const [selectedFile, setSelectedFile] = useState();

  async  function handleSubmit() {

    const { title, description, tags } = formData;

    const data = new FormData();

    data.append('title', title); 
    data.append('description', description); 
    data.append('tags', tags); 

    
    if (selectedFile) {
      data.append('image', selectedFile)
    }
    await api.post('images', data);
    
    alert('Imagem enviada com sucesso!');

  }
  return (
    <>
    <Header />
    <div className="register-container">
      <div className="content">
        <section>
          <h1>Envio de Imagem</h1>
          <Dropzone onFileUploaded={setSelectedFile} />
         
        </section>
        <Form onSubmit={handleSubmit}>
          <Input placeholder="Título" name="title" />
          <Input placeholder="Descrição" name="description" />
          <Input placeholder="Tags" name="tags" type="tags" />
          <button className="button" type="submit">
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </Form>
      </div>
    </div>
    </>
  );
}
