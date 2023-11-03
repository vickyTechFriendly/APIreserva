import { Router } from "express";
import roomController from "../controllers/roomController.js";

const router = Router();

router.get("/", (req, res) => {
    roomController.getAll(req, res);
});

router.get("/:id", (req, res) => {
    roomController.getById(req, res);
});


export default router;
