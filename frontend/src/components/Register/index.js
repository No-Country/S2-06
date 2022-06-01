import React from "react";
import { useState } from "react";
import Alerta from "../Alerta";
import axios from "axios";
import logo from "../../Assets/logo.svg";
import "./register.css";
const Register = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validando que todos los campos se completen
    if ([name, userName, email, birthday, password, repeatPassword].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      });
      return;
    }
    // validando las contraseñas
    if (password !== repeatPassword) {
      setAlerta({
        msg: "Las contraseñas no son iguales",
        error: true
      });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "Las contraseña tiene que ser de mas de 6 caracteres",
        error: true
      });
      return;
    }
    setAlerta({});

    // create the User

    try {
      const { data } = await axios.post("http://localhost:4000/api/user", {
        name,
        userName,
        password,
        email,
        birthday
      });
      setAlerta({
        // aca extraemos el error que viene desde el servidor
        msg: data.msg,
        error: false
      });
    } catch (error) {
      setAlerta({
        // aca extraemos el error que viene desde el servidor
        msg: error.response.data.msg,
        error: true
      });
    }
  };

  const { msg } = alerta;
  console.log(alerta);
  return (
    <>
      <div className="container">
        <div className="container-header">
          <div className="register-header">
            <img className="" src={logo} alt="logo" />
            <h1 className="title">Sign Up</h1>
            <h1 className="hidden">Up</h1>
          </div>
        </div>
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="control-form">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="control-form">
            <label className="label" htmlFor="userName">
              UserName
            </label>
            <input
              id="userName"
              type="text"
              placeholder="UserName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
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

          <div className="control-form">
            <label className="label" htmlFor="birthday">
              Birthday
            </label>
            <input
              id="birthday"
              type="text"
              placeholder="Birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>

          <div className="control-form">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="control-form">
            <label className="label" htmlFor="password2">
              Repeat Password
            </label>
            <input
              id="password2"
              type="password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>

          <input className="submit-register" type="submit" value="Create An Account" />
        </form>
      </div>
    </>
  );
};

export default Register;
