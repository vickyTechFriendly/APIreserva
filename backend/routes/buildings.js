import { Router } from "express";
import buildingController from "../controllers/buildingController.js";
//import verified from "../middlewares/jwt";

const router = Router();

router.get("/", (req, res) => {
    buildingController.getAll(req, res);
});

router.get("/:id", (req, res) => {
    buildingController.getById(req, res);
});

//all the reservations for a building
router.get("/:id/reservations", (req, res) => {
    buildingController.getReservations(req, res);
});

export default router;