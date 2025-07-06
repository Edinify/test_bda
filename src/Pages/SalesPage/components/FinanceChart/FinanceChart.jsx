import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./financeChart.css";
import Chart from "react-apexcharts";

const FinanceChart = () => {
  const { salesChart } = useSelector((state) => state.salesData);
  const [series, setSeries] = useState([
    {
      name: "Lead",
      data: [],
    },
    {
      name: "Planlanan",
      data: [],
    },
    {
      name: "Konsultasiya",
      data: [],
    },
    {
      name: "Satış",
      data: [],
    },
  ]);

  let options = {
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            height: 351,
          },
        },
      },
    ],
    colors: [
      "rgba(5, 165, 234, 0.10)",
      "rgba(240, 59, 42, 0.10)",
      "rgba(251, 160, 19, 0.10)",
      "rgba(0, 188, 133, 0.10)",
    ],
    legend: {
      show: true,
      onItemClick: {
        toggleDataSeries: false,
      },
      onItemHover: {
        highlightDataSeries: false,
      },
      markers: {
        fillColors: [
          "rgba(5, 165, 234, 0.5)",
          "rgba(240, 59, 42, 0.5)",
          "rgba(251, 160, 19, 0.5)",
          "rgba(0, 188, 133, 0.5)",
        ],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 1,
      colors: ["#05A5EA", "#F03B2A", "#FBA013", "#00BC85"],
    },
    xaxis: {
      categories: salesChart.categories,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  useEffect(() => {
    setSeries(salesChart.series);
  }, [salesChart]);

  // // console.log(salesChart, " chaaart");
  return (
    <div className="finance-chart">
      <Chart
        options={options}
        series={series}
        type="area"
        width="100%"
        height="305"
      />

      <div className="chart-legends">
        <div
          className="legend"
          style={{
            backgroundColor: "rgba(71, 72, 72, 0.1)",
            border: "1px solid gray",
          }}
          onClick={() => {
            setSeries(salesChart.series);
          }}
        >
          Hamısı
        </div>

        <div
          className="legend blue"
          onClick={() => {
            setSeries(
              salesChart.series.map((item) =>
                item.name !== "Lead" ? { ...item, data: [] } : item
              )
            );
          }}
        >
          Lead
        </div>
        <div
          className="legend red"
          onClick={() => {
            setSeries(
              salesChart.series.map((item) =>
                item.name !== "Planlanan" ? { ...item, data: [] } : item
              )
            );
          }}
        >
          Planlanan
        </div>
        <div
          className="legend yellow"
          onClick={() => {
            setSeries(
              salesChart.series.map((item) =>
                item.name !== "Konsultasiya" ? { ...item, data: [] } : item
              )
            );
          }}
        >
          Konsultasiya
        </div>
        <div
          className="legend green"
          onClick={() => {
            setSeries(
              salesChart.series.map((item) =>
                item.name !== "Satış" ? { ...item, data: [] } : item
              )
            );
          }}
        >
          Satış
        </div>
      </div>
    </div>
  );
};

export default FinanceChart;
