import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppliedJobs from "./pages/AppliedJobs";
import JobInfo from "./pages/JobInfo";
import PostJob from "./pages/PostJob";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appliedjobs" element={<AppliedJobs />} />
          <Route path="/jobinfo" element={<JobInfo />} />
          <Route path="/postjob" element={<PostJob />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
