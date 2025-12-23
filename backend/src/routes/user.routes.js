import express from "express";
import { createUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);

export default router;