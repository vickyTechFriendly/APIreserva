import { Router } from "express";
import userRouter from "./users.js";
import buildingRouter from "./buildings.js";
import roomRouter from "./rooms.js";
import resourcesRouter from "./resources.js";
import reservationRouter from "./reservations.js";

const router = Router();

router.use("/users", userRouter);
router.use("/buildings", buildingRouter)
router.use("/rooms", roomRouter);
router.use("/resources", resourcesRouter);
router.use("/reservations", reservationRouter);


export default router;
