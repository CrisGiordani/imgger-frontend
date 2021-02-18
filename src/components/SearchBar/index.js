import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPower } from "react-icons/fi";
import { Form, Input } from "@rocketseat/unform";

export default function SearchBar() {
  
  return (
    <form action="#"> 
        <input type="text"
            placeholder=" Buscar imagens..."
            name="search" /> 
        <button> 
            <i className="fa fa-search"> </i> 
        </button> 
    </form>
  );
}
