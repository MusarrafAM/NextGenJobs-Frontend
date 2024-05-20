import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppliedJobs from "./pages/AppliedJobs";
import JobInfo from "./pages/JobInfo";
import PostJob from "./pages/PostJob";
import Profile from "./pages/Profile";

import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import { loaderReducer } from "./redux/reducers/loaderReducer";
import { getAllJobs } from "./redux/actions/jobActions";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PostedJobs from "./pages/PostedJobs";

function App() {
  const { loader } = useSelector((state) => state.loaderReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
    // eslint-disable-next-line
  }, []);
  return (
    <div className="App">
      {loader && (
        <div className="sweet-loading text-center">
          <ClipLoader color={"#35CBAE"} size={150} />
        </div>
      )}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appliedjobs" element={<AppliedJobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/postjob" element={<PostJob />} />
          <Route path="/posted" element={<PostedJobs />} />
          <Route path="/jobs/:id" element={<JobInfo />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
