import type { Request, Response } from "express";

class SessionController {
  async login(req: Request, res: Response) {}
  async logout(req: Request, res: Response) {}
}

export default new SessionController();
