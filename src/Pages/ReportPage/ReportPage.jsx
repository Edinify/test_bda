import React from "react";
import StatBox from "./components/StatBox/StatBox";
import ActiveStudentsCard from "./components/ActiveStudentsCard/ActiveStudentsCard";
import Entry from "./components/Entry/Entry";
import Sales from "./components/Sales/Sales";
import Groups from "./components/Groups/Groups";
import SalesReport from "./components/SalesReport/SalesReport";
import LessonRemainder from "./components/LessonRemainder/LessonRemainder";
import SalesDivision from "./components/SalesDivision/SalesDivision";
import StudentsList from "./components/StudentsList/StudentsList";
import CurrentGroup from "./components/CurrentGroup/CurrentGroup";

const ReportPage = () => {
  return (
    <div className="report-page">
      <div className="container">
        <div className="report-main">
          <div className="report-top">
            <div className="report-top-left">
              <div className="report-top-left-statbox-container">
                <StatBox />
              </div>
              <div className="report-top-bottom-container">
                <div className="report-top-active-student-container">
                  <ActiveStudentsCard />
                </div>
                <div className="report-top-right-container">
                  <div className="report-top-sales-container">
                    <Entry />
                    <Sales />
                  </div>
                  <div className="report-top-groups-container">
                    <Groups />
                  </div>
                </div>
              </div>
            </div>
            <div className="report-top-right">
              <LessonRemainder />
              <SalesReport />
            </div>
          </div>
          <div className="report-bottom">
            <div
              style={{
                width: "65%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <StudentsList />
              <CurrentGroup />
            </div>
            <div style={{ width: "35%", marginLeft: "10px" }}>
              <SalesDivision />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
