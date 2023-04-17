import express from "express";
const router = express.Router();

// import express request limit - 7.
import rateLimiter from "express-rate-limit";
const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15min
    max: 10,
    message: "Too many requets. Please try again after 15 minutes.",
});

import auth from "../middleware/auth.js";
import testUser from "../middleware/testUser.js";
import {
    register,
    login,
    updateUser,
    getCurrentUser,
    logout,
} from "../controllers/authController.js";

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/logout").get(logout);
router.route("/updateUser").patch(auth, testUser, updateUser);
router.route("/getCurrentUser").get(auth, getCurrentUser);
export default router;
