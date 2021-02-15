import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RouterWrapper({
  component: Component,
  isPrivate = false,
  isAdmin = false,
  ...rest
}) {
  
  const signed = useSelector((state) => state.auth.signed);  
  const admin = useSelector((state) => state.user.admin); 

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }
  if (signed && !isPrivate) {
    return <Redirect to="/galeria" />;
  }
  if (signed && !admin && isAdmin) {
    return <Redirect to="/galeria" />;
  }


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
