import React from "react";
import { Route } from "react-router";
// import StudentTable from "../Pages/StudentPanel/StudentTable";
import TeachersPage from "../Pages/TeachersPage/TeachersPage";
import StudentsPage from "../Pages/StudentsPage/StudentsPage";
import CoursesPage from "../Pages/CoursesPage/CoursesPage";
import TuitionFeePage from "../Pages/TuitionFeePage/TuitionFee";
import ConsultationsPage from "../Pages/ConsultationsPage/ConsultationsPage";
import GroupsPage from "../Pages/GroupsPage/GroupsPage";
import CareerPage from "../Pages/CareerPage/CareerPage";
import SyllabusPage from "../Pages/SyllabusPage/SyllabusPage";
import LessonTablePage from "../Pages/LessonTablePage/LessonTablePage";
import EventsPage from "../Pages/EventsPage/EventsPage";
import { Dashboard } from "../Pages/DashboardPage/DashboardPage";
import RoomsPage from "../Pages/RoomsPage/RoomsPage";
import DiplomaPage from "../Pages/DiplomaPage/DiplomaPage";
import FinancePage from "../Pages/SalesPage/FinancePage";
import ReportPage from "../Pages/ReportPage/ReportPage";
import WhereHeardPage from "../Pages/WhereHeardPage/WhereHeardPage";
import UpdatesPage from "../Pages/UpdatesPage/UpdatesPage";

const WorkersPanelRoute = (user) => {
  // const { user } = useSelector((state) => state.user);
  const profiles = user?.profiles?.reduce(
    (profilesObj, item) => ({ ...profilesObj, [item.profile]: true }),
    {}
  );

  return (
    <>
      {profiles?.courses && <Route path="/courses" element={<CoursesPage />} />}

      {profiles?.room && <Route path="/room" element={<RoomsPage />} />}

      {profiles?.students && (
        <Route path="/students" element={<StudentsPage />} />
      )}
      {profiles?.teachers && (
        <>
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/teachers/mentors" element={<TeachersPage />} />
        </>
      )}

      {profiles?.tuitionFee && (
        <Route path="/tuitionFee" element={<TuitionFeePage />} />
      )}

      {profiles?.consultation && (
        <Route path="/consultation" element={<ConsultationsPage />} />
      )}

      {profiles?.sales && <Route path="/sales" element={<FinancePage />} />}

      {profiles?.groups && (
        <>
          <Route path="/groups/current" element={<GroupsPage />} />
          <Route path="/groups/waiting" element={<GroupsPage />} />
          <Route path="/groups/ended" element={<GroupsPage />} />
        </>
      )}

      {profiles?.career && <Route path="/career" element={<CareerPage />} />}

      {profiles?.syllabus && (
        <Route path="/syllabus" element={<SyllabusPage />} />
      )}
      {profiles?.lessonTable && (
        <>
          <Route path="/lessonTable" element={<LessonTablePage />} />
          <Route path="/" element={<LessonTablePage />} />
        </>
      )}
      {profiles?.events && <Route path="/events" element={<EventsPage />} />}
      {profiles?.dashboard && (
        <Route path="/dashboard" element={<Dashboard />} />
      )}
      {profiles?.diploma && <Route path="/diploma" element={<DiplomaPage />} />}
      {profiles?.report && <Route path="/report" element={<ReportPage />} />}
      {profiles?.whereHeard && (
        <Route path="/whereHeard" element={<WhereHeardPage />} />
      )}
      <Route path="/updates/:id" element={<UpdatesPage />} />
    </>
  );
};

export default WorkersPanelRoute;
