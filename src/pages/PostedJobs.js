import { React } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
import { Table, Modal } from "antd";
import moment from "moment";

const PostedJobs = () => {
  const alljobs = useSelector((state) => state.jobsReducer).jobs;
  const userid = JSON.parse(localStorage.getItem("user"))._id;
  const userPostedJobs = alljobs.filter((job) => job.postedBy === userid);
  console.log(userPostedJobs);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Posted On",
      dataIndex: "postedOn",
    },
    {
      title: "Applied Candidates",
      dataIndex: "appliedCandidates",
    },
  ];

  const dataSource = [];

  for (let job of userPostedJobs) {
    let obj = {
      title: job.title,
      company: job.company,
      postedOn: moment(job.createdAt).format("MMM DD yyyy"),
      appliedCandidates: job.appliedCandidates.length,
      completeJobData: job,
    };
    dataSource.push(obj);
  }

  return (
    <div>
      <DefaultLayout>
        <Table columns={columns} dataSource={dataSource} />
      </DefaultLayout>
    </div>
  );
};

export default PostedJobs;
