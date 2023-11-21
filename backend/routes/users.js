import { Router } from "express";
import userController from "../controllers/userController.js";
import verified from "../middlewares/jwt.js";

const router = Router();

router.get("/", verified, (req, res) => {
    userController.getAll(req, res);
});

router.get("/:id", (req, res) => {
    userController.getById(req, res);
});

router.post("/register", (req, res) => {
    userController.create(req, res);
});

router.put("/:id/edit", (req, res) => {
    userController.edit(req, res);
});

router.delete("/:id/delete", (req, res) => {
    userController.deleteUser(req, res);
});

router.post("/login", (req, res) => {
    userController.login(req, res);
});

router.get("/logout", (req, res) => {
    userController.logout(req, res);
});

export default router;