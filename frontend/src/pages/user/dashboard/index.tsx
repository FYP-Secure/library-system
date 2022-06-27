import {Space, Table} from "antd";
import {BookCard} from "../../../components/bookCard";
import axios from "axios";
import {useEffect, useState} from "react";
import {BookListDto} from "../../../models/dto/book.dto";
import {ErrorNotification} from "../../../components/notification/error";

export const UserDashboard = () => {

    const [bookList, setBookList] = useState<BookListDto>([]);

    const onGetBooksList = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/books`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then((res) => {
                const response: BookListDto = res.data;
                setBookList(response);
            })
            .catch((error) => {
                ErrorNotification(error);
            })
    }

    useEffect(() => {
        onGetBooksList();
    }, []);


    return (
        <Space direction={"horizontal"} style={{ width: "100%" }}>
            {
                bookList.map((book) => {
                    return (
                        <BookCard title={book.title} description={book.description} bookId={book.id} img={book.img} />
                    )
                })
            }
        </Space>
    )
}
