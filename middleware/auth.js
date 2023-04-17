import { UnAuthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        throw new UnAuthenticatedError("Authentication Invalid.");
    }
    // veryfing the authenticity of token
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const testUser = payload.userId === "643af46fcfd08c812c5190c2";
        req.user = { userId: payload.userId, testUser };
        next();
    } catch (error) {
        throw new UnAuthenticatedError("Authentication Invalid.");
    }
};

export default auth;
