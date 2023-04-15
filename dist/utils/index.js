"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEBUG_MODE = exports.APP_PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
_a = process.env, exports.APP_PORT = _a.APP_PORT, exports.DEBUG_MODE = _a.DEBUG_MODE;
//# sourceMappingURL=index.js.map