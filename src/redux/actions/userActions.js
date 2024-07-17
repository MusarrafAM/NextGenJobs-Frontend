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
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data) {
      message.error(error.response.data.message);
    } else {
      message.error("something went wrong , please try later");
    }
  } finally {
    dispatch({ type: "LOADING", payload: false });
  }
};

export const loginUser = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const user = await axios.post("https://nextgenjobs-backend.onrender.com/api/users/login", values);
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

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get("/api/users/getallusers");
    dispatch({ type: "GET_ALL_USERS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.delete(`/api/users/delete/${userId}`);
    message.success("User deleted successfully");
    // dispatch({ type: "DELETE_USER", payload: userId }); // Optionally update local state or Redux store
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.error("Error deleting user:", error);
    message.error("Failed to delete user");
    dispatch({ type: "LOADING", payload: false });
  }
};
