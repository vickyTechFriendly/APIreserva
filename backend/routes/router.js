import { Router } from "express";
import userRouter from "./users.js";
import buildingRouter from "./buildings.js";

const router = Router();

router.use("/users", userRouter);
router.use("/buildings", buildingRouter)


export default router;
