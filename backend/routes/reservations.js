import {Router} from "express";
import reservationController from "../controllers/reservationController.js";
import verified from "../middlewares/jwt.js";

const router = Router();

router.get("/", (req, res) => {
    reservationController.getAll(req, res);
});

router.get("/:id", (req, res) => { 
    reservationController.getById(req, res);
});

router.post("/:id/create", (req, res) => {
    reservationController.create(req, res);
});

export default router; "express";
