import {Borrow, PrismaClient} from "@prisma/client";

export const getBorrowedBooks = async (userId: number, isCurrent: boolean): Promise<Borrow[]> => {
    const prisma = new PrismaClient();

    const returnDateCondition = isCurrent ?
        {}
        :
        {returnDate: null}

    return prisma.borrow.findMany({
        where: {
            studentId: userId,
            ...returnDateCondition
        }
    })
}