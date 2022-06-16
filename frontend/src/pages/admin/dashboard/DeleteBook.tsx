import {Button, Form, Image, Input, Upload} from "antd";
import {ErrorNotification} from "../../../components/notification/error";
import axios from "axios";
import {SuccessNotification} from "../../../components/notification/success";

export const DeleteBookView = ({ record, onCloseModal }: any) => {

    const onFinish = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/book/${record.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .finally(() => {
                SuccessNotification("Deleted successfully")
                onCloseModal()
            })
    }

    return (
        <>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <h2>Are you sure want to delete this?</h2>

                <div style={{ textAlign: "center" }}>
                    <Button type="primary" htmlType="submit">
                        Delete
                    </Button>
                </div>
            </Form>
        </>
    )
}
