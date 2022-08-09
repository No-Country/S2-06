import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Alerta from "../../components/Alerta";
import { Link } from "react-router-dom";
import "./Confirmed.css";
import { axiosDB } from "../../services/axiosDB";

function Confirmed() {
  const token = useParams();

  const [alert, setAlert] = useState({});
  const [confirm, setConfirm] = useState(false);
  const getToken = async () => {
    try {
      const { data } = await axiosDB(
        `/user/confirmed/${token.token}`
      );
      setAlert({ msg: data.msg, error: false });
      setConfirm(true);
    } catch (error) {
      setAlert({ msg: error.response.data.msg, error: true });
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div>
      {alert?.msg && confirm !== true && <Alerta alerta={alert} />}
      {confirm && (
        <div className="container-confirm">
          <h1 className="title-confirm">Confirmed User</h1>
          <Link className="link-confirmed" to={"/login"}>
            <p className="redirect-confirm">Click Here to Continue </p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Confirmed;
