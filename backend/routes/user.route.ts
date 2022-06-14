import {Router} from "express"
import {login, registerAdmin, registerStudent} from "../services/user.service";
import {Login, UserRegister} from "../requests/user";
import {generateJwtTokenPair} from "../services/jwt.service";
import {requireAuth} from "../middlewares/authMiddleware";
import {Role} from "@prisma/client";

export const router = Router();

/**
 * student register
 */
router.post("/student/register", async(req, res, next) => {
    const studentRegister: UserRegister = req.body;
    try {
        const newStudent = await registerStudent(studentRegister);

        res.json(newStudent);
    } catch (e) {
        next(e);
    }
})

/**
 * create admin
 */
router.post("/admin/create", requireAuth([Role.SUPER_ADMIN]), async(req, res, next) => {
    const adminRegister: UserRegister = req.body;

    try {
        const newAdmin = await registerAdmin(adminRegister);

        res.json(newAdmin);
    } catch (e) {
        next(e);
    }
})

/**
 * login
 */
router.post("/login", async(req, res, next) => {
    const loginBody: Login = req.body;
    try {
        const user = await login(loginBody);

        const token = await generateJwtTokenPair(user);

        res.json(token);
    } catch (e) {
        next(e);
    }
})