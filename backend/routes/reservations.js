import {Router} from "express";
import reservationController from "../controllers/reservationController.js";

const router = Router();

router.get("/", (req, res) => {
    reservationController.getAll(req, res);
});


export default router;