import {Router} from "express"
import {BookBase, BookUpdate} from "../requests/book";
import {createBook, deleteBook, getBookById, getBooks, updateBook} from "../services/book.service";
import {requireAuth} from "../middlewares/authMiddleware";
import {Role} from "@prisma/client";

export const router = Router();

/**
 * create book
 */
router.post("/book", requireAuth([Role.ADMIN, Role.SUPER_ADMIN]), async (req, res, next) => {
    const bookCreate: BookBase = req.body;

    try {
        const book = await createBook(bookCreate);

        res.json(book);
    } catch (e) {
        next(e);
    }
})

/**
 * get all book
 */
router.get("/books", requireAuth(), async (req, res, next) => {
    try {
        const books = await getBooks();

        res.json(books);
    } catch (e) {
        next(e);
    }
})

/**
 * get one book
 */
router.get("/book/:id", requireAuth(), async (req, res, next) => {
    const {id} = req.params;

    try {
        const book = await getBookById(+id);

        res.json(book)
    } catch (e) {
        next(e);
    }

})

/**
 * update one book
 */
router.put("/book/:id", requireAuth([Role.SUPER_ADMIN, Role.ADMIN]), async (req, res, next) => {
    const {id} = req.params;
    const bookUpdate: BookUpdate = req.body;

    try {
        const book = await updateBook(+id, bookUpdate);

        res.json(book);
    } catch (e) {
        next(e);
    }

})

/**
 * delete one book
 */
router.delete("/book/:id", requireAuth( [Role.SUPER_ADMIN, Role.ADMIN]), async (req, res, next) => {
    const {id} = req.params;

    try {
        await deleteBook(+id);

        res.sendStatus(200);
    } catch (e) {
        next(e);
    }
})