import React from "react";
import  LatePayIcon  from "../../../assets/icons/payment/latePay.svg?react";
import  TodayPayIcon  from "../../../assets/icons/payment/todayPay.svg?react";
import  OtherPayIcon  from "../../../assets/icons/lessonStatus/otherPay.svg?react";
import "./lessonResult.css"

import { useSelector } from "react-redux";
const LessonStatusResult = () => {
  const { confirmedCount, cancelledCount, unviewedCount } = useSelector(
    (state) => state.lessonTablePagination
  );

  const paymentData = [
    {
      id: 1,
      name: "Keçirilib",
      count: confirmedCount,
      img: <TodayPayIcon />,
    },
    { id: 2, name: "Gözləyir", count: unviewedCount, img: <OtherPayIcon /> },
    { id: 3, name: "Əvəzlənəcək", count: cancelledCount, img: <LatePayIcon /> },
  ];
  return (
    <div className="lesson-result-container lesson-status ">
      {paymentData?.map((item) => (
        <div className="lesson-res-content" key={item.id}>
          <h2>{item.name}</h2>
          <div className="circle-icon">
            <p className="filter-count">{item.count}</p>
            {item.img}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonStatusResult;
