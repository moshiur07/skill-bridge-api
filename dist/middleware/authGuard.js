import { auth } from "../lib/auth";
const authGuard = (...roles) => {
    return async function (req, res, next) {
        const session = await auth.api.getSession({ headers: req.headers });
        if (!session) {
            res.status(401).json({
                message: "You are not welcome",
            });
        }
        req.user = {
            id: session?.user.id,
            email: session?.user.email,
            name: session?.user.name,
            role: session?.user.role,
        };
        if (roles.length && !roles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                message: "Forbidden",
            });
        }
        next();
    };
};
export default authGuard;
//# sourceMappingURL=authGuard.js.map