import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Button, Checkbox, Form, Input, Space, Spin} from 'antd';
import React, {useState} from 'react';
import jwt_decode from "jwt-decode";

import "./index.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {SuccessNotification} from "../../components/notification/success";
import {ErrorNotification} from "../../components/notification/error";
import {JwtDecodedType} from "../../models/dto/login.dto";

export const Login = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const onFinish = (values: any) => {
        setLoading(true);
        axios.post(`${process.env.REACT_APP_API_URL}/login`, {
            userName: values.email,
            password: values.password
        })
            .then((res) => {

                const decoded: JwtDecodedType = jwt_decode(res.data.accessToken)
                localStorage.setItem("accessToken", res.data.accessToken)
                localStorage.setItem("role", decoded.role)
                SuccessNotification("Login successfully")

                if (decoded.role === "SUPER_ADMIN" || decoded.role === "ADMIN") {
                    navigate("/admin/dashboard")
                } else {
                    navigate("/user/dashboard")
                }

            })
            .catch((error) => {
                ErrorNotification(error)
            })
            .finally(() => {
                setLoading(false)
            })
    };

    return (
        <div style={{ margin: "10%" }}>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'The input is not valid E-mail!' }
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <div style={{ textAlign: "center" }}>
                    {
                        loading ? (
                            <Spin size={"large"} />
                        ) : (
                            <Space direction={"vertical"}>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                                Or <a onClick={() => navigate("/register")}>register now!</a>
                            </Space>
                        )
                    }
                </div>
            </Form>
        </div>
    )
}
