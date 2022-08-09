import Alerta from "../../components/Alerta";
import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosDB } from "../../services/axiosDB";
import logo from "../../assets/logo.svg";


function NewPassword() {
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [alerta, setAlerta] = useState({});
    const token = useParams();
    const navigate = useNavigate()
    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // validando que todos los campos se completen
      if (password === "" || repeatPassword === "") {
        setAlerta({
          msg: "Todos los campos son obligatorios",
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

      if (password!==repeatPassword) {
        setAlerta({
          msg: "Passwords arent equal",
          error: true
        });
        return;
        
      }

      try {
        const { data } = await axiosDB.post(
          `/user/forgot-password/${token.token}`,
          { password } 
        );
        setAlerta({
          msg: data.msg,
          error: false,
        });
        setTimeout(() => {
            navigate(`/login`)
          }, 3000);

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }

    };
    const { msg } = alerta;
    return (
      <>
        <div className="container">
          <div className="container-header">
            <div className="register-header">
              <img className="" src={logo} alt="logo" />
              <h1 className="title">Change Password</h1>
              <h1 className="hidden">Up</h1>
            </div>
          </div>
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit} className="register-form">
  
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
              <label className="label" htmlFor="password">
                Repeat Password
              </label>
              <input
                id="repeatPassword"
                type="password"
                placeholder="Password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </div>
  
            <input className="submit-register" type="submit" value="Change Password" />
          </form>
        </div>
      </>
    );
  };

export default NewPassword;