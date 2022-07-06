import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {Layout, Menu} from 'antd';
import React, {useState} from 'react';
import {
    Outlet, useNavigate
} from "react-router-dom";

const {Header, Sider, Content} = Layout;

export const UserLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()

    return (
        <Layout style={{ height: "100%" }}>
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
                                navigate("/user/dashboard")
                            }
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined/>,
                            label: 'Borrow History',
                            onClick: () => {
                                navigate("/user/history")
                            }
                        },
                        {
                            key: '4',
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
