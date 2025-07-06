import React from "react";
import { Route } from "react-router";
import LessonTablePage from "../Pages/LessonTablePage/LessonTablePage";

const StudentPanelRoute = () => {
  return (
    <>
      <Route path="/student-panel/" element={<LessonTablePage />} />
    </>
  );
};

export default StudentPanelRoute;
