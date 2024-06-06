import axios from "axios";
import { message } from "antd";

export const getAllJobs = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    // we have added "proxy": "http://localhost:5000/" in the package.json
    const response = await axios.get("/api/jobs/getalljobs");
    dispatch({ type: "GET_ALL_JOBS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const postJob = (values) => async (dispatch) => {
  values.postedBy = JSON.parse(localStorage.getItem("user"))._id; //adding data about who posted the job.

  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("/api/jobs/postjob", values);

    dispatch({ type: "LOADING", payload: false });
    message.success("Job Posted Successfully");

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const editJob = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("/api/jobs/editjob", values);

    dispatch({ type: "LOADING", payload: false });
    message.success("Job Updated Successfully");

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const applyJob = (job) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));

  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("/api/jobs/applyjob", { job, user });

    dispatch({ type: "LOADING", payload: false });
    message.success("Job applied Successfully");

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const deleteJob = (jobId) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.delete(`/api/jobs/deletejob/${jobId}`);

    // Update the job list after deletion
    const response = await axios.get("/api/jobs/getalljobs");
    dispatch({ type: "GET_ALL_JOBS", payload: response.data });

    dispatch({ type: "LOADING", payload: false });
    message.success("Job deleted Successfully");
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const searchJobs = (searchKey) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get("/api/jobs/getalljobs");

    const jobs = response.data;

    const filteredJobs = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchKey.toLowerCase())
    );

    dispatch({ type: "GET_ALL_JOBS", payload: filteredJobs });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const sortJobs = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get("/api/jobs/getalljobs");

    const jobs = response.data;

    var filteredJobs = jobs;

    if (values.experience !== undefined) {
      filteredJobs = jobs.filter((job) => job.experience <= values.experience);
    }
    if (values.salary !== undefined) {
      filteredJobs = jobs.filter((job) => job.salaryTo >= values.salary);
    }

    dispatch({ type: "GET_ALL_JOBS", payload: filteredJobs });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
