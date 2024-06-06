import { React, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
import { Table, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteJob } from "../redux/actions/jobActions";
import Swal from "sweetalert2";

const PostedJobs = () => {
  const dispatch = useDispatch();
  const alljobs = useSelector((state) => state.jobsReducer).jobs;
  const allusers = useSelector((state) => state.usersReducer).users;
  const userid = JSON.parse(localStorage.getItem("user"))._id;
  const userPostedJobs = alljobs.filter((job) => job.postedBy === userid);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState();

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
    {
      title: "Actions",
      render: (text, data) => {
        return (
          <div className="flex">
            <EditOutlined
              className="mr-2"
              style={{ fontSize: 20 }}
              onClick={() => {
                navigate(`/editjob/${data.completeJobData._id}`);
              }}
            />
            <OrderedListOutlined
              style={{ fontSize: 20 }}
              onClick={() => {
                showModal(data.completeJobData);
              }}
            />

            <DeleteOutlined
              style={{ fontSize: 20 }}
              onClick={() => {
                if (data.completeJobData && data.completeJobData._id) {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      dispatch(deleteJob(data.completeJobData._id)).catch(
                        (error) => {
                          console.error("Error deleting job:", error);
                        }
                      );
                      // This is after conirm yes popup no need for now.
                      // Swal.fire({
                      //   title: "Deleted!",
                      //   text: "The job has been deleted succesfully",
                      //   icon: "success",
                      // });
                    }
                  });
                } else {
                  console.error("Job data or job ID is undefined");
                }
              }}
            />
          </div>
        );
      },
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

  const showModal = (job) => {
    setIsModalVisible(true);
    setSelectedJob(job);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function CandidatesList() {
    const candidatesColumns = [
      {
        title: "Candidate Id",
        dataIndex: "candidateId",
        render: (text, data) => {
          return (
            <Link to={`/users/${data.candidateId}`}>{data.candidateId}</Link>
          );
        },
      },
      {
        title: "Full Name",
        dataIndex: "fullName",
      },
      { title: "Applied Date", dataIndex: "appliedDate" },
    ];

    var candidatesDatasource = [];

    for (var candidate of selectedJob.appliedCandidates) {
      var user = allusers.find((user) => user._id == candidate.userid);
      console.log(user);

      var obj = {
        candidateId: user._id,
        fullName: user.firstName + " " + user.lastName,
        appliedDate: candidate.appliedDate,
      };

      candidatesDatasource.push(obj);
    }

    return (
      <Table columns={candidatesColumns} dataSource={candidatesDatasource} />
    );
  }

  return (
    <div>
      <DefaultLayout>
        <h1>Posted jobs</h1>
        <Table columns={columns} dataSource={dataSource} />

        <Modal
          title="Applied Candidates List"
          visible={isModalVisible}
          // closable={false}
          onOk={handleOk}
          onCancel={handleCancel}
          width={800}
        >
          <CandidatesList />
        </Modal>
      </DefaultLayout>
    </div>
  );
};

export default PostedJobs;
