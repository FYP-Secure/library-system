import {Card, Spin} from "antd";
import axios from "axios";
import {SuccessNotification} from "../notification/success";
import {ErrorNotification} from "../notification/error";
import {useState} from "react";

export const BookCard = ({ title, description, bookId }: { title: string, description: string, bookId: number }) => {

    const [loading, setLoading] = useState(false);

    const onBorrow = () => {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_API_URL}/borrow/${bookId}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then((res) => {
                SuccessNotification("Book borrowed successfully");
            })
            .catch((error) => {
                ErrorNotification(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <>
            {
                loading ? (
                    <Spin size={"large"} />
                ) : (
                    <Card title="Book" extra={<a onClick={() => onBorrow()}>Borrow</a>} style={{ width: 300 }}>
                        <p>{ title }</p>
                        <p>{ description }</p>
                    </Card>
                )
            }
        </>
    )
}
