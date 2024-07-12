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
  LineChartOutlined,
  UsergroupAddOutlined,
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
          {collapsed ? (
            <h1 className=" text-3xl font-semibold">NGJ</h1>
          ) : (
            <h1 className="text-3xl font-semibold">NextGenJobs</h1>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]} //defaultSelectedKeys = will choose which to highight
          className="mt-6"
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
              <Menu.Item key="/ManageUsers" icon={<UsergroupAddOutlined />}>
                <Link to={"/ManageUsers"}>ManageUsers</Link>
              </Menu.Item>
            </>
          )}

          <Menu.Item key="/analytics" icon={<LineChartOutlined />}>
            <Link to={"/analytics"}>Analytics</Link>
          </Menu.Item>

          <Menu.Item key="/logout" icon={<LogoutOutlined />} onClick={logout}>
            <Link to={"/login"}>Logout</Link>
          </Menu.Item>
          <div>this is the footer</div>
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
            <div className="text-sm text-center">
              <b>{user.username}</b>
              <p>{user.userType}</p>
            </div>
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
