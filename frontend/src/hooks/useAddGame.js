import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { axiosDB, setHeaders } from "../services/axiosDB";
import { loginSlice } from "../store";

export function useAddGame() {
  const [alert, setAlert] = useState();
  const dispatch = useDispatch()

  const addGame = async (steamAppID, game) => {
    try {
    const { data } = await axiosDB.post(
      `/library`, 
    {
      gameID: steamAppID,
      gameName: game  
    },
    setHeaders());

        setAlert({ msg: data.msg, error: false });
        dispatch(loginSlice.actions.addGameToLibrary({
          gameID: steamAppID,
          gameName: game  
        }))
       
      } catch (error) {
        setAlert({ msg: error.response.data.msg, error: true });
      }
    }
   

  return { alert, addGame };
}