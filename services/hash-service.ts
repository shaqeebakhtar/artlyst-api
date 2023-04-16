import crypto from "crypto";
import { HASH_SECRET as hashSecret } from "../utils";
import bcrypt from "bcrypt";

class HashService {
  generateHash(data: string) {
    return crypto
      .createHmac("sha256", hashSecret as string)
      .update(data)
      .digest("hex");
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async checkPassword(reqPassword: string, userPassword: string) {
    return await bcrypt.compare(reqPassword, userPassword);
  }
}

export default new HashService();
