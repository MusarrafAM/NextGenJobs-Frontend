import axios from "axios";
import { message } from "antd";
import moment from "moment"; // Library to easily work with dates

// sort jobs by create dates in decending order
const sortJobsByCreatedAt = (jobs) => {
  return jobs.sort(
    (a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
  );
};

export const getAllJobs = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    // we have added "proxy": "http://localhost:5000/" in the package.json
    const response = await axios.get("/api/jobs/getalljobs");
    const sortedJobs = sortJobsByCreatedAt(response.data);

    dispatch({ type: "GET_ALL_JOBS", payload: sortedJobs });
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

  // Check if user has updated bio
  if (!user.email) {
    // Redirect to profile page or any other action you want
    message.error("Please update your profile before applying for jobs");
    setTimeout(() => {
      window.location.href = "/profile"; // Redirect to profile page
    }, 1000);
    return; // Stop further execution
  }

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
    const sortedJobs = sortJobsByCreatedAt(response.data);

    dispatch({ type: "GET_ALL_JOBS", payload: sortedJobs });

    dispatch({ type: "LOADING", payload: false });
    message.success("Job deleted Successfully");
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const disableJob = (jobId) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true }); // Dispatch loading action

  try {
    await axios.post(`/api/jobs/updatejobdisabled/${jobId}`, {
      isDisabled: true,
    });

    // Update the job list after disabling
    const response = await axios.get("/api/jobs/getalljobs");
    const sortedJobs = sortJobsByCreatedAt(response.data);

    dispatch({ type: "GET_ALL_JOBS", payload: sortedJobs });

    dispatch({ type: "LOADING", payload: false }); // Dispatch loading action complete
    message.success("Job disabled Successfully"); // Show success message
  } catch (error) {
    console.log(error); // Log any errors to console
    dispatch({ type: "LOADING", payload: false }); // Dispatch loading action complete
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

    const sortedFilteredJobs = sortJobsByCreatedAt(filteredJobs);

    dispatch({ type: "GET_ALL_JOBS", payload: sortedFilteredJobs });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const sortJobs = (values, searchText) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get("/api/jobs/getalljobs");
    const jobs = response.data;

    let filteredJobs = jobs;

    // Apply search filter
    if (searchText) {
      filteredJobs = filteredJobs.filter((job) =>
        job.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply experience filter
    if (values.experience !== undefined) {
      filteredJobs = filteredJobs.filter(
        (job) => Number(job.experience) <= values.experience
      );
    }

    // Apply salary filter
    if (values.salary !== undefined) {
      filteredJobs = filteredJobs.filter(
        (job) => Number(job.salaryTo) >= values.salary
      );
    }

    const sortedFilteredJobs = sortJobsByCreatedAt(filteredJobs);

    // Dispatch filtered jobs to Redux store
    dispatch({ type: "GET_ALL_JOBS", payload: sortedFilteredJobs });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
