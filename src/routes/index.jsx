import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

// Públicas

import Login from "../pages/Login";
import RegisterUser from "../pages/Register";

// Logados

import Home from "../pages/Home";
import Galeria from "../pages/Galeria";
import Profile from "../pages/Profile";
import Upload from "../pages/Upload";

// Administração

import Users from "../pages/admin/Users";
import UserProfile from "../pages/admin/UserProfile";


export default function Routes() {
  
  return (
    <Switch>
      
      {/* Rotas públicas */}
      <Route path="/" exact component={Login} />
      <Route path="/register" component={RegisterUser} />

      {/* Rotas privadas */}
      <Route path="/home" exact component={Home} isPrivate />
      <Route path="/galeria/:id" component={Galeria} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/upload" component={Upload} isPrivate />

      {/* Rotas administrativas */}
      <Route path="/admin/users" component={Users} isAdmin isPrivate />
      <Route path="/admin/user/:id" component={UserProfile} isAdmin isPrivate />
      

    </Switch>
  );
}
