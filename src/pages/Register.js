import React from "react";
import { Form, Input, message, Select } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/actions/userActions";
import "./Login.css";
import wave from "../assets/wave.png";
import backgroundImage from "../assets/bg.svg";

const { Option } = Select;

function Register() {
  const dispatch = useDispatch();

  function register(values) {
    if (values.password !== values.confirmpassword) {
      message.error("Passwords do not match");
    } else {
      dispatch(registerUser(values));
    }
  }

  return (
    <div className="login-page">
      <img className="wave" src={wave} alt="wave" />
      <div className="login-container">
        <div className="img">
          <img src={backgroundImage} alt="phone" />
        </div>
        <div className="login-content">
          <Form
            layout="vertical"
            onFinish={register}
            className="login-content-form"
          >
            <h3 className="text-2xl font-semibold">Let's get started</h3>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please enter your username" },
                ]}
              >
                <Input className="input" />
              </Form.Item>
            </div>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-envelope"></i>
              </div>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input className="input" />
              </Form.Item>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <Form.Item
                label="password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters long,",
                  },
                  {
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character",
                  },
                ]}
              >
                <Input type="password" />
              </Form.Item>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <Form.Item
                label="Confirm Password"
                name="confirmpassword"
                rules={[
                  { required: true, message: "Please confirm your password" },
                ]}
              >
                <Input type="password" className="input" />
              </Form.Item>
            </div>
            <Form.Item
              label="User Type"
              name="userType"
              rules={[
                { required: true, message: "Please select your user type" },
              ]}
            >
              <Select className="input">
                <Option value="jobseeker">Job Seeker</Option>
                <Option value="jobposter">Job Poster</Option>
              </Select>
            </Form.Item>
            <button htmlType="submit" className="btn duration-300">
              Register
            </button>
            <Link to="/login" className="text-center font-bold">
              Already registered? Click here to login
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;

// import React from "react";
// import { Row, Col, Form, Input, Button, message, Select } from "antd";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { registerUser } from "../redux/actions/userActions";
// const { Option } = Select;

// function Register() {
//   const dispatch = useDispatch();
//   function register(values) {
//     if (values.password !== values.confirmpassword) {
//       message.error("passwords are not matched");
//     } else {
//       dispatch(registerUser(values));
//     }
//   }

//   return (
//     <div className="register">
//       <Row justify="center" className="flex align-items-center">
//         <Col lg={5}>
//           <h1 className="heading1" data-aos="slide-right">
//             NextGen
//           </h1>
//         </Col>
//         <Col lg={10} sm={24} className="bs p-5 register-form">
//           <h3>Register</h3>
//           <hr />
//           <Form layout="vertical" onFinish={register}>
//             <Form.Item
//               label="username"
//               name="username"
//               rules={[{ required: true }]}
//             >
//               <Input />
//             </Form.Item>

//             <Form.Item
//               label="email"
//               name="email"
//               rules={[{ required: true }]}
//             >
//               <Input />
//             </Form.Item>

//             <Form.Item
//               label="password"
//               name="password"
//               rules={[
//                 { required: true, message: "Please enter your password" },
//                 // {
//                 //   min: 8,
//                 //   message: "Password must be at least 8 characters long,",
//                 // },
//                 // {
//                 //   pattern:
//                 //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//                 //   message:
//                 //     "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character",
//                 // },
//               ]}
//             >
//               <Input type="password" />
//             </Form.Item>
//             <Form.Item
//               label="confirm password"
//               name="confirmpassword"
//               rules={[{ required: true }]}
//             >
//               <Input type="password" />
//             </Form.Item>
//             <Form.Item
//               name="userType"
//               rules={[{ required: true }]}
//               label="User Type"
//             >
//               <Select>
//                 <Option value="jobseeker">Job Seeker</Option>
//                 <Option value="jobposter">Job Poster</Option>
//               </Select>
//             </Form.Item>
//             <Button htmlType="submit" className="mb-3">
//               Register
//             </Button>{" "}
//             <br />
//             <Link to="/login" className="mt-3">
//               Already registered ? , Click here to login
//             </Link>
//           </Form>
//         </Col>
//         <Col lg={5}>
//           <h1 className="heading2" data-aos="slide-left">
//             Jobs
//           </h1>
//         </Col>
//       </Row>
//     </div>
//   );
// }

// export default Register;
