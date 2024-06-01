import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
import Filter from "./Filter";
const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const user = JSON.parse(localStorage.getItem("user"));

  function logout() {
    localStorage.removeItem("user");
  }

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ position: "sticky", overflow: "auto", height: "100%", top: 0 }}
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
              icon: <HomeOutlined />,
              label: <Link to={"/"}>Home</Link>,
            },
            {
              key: "/profile",
              icon: <UserOutlined />,
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
            {
              key: "/posted",
              icon: <VideoCameraOutlined />,
              label: <Link to={"/posted"}>posted</Link>,
            },
            {
              key: "/logout",
              icon: <LogoutOutlined />,
              label: (
                <Link to={"/login"} onClick={logout}>
                  Logout
                </Link>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: "sticky",
            overflow: "auto",
            top: 0,
            zIndex: 9999,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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

          <Filter />

          <h5 className="mr-4">
            <b>{user.username}</b>
          </h5>
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
