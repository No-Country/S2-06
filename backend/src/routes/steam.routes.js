import express from "express";
import {
    getFullGameInfo
  } from "../controllers/steam.controllers.js";

  const routerSteam = express.Router();

  routerSteam.get("/:gameID", getFullGameInfo);
 
  export default routerSteam;