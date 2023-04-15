"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_service_1 = __importDefault(require("../../services/error-service"));
class RegisterController {
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // else create the user
            // generate jwt tokens
            // verify request
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return next(error_service_1.default.validation("all fields are required"));
            }
            // check if user is already present in the db
            try {
            }
            catch (error) {
                return next(error);
            }
            return res.status(200).json({ message: "user created successfully" });
        });
    }
}
exports.default = new RegisterController();
//# sourceMappingURL=register-controller.js.map