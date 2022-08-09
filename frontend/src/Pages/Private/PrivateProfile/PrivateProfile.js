import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { axiosDB, setHeaders } from "../../../services/axiosDB";
import "./PrivateProfile.css";
import logo from "../../../assets/logo.svg";
import Alerta from "../../../components/Alerta";
import axios from "axios";

function PrivateProfile() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const auth = useSelector((state) => state.token);
  const [alert, setAlert] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validando que todos los campos se completen
    if ([name, userName, birthday ].includes("")) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true
      });
      return;
    }
    setAlert({});
    // create the User

    try {
      const { data } = await axios.put("http://localhost:4000/api/user/profile/change", {
        name,
        userName,
        birthday
      }, setHeaders());
      setAlert({
        // aca extraemos el error que viene desde el servidor
        msg: data.msg,
        error: false
      });
    } catch (error) {
      console.log(error)
      setAlert({
        // aca extraemos el error que viene desde el servidor
        msg: error.response.data.msg,
        error: true
      });
    }
  };
  
  const getUser = async () => {
    try {
      const { data } = await axiosDB(`/user/profile`, setHeaders());
      console.log(data);
      setName(data.name);
      setUserName(data.userName);
      setEmail(data.email);
      setBirthday(data.birthday.split("T")[0]);
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log(alert)
  if (!auth) return <Navigate to="/login" />;
  return (
    <>
      <div className="container-profile">
        <div className="container-header">
          <div className="profile-header">
            <img className="" src={logo} alt="logo" />
            <h1 className="title">Your Profile</h1>
            <h1 className="hidden">Up</h1>
          </div>
        </div>

        {alert && <Alerta alerta={alert} />}
        <form className="profile-form" onSubmit={handleSubmit}>
          <p className="profile-email">Your current e-mail is {email}</p>
          <div className="control-form">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input id="name" type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div className="control-form">
            <label className="label" htmlFor="userName">
              UserName
            </label>
            <input id="userName" type="text" placeholder="UserName" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
          </div>


          <div className="control-form">
            <label className="label" htmlFor="birthday">
              Birthday
            </label>
            <input id="birthday" type="date" placeholder="Birthday" value={birthday} onChange={(e)=>setBirthday(e.target.value)}/>
          </div>

          <input className="submit-register" type="submit" value="Edit Your Profile" />
        </form>
      </div>
    </>
  );
}

export default PrivateProfile;
