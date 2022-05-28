// Import Models
import User from "../models/User.js";

import createJWT from "../helpers/CreateJWT.js";

// Import Helpers
import AppError from "../helpers/AppError.js";
import createId from "../helpers/createId.js";

// Create new user
const createNewUser = async (req, res, next) => {
  // evitar registros duplicados
  const { email } = req.body; // vamos a extraer el email
  // el metodo findOne te va a buscar el primer email que esta en la db y que coincida con lo que le mandas desde el body
  const existsUser = await User.findOne({ email: email }); // si no le ponemos el await va a intentar registrar al user en vez de verficar primero si ese email ya existe

  if (existsUser) {
    const error = new Error("User already registered");
    console.log(error);
    return res.status(400).json({ msg: error.message }); // devuelvo el error y con el .message entro al mensaje de la fila 12
  }
  try {
    const user = new User(req.body); // aca creamos un nuevo objeto de tipo user con la info del modelo
    user.token = createId(); // user es un objeto y le asignamos al token la funcion createId que es un id aleatorio(generamos un token por user)
    await user.save(); // le ponemos await, para que espere a que almacene el objeto y luego si te da la respuesta del json
    res.json("user created successfully, see your Email to confirm your Account");
  } catch (error) {
    console.log(error);
  }
};
// loguear al user
const authenticate = async (req, res, next) => {
  const { email, password } = req.body;
  // Comprobar si el user existe en la db
  const user = await User.findOne({ email: email });
  if (!user) {
    const error = new Error("User not found");
    return res.status(400).json({ msg: error.message });
  }
  // comprobar si el user esta confirmado
  if (!user.confirmed) {
    const error = new Error("Your account has not been confirmed");
    return res.status(400).json({ msg: error.message });
  }

  // comprobar su password
  if (await user.comprobarPassword(password)) {
    // si retorno el usuario me retorna mucha info que no necesito como la password
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: createJWT(user._id) // para comprobar la password le mandamos un token
    });
  } else {
    const error = new Error("Your password is incorrect");
    return res.status(400).json({ msg: error.message });
  }
};

// para confirmar la cuenta que por defecto esta en false
// La idea es que le llegue un email para confirmar su cuenta y lo haga a travez de un token
const confirmed = async (req, res) => {
  // vamos a acceder a los datos del token a travez de la url CLASE 378
  const { token } = req.params; // extraemos el token que viene de la url
  const userConfirmed = await User.findOne({ token }); // comprobamos si el token es el mismo que esta en la db
  if (!userConfirmed) {
    const error = new Error(" incorrect Token");
    return res.status(400).json({ msg: error.message });
  }
  // cuando encontramos al usuario que esta ok, lo primero es pasar el confirmed  a  true
  try {
    userConfirmed.confirmed = true;
    userConfirmed.token = ""; // la idea es que el token es de un solo uso por eso se tiene  que eliminar
    await userConfirmed.save();
    res.json({ msg: "Successfully confirmed User" });
  } catch (error) {
    console.log(error);
  }
};

// El usuario va a enviar su email al cual hay que comprobar que exista, que este confirmado y entonces ahi le mandamos un token para que cambie el password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    const error = new Error("User not found");
    return res.status(400).json({ msg: error.message });
  }

  // si existe el user
  try {
    user.token = createId(); // aca genero un  nuevo token que es el que le va a llegar por mail
    await user.save();
    res.json({ msg: "We have sent an email with intructions" });
  } catch (error) {
    console.log(error);
  }
};

// una vez que le llego el mail tenemos que validar que el token sea valido e identificar que user intenta cambiar el password
const checkToken = async (req, res) => {
  const { token } = req.params;
  const validToken = await User.findOne({ token });
  if (validToken) {
    res.json({ msg: "The token is correct and the user exist" });
  } else {
    const error = new Error(" incorrect Token");
    return res.status(400).json({ msg: error.message });
  }
};

// una vez que tenemos las comprobacion tenemos que enviar el nuevo password(a travez de un form) y hashearlo CLASE 382
const newToken = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  // primero comprobamos que el token sea valido
  const user = await User.findOne({ token });
  if (user) {
    user.password = password; // aca le asignamos el password que viene desde el form(que es el que estamos cambiando) y lo asigamos al objeto user
    // Eliminamos el token
    user.token = "";
    // almacenamos los cambios en la db
    try {
      await user.save();
      res.json({ msg: "The password was modified successfully" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error(" incorrect Token");
    return res.status(400).json({ msg: error.message });
  }
};

export { createNewUser, authenticate, confirmed, forgotPassword, checkToken, newToken };
