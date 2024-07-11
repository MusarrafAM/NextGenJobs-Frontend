import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import jobsReducer from "../redux/reducers/jobsReducer";
import moment from "moment";
import { Button, Tag } from "antd";
import { applyJob } from "../redux/actions/jobActions";
import { CheckCircleOutlined } from "@ant-design/icons";

const JobInfo = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { jobs } = useSelector((state) => state.jobsReducer); //getting all Jobs
  const job = jobs.find((job) => job._id === id);
  const userid = JSON.parse(localStorage.getItem("user"))._id;
  const userType = JSON.parse(localStorage.getItem("user")).userType;

  const appliedCandidates = job?.appliedCandidates || [];
  const alreadyApplied = appliedCandidates.find(
    (candidate) => candidate.userid === userid
  );

  function applyNow() {
    dispatch(applyJob(job));
  }

  return (
    <div>
      <DefaultLayout>
        {job && (
          <div>
            <div
              style={{
                backgroundColor: "#f0f0f0",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            >
              <h2 style={{ color: "#333", fontFamily: "Arial, sans-serif" }}>
                {job.title}
              </h2>
              <p>
                <b>Company:</b> {job.company}
              </p>
              <p>
                <b>Department:</b> {job.department}
              </p>

              <hr />

              <p>
                <b>Small Description:</b> {job.smallDescription}
              </p>
              <p>
                <b>Full Description:</b> {job.fullDescription}
              </p>

              <hr />

              <p>
                <b>Skills Required:</b> {job.skillsRequired}
              </p>
              <p>
                <b>Experience:</b> {job.experience} years
              </p>
              <p>
                <b>Minimum Qualification:</b> {job.minimumQualification}
              </p>

              <hr />

              <p>
                <b>Salary Range:</b> {job.salaryFrom} - {job.salaryTo}
              </p>
              <p>
                <b>Total Candidates applied:</b> {job.appliedCandidates.length}
              </p>

              <hr />

              <p>
                <b>Email:</b> {job.email}
              </p>
              <p>
                <b>Company Profile:</b> {job.companyDescription}
              </p>
            </div>

            <hr />

            <div className="flex justify-content-between">
              {userType === "admin" ? null : job.postedBy === userid ? (
                <Button>
                  <Link to={`/editjob/${job._id}`}>Edit Now</Link>
                </Button>
              ) : alreadyApplied ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  Already Applied
                </Tag>
              ) : (
                userType === "jobseeker" && (
                  <Button onClick={applyNow}>Apply Now</Button>
                )
              )}

              <p>
                <b>Posted on</b> {moment(job.createdAt).format("MMM DD yyyy")}
              </p>
            </div>
          </div>
        )}
      </DefaultLayout>
    </div>
  );
};

export default JobInfo;
