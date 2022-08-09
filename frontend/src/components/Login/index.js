import React from "react";
import { useState } from "react";
import Alerta from "../Alerta";
import logo from "../../assets/logo.svg";
import "./login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loginSlice } from "../../store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.token);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // validando que todos los campos se completen
    if ([email, password].includes("")) {
      setAlerta({
        msg: "All fields are required",
        error: true
      });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "Your password must be at least 6 or more characters",
        error: true
      });
      return;
    }
    setAlerta({});
    try {
      const { data } = await axios.post("http://localhost:4000/api/user/login", {
        email,
        password
      });
      dispatch(
        loginSlice.actions.setUser({
          userID: data._id,
          email: data.email,
          token: data.token,
          isLogged: true,
          userName: data.name,
          gamesArray: []
        })
      );
      console.log(data);
      navigate("/private/");
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


  if (auth) return <Navigate to="/private" />;
  const { msg } = alerta;
  return (
    <>
      <div className="container">
        <div className="container-header">
          <div className="register-header">
            <img className="" src={logo} alt="logo" />
            <h1 className="title">Log In</h1>
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

          <input className="submit-register" type="submit" value="Log In" />
        </form>
        <nav className="forgot-register">
          <Link className="link-login" to={"/forgot"}>
            <p className="login--register">Did you forget your password? Click here!</p>
          </Link>
          <Link className="link-login" to={"/register"}>
            {" "}
            <p className="login--register">If you dont have a user, Click here!</p>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;
