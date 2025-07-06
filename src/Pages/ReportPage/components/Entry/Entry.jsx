// Entry.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsIncomes } from "../../../../redux/actions/reportActions";
import MoneyIcon  from "../../../../assets/icons/report/money.svg?react";
import moment from "moment";
const Entry = () => {
  const dispatch = useDispatch();
  const today = moment();

  const startDate = today.startOf("month").format("YYYY-MM-DD");
  const endDate = today.endOf("month").format("YYYY-MM-DD");
  const [date, setDate] = useState({ startDate: startDate, endDate: endDate });

  const { studentsIncomes } = useSelector((state) => state.reportDatas);

  useEffect(() => {
    dispatch(getStudentsIncomes(date.startDate, date.endDate, ""));
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedDate = { ...date, [name]: value };
    setDate(updatedDate);
  };
  useEffect(() => {
    if (date.startDate && date.endDate) {
      dispatch(getStudentsIncomes(date.startDate, date.endDate, ""));
    }
  }, [date, dispatch]);

  const handleKeyDown = (e) => {
    if (date.startDate && date.endDate) {
      dispatch(getStudentsIncomes(date.startDate, date.endDate, ""));
    }
  };

  const data = [
    {
      id: 1,
      name: "Tələbə aylıq ödəniş",
      studentCount: studentsIncomes?.fullPaymentStudentIncome,
    },
    {
      id: 2,
      name: "Tələbə tam ödəniş",
      studentCount: studentsIncomes?.partPaymentStudentIncome,
    },
    {
      id: 3,
      name: "Gecikmə ödənişi",
      studentCount: studentsIncomes?.delayPaymentStudentIncome,
    },
    {
      id: 4,
      name: "Yeni qeydiyyat",
      studentCount: studentsIncomes?.waitingStudentIncome,
    },
  ];

  return (
    <div className="entry-card">
      <div className="entry-header-wrapper">
        <div className="entry-header-top">
          <h2 className="entry-title">Daxilolmalar</h2>
        </div>
        <div className="entry-date-container">
          <div className="entry-date-inputs">
            <input
              type="date"
              name="startDate"
              value={date.startDate}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <input
              type="date"
              name="endDate"
              value={date.endDate}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="entry-icon-wrapper">
            <div className="entry-icon">
              <MoneyIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="entry-list">
        {data.map((item) => (
          <div className="entry-item" key={item.id}>
            <p className="entry-item-title">{item.name}</p>
            <p className="entry-item-value">+{item.studentCount || 0} AZN</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Entry;
