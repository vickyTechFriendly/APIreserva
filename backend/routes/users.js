import { Router } from "express";
import userController from "../controllers/userController.js";
//import verified from "../middlewares/jwt";

const router = Router();

router.get("/", (req, res) => {
    userController.getAll(req, res);
});

router.get("/:id", (req, res) => {
    userController.getById(req, res);
});

router.post("/register", (req, res) => {
    userController.create(req, res);
});

//edit user
router.put("/:id/edit", (req, res) => {
    userController.edit(req, res);
});

//delete user
router.delete("/:id/delete", (req, res) => {
    userController.deleteUser(req, res);
});

export default router;