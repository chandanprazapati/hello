import React, { useEffect } from "react";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import data from "./data";
import {
  piechartData,
  wadaChartData,
} from "../../../services/apiServices/dashboard/revenue/revenueServices";
import { indexSifarish } from "../../../services/apiServices/dashboard/sifarish/sifarishServices";
import { planningWadaChartData } from "../../../services/apiServices/dashboard/planning/planningService";

// revenue pie chart
function RevenuePieChart() {
  const [apiData, setApiData] = React.useState([]);
  useEffect(() => {
    const fetchedData = () => {
      piechartData().then(({ status, data, message }) => {
        try {
          if (status) {
            setApiData(data);
          }
        } catch (error) {
          toast.error(message, {
            autoClose: 1000,
          });
        }
      });
    };
    fetchedData();
  }, [setApiData]);
  const initialData = {
    labels: apiData.map((item) => item?.name),
    datasets: [
      {
        data: apiData?.map((item) =>
          item?.amount == parseInt(0) ? parseInt(1) : item?.amount
        ),
        backgroundColor: [
          "#FF0000",
          "#00FF00",
          "#0000FF",
          "#FFFF00",
          "#FF00FF",
          "#00FFFF",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
          align: "start",
          boxWidth: 10,
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const meta = chart.getDatasetMeta(0);
                const style = meta.controller.getStyle(i);

                return {
                  text: label,
                  fillStyle: style.backgroundColor,
                  hidden: !chart.getDataVisibility(i),

                  // Add custom CSS class for flex layout
                  // Adjust the class name as needed
                  extra: "legend-item",
                };
              });
            }
            return [];
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "400px", margin: "0 auto" }}>
      <Pie data={initialData} options={options} />
    </div>
  );
}

// revenue pie chart for wada
function RevenueWadaPieChart() {
  const [apiData, setApiData] = React.useState([]);
  useEffect(() => {
    const fetchedData = () => {
      wadaChartData().then(({ status, data, message }) => {
        try {
          if (status) {
            setApiData(data);
          }
        } catch (error) {
          toast.error(message, {
            autoClose: 1000,
          });
        }
      });
    };
    fetchedData();
  }, [setApiData]);
  const initialData = {
    labels: apiData.map((item) => item?.name),
    datasets: [
      {
        data: apiData?.map((item) =>
          item?.amount == parseInt(0) ? parseInt(1) : item?.amount
        ),
        backgroundColor: [
          "#FF0000",
          "#00FF00",
          "#0000FF",
          "#FFFF00",
          "#FF00FF",
          "#00FFFF",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
          align: "start",
          boxWidth: 10,
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const meta = chart.getDatasetMeta(0);
                const style = meta.controller.getStyle(i);

                return {
                  text: label,
                  fillStyle: style.backgroundColor,
                  hidden: !chart.getDataVisibility(i),
                  extra: "legend-item",
                };
              });
            }
            return [];
          },
        },
      },
    },
    maintainAspectRatio: false, // Se
  };

  return (
    <div style={{ width: "400px", height: "400px", margin: "0 auto" }}>
      <Bar data={initialData} options={options} />
    </div>
  );
}

// sifarish chart
function SifarishPieChart  ()  {
  const [apiData, setApiData] = React.useState([]);
  useEffect(() => {
    const fetchedData = () => {
      indexSifarish().then(({ status, data, message }) => {
        try {
          if (status) {
            setApiData(data.noticeList);
          }
        } catch (error) {
          toast.error(message, {
            autoClose: 1000,
          });
        }
      });
    };
    fetchedData();
  }, [setApiData]);
  const initialData = {
    labels: apiData.map((item) => item?.name),
    datasets: [
      {
        data: apiData?.map((item) =>
          item?.count == parseInt(0) ? parseInt(1) : item?.count
        ),
        backgroundColor: [
          "#FF0000",
          "#00FF00",
          "#0000FF",
          "#FFFF00",
          "#FF00FF",
          "#00FFFF",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
          align: "start",
          boxWidth: 10,
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const meta = chart.getDatasetMeta(0);
                const style = meta.controller.getStyle(i);

                return {
                  text: label,
                  fillStyle: style.backgroundColor,
                  hidden: !chart.getDataVisibility(i),
                  extra: "legend-item",
                };
              });
            }
            return [];
          },
        },
      },
    },
    maintainAspectRatio: false, // Se
  };

  return (
    <div style={{ height: "400px", margin: "0 auto" }}>
      <Bar data={initialData} options={options} />
    </div>
  );
};

// planning pie chart
function PlanningPieChart() {
  const [apiData, setApiData] = React.useState([]);
  console.log(apiData, "apiData");
  useEffect(() => {
    const fetchedData = () => {
      planningWadaChartData().then(({ status, data, message }) => {
        try {
          if (status) {
            setApiData(data);
          }
        } catch (error) {
          toast.error(message, {
            autoClose: 1000,
          });
        }
      });
    };
    fetchedData();
  }, [setApiData]);
  const initialData = {
    labels: apiData.map((item) => item?.name),
    datasets: [
      {
        data: apiData?.map((item) =>
          item?.count == parseInt(0) ? parseInt(1) : item?.count
        ),
        backgroundColor: [
          "#FF0000",
          "#00FF00",
          "#0000FF",
          "#FFFF00",
          "#FF00FF",
          "#00FFFF",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
          align: "start",
          boxWidth: 10,
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const meta = chart.getDatasetMeta(0);
                const style = meta.controller.getStyle(i);

                return {
                  text: label,
                  fillStyle: style.backgroundColor,
                  hidden: !chart.getDataVisibility(i),

                  // Add custom CSS class for flex layout
                  // Adjust the class name as needed
                  extra: "legend-item",
                };
              });
            }
            return [];
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "400px", margin: "0 auto" }}>
      <Pie data={initialData} options={options} />
    </div>
  );
}

// revenue planning chart for wada
function PlanningWadaPieChart() {
  const [apiData, setApiData] = React.useState([]);
  useEffect(() => {
    const fetchedData = () => {
      planningWadaChartData().then(({ status, data, message }) => {
        try {
          if (status) {
            setApiData(data);
          }
        } catch (error) {
          toast.error(message, {
            autoClose: 1000,
          });
        }
      });
    };
    fetchedData();
  }, [setApiData]);
  const initialData = {
    labels: apiData.map((item) => item?.name),
    datasets: [
      {
        data: apiData?.map((item) =>
          item?.count == parseInt(0) ? parseInt(1) : item?.count
        ),
        backgroundColor: [
          "#FF0000",
          "#00FF00",
          "#0000FF",
          "#FFFF00",
          "#FF00FF",
          "#00FFFF",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
          align: "start",
          boxWidth: 10,
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const meta = chart.getDatasetMeta(0);
                const style = meta.controller.getStyle(i);

                return {
                  text: label,
                  fillStyle: style.backgroundColor,
                  hidden: !chart.getDataVisibility(i),
                  extra: "legend-item",
                };
              });
            }
            return [];
          },
        },
      },
    },
    maintainAspectRatio: false, // Se
  };

  return (
    <div style={{ width: "400px", height: "400px", margin: "0 auto" }}>
      <Bar data={initialData} options={options} />
    </div>
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { RevenuePieChart, RevenueWadaPieChart, SifarishPieChart ,PlanningPieChart,PlanningWadaPieChart};
