import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  AppstoreOutlined,
  HomeOutlined,
  PlusOutlined,
  LogoutOutlined,
  CheckOutlined,
  GroupOutlined,
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
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to={"/"}>Home</Link>
          </Menu.Item>
          {user.userType === "jobseeker" && (
            <>
              <Menu.Item key="/profile" icon={<UserOutlined />}>
                <Link to={"/profile"}>Profile</Link>
              </Menu.Item>
              <Menu.Item key="/appliedjobs" icon={<AppstoreOutlined />}>
                <Link to={"/appliedjobs"}>Applied Jobs</Link>
              </Menu.Item>
            </>
          )}
          {user.userType === "jobposter" && (
            <>
              <Menu.Item key="/postjob" icon={<PlusOutlined />}>
                <Link to={"/postjob"}>Post Job</Link>
              </Menu.Item>
              <Menu.Item key="/posted" icon={<CheckOutlined />}>
                <Link to={"/posted"}>Posted</Link>
              </Menu.Item>
            </>
          )}

          {user.userType === "admin" && (
            <>
              <Menu.Item key="/ManageJobs" icon={<GroupOutlined />}>
                <Link to={"/ManageJobs"}>ManageJobs</Link>
              </Menu.Item>
            </>
          )}

          <Menu.Item key="/logout" icon={<LogoutOutlined />} onClick={logout}>
            <Link to={"/login"}>Logout</Link>
          </Menu.Item>
        </Menu>
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

          <div className="mr-4 userinfo-top">
            <h5 className="text-center">
              <b>{user.username}</b>
              <p>{user.userType}</p>
            </h5>
          </div>
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
