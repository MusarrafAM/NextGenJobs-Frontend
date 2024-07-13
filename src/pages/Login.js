import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import "./Login.css";
import backgroundImage from "../assets/bg.svg";
import avatarImage from "../assets/avatar1.svg";
import wave from "../assets/wave.png";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const addcl = (e) => {
    let parent = e.target.parentNode.parentNode;
    parent.classList.add("focus");
  };

  const remcl = (e) => {
    let parent = e.target.parentNode.parentNode;
    if (e.target.value === "") {
      parent.classList.remove("focus");
    }
  };

  return (
    <div className="login-page">
      <img className="wave" src={wave} alt="wave" />
      <div className="login-container">
        <div className="img">
          <img src={backgroundImage} alt="background" />
        </div>
        <div className="login-content">
          <form onSubmit={handleSubmit}>
            <img className="bg-img" src={avatarImage} alt="avatar" />
            <h2 className="title">Welcome</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Username</h5>
                <input
                  type="text"
                  className="input"
                  value={username}
                  onChange={handleUsernameChange}
                  onFocus={addcl}
                  onBlur={remcl}
                  required
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <h5>Password</h5>
                <input
                  type="password"
                  className="input"
                  value={password}
                  onChange={handlePasswordChange}
                  onFocus={addcl}
                  onBlur={remcl}
                  required
                />
              </div>
            </div>
            <input type="submit" className="btn" value="Login" />

            <Link to="/register" className="text-center">
              Not registerd ? , Click here to register
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

// import React from "react";
// import { Row, Col, Form, Input, Button } from "antd";
// import { loginUser } from "../redux/actions/userActions";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";

// import AOS from 'aos';
// import 'aos/dist/aos.css'; // You can also use <link> for styles
// AOS.init();

// function Login() {
//   const dispatch = useDispatch();
//   function login(values) {
//     dispatch(loginUser(values));
//   }
//   return (
//     <div className="login">
//       <Row justify="center" className="flex align-items-center">
//         <Col lg={5}>
//           <h1 className="heading1" data-aos="slide-left">
//             NextGen
//           </h1>
//         </Col>
//         <Col lg={10} sm={24} className="bs p-5 login-form">
//           <h3>Login</h3>
//           <hr />
//           <Form layout="vertical" onFinish={login}>
//             <Form.Item
//               label="username"
//               name="username"
//               rules={[{ required: true }]}
//             >
//               <Input />
//             </Form.Item>

//             <Form.Item
//               label="password"
//               name="password"
//               rules={[{ required: true }]}
//             >
//               <Input type="password" />
//             </Form.Item>

//             <Button htmlType="submit" className="mb-3">
//               Login
//             </Button>
//             <br />

//             <Link to="/register" className="mt-3">
//               Not registerd ? , Click here to register
//             </Link>
//           </Form>
//         </Col>
//         <Col lg={5}>
//           <h1 className="heading2" data-aos="slide-right">
//             Jobs
//           </h1>
//         </Col>
//       </Row>
//     </div>
//   );
// }

// export default Login;
