import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma";
declare const authGuard: (...roles: Role[]) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default authGuard;
//# sourceMappingURL=authGuard.d.ts.map