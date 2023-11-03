import { Router } from "express";
import userController from "../controllers/userController.js";
//import verified from "../middlewares/jwt";

const router = Router();

router.get("/", (req, res) => {
    userController.getAll(req, res);
});

export default router;