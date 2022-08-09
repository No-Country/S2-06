import React from "react";
import "./alerta.css";

const Alerta = ({ alerta }) => {
  console.log(alerta.error);
  return <div className={alerta.error ? "error" : "true"}>{alerta.msg}</div>;
};

export default Alerta;
