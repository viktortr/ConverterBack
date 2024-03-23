import express from "express";
import { getAllUsers, addUsers, deleteUsers, examUsers, InfoUser, changePassword } from "./userController.js";

const router = express.Router();

router.get("/all", getAllUsers);

// router.get("/user", User)

router.get("/user/:userId", InfoUser);

router.post("/register", addUsers);

router.post("/login", examUsers);

router.patch("/changepassword", changePassword)

// router.patch("/upd", updateUsers);

router.delete("/del/:userId", deleteUsers);
 

export default router;