import { NextFunction, Request, Response } from "express";
import { Role } from "@prisma/client";
import { auth } from "../lib/auth.js";

const authGuard = (...roles: Role[]) => {
  return async function (req: any, res: Response, next: NextFunction) {
    try {
      const session = await auth.api.getSession({
        headers: req.headers as any,
      });
      if (!session) {
        return res.status(401).json({ message: "You are not welcomed!" });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role as string,
      };

      if (roles.length && !roles.includes(req.user.role as Role)) {
        return res.status(403).json({ success: false, message: "Forbidden" });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authGuard;
