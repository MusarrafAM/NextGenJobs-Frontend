import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";

import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import generateColors from "../utils/generateColors";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

// data
const sourceData = [
  {
    label: "Ads",
    value: 32,
  },
  {
    label: "Subscriptions",
    value: 45,
  },
  {
    label: "Sponsorships",
    value: 23,
  },
];

const revenueData = [
  {
    label: "Jan",
    revenue: 64854,
    cost: 32652,
  },
  {
    label: "Feb",
    revenue: 54628,
    cost: 42393,
  },
  {
    label: "Mar",
    revenue: 117238,
    cost: 50262,
  },
  {
    label: "Apr",
    revenue: 82830,
    cost: 64731,
  },
  {
    label: "May",
    revenue: 91208,
    cost: 41893,
  },
  {
    label: "Jun",
    revenue: 103609,
    cost: 83809,
  },
  {
    label: "Jul",
    revenue: 90974,
    cost: 44772,
  },
  {
    label: "Aug",
    revenue: 82919,
    cost: 37590,
  },
  {
    label: "Sep",
    revenue: 62407,
    cost: 43349,
  },
  {
    label: "Oct",
    revenue: 82528,
    cost: 45324,
  },
  {
    label: "Nov",
    revenue: 56979,
    cost: 47978,
  },
  {
    label: "Dec",
    revenue: 87436,
    cost: 39175,
  },
];

const Analytics = () => {
  const { jobs } = useSelector((state) => state.jobsReducer);
  // Admin
  const AdminApprovedJobs = jobs.filter((job) => job.status === "approved");
  const AdminRejectedJobs = jobs.filter((job) => job.status === "rejected");
  const AdminPendingJobs = jobs.filter((job) => job.status === "pending");

  const numColors = AdminApprovedJobs.length;
  const backgroundColors = generateColors(numColors);

  // Admin
  const sourceDataAdminJobStatus = [
    {
      label: "Total Jobs",
      value: jobs.length,
      color: "rgba(43, 63, 229, 0.8)",
      // color: "rgba(128, 128, 128, 0.8)",
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

  return (
    <DefaultLayout>
      <div className="Analytics">
        <div className="dataCard revenueCard">
          <Line
            data={{
              labels: revenueData.map((data) => data.label),
              datasets: [
                {
                  label: "Revenue",
                  data: revenueData.map((data) => data.revenue),
                  backgroundColor: "#064FF0",
                  borderColor: "#064FF0",
                },
                {
                  label: "Cost",
                  data: revenueData.map((data) => data.cost),
                  backgroundColor: "#FF3030",
                  borderColor: "#FF3030",
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
                  text: "Monthly Revenue & Cost",
                },
              },
            }}
          />
        </div>

        <div className="dataCard customerCard">
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

        <div className="dataCard categoryCard">
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
      </div>
    </DefaultLayout>
  );
};

export default Analytics;
