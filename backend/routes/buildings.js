import { Router } from "express";
import buildingController from "../controllers/buildingController.js";
//import verified from "../middlewares/jwt";

const router = Router();

router.get("/", (req, res) => {
    buildingController.getAll(req, res);
});

export default router;