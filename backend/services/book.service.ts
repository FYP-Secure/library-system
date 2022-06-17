import {PrismaClient, Book} from "@prisma/client";
import {BookBase, BookUpdate} from "../requests/book";
import {ForbiddenException} from "../exceptions/exceptions";

export const createBook = async (bookCreate: BookBase): Promise<Book> => {
    const prisma = new PrismaClient();
    return prisma.book.create({
        data: {
            title: bookCreate.title,
            description: bookCreate.description,
            img: bookCreate.img
        }
    });
}

export const getBookById = async (id: number): Promise<Book> => {
    const prisma = new PrismaClient();
    const book = await prisma.book.findUnique({
        where: {
            id
        }
    })

    if (!book)
        throw new ForbiddenException(`Book with id ${id} is not found!`);

    return book;
}

export const getBooks = async (): Promise<Book[]> => {
    const prisma = new PrismaClient();

    return prisma.book.findMany();
}

export const updateBook = async (id: number, data: BookBase): Promise<Book> => {
    const prisma = new PrismaClient();

    await getBookById(id);

    return prisma.book.update({
        where: {
            id
        },
        data: {
            ...data,
            updateAt: new Date()
        }
    })
}

export const deleteBook = async (id: number): Promise<void> => {
    const prisma = new PrismaClient();
    await prisma.book.delete({
        where: {
            id
        }
    });

    return;
}

export const borrowBook = async (bookId: number, userId: number): Promise<void> => {
    const prisma = new PrismaClient();

    const book = await getBookById(bookId);

    if (book.isBorrowed)
        throw new ForbiddenException(`Book [${bookId}] is borrowed`);

    await prisma.book.update({
        where: {
            id: bookId
        },
        data: {
            isBorrowed: true,
            borrowRecords: {
                create: {
                    studentId: userId
                }
            }
        }
    })
}

export const returnBook = async (borrowId: number, userId: number): Promise<void> => {
    const prisma = new PrismaClient();

    const userWithRecord = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            borrowRecords: {
                where: {
                    id: borrowId
                }
            }
        }
    });

    const bookId = userWithRecord?.borrowRecords.at(0)?.bookId || null;

    if (!bookId)
        throw new ForbiddenException(`Invalid record`);

    await prisma.book.update({
        where: {
            id: bookId
        },
        data: {
            isBorrowed: false,
            borrowRecords: {
                update: {
                    where: {
                        id: borrowId
                    },
                    data: {
                        returnDate: new Date()
                    }
                }
            }
        }
    })
}