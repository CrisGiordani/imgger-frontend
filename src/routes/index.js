import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

// Públicas

import Login from "../pages/Login";
import RegisterUser from "../pages/Register/User";

// Logados

import Galeria from "../pages/Galeria";
import Profile from "../pages/Profile";

// Administração

import AllUsers from "../pages/AllUsers";
import AllImages from "../pages/AllImages";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/register/user" exact component={RegisterUser} />

      <Route path="/galeria" component={Galeria} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />

      <Route path="/allusers" component={AllUsers} isPrivate />
      <Route path="/allimages" component={AllImages} isPrivate />

    </Switch>
  );
}
