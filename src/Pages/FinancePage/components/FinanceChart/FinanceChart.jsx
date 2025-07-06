import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./financeChart.css";
import Chart from "react-apexcharts";

const FinanceChart = () => {
  const { financeChart } = useSelector((state) => state.financeData);
  const [series, setSeries] = useState([
    {
      name: "Mədaxil",
      data: [0],
    },
    {
      name: "Xərc",
      data: [0],
    },
    {
      name: "Dövriyyə",
      data: [0],
    },
    {
      name: "Qazanc",
      data: [0],
    },
  ]);
  const monthsLang = [
    { key: "January", name: "Yan" },
    { key: "February", name: "Fev" },
    { key: "March", name: "Mar" },
    { key: "April", name: "Apr" },
    { key: "May", name: "May" },
    { key: "June", name: "Iyn" },
    { key: "July", name: "Iyn" },
    { key: "August", name: "Avq" },
    { key: "September", name: "Sen" },
    { key: "October", name: "Okt" },
    { key: "November", name: "Noy" },
    { key: "December", name: "Dek" },
  ];
  const labels =
    financeChart && financeChart.months?.length > 0
      ? financeChart.months.map((item) => {
          return `${monthsLang.find((data) => data.key === item.month)?.name} ${
            item.year
          }`;
        })
      : [];

  const incomeValues =
    financeChart && financeChart?.chartIncome?.length > 0
      ? financeChart?.chartIncome.map((item) => {
          return item;
        })
      : [];

  const expenseValues =
    financeChart && financeChart?.chartExpense?.length > 0
      ? financeChart?.chartExpense.map((item) => {
          return item;
        })
      : [];

  const turnoverValues =
    financeChart && financeChart?.chartTurnover?.length > 0
      ? financeChart?.chartTurnover.map((item) => {
          return item;
        })
      : [];

  const profitValues =
    financeChart && financeChart?.chartProfit?.length > 0
      ? financeChart?.chartProfit.map((item) => {
          return item;
        })
      : [];

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
      "rgba(0, 188, 133, 0.10",
    ],
    legend: {
      show: false,
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
      categories: [...labels],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  const selectData = (value) => {
    setSeries([
      {
        name: "Mədaxil",
        data: value === "Mədaxil" ? [...incomeValues] : [0],
      },
      {
        name: "Xərc",
        data: value === "Xərc" ? [...expenseValues] : [0],
      },
      {
        name: "Dövriyyə",
        data: value === "Dövriyyə" ? [...turnoverValues] : [0],
      },
      {
        name: "Qazanc",
        data: value === "Qazanc" ? [...profitValues] : [0],
      },
    ]);
  };

  useEffect(() => {
    setSeries([
      {
        name: "Mədaxil",
        data: [...incomeValues],
      },
      {
        name: "Xərc",
        data: [...expenseValues],
      },
      {
        name: "Dövriyyə",
        data: [...turnoverValues],
      },
      {
        name: "Qazanc",
        data: [...profitValues],
      },
    ]);
  }, [financeChart]);



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
        <div className="legend blue" onClick={() => selectData("Mədaxil")}>
          Mədaxil
        </div>
        <div className="legend red" onClick={() => selectData("Xərc")}>
          Xərc
        </div>
        <div className="legend yellow" onClick={() => selectData("Dövriyyə")}>
          Dövriyyə
        </div>
        <div className="legend green" onClick={() => selectData("Qazanc")}>
          Qazanc
        </div>
      </div>
    </div>
  );
};

export default FinanceChart;
