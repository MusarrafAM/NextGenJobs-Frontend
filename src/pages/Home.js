import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import moment from "moment"; // Library to easily work with dates

const Home = () => {
  const { jobs } = useSelector((state) => state.jobsReducer);

  // Filter jobs array to include only jobs with status === 'approved'
  const approvedJobs = jobs.filter((job) => job.status === "approved");

  return (
    <div>
      <DefaultLayout>
        {/* gutter is like gap */}
        <Row gutter={16}>
          {approvedJobs.map((job) => {
            return (
              <Col lg={12} sm={24} key={job._id}>
                <div className="job-div bs m-2 p-2">
                  <div className="flex justify-between">
                    <h4 className="font-semibold text-2xl">{job.title}</h4>
                    {job.isDisabled && (
                      <p style={{ color: "red" }}>
                        The application period has ended.
                      </p>
                    )}
                  </div>
                  <p>{job.company}</p>
                  <hr className="my-4" />
                  <p>{job.smallDescription}</p>
                  <div className="flex">
                    <p>
                      Salary :{" "}
                      <b>
                        {job.salaryFrom} - {job.salaryTo}
                      </b>{" "}
                      ,{" "}
                    </p>
                    <p style={{ marginLeft: 20 }}>
                      Experience : <b>{job.experience} Years</b>{" "}
                    </p>
                  </div>
                  <hr className="my-4" />

                  <div className="flex justify-between">
                    <Link to={`/jobs/${job._id}`}>
                      <Button>View</Button>
                    </Link>
                    <p>
                      Posted on : {moment(job.createdAt).format("MMM DD yyyy")}
                    </p>
                    {/* DD-MM-YYYY */}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </DefaultLayout>
    </div>
  );
};

export default Home;
