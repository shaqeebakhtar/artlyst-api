import express, { Router, Request, Response } from "express";
const router: Router = express.Router();
import {
  sessionController,
  registerController,
  refreshController,
} from "../controllers";
import { authMiddleware } from "../middlewares";

router.post("/auth/register", registerController.register);
router.post("/auth/login", sessionController.login);
router.post("/logout", sessionController.logout);
router.post("/refresh", refreshController.refersh);

export default router;
