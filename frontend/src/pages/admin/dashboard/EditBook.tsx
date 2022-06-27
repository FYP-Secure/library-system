import {useEffect, useState} from "react";
import {Button, Form, Image, Input, Upload} from "antd";
import {ErrorNotification} from "../../../components/notification/error";
import axios from "axios";
import {SuccessNotification} from "../../../components/notification/success";
import {getBase64} from "../../../utils/image";

export const EditBookView = ({ record, onCloseModal }: any) => {
    const [imageUrl, setImageUrl] = useState("");
    const [form] = Form.useForm();

    const onFinish = () => {
        form.validateFields().then(values => {
            axios.put(`${process.env.REACT_APP_API_URL}/book/${record.id}`, {
                title: values.title,
                description: values.description,
                img: imageUrl
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
                .then((res) => {
                    SuccessNotification("Update successfully")
                })
                .catch((error) => {
                    ErrorNotification(error)
                })
                .finally(() => {
                    onCloseModal()
                })
        })
    }

    useEffect(() => {
        form.resetFields()
        form.setFieldsValue({
            title: record.title,
            description: record.description,
            isBorrowed: record.isBorrowed,
        })
        setImageUrl(record.img)
        console.log(record)
    }, [record]);

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
                        customRequest={async (file: any) => {
                            const isLt2M = file.file.size / 1024 / 1024 / 1024 < 2000;
                            if (isLt2M) {
                                await getBase64(file.file).then((base64String: any) => {
                                    setImageUrl(base64String)
                                });
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
