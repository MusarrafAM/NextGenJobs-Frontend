import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Modal, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import DefaultLayout from "../components/DefaultLayout";
import { deleteUser } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.usersReducer).users;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const columns = [
    {
      title: "User ID",
      dataIndex: "_id",
      render: (text, record) => {
        if (record.userType === "jobseeker") {
          return (
            <Link
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              to={`/users/${record._id}`}
            >
              {record._id}
            </Link>
          );
        } else {
          return record._id;
        }
      },
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Roles",
      dataIndex: "userType",
    },
    {
      title: "Joined On",
      dataIndex: "joinedOn",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          {record.userType !== "admin" && (
            <DeleteOutlined onClick={() => handleDeleteUser(record._id)} />
          )}
        </div>
      ),
    },
  ];

  const dataSource = allUsers.map((user) => ({
    key: user._id,
    _id: user._id,
    fullName:
      user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.username,
    email: user.email,
    userType: user.userType,
    joinedOn: moment(user.createdAt).format("MMM DD, YYYY"),
  }));

  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(userId))
          .then(() => {
            // Delayed reload after 1 second
            setTimeout(() => {
              window.location.reload();
            }, 1000); // 1000 milliseconds = 1 second
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            // Handle error if necessary
          });
      }
    });
  };

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <DefaultLayout>
        <h1 className="text-4xl font-semibold pb-2">Manage Users</h1>
        <Table columns={columns} dataSource={dataSource} />

        <Modal
          title="User Details"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {selectedUser && (
            <div>
              <p>
                <strong>User ID:</strong> {selectedUser._id}
              </p>
              <p>
                <strong>Full Name:</strong>{" "}
                {`${selectedUser.firstName} ${selectedUser.lastName}`}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Roles:</strong> {selectedUser.roles.join(", ")}
              </p>
              <p>
                <strong>Joined On:</strong>{" "}
                {moment(selectedUser.createdAt).format("MMM DD, YYYY")}
              </p>
              {/* Add more details as needed */}
            </div>
          )}
        </Modal>
      </DefaultLayout>
    </div>
  );
};

export default ManageUsers;
