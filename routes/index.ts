import express, { Router } from "express";
const router: Router = express.Router();
import {
  sessionController,
  registerController,
  refreshController,
  productController,
} from "../controllers";
import { authMiddleware } from "../middlewares";

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const uniqueName = `${file.originalname}-${suffix}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueName);
  },
});

let upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 5MB
});

// register
router.post("/auth/register", registerController.register);
// session
router.post("/auth/login", sessionController.login);
router.post("/logout", authMiddleware, sessionController.logout);
// refresh
router.post("/refresh", authMiddleware, refreshController.refersh);
// product
router.post("/upload/product", upload.single("image"), productController.add);

export default router;
