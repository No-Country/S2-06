import React from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import install from "../../assets/icons/install.svg";
import genericImg from "../../assets/ResizedGenericImg.png"

const Card = (props) => {
  const navigate = useNavigate();
  const userGames = useSelector((state) => state.gamesArray);
  var isOwned = false;
  if (userGames?.length !== 0) {
    isOwned = !!userGames?.find((item) => item.gameID === Number(props.steamAppID));
  }


  function onClick() {
    navigate(`/games/${props.steamAppID}`);
  }
  return (
    <>
      {props.steamAppID && (
        <div className="conteiner-Card" onClick={() => onClick()}>
          <div>
            <img
              className="card-img"
              src={`https://steamcdn-a.akamaihd.net/steam/apps/${props.steamAppID}/header.jpg`}
              alt={props.name}
              onError={({ currentTarget }) => {
                currentTarget.onerror = false; // previene que se vuelva a llamar si falla de nuevo. Ahi recien ve el texto alternativo
                currentTarget.src=genericImg;
              }}
            />
          </div>
          <p className="text-card">{props.name}</p>

          {props.inLibrary ? (
            <div className="container-install">
              <img className="img-install" src={install} alt="inst" />
              <p className="install">Install</p>
            </div>
          ) : isOwned ? (
            <button className="isOwnedButton">Owned</button>
          ) : Math.round(props.savings) ? (
            <div className="details">
              <p className="discount">{props.salePrice}$</p>
              <p className="price">{props.normalPrice}$</p>
              <p className="percentage">-{Math.round(props.savings)}%</p>
            </div>
          ) : (
            <p className="discount">{props.normalPrice}$</p>
          )}
        </div>
      )}
    </>
  );
};

export default Card;

/* function UrlExists() {
  var isImg = false
  var http = new XMLHttpRequest();
  http.open('HEAD', "https://steamcdn-a.akamaihd.net/steam/apps/469/header.jpg", false);
  http.send();
  if (http.status != 404)
{       var isImg=true;
       console.log(isImg)}
  else
   { 	var isImg=false
      console.log(isImg)}}
UrlExists() */
