import "./PrivateHome.css";

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosDB, setHeaders } from "../../../services/axiosDB";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginSlice } from "../../../store";
import ListLibraryCards from "../../../components/ListLibraryCards";
import "./PrivateHome.css";

function PrivateHome() {
    const auth = useSelector((state) => state.token);
    const [alert, setAlert] = useState();
    const [userGames, setUserGames] = useState()
    const dispatch = useDispatch();
    const getLibrary = async () => {
      try {
        const { data } = await axiosDB(
          `/library`, setHeaders()
        );
        let arr = []
        data.product.map(item => arr.push({gameID:item.gameID, gameName:item.gameName}))
        dispatch(loginSlice.actions.setLibrary(arr))
        setUserGames(arr)
          
      } catch (error) {
        setAlert({ msg: error.response.data.msg, error: true });
      }
    };
        useEffect(() => {
        getLibrary();
    }, []);

  if (!auth) return <Navigate to="/login" />;
  return (

      <ListLibraryCards games={userGames} />

  );
}

export default PrivateHome;
