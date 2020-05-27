import React, { useRef, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

interface dataProps {
  data: any;
}

const MonthlyChart: React.FC<dataProps> = (props) => {
  let data = props.data;
  let chartRef = useRef<Bar>(null);

  const initialdata = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Cleared Balance",
        data: [0],
        backgroundColor: "rgba(40, 167, 69, 0.6)",
      },
    ],
  };
  let [chartData, setChartData] = useState(initialdata);

  useEffect(() => {
    initialdata.datasets[0].data = data;
    setChartData(initialdata);
  }, [data]);

  const options = {
    events: false,
    responsive: false,
    animation: {
      duration: 1,
      onComplete: function () {
        let chartInstance = chartRef.current?.chartInstance;
        let ctx = chartInstance.ctx;
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        chartData.datasets.forEach(function (dataset, i) {
          let meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (bar: any, index: any) {
            var data = dataset.data[index];
            ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
        });
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
            color: "rgba(40, 167, 69, 0.6)",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
            color: "rgba(40, 167, 69, 0.6)",
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <React.Fragment>
      <Bar
        data={chartData}
        ref={chartRef}
        height={300}
        width={500}
        options={options}
      ></Bar>
    </React.Fragment>
  );
};

export default MonthlyChart;
