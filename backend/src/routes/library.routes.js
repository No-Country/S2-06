import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
    addGame,
    getLibrary
  } from "../controllers/library.controllers.js";



const routerLibrary = express.Router();

routerLibrary.post("/",checkAuth, addGame);
routerLibrary.get("/", checkAuth, getLibrary); 



export default routerLibrary;