export type BookDto = {
    id: number,
    createdAt: string,
    updateAt: string,
    title: string,
    description: string,
    img: string,
    isBorrowed: boolean
}

export type BookListDto = BookDto[]
