import { useDispatch, useSelector } from "react-redux";
import  CloseIcon  from "../../assets/icons/more-modal/x-close.svg?react";
import "moment/locale/az";
import StudentConfirmModal from "./components/StudentConfirmModal/StudentConfirmModal";
import TeacherConfirmModal from "./components/TeacherConfirmModal/TeacherConfirmModal";
import ConsultationConfirmModal from "./components/ConsultationConfirmModal.jsx/ConsultationConfirmModal";
import LessonTableConfirmModal from "./components/LessonTableConfirmModal/LessonTableConfirmModal";
import CoursesConfirmModal from "./components/CoursesConfirmModal/CoursesConfirmModal";
import SyllabusConfirmModal from "./components/SyllabusConfirmModal/SyllabusConfirmModal";
import WorkersConfirmModal from "./components/WorkersConfirmModal/WorkersConfirmModal";
import GroupsConfirmModal from "./components/GroupsConfirmModal/GroupsConfirmModal";
import TuitionFeeConfirmModal from "./components/TuitionFeeConfirmModal/TuitionFeeConfirmModal";
import {
  GROUP_MODAL_ACTION_TYPE,
  COURSES_MODAL_ACTION_TYPE,
  STUDENTS_MODAL_ACTION_TYPE,
  TEACHERS_MODAL_ACTION_TYPE,
  TUITION_FEE_MODAL_ACTION_TYPE,
  LESSON_TABLE_MODAL_ACTION_TYPE,
  SYLLABUS_MODAL_ACTION_TYPE,
  CONSULTATION_MODAL_ACTION_TYPE,
} from "../../redux/actions-type";
const ConfirmModal = ({ type }) => {
  const dispatch = useDispatch();

  const getTypeHeader = (type) => {
    switch (type) {
      case "teacher":
        return "Təlimçi məlumatları";
      case "student":
        return "Tələbə məlumatları";
      case "consultation":
        return "Təlimçi məlumatlar";
      case "lesson-table":
        return "Dərs məlumatları";
      case "courses":
        return "Fənn məlumatları";
      case "syllabus":
        return "Sillabus məlumatları";
      case "groups":
        return "Qrup məlumatları";
      case "tuitionFee":
        return "Ödəniş məlumatları";
      default:
        return "";
    }
  };

  const closeConfirmModal = () => {
    switch (type) {
      case "teacher":
        return dispatch({
          type: TEACHERS_MODAL_ACTION_TYPE.CLOSE_TEACHER_CONFIRM_MODAL,
        });
      case "student":
        return dispatch({
          type: STUDENTS_MODAL_ACTION_TYPE.CLOSE_STUDENT_CONFIRM_MODAL,
        });
      case "consultation":
        return dispatch({
          type: CONSULTATION_MODAL_ACTION_TYPE.CLOSE_CONSULTATION_CONFIRM_MODAL,
        });
      case "lesson-table":
        return dispatch({
          type: LESSON_TABLE_MODAL_ACTION_TYPE.CLOSE_LESSON_CONFIRM_MODAL,
        });
      case "courses":
        return dispatch({
          type: COURSES_MODAL_ACTION_TYPE.CLOSE_COURSE_CONFIRM_MODAL,
        });
      case "syllabus":
        return dispatch({
          type: SYLLABUS_MODAL_ACTION_TYPE.CLOSE_SYLLABUS_CONFIRM_MODAL,
        });
      case "groups":
        return dispatch({
          type: GROUP_MODAL_ACTION_TYPE.CLOSE_GROUP_CONFIRM_MODAL,
        });
      case "tuitionFee":
        return dispatch({
          type: TUITION_FEE_MODAL_ACTION_TYPE.CLOSE_CONFIRM_MODAL,
        });
      default:
        return "";
    }
  };

  return (
    <div className="more-modal">
      <div className="more-modal-con">
        <div className="more-modal-header" style={{ marginBottom: "20px" }}>
          <h2>{getTypeHeader(type)}</h2>
          <div className="more-modal-header-icons">
            <div className="header-icon-close">
              <CloseIcon onClick={closeConfirmModal} />
            </div>
          </div>
        </div>
        {type === "student" && <StudentConfirmModal />}
        {type === "teacher" && <TeacherConfirmModal />}
        {type === "consultation" && <ConsultationConfirmModal />}
        {type === "lesson-table" && <LessonTableConfirmModal />}
        {type === "courses" && <CoursesConfirmModal />}
        {type === "syllabus" && <SyllabusConfirmModal />}
        {type === "groups" && <GroupsConfirmModal />}
        {type === "tuitionFee" && <TuitionFeeConfirmModal />}
      </div>
    </div>
  );
};

export default ConfirmModal;
