import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

// Públicas

import Login from "../pages/Login";
import RegisterUser from "../pages/Register/User";

// Logados

import Galeria from "../pages/Galeria";
import Profile from "../pages/Profile";
import Upload from "../pages/Upload";

// Administração

import Users from "../pages/admin/Users";
import Images from "../pages/admin/Images";


export default function Routes() {
  
  return (
    <Switch>
      
      <Route path="/" exact component={Login} />
      <Route path="/register/user" component={RegisterUser} />

      <Route path="/galeria" component={Galeria} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      
      <Route path="/upload" component={Upload} isPrivate />

      <Route path="/admin/users" component={Users} isPrivate />
      <Route path="/admin/images" component={Images} isPrivate isAdmin />


    </Switch>
  );
}
