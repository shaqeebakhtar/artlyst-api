import express, { Router } from "express";
const router: Router = express.Router();
import {
  sessionController,
  registerController,
  refreshController,
  productController,
} from "../controllers";
import { authMiddleware } from "../middlewares";

// register
router.post("/auth/register", registerController.register);
// session
router.post("/auth/login", sessionController.login);
router.post("/logout", authMiddleware, sessionController.logout);
// refresh
router.post("/refresh", authMiddleware, refreshController.refersh);
// product
router.post("/upload/product", productController.add);

export default router;
