"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controllers_1 = require("../controllers");
router.post("/auth/register", controllers_1.registerController.register);
router.post("/auth/login", controllers_1.sessionController.login);
router.post("/logout", controllers_1.sessionController.logout);
router.post("/refresh", controllers_1.refreshController.refersh);
exports.default = router;
//# sourceMappingURL=index.js.map