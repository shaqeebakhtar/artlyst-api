"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegisterController {
    register(req, res) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(422).json({ message: "all fields are required!" });
        }
        res.status(200).json({ message: "user created successfully" });
    }
}
exports.default = new RegisterController();
//# sourceMappingURL=register-controller.js.map