import "./moreModal.css";
import { useSelector, useDispatch } from "react-redux";
import EditIcon  from "../../assets/icons/more-modal/edit-02.svg";
import CloseIcon  from "../../assets/icons/more-modal/x-close.svg";
import {
  TEACHERS_MODAL_ACTION_TYPE,
  STUDENTS_MODAL_ACTION_TYPE,
  CONSULTATION_MODAL_ACTION_TYPE,
  WORKER_MODAL_ACTION_TYPE,
  GROUP_MODAL_ACTION_TYPE,
  EVENTS_MODAL_ACTION_TYPE,
  CAREER_MODAL_ACTION_TYPE,
} from "../../redux/actions-type";
import "moment/locale/az";
import TeacherMoreModal from "./components/TeacherMoreModal/TeacherMoreModal";
import StudentMoreModal from "./components/StudentMoreModal/StudentMoreModal";
import ConsultationMoreModal from "./components/ConsultationMoreModal/ConsultationMoreModal";
import TuitionFeeMoreModal from "./components/TuitionFeeMoreModal/TuitionFeeMoreModal";
import WorkersMoreModal from "./components/WorkersMoreModal/WorkersMoreModal";
import GroupMoreModal from "./components/GroupMoreModal/GroupMoreModal";
import EventMoreModal from "./components/EventMoreModal/EventMoreModal";
import CareerMoreModal from "./components/CareerMoreModal/CareerMoreModal";
const MoreModal = ({ setOpenMoreModal, type }) => {
  const dispatch = useDispatch();
  const { teachersModalData } = useSelector((state) => state.teachersModal);
  const { studentsModalData } = useSelector((state) => state.studentsModal);
  const { tuitionFeeModalData } = useSelector((state) => state.tuitionFeeModal);
  const { workerModalData } = useSelector((state) => state.workerModal);
  const { consultationModalData } = useSelector(
    (state) => state.consultationModal
  );
  const { groupModalData } = useSelector((state) => state.groupModal);
  const { eventsModalData } = useSelector((state) => state.eventModal);
  const { careerModalData } = useSelector((state) => state.careerModal);
  const { user } = useSelector((state) => state.user);

  const openUpdateModal = () => {
    if (type === "teacher") {
      dispatch({
        type: TEACHERS_MODAL_ACTION_TYPE.GET_TEACHERS_MODAL,
        payload: {
          data: {
            ...teachersModalData,
          },
          openModal: true,
        },
      });
    } else if (type === "student") {
      dispatch({
        type: STUDENTS_MODAL_ACTION_TYPE.GET_STUDENTS_MODAL,
        payload: {
          data: {
            ...studentsModalData,
          },
          openModal: true,
        },
      });
    } else if (type === "consultation") {
      console.log('3. more modal')
      dispatch({
        type: CONSULTATION_MODAL_ACTION_TYPE.GET_CONSULTATION_MODAL,
        payload: {
          data: {
            ...consultationModalData,
          },
          openModal: true,
        },
      });
    } else if (type === "worker") {
      dispatch({
        type: WORKER_MODAL_ACTION_TYPE.GET_WORKER_MODAL,
        payload: {
          data: {
            ...workerModalData,
          },
          openModal: true,
        },
      });
    } else if (type === "group") {
      dispatch({
        type: GROUP_MODAL_ACTION_TYPE.GET_GROUP_MODAL,
        payload: {
          data: {
            ...groupModalData,
          },
          openModal: true,
        },
      });
    } else if (type === "event") {
      dispatch({
        type: EVENTS_MODAL_ACTION_TYPE.GET_EVENTS_MODAL,
        payload: {
          data: {
            ...eventsModalData,
          },
          openModal: true,
        },
      });
    } else if (type === "career") {
      dispatch({
        type: CAREER_MODAL_ACTION_TYPE.GET_CAREER_MODAL,
        payload: {
          data: {
            ...careerModalData,
          },
          openModal: true,
        },
      });
    }
    setOpenMoreModal(false);
  };

  return (
    <div className="more-modal">
      <div className="more-modal-con">
        <div className="more-modal-header">
          {type === "teacher" ||
          type === "student" ||
          type === "consultation" ||
          type === "tuitionFee" ||
          type === "worker" ||
          type === "event" ||
          type === "career" ||
          type === "group" ? (
            <h2>Ətraflı məlumatlar</h2>
          ) : (
            ""
          )}
          <div className="more-modal-header-icons">
            {(user?.role === "super-admin" || user?.power !== "only-show") &&
              type !== "tuitionFee" && (
                <div className="header-icon-edit">
                  <EditIcon onClick={() => openUpdateModal()} />
                </div>
              )}

            <div className="header-icon-close">
              <CloseIcon onClick={() => setOpenMoreModal(false)} />
            </div>
          </div>
        </div>

        {type === "teacher" && (
          <TeacherMoreModal teachersModalData={teachersModalData} />
        )}
        {type === "tuitionFee" && (
          <TuitionFeeMoreModal tuitionFeeModalData={tuitionFeeModalData} />
        )}
        {type === "student" && (
          <StudentMoreModal studentsModalData={studentsModalData} />
        )}
        {type === "consultation" && (
          <ConsultationMoreModal
            consultationModalData={consultationModalData}
          />
        )}
        {type === "worker" && (
          <WorkersMoreModal workerModal={workerModalData} />
        )}
        {type === "group" && <GroupMoreModal groupModalData={groupModalData} />}
        {type === "event" && (
          <EventMoreModal eventsModalData={eventsModalData} />
        )}
        {type === "career" && (
          <CareerMoreModal careerModalData={careerModalData} />
        )}
      </div>
    </div>
  );
};

export default MoreModal;
