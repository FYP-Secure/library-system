import {Router} from "express"
import {requireAuth} from "../middlewares/authMiddleware";
import {Role} from "@prisma/client";
import {AuthUser} from "../requests/auth";
import {borrowBook, returnBook} from "../services/book.service";

export const router = Router();

/**
 * borrow book
 */
router.post("/borrow/:bookId", requireAuth([Role.STUDENT]), async(req, res, next) => {
    const currentUser : AuthUser = res.locals.user;
    const { bookId } = req.params;

    try {
        await borrowBook(+bookId, currentUser.id);
        res.send(200);
    } catch (e) {
        next(e);
    }
})

/**
 * return book
 */
router.post("/return/:borrowId", requireAuth([Role.STUDENT]), async(req, res, next) => {
    const currentUser : AuthUser = res.locals.user;
    const { borrowId } = req.params;

    try {
        await returnBook(+borrowId, currentUser.id);
        res.send(200);
    } catch (e) {
        next(e);
    }
})