import jwt from "jsonwebtoken";

const generarJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    //.sign es un metodo que te permite generar un JWT

    expiresIn: "30d"
  });
};

export default generarJWT;
