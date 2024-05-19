import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}
      style={{position: 'sticky' , overflow : 'auto' , height:'100%' , top:0}}
      >

        <div className="demo-logo-vertical">
          {collapsed ? <h1>NGJ</h1> : <h1>NextGenJ</h1>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]} //defaultSelectedKeys = will choose which to highight
          items={[
            {
              key: "/",
              icon: <UserOutlined />,
              label: <Link to={"/"}>Home</Link>,
            },
            {
              key: "/profile",
              icon: <VideoCameraOutlined />,
              label: <Link to={"/profile"}>Profile</Link>,
            },
            {
              key: "/appliedjobs",
              icon: <UploadOutlined />,
              label: <Link to={"/appliedjobs"}>Applied Jobs</Link>,
            },
            {
              key: "/postjob",
              icon: <VideoCameraOutlined />,
              label: <Link to={"/postjob"}>PostJob</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: 'sticky' , overflow : 'hidden' , top:0, zIndex:9999
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;
