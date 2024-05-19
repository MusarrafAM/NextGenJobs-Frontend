import axios from "axios";

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
