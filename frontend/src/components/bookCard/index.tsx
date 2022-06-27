import {Card, Image, Spin} from "antd";
import axios from "axios";
import {SuccessNotification} from "../notification/success";
import {ErrorNotification} from "../notification/error";
import {useState} from "react";

export const BookCard = ({ title, description, bookId, img }: { title: string, description: string, bookId: number, img: string }) => {

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
        <div style={{ minHeight: "200vh", maxHeight: "200vh" }}>
            {
                loading ? (
                    <div style={{ textAlign: 'center' }}>
                        <Spin size={"large"} />
                    </div>
                ) : (
                    <Card title="Book" extra={<a onClick={() => onBorrow()}>Borrow</a>} style={{ width: 300 }}>
                        <Image
                            preview={false}
                            width={200}
                            src={img}
                        />
                        <p>Title: { title }</p>
                        <p>Description: { description }</p>
                    </Card>
                )
            }
        </div>
    )
}
