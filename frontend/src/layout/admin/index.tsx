import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {Layout, Menu} from 'antd';
import React, {useEffect, useState} from 'react';
import {
    Outlet, useNavigate
} from "react-router-dom";
import axios from "axios";
import {ErrorNotification} from "../../components/notification/error";

const {Header, Sider, Content} = Layout;

export const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()

    return (
        <Layout style={{ height: "100vh" }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo"/>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined/>,
                            label: 'Book List',
                            onClick: () => {
                                navigate("/admin/dashboard")
                            }
                        },
                        {
                            key: '2',
                            icon: <UserOutlined/>,
                            label: 'Log Out',
                            onClick: () => {
                                navigate("/login")
                            }
                        }
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{padding: 0}}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}
