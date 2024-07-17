import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Row, Col, Form, Tabs, Input, Button, Upload, message  } from "antd";
import {useDispatch} from 'react-redux'
import { updateUser } from "../redux/actions/userActions";
import axios from "axios";
import { baseUrl } from "../constants/constant";
const { TextArea } = Input;
const { TabPane } = Tabs;

function Profile() {
  const baseBackendUrl = `${baseUrl}/`
  const [personalInfo, setPersonalInfo] = useState();
  const [activeTab, setActiveTab] = useState("1");
  const [resumePath, setResumePath] = useState('');

  const dispatch = useDispatch()
  function onPersonInfoSubmit(values) {
    setPersonalInfo(values);
    console.log(values);
    setActiveTab("2");
  }

  function onFinalFinish(values){

      const finalObj = {...personalInfo , ...values}

      console.log(finalObj)

      dispatch(updateUser(finalObj))

  }

  const user = JSON.parse(localStorage.getItem('user'))


  // Function to handle file upload
  const handleFileUpload = ({ file, onSuccess }) => {
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("_id", user._id); // Ensure _id is included
  
    // Simulate uploading delay
    setTimeout(async () => {
      try {
        const response = await fetch("/api/users/uploadresume", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        message.success(data.message);

        // Update resumePath state with the new resume path
        fetchResumePath(); // Fetch the updated path from the server

      
        onSuccess("Ok");
      } catch (error) {
        message.error("Resume upload failed");
        console.error("Error uploading resume:", error);
      }
    }, 1000); // Adjust delay as needed
  };



  useEffect(() => {
    // Fetch resume path from server when component mounts
    fetchResumePath();
  }, []);

  const fetchResumePath = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/users/resume`, {
        params: { userId: user._id }, // Pass userId as query parameter
      });
      const { resume } = response.data; // Assuming your API returns resume path
      setResumePath(resume);
    } catch (error) {
      console.error('Error fetching resume path:', error);
    }
  };

  const handleDownloadResume = () => {
    if (resumePath) {
      // Construct download link or use alternative method (depending on how you store paths)
      window.open( baseBackendUrl+resumePath , '_blank');
    }
  };



  return (
    <div>
      <DefaultLayout>
        <Tabs defaultActiveKey="1" activeKey={activeTab}>
          <TabPane tab="Personal Info" key="1">
            <Form layout="vertical" onFinish={onPersonInfoSubmit} initialValues={user}>
              <Row gutter={16}>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="First name"
                    required
                    rules={[{ required: true }]}
                    name="firstName"
                  >
                  {/* the name property should be matched with the mongodb collection property. */}
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="Last name"
                    required
                    rules={[{ required: true }]}
                    name="lastName"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="Email"
                    required
                    rules={[{ required: true }]}
                    name="email"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="Mobile Number"
                    required
                    rules={[{ required: true }]}
                    name="mobileNumber"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="Portfolio"
                    required
                    rules={[{ required: true }]}
                    name="portfolio"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={24} sm={24}>
                  <Form.Item
                    label="About"
                    required
                    rules={[{ required: true }]}
                    name="about"
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                </Col>
                <Col lg={24} sm={24}>
                  <Form.Item
                    label="Address"
                    required
                    rules={[{ required: true }]}
                    name="address"
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                </Col>
              </Row>
              <Button htmlType="submit">Next</Button>
            </Form>
          </TabPane>
          
          {/* Second  Tab skills and Education*/}
          <TabPane tab="Skills and Education" key="2">
            <Form initialValues={user} layout="vertical" onFinish={onFinalFinish}>
              <Row>
                <Col lg={24} sm={24}>
                  <Form.List name="education">
                    {(education, { add, remove }) => (
                      <div>
                        {education.map((field , index) => (
                          <div className="flex">
                            <Form.Item
                              required
                              {...field}
                              label="Education"
                              style={{ width: "80%" }}
                              rules={[{ required: true }]}
                            >
                              <TextArea rows={4} />
                            </Form.Item>
                            <Button onClick={()=>{add()}}>Add more</Button>
                            {index !== 0 && (<Button onClick={()=>{remove(index)}}>Delete</Button>)}
                          </div>
                        ))}
                      </div>
                    )}
                  </Form.List>
                </Col>

                <Col lg={24} sm={24}>
                  <Form.List name="skills">
                    {(skills, { add, remove }) => (
                      <div>
                        {skills.map((field , index) => (
                          <div className="flex">
                            <Form.Item
                              required
                              {...field}
                              label="Skill"
                              style={{ width: "80%" }}
                              rules={[{ required: true }]}
                            >
                              <TextArea rows={4} />
                            </Form.Item>
                            <Button onClick={()=>{add()}}>Add more</Button>
                            {index !== 0 && (<Button onClick={()=>{remove(index)}}>Delete</Button>)}
                          </div>
                        ))}
                      </div>
                    )}
                  </Form.List>
                </Col>

                <Col lg={24} sm={24}>
                  <Form.List name="projects">
                    {(projects, { add, remove }) => (
                      <div>
                        {projects.map((field , index) => (
                          <div className="flex">
                            <Form.Item
                              required
                              {...field}
                              label="Project"
                              style={{ width: "80%" }}
                              rules={[{ required: true }]}
                            >
                              <TextArea rows={4} />
                            </Form.Item>
                            <Button onClick={()=>{add()}}>Add more</Button>
                            {index !== 0 && (<Button onClick={()=>{remove(index)}}>Delete</Button>)}
                          </div>
                        ))}
                      </div>
                    )}
                  </Form.List>
                </Col>
                <Col lg={24} sm={24}>
                  <Form.List name="experience">
                    {(experience, { add, remove }) => (
                      <div>
                        {experience.map((field , index) => (
                          <div className="flex">
                            <Form.Item
                              required
                              {...field}
                              label="Experience"
                              style={{ width: "80%" }}
                              rules={[{ required: true }]}
                            >
                              <TextArea rows={4} />
                            </Form.Item>
                            <Button onClick={()=>{add()}}>Add more</Button>
                            {index !== 0 && (<Button onClick={()=>{remove(index)}}>Delete</Button>)}
                          </div>
                        ))}
                      </div>
                    )}
                  </Form.List>
                </Col>
              </Row>
              <Button onClick={()=>{setActiveTab("1")}}>Previous</Button>
              <Button htmlType="submit">Update</Button>
            </Form>
            
            <Form layout="vertical">
              <Col lg={8} sm={24} className="flex">
                  {/* File upload for resume */}
                  
                  <Form.Item
                    label="Upload Your Resume below"
                    name="resume"
                    // valuePropName="fileList"
                    // getValueFromEvent={(e) => e.fileList}
                  >
                    <Upload
                      customRequest={handleFileUpload}
                      maxCount={1}
                      accept=".pdf"
                      showUploadList={{ showRemoveIcon: true }}
                      listType="text"
                    >
                      <Button>Select File</Button>
                    </Upload>
                  </Form.Item>
                  
                  {/* Download Resume */}
                  <Form.Item label="Download your Resume">
                    {resumePath && (
                      <Button onClick={handleDownloadResume}>Download</Button>
                    )}
                  </Form.Item>
                </Col>
            </Form>
            
          </TabPane>
        </Tabs>
      </DefaultLayout>
    </div>
  );
}


export default Profile;




                