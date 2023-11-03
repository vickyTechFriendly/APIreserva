import { Router } from "express";
import resourcesController from "../controllers/resourcesController.js";

const router = Router();

router.get("/", (req, res) => {
    resourcesController.getAll(req, res);
}
);

export default router;