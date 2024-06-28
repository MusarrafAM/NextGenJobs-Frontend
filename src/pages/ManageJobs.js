import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
import { Table, Modal } from "antd";
import { DeleteOutlined, OrderedListOutlined } from "@ant-design/icons";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteJob } from "../redux/actions/jobActions";
import Swal from "sweetalert2";
import axios from "axios";

const ManageJobs = () => {
  const dispatch = useDispatch();
  const alljobs = useSelector((state) => state.jobsReducer).jobs;
  const allusers = useSelector((state) => state.usersReducer).users;
  const userid = JSON.parse(localStorage.getItem("user"))._id;
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState();

  async function handleApproveJob(jobid) {
    try {
      const response = await axios.put(`/api/jobs/updatejobstatus/${jobid}`, {
        status: "approved",
      });
      console.log("Job approved successfully!");
      // Optionally, you can update the UI to reflect the new status
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error approving job:", error);
    }
  }

  const getUserFullName = (userId) => {
    const user = allusers.find((user) => user._id === userId);
    if (user) {
      return `${user.username}`;
    }
    return "Unknown";
  };

  async function handleRejectJob(jobid) {
    try {
      const response = await axios.put(`/api/jobs/updatejobstatus/${jobid}`, {
        status: "rejected",
      });
      console.log("Job rejected successfully!");
      // Optionally, you can update the UI to reflect the new status
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error approving job:", error);
    }
  }

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
      title: "Job Id",
      dataIndex: "jobid",
      render: (text, data) => {
        return <Link to={`/jobs/${data.jobid}`}>{data.jobid}</Link>;
      },
    },
    {
      title: "Posted On",
      dataIndex: "postedOn",
    },
    {
      title: "Posted By",
      dataIndex: "postedBy",
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

    {
      title: "Status",
      dataIndex: "status",
      render: (text, data) => {
        return (
          <div>
            {data.status === "pending" ? (
              <>
                <button
                  onClick={() => handleApproveJob(data.completeJobData._id)}
                >
                  Approve Job
                </button>
                <button
                  onClick={() => handleRejectJob(data.completeJobData._id)}
                >
                  Reject Job
                </button>
              </>
            ) : (
              <span>{data.status}</span>
            )}
          </div>
        );
      },
    },
  ];

  const dataSource = alljobs.map((job) => ({
    key: job._id,
    title: job.title,
    company: job.company,
    postedOn: moment(job.createdAt).format("MMM DD yyyy"),
    appliedCandidates: job.appliedCandidates.length,
    jobid: job._id,
    status: job.status,
    completeJobData: job,
    postedBy: job.postedBy ? getUserFullName(job.postedBy) : "Unknown",
  }));

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

  const CandidatesList = ({ selectedJob }) => {
    const [candidateStatus, setCandidateStatus] = useState({});

    useEffect(() => {
      const fetchCandidateStatuses = async () => {
        try {
          const response = await axios.get(
            `/api/jobs/candidatestatuses/${selectedJob._id}`
          );
          const { candidateStatuses } = response.data;
          setCandidateStatus(candidateStatuses);
        } catch (error) {
          console.error("Error fetching candidate statuses:", error);
        }
      };

      fetchCandidateStatuses();
    }, [selectedJob]);

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
      {
        title: "Job Poster Decision",
        dataIndex: "actions",
        render: (text, data) => (
          <div>
            {/* Conditionally render buttons or status based on candidate status */}
            {candidateStatus[data.candidateId] === "pending" ? (
              <>
                <p>pending</p>
              </>
            ) : (
              <span>{candidateStatus[data.candidateId]}</span>
            )}
          </div>
        ),
      },
    ];

    const candidatesDataSource = selectedJob.appliedCandidates.map(
      (candidate) => {
        const user = allusers.find((user) => user._id === candidate.userid);
        return {
          key: candidate.userid,
          candidateId: user._id,
          fullName: `${user.firstName} ${user.lastName}`,
          appliedDate: moment(candidate.appliedDate).format("MMM DD, YYYY"),
        };
      }
    );

    return (
      <Table columns={candidatesColumns} dataSource={candidatesDataSource} />
    );
  };

  return (
    <div>
      <DefaultLayout>
        <h1>Manage Jobs</h1>
        <Table columns={columns} dataSource={dataSource} />

        <Modal
          title="Applied Candidates List"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={800}
        >
          <CandidatesList selectedJob={selectedJob} />
        </Modal>
      </DefaultLayout>
    </div>
  );
};

export default ManageJobs;
