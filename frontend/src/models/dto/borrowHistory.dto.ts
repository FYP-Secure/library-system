export type BorrowHistory = {
    id: number,
    createdAt: string,
    updateAt: string,
    studentId: number,
    bookId: number,
    borrowDate: string,
    returnDate: string | null,
    book: {
        title: string
    }
    bookTitle?: string
}

export type BorrowHistoryDto = BorrowHistory[]
