import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Form, Tag } from "antd";
import DefaultLayout from "../components/DefaultLayout";

const UserInfo = () => {
  const { id } = useParams();
  const { users } = useSelector((state) => state.usersReducer);
  const user = users.find((user) => user._id === id);

  const handleDownloadResume = () => {
    if (user?.resume) {
      window.open(`http://localhost:5000/${user.resume}`, "_blank");
    }
  };

  return (
    <div>
      <DefaultLayout>
        {user && (
          <div>
            <div
              style={{
                backgroundColor: "#f0f0f0",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            >
              <h2
                className="text-4xl pb-4"
                style={{ color: "#333", fontFamily: "Arial, sans-serif" }}
              >
                {user.firstName} {user.lastName}
              </h2>
              <p>
                <b>Email:</b> {user.email}
              </p>
              <p>
                <b>Mobile Number:</b> {user.mobileNumber}
              </p>
              <p>
                <b>Address:</b> {user.address}
              </p>

              <hr className="my-4" />

              <p>
                <b>Skills</b>
              </p>
              {user.skills.map((skill, index) => (
                <Tag key={index}>{skill}</Tag>
              ))}

              <hr className="my-4" />

              <p>
                <b>Education</b>
              </p>
              <ul>
                {user.education.map((education, index) => (
                  <li key={index}>{education}</li>
                ))}
              </ul>

              <hr className="my-4" />

              <p>
                <b>Projects</b>
              </p>
              <ul>
                {user.projects.map((project, index) => (
                  <li key={index}>{project}</li>
                ))}
              </ul>

              <hr className="my-4" />

              <p>
                <b>Experience</b>
              </p>
              <ul>
                {user.experience.map((experience, index) => (
                  <li key={index}>{experience}</li>
                ))}
              </ul>

              {/* Download Resume */}
              <Form.Item label="Download Resume" className="mt-4">
                {user?.resume && (
                  <Button onClick={handleDownloadResume}>Download</Button>
                )}
              </Form.Item>
            </div>
          </div>
        )}
      </DefaultLayout>
    </div>
  );
};

export default UserInfo;
