import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSoldConsultationsCountByCourse } from "../../../../redux/actions/reportActions";
import Tooltip from "@mui/material/Tooltip";
import moment from "moment";

const Sales = () => {
  const dispatch = useDispatch();
  const today = moment();

  const startDate = today.startOf("month").format("YYYY-MM-DD");
  const endDate = today.endOf("month").format("YYYY-MM-DD");


  const [date, setDate] = useState({
    startDate: startDate,
    endDate: endDate,
  });

  const { soldConsultationsCount } = useSelector((state) => state.reportDatas);

  useEffect(() => {
    dispatch(
      getSoldConsultationsCountByCourse(date.startDate, date.endDate, "")
    );
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedDate = { ...date, [name]: value };
    setDate(updatedDate);

   
  };

  useEffect(() => {
    if (date.startDate && date.endDate) {
      dispatch(getSoldConsultationsCountByCourse(date.startDate, date.endDate, ""));
    }
  }, [date, dispatch]);
  

  const handleKeyDown = (e) => {
    if (date.startDate || date.endDate) {
      dispatch(
        getSoldConsultationsCountByCourse(date.startDate, date.endDate, "")
      );
    }
  };



  return (
    <div className="entry-card" style={{ marginLeft: "10px" }}>
      <div className="entry-header-wrapper sales ">
        <div className="entry-header-top">
          <h2 className="entry-title">Satış</h2>
        </div>
        <div
          className="entry-date-inputs sales"
          style={{ display: "flex", flexDirection: "column", width: "50%" }}
        >
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
      </div>

      <div className="entry-list" style={{ marginTop: "5px" }}>
        {soldConsultationsCount?.map((consultation) => (
          <div className="entry-item" key={soldConsultationsCount.courseId}>
            <Tooltip
              title={consultation.courseName}
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    fontSize: "16px",
                    padding: "10px",
                  },
                },
              }}
            >
              <p
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "40px",
                }}
                className="entry-item-title"
              >
                {consultation.courseName}
              </p>
            </Tooltip>

            <p className="entry-item-value">
              +{consultation.studentsCount} tələbə{" "}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sales;
