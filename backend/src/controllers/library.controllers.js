import Library from "../models/Library.js";


export const addGame = async (req, res) => {
  const {user, logged , body} = req;
  const gameID = body.gameID //Sacamos el game ID que viene en el body
  const gameName = body.gameName
  const library = await Library.findOne({userID: user._id})  // Buscamos la biblioteca del usuario con el user ID dado por checkAuth
  if (!library) {
    const error = new Error("Library not found"); //Si no la encontramos, tira error
    return res.status(400).json({ msg: error.message });
  }
  if (gameID) {
    console.log(gameID)
    const isInArray = library.product.find(item => item.gameID === gameID) //Checkeamos si el juego ya esta en la library
    if (!isInArray || library === []){  
      library.product.push({gameID: gameID, gameName: gameName}) // Si no esta, pushea el id del juego al array, y crea un nuevo productID
      try {
        await library.save();
        res.json({ msg: "Games added succesfully" });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: error.message });
      }
    }
    else{return res.status(400).json("You already have this game");}
  }
};


export const getLibrary = async (req, res) => {
    const {user, logged} = req;//Este user ya lo buscamos en la auth, no hace falta buscarlo de vuelta, sencillamente agarramos el user id decodeado que nos mando el middleware
    const library = await Library.findOne({userID: user._id}).select("-userID -__v -_id")
    if (!library) {
      const error = new Error("Library not found");
      console.log("library not found")
      return res.status(400).json({ msg: error.message });
    }
    res.json(library)
  };