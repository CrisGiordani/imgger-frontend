import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

export default function RouterWrapper({
  component: Component,
  isPrivate = false,
  isAdmin = false,
  ...rest
}) {
    
  // const [userId] = useState(localStorage.getItem('apiUserId'));
  // const [token, setToken] = useState(false);
  // const [userAdmin, setUserAdmin] = useState(false);

  // useEffect(()=> {
  //   if (localStorage.getItem('apiUserAdmin') === "0") { setUserAdmin(false); };
  //   if (localStorage.getItem('apiUserAdmin') === "1") { setUserAdmin(true); };
  // }, [])

  // useEffect(()=> {
  //   if (localStorage.getItem('apiToken')!== null) { 
  //     setToken(true); 
  //   } else {
  //     setToken(false); 
  //   };
  // }, [])

  // // usuário não logado em rota privada
  // if (!token && isPrivate) {
  //   return <Redirect to="/" />;
  // }

  // // usuário logado e rota pública
  // if (token && !isPrivate) {
  //   return <Redirect to="/home" />;
  // }

  // // usuário comum, logado em rota administrativa
  // if (!userAdmin && isAdmin) {
  //   return <Redirect to={`/galeria/${userId}`} />;
  // }

  return <Route {...rest} component={Component} />;
}

RouterWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  isAdmin: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouterWrapper.defaultProps = {
  isPrivate: false,
  isAdmin: false,
};
