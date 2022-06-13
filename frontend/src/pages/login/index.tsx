import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Button, Checkbox, Form, Input, Space} from 'antd';
import React from 'react';

import "./index.css";
import {useNavigate} from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate()

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        navigate("/admin/dashboard")
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
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
                    <Space direction={"vertical"}>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                    </Space>
                </div>
            </Form>
        </div>
    )
}
