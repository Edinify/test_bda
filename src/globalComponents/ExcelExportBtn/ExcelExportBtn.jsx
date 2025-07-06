import React from "react";
import { LuDownload } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { downloadExcelAction } from "../../redux/actions/studentsActions";
import "./excel-export.css";
import LoadingExcelBtn from "../Loading/components/LoadingExcelBtn/LoadingExcelBtn";
import { downloadTeachersExcelAction } from "../../redux/actions/teachersActions";
import { useLocation } from "react-router-dom";
import { downloadCoursesExcelAction } from "../../redux/actions/coursesActions";
import { downloadSyllabusExcelAction } from "../../redux/actions/syllabusActions";
import { downloadTuitionFeeExcelAction } from "../../redux/actions/tuitionFeeActions";
import { downloadCareersExcelAction } from "../../redux/actions/careerActions";
import { downloadConsultationExcelAction } from "../../redux/actions/consultationsActions";

const ExcelExportBtn = ({ pageName }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.downloadExcel);
  const { selectedCourse } = useSelector((state) => state.syllabusCourse);
  const { consultationSearchValues, consultationPhoneSearchValues } =
    useSelector((state) => state.searchValues);
  const { startDate, endDate, status, course, whereComing } = useSelector(
    (state) => state.filter
  );

  const { tuitionFeeSearchValues } = useSelector((state) => state.searchValues);
  const { selectedGroups, selectedCourses } = useSelector(
    (state) => state.selectedGroups
  );
  const { tuitionStatus } = useSelector((state) => state.filter);

  const { studentSearchValues } = useSelector((state) => state.searchValues);
  const { courseId } = useSelector((state) => state.studentStatus);
  const { status: studentGroupStatus } = useSelector(
    (state) => state.studentGroupStatus
  );
  const { selectedGroup } = useSelector((state) => state.dropdownGroup);

  const handleDownloadExcel = () => {
    switch (pageName) {
      case "student":
        dispatch(
          downloadExcelAction({
            searchQuery: studentSearchValues,
            courseId: courseId,
            status: studentGroupStatus,
            groupId: selectedGroup._id,
          })
        );
        break;
      case "teacher":
        let role =
          location.pathname === "/teachers/mentors" ? "mentor" : "teacher";
        dispatch(downloadTeachersExcelAction(role));
        break;
      case "course":
        dispatch(downloadCoursesExcelAction());
        break;
      case "syllabus":
        dispatch(downloadSyllabusExcelAction(selectedCourse?._id));
        break;
      case "tuition-fee":
        dispatch(
          downloadTuitionFeeExcelAction({
            searchQuery: tuitionFeeSearchValues,
            coursesIds: selectedCourses,
            groupsIds: selectedGroups,
            status: tuitionStatus,
          })
        );

        break;
      case "career":
        dispatch(downloadCareersExcelAction());
        break;
      case "consultation":
        dispatch(
          downloadConsultationExcelAction({
            consultationSearchValues,
            consultationPhoneSearchValues,
            startDate,
            endDate,
            status,
            course,
            whereComing,
          })
        );
        break;
      default:
        return;
    }
  };

  return (
    <button className="excel-export-btn">
      {loading ? (
        <LoadingExcelBtn />
      ) : (
        <LuDownload onClick={handleDownloadExcel} className="excel-download" />
      )}
    </button>
  );
};

export default ExcelExportBtn;
