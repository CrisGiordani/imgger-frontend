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

import Allusers from "../pages/Allusers";
import AllImages from "../pages/AllImages";

export default function Routes() {
  return (
    <Switch>
      
      <Route path="/" exact component={Login} />
      <Route path="/register/user" exact component={RegisterUser} />

      <Route path="/galeria" component={Galeria} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      
      <Route path="/upload" component={Upload} />

      <Route path="/admin/allusers" exact component={Allusers}  />
      <Route path="/admin/allimages" component={AllImages}  />

    </Switch>
  );
}
