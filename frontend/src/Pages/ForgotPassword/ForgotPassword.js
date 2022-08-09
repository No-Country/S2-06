import React from "react";
import { useState } from "react";
import Alerta from "../../components/Alerta";
import logo from "../../assets/logo.svg";
import "../../components/Login/login.css";
import "./ForgotPassword.css";
import { axiosDB } from "../../services/axiosDB";

function ForgotEmail() {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validando que todos los campos se completen
    if ([email].includes("") || email.length < 6) {
      setAlerta({
        msg: "Please, input a correct e-mail",
        error: true
      });
      return;
    }
    // Enviado mail y token para reestablecer el password
    try {
      const { data } = await axiosDB.post(
        `/user/forgot-password`,
        { email } // Este email es lo que espera el backend, lo puedo ver en Postaman
      );
      setAlerta({
        msg: data.msg,
        error: false
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  };
  const { msg } = alerta;

  return (
    <div className="container">
      <div className="container-header">
        <div className="register-header">
          <img className="" src={logo} alt="logo" />
          <h1 className="title">Forgot Password</h1>
          <h1 className="hidden">Up</h1>
        </div>
      </div>
      {msg && <Alerta alerta={alerta} />}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="control-form">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <input className="submit-register" type="submit" value="forgot" />
      </form>
    </div>
  );
}

export default ForgotEmail;
