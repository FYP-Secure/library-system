import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Button, Checkbox, Form, Input, Space, Spin} from 'antd';
import React, {useState} from 'react';

import "./index.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {SuccessNotification} from "../../components/notification/success";
import {ErrorNotification} from "../../components/notification/error";

export const Register = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);

    const onFinish = (values: any) => {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_API_URL}/student/register`, {
            name: values.name,
            email: values.email,
            password: values.password
        })
            .then((res) => {
                SuccessNotification("Register successfully")
                navigate("/login")
            })
            .catch((error) => {
                ErrorNotification(error)
            })
            .finally(() => {
                setLoading(false)
            })
    };

    const validatePassword = (rule: any, value: string, callback: any) => {
        if (value && value !== form.getFieldsValue()["password"]) {
            callback("Password not match!");
        } else {
            callback();
        }
    };

    return (
        <div style={{ margin: "10%" }}>
            <Form
                form={form}
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'The input is not valid E-mail!' },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    rules={[
                        { required: true, message: 'Please input your password!' },
                        { validator: validatePassword }
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Confirm Password"
                    />
                </Form.Item>
                <div style={{ textAlign: "center" }}>
                    {
                        loading ? (
                            <Spin size={"large"} />
                        ) : (
                            <Space direction={"vertical"}>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Register
                                </Button>
                            </Space>
                        )
                    }
                </div>
            </Form>
        </div>
    )
}
