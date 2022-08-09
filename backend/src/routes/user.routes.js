import express from "express";

import {
  createNewUser,
  authenticate,
  confirmed,
  forgotPassword,
  newToken,
  checkToken,
  profile,
  changeProfile
} from "../controllers/users.controllers.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", createNewUser);
router.post("/login", authenticate);
router.get("/confirmed/:token", confirmed);
router.post("/forgot-password", forgotPassword);
router.get("/forgot-password/:token", checkToken);
router.post("/forgot-password/:token", newToken);
router.get("/profile", checkAuth, profile);
router.put("/profile/change", checkAuth, changeProfile);



export default router;
