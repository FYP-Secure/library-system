import {Button, Form, Image, Input, Upload} from "antd";
import {ErrorNotification} from "../../../components/notification/error";

export const DeleteBookView = () => {

    const onFinish = () => {
        console.log("DELETE")
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
