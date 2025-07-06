import React from "react";
import { Route } from "react-router";
import LessonTablePage from "../Pages/LessonTablePage/LessonTablePage";
import EventsPage from "../Pages/EventsPage/EventsPage";

const TeacherPanelRoute = () => {
  return (
    <>
      <Route path="/teacher-panel/" element={<LessonTablePage />} />
      <Route path="/event/" element={<EventsPage />} />
    </>
  );
};

export default TeacherPanelRoute;
