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
// import { loaderReducer } from "./redux/reducers/loaderReducer";
import { getAllJobs } from "./redux/actions/jobActions";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PostedJobs from "./pages/PostedJobs";
import EditJob from "./pages/EditJob";
import Analytics from "./pages/Analytics";
import PrivateRoutes from "./utils/PrivateRoutes";
import { getAllUsers } from "./redux/actions/userActions";
import UserInfo from "./pages/UserInfo";
import ManageJobs from "./pages/ManageJobs";
import ManageUsers from "./pages/ManageUsers";
import NotFound from "./pages/NotFound";

function App() {
  const { loader } = useSelector((state) => state.loaderReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
    dispatch(getAllUsers());
    // eslint-disable-next-line
  }, []);

  const user = JSON.parse(localStorage.getItem("user")); //getting userdetails from localstorage.

  // Create a component later

  return (
    <div className="App">
      {loader && (
        <div className="sweet-loading text-center">
          <ClipLoader color={"#35CBAE"} size={150} />
        </div>
      )}

      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            {user && user.userType === "jobseeker" && (
              <>
                <Route path="/appliedjobs" element={<AppliedJobs />} />
                <Route path="/profile" element={<Profile />} />
              </>
            )}
            {user && user.userType === "jobposter" && (
              <>
                <Route path="/postjob" element={<PostJob />} />
                <Route path="/posted" element={<PostedJobs />} />
                <Route path="/editjob/:id" element={<EditJob />} />
              </>
            )}

            {user && user.userType === "admin" && (
              <>
                <Route path="/ManageJobs" element={<ManageJobs />} />
                <Route path="/ManageUsers" element={<ManageUsers />} />
              </>
            )}

            {user && <Route path="/analytics" element={<Analytics />} />}

            {/* All Can see these below routes */}
            <Route path="/jobs/:id" element={<JobInfo />} />
            <Route path="/users/:id" element={<UserInfo />} />
          </Route>
          {/* Not Protected */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
