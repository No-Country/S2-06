import express from "express";
import conectarDb from "./src/config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import globalErrorHandler from "./src/middleware/error.middleware.js";
import router from "./src/routes/user.routes.js";

const app = express();

dotenv.config({ path: "./config.env" });

app.use(express.json());

app.use(globalErrorHandler);

conectarDb();

// configuration cors

const whiteList = ["http://localhost:3000"];

const corsOption = {
  origin: function (origin, callback) {
    console.log(origin);
    if (whiteList.includes(origin)) {
      // Puede consulta la api
      callback(null, true);
    } else {
      callback(new Error("Error de Cors"));
    }
  }
};

app.use(cors(corsOption));

app.use("/api/user", router);

// Setting
app.set("port", 4000);

// Starting de server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
