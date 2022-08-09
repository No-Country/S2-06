import User from "../models/User.js";
import jwt from "jsonwebtoken"


export default async function checkAuth( req, res, next) {
    let token;
    console.log("arranco el auth")
    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    )   {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.logged = true
            req.user = await User.findById(decoded.id).select("-password -token -isDeleted -confirmed -birthday -createdAt -updatedAt -__v")
            if (!req.user){return res.status(404).json({msg: "Habemus cagada, el usuario que creo este token no existe mas"})}
            return next()

         } catch (error) {
            console.log("fallo el auth no decodeado o mal token")
             return res.status(401).json({msg: "Habemus cagada, el token no se decodeo bien"})
             
         }
    }
    if (!token) {
        const error = new Error("token no válido")
        res.status(401).json({msg: error.message})
        console.log("fallo el auth")
    }

};

