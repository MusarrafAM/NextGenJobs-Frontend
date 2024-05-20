import axios from "axios";
import { message } from "antd";

export const registerUser = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/users/register", values);
    message.success("User Registered Successfully");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    message.error("something went wrong , please try later");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const loginUser = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const user = await axios.post("/api/users/login", values);
    message.success("Login success");
    localStorage.setItem("user", JSON.stringify(user.data));
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    message.error("invalid credentials");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const updateUser = (values) => async (dispatch) => {
  const userid = JSON.parse(localStorage.getItem("user"))._id; //Getting current userId from local storage.

  values._id = userid; //Adding iser_id to the newly get form data.

  dispatch({ type: "LOADING", payload: true });

  try {
    const user = await axios.post("/api/users/update", values);
    message.success("User updated successfully");
    localStorage.setItem("user", JSON.stringify(user.data));
    setTimeout(() => {
      window.location.reload(); //Refresh the page after 1 sec
    }, 1000);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    message.error("something went wrong , please try later");
    dispatch({ type: "LOADING", payload: false });
  }
};
