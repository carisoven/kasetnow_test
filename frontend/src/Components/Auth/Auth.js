import React, { useState,useEffect } from "react";
//Route
import { Redirect } from 'react-router-dom';
//Css & Photo
import "./Auth.css";
import Logo from "../menu/kasetnow-logo.png";
import $ from "jquery";
//Redux
import {login} from '../redux/action/auth'
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Login = ({login,isAuthenticated }) => {
  //Fix size UI
  useEffect(() => {
    $(document).ready(function() {
      var height = $(window).height();
      $('.backg').css('height',height);
  });
  }, [])
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e =>{
    e.preventDefault();
    console.log(formData);
    login(username, password);
  }
  
  if (isAuthenticated) {
    return <Redirect to='/home' />;
  }
  return (
    <div className="backg">
      <div class="login-page">
        <img src={Logo} alt="Logo" />
        <div class="form">
          <form class="login-form" onSubmit={(e) => onSubmit(e)}>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="username"
              onChange={(e) => onChange(e)}
              required
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="password"
              onChange={(e) => onChange(e)}
              required
            />
            <button>login</button>
            <p class="message">
              {/* Not registered? <a href="#">Create an account</a> */}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  admin : PropTypes.bool,
  userrole: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  admin: state.auth.admin,
  userrole : state.auth.userrole
});

export default connect(mapStateToProps, { login })(Login);
