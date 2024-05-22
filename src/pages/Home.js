import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector  } from "react-redux";
import { Row, Col , Button } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";  // Library to easily work with dates

const Home = () => {
  const { jobs } = useSelector((state) => state.jobsReducer);

  return (
    <div>
      <DefaultLayout>
      {/* gutter is like gap */}
        <Row gutter={16}>
          {jobs.map((job) => {
           return <Col lg={12} sm={24} key={job._id}>
                <div className="job-div bs m-2 p-2">
                   <h4>{job.title}</h4>
                   <p>{job.company}</p>
                   <hr />
                   <p>{job.smallDescription}</p>
                   <div className="flex">
                   <p>Salary : <b>{job.salaryFrom} - {job.salaryTo}</b> , </p>
                   <p style={{marginLeft:20}}>Experience : <b>{job.experience} Years</b> </p>
                   
                   </div>
                   <hr />

                   <div className="flex justify-content-between">
                       <Link to={`/jobs/${job._id}`}><Button>View</Button></Link> 
                       <p>Posted on : {moment(job.createdAt).format('MMM DD yyyy')}</p>
                       {/* DD-MM-YYYY */}
                   </div>
                  
                </div>
            </Col>;
          })}
        </Row>
      </DefaultLayout>
    </div>
  );
};

export default Home;
