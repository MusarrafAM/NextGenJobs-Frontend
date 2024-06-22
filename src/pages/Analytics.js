import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";

import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import generateColors from "../utils/generateColors";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const Analytics = () => {
  const { jobs } = useSelector((state) => state.jobsReducer);
  const userType = JSON.parse(localStorage.getItem("user")).userType;
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  // Admin
  const AdminApprovedJobs = jobs.filter((job) => job.status === "approved");
  const AdminRejectedJobs = jobs.filter((job) => job.status === "rejected");
  const AdminPendingJobs = jobs.filter((job) => job.status === "pending");

  //JobPoster with Admin
  const PosterPostedJobs = jobs.filter((job) => job.postedBy == userId);
  const PosterJobsApprovedByAdmin = PosterPostedJobs.filter(
    (job) => job.status === "approved"
  );
  const PosterJobsRejectedByAdmin = PosterPostedJobs.filter(
    (job) => job.status === "rejected"
  );
  const PosterJobspendingByAdmin = PosterPostedJobs.filter(
    (job) => job.status === "pending"
  );

  //JobPoster with jobseeker
  // PosterJobsApprovedByAdmin will be used from top.
  let totalAppliedApplications = 0;
  let approvedCount = 0;
  let rejectedCount = 0;
  let pendingCount = 0;

  // Get the total number of applied applications
  PosterJobsApprovedByAdmin.forEach((job) => {
    totalAppliedApplications += job.appliedCandidates.length;
  });

  // get the counts of approved rejected pending counts of all the applied jobs for the poster
  PosterJobsApprovedByAdmin.forEach((job) => {
    job.appliedCandidates.forEach((candidate) => {
      switch (candidate.status) {
        case "Approved":
          approvedCount++;
          break;
        case "Rejected":
          rejectedCount++;
          break;
        case "pending":
          pendingCount++;
          break;
        default:
          break;
      }
    });
  });

  //Jobseeker
  const UserAppliedJobs = JSON.parse(localStorage.getItem("user")).appliedJobs;
  const userSelectedJobs = UserAppliedJobs.filter(
    (job) => job.status === "Approved"
  );
  const userRejectedJobs = UserAppliedJobs.filter(
    (job) => job.status === "Rejected"
  );
  const userPendingJobs = UserAppliedJobs.filter(
    (job) => job.status === "pending"
  );

  const numColors = AdminApprovedJobs.length;
  const backgroundColors = generateColors(numColors);

  // Admin
  const sourceDataAdminJobStatus = [
    {
      label: "Total Jobs",
      value: jobs.length,
      color: "rgba(43, 63, 229, 0.8)",
    },
    {
      label: "Approved",
      value: AdminApprovedJobs.length,
      color: "rgba(46, 204, 113, 0.8)", // Green
    },
    {
      label: "Pending",
      value: AdminPendingJobs.length,
      color: "rgba(241, 196, 15, 0.8)", // Yellow
    },
    {
      label: "Rejected",
      value: AdminRejectedJobs.length,
      color: "rgba(231, 76, 60, 0.8)", // Red
    },
  ];

  //JobPoster With Admin
  const sourceDataJobPosterWithAdminJobStatus = [
    {
      label: "Posted Jobs",
      value: PosterPostedJobs.length,
      color: "rgba(43, 63, 229, 0.8)",
    },
    {
      label: "Approved By Admin",
      value: PosterJobsApprovedByAdmin.length,
      color: "rgba(46, 204, 113, 0.8)", // Green
    },
    {
      label: "In Proggress",
      value: PosterJobspendingByAdmin.length,
      color: "rgba(241, 196, 15, 0.8)", // Yellow
    },
    {
      label: "Rejected By Admin",
      value: PosterJobsRejectedByAdmin.length,
      color: "rgba(231, 76, 60, 0.8)", // Red
    },
  ];

  //JobPoster With JobSeeker
  const sourceDataJobPosterWithJobSeekerJobStatus = [
    {
      label: "Total Applications Received",
      value: totalAppliedApplications,
      color: "rgba(43, 63, 229, 0.8)",
    },
    {
      label: "Approved Applications",
      value: approvedCount,
      color: "rgba(46, 204, 113, 0.8)", // Green
    },
    {
      label: "Pending Applications",
      value: pendingCount,
      color: "rgba(241, 196, 15, 0.8)", // Yellow
    },
    {
      label: "Rejected Applications",
      value: rejectedCount,
      color: "rgba(231, 76, 60, 0.8)", // Red
    },
  ];

  //JobSeeker
  const sourceDataJobSeekerJobStatus = [
    {
      label: "Applications sent",
      value: UserAppliedJobs.length,
      color: "rgba(43, 63, 229, 0.8)",
    },
    {
      label: "Selected Applications",
      value: userSelectedJobs.length,
      color: "rgba(46, 204, 113, 0.8)", // Green
    },
    {
      label: "In Proggress",
      value: userPendingJobs.length,
      color: "rgba(241, 196, 15, 0.8)", // Yellow
    },
    {
      label: "Rejected Applications",
      value: userRejectedJobs.length,
      color: "rgba(231, 76, 60, 0.8)", // Red
    },
  ];

  // Count occurrences of approved each job title
  const jobCounts = {};
  AdminApprovedJobs.forEach((job) => {
    const title = job.title;
    if (jobCounts[title]) {
      jobCounts[title]++;
    } else {
      jobCounts[title] = 1;
    }
  });

  // Convert jobCounts object to the desired array format
  const sourceDataAdminApprovedJobCounts = Object.keys(jobCounts).map(
    (title) => ({
      label: title,
      value: jobCounts[title],
    })
  );

  // linechart data
  // Function to get month name from month number
  const getMonthName = (monthNum) => {
    switch (monthNum) {
      case "01":
        return "Jan";
      case "02":
        return "Feb";
      case "03":
        return "Mar";
      case "04":
        return "Apr";
      case "05":
        return "May";
      case "06":
        return "Jun";
      case "07":
        return "Jul";
      case "08":
        return "Aug";
      case "09":
        return "Sep";
      case "10":
        return "Oct";
      case "11":
        return "Nov";
      case "12":
        return "Dec";
      default:
        return "";
    }
  };

  // Prepare data for line chart (monthly approved jobs)
  const monthlyData = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  AdminApprovedJobs.forEach((job) => {
    const month = job.createdAt.substring(5, 7); // Extract month from createdAt
    monthlyData[getMonthName(month)]++; // Increment count for the respective month
  });

  // Convert monthlyData object to arrays for chart data
  const lineLabels = Object.keys(monthlyData);
  const lineData = Object.values(monthlyData);

  return (
    <DefaultLayout>
      <div className="Analytics">
        <div className="dataCard lineChart">
          <Line
            data={{
              labels: lineLabels,
              datasets: [
                {
                  label: "Posted Jobs Count",
                  data: lineData,
                  backgroundColor: "#064FF0",
                  borderColor: "#064FF0",
                },
              ],
            }}
            options={{
              elements: {
                line: {
                  tension: 0.5,
                },
              },
              plugins: {
                title: {
                  text: "Posted Jobs by Month",
                },
              },
            }}
          />
        </div>

        {userType === "admin" && (
          <div className="dataCard barChart">
            <Bar
              data={{
                labels: sourceDataAdminJobStatus.map((data) => data.label),
                datasets: [
                  {
                    label: "Count",
                    data: sourceDataAdminJobStatus.map((data) => data.value),
                    backgroundColor: sourceDataAdminJobStatus.map(
                      (data) => data.color
                    ),
                    borderRadius: 5,
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    text: "Revenue Source",
                  },
                },
              }}
            />
          </div>
        )}

        {userType === "jobposter" && (
          <div className="dataCard barChart">
            <Bar
              data={{
                labels: sourceDataJobPosterWithAdminJobStatus.map(
                  (data) => data.label
                ),
                datasets: [
                  {
                    label: "Count",
                    data: sourceDataJobPosterWithAdminJobStatus.map(
                      (data) => data.value
                    ),
                    backgroundColor: sourceDataJobPosterWithAdminJobStatus.map(
                      (data) => data.color
                    ),
                    borderRadius: 5,
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Admin Status Overview of My Posted Jobs",
                  },
                },
              }}
            />
          </div>
        )}

        {userType === "jobseeker" && (
          <div className="dataCard barChart">
            <Bar
              data={{
                labels: sourceDataJobSeekerJobStatus.map((data) => data.label),
                datasets: [
                  {
                    label: "Count",
                    data: sourceDataJobSeekerJobStatus.map(
                      (data) => data.value
                    ),
                    backgroundColor: sourceDataJobSeekerJobStatus.map(
                      (data) => data.color
                    ),
                    borderRadius: 5,
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "My Job Applications Status Overview",
                  },
                },
              }}
            />
          </div>
        )}

        <div className="dataCard allPostedJobsPieCHart">
          <Doughnut
            data={{
              labels: sourceDataAdminApprovedJobCounts.map(
                (data) => data.label
              ),
              datasets: [
                {
                  label: "Count",
                  data: sourceDataAdminApprovedJobCounts.map(
                    (data) => data.value
                  ),
                  backgroundColor: backgroundColors,
                  borderColor: backgroundColors,
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  // display: true,
                  text: "Jobs posted",
                },
              },
            }}
          />
        </div>

        {/* This below chart only for Jobposter */}
        {userType === "jobposter" && (
          <div className="dataCard lastBarChart">
            <Bar
              data={{
                labels: sourceDataJobPosterWithJobSeekerJobStatus.map(
                  (data) => data.label
                ),
                datasets: [
                  {
                    label: "Count",
                    data: sourceDataJobPosterWithJobSeekerJobStatus.map(
                      (data) => data.value
                    ),
                    backgroundColor:
                      sourceDataJobPosterWithJobSeekerJobStatus.map(
                        (data) => data.color
                      ),
                    borderRadius: 5,
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Users Application Status Overview of My Posted Jobs",
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Analytics;
