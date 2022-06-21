import {useEffect, useState} from "react";
import {BookListDto} from "../../../models/dto/book.dto";
import axios from "axios";
import {ErrorNotification} from "../../../components/notification/error";
import {BorrowHistory, BorrowHistoryDto} from "../../../models/dto/borrowHistory.dto";
import {Button, Space, Table} from "antd";
import moment from "moment";
import {SuccessNotification} from "../../../components/notification/success";

export const UserBorrowHistory = () => {

    const [historyList, setHistoryList] = useState<BorrowHistoryDto>([]);

    const columns = [
        {
            title: 'Book Title',
            dataIndex: 'bookTitle',
            key: 'bookTitle',
        },
        {
            title: 'Borrow Date',
            dataIndex: 'borrowDate',
            key: 'borrowDate',
            render: (_: any, record: BorrowHistory) => (
                <>
                    {
                        moment(record.borrowDate).format("YYYY-MM-DD HH:mm:ss")
                    }
                </>
            ),
        },
        {
            title: 'Return Date',
            dataIndex: 'returnDate',
            key: 'returnDate',
            render: (_: any, record: BorrowHistory) => (
                <>
                    {
                        record.returnDate ? (
                            moment(record.borrowDate).format("YYYY-MM-DD HH:mm:ss")
                        ) : (
                            "-"
                        )
                    }
                </>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, record: BorrowHistory) => (
                <>
                    {
                        !record.returnDate ? (
                            <Button type={"link"} onClick={() => onReturnBook(record)}>Return</Button>
                        ) : (
                            "-"
                        )
                    }
                </>
            ),
        },
    ];

    const onReturnBook = (record: BorrowHistory) => {
        axios.post(`${process.env.REACT_APP_API_URL}/return/${record.id}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then((res) => {
                SuccessNotification("Returned Successfully")
                onGetBorrowHistory()
            })
            .catch((error) => {
                ErrorNotification(error);
            })
    }

    const onGetBorrowHistory = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/borrows`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then((res) => {
                const response: BorrowHistoryDto = res.data;
                setHistoryList(response.map((history) => {
                    return {
                        ...history,
                        bookTitle: history.book.title
                    }
                }));
            })
            .catch((error) => {
                ErrorNotification(error);
            })
    }

    useEffect(() => {
        onGetBorrowHistory();
    }, []);

    return (
        <>
            <Table dataSource={historyList} columns={columns} />
        </>
    )
}
