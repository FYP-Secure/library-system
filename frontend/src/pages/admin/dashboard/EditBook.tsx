import {useState} from "react";
import {Button, Form, Image, Input, Upload} from "antd";
import {ErrorNotification} from "../../../components/notification/error";

export const EditBookView = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [form] = Form.useForm();

    const onFinish = () => {

    }

    return (
        <>
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input your title!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input your description!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Image"
                    name="image"
                    rules={[{ required: true, message: 'Please input your image!' }]}
                >
                    <Upload
                        accept="image/png, image/jpeg"
                        maxCount={1}
                        showUploadList={false}
                        customRequest={(file: any) => {
                            console.log(file)
                            const isLt2M = file.file.size / 1024 / 1024 / 1024 < 2000;
                            if (isLt2M) {

                            } else {
                                ErrorNotification("Image size should not be greater than 2000kb size");
                            }
                        }}
                        beforeUpload={() => console.log("before upload")}
                        onChange={() => console.log("handle change")}
                    >
                        {imageUrl ? (
                            <Image
                                preview={false}
                                width={200}
                                src={imageUrl}
                            />
                        ) : <Button block type="primary" className="login-form-button">Upload Image</Button>}
                    </Upload>
                </Form.Item>

                <div style={{ textAlign: "center" }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </>
    )
}
