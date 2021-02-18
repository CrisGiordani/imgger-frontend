import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { FiUpload } from 'react-icons/fi'

import './styles.css';

const DropZone = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);
    setSelectedFileUrl(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      {
        selectedFileUrl 
          ? <img src={selectedFileUrl} alt="Thumbnail" />
          : (
            isDragActive 
            ?
            <p>Arraste uma imagem aqui...</p> 
            :
            <p>
                <FiUpload />
                Arraste uma imagem aqui...<br />ou clique e selecione o arquivo.
            </p>
          )
      }
    </div>
  )
}

export default DropZone;