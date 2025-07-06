import { useDispatch, useSelector } from "react-redux";
import { LESSON_TABLE_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { deleteLessonTableAction } from "../../../redux/actions/lessonTableActions";
import { useCustomHook } from "../../../globalComponents/GlobalFunctions/globalFunctions";
import moment from "moment";
import DeleteItemModal from "../../../globalComponents/Modals/DeleteItemModal/DeleteItemModal";
import { useEffect, useState } from "react";
// import { ReactComponent as XIcon } from "../../../assets/icons/student-home/x-icon.svg";
// import { ReactComponent as SuccessIcon } from "../../../assets/icons/student-home/success.svg";
import LessonStatus from "./LessonStatus";
import MentorHour from "./MentorHour";
import EduConfirmedCheckbox from "./EduConfirmedCheckbox";

const LessonTableCard = ({ data, mode = "desktop", setTargetLesson }) => {
  const { weeksArrFullName, lessonStatusList } = useCustomHook();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [studentData, setStudentData] = useState({
    attendance: 0,
    studentSignature: 0,
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const lessonDay = data?.date
    ? `${moment(data.date).locale("az").format("DD.MM.YYYY")}, ${
        weeksArrFullName[
          moment(new Date(data.date)).day() === 7
            ? 0
            : moment(new Date(data.date)).day()
        ]
      }`
    : "";
  const openStudentsList = () => {
    setTargetLesson(data);
    dispatch({
      type: LESSON_TABLE_MODAL_ACTION_TYPE.STUDENT_MODAL,
      payload: true,
    });
  };

  const listData = [
    {
      key: "Dərs günü",
      value: lessonDay,
    },
    { key: "Dərs saatı", value: data.time },
    { key: "İxtisas", value: data.group?.course?.name },
    {
      key: "Mövzu",
      value: `${data?.topic?.orderNumber}. ${data?.topic?.name}`,
    },
    { key: "Müəllim", value: data?.teacher?.fullName },
    { key: "Mentor", value: data?.mentor?.fullName },
    {
      key: "Status",
      value:
        lessonStatusList.find((item) => item.key === data.status).name || "",
    },
    {
      key: "Tələbələr",
      value: data.students.length,
      onClick: openStudentsList,
      className: "student-count",
    },
  ];

  const updateItem = (modalType) => {
    dispatch({
      type: LESSON_TABLE_MODAL_ACTION_TYPE.GET_LESSON_TABLE_MODAL,
      payload: {
        data: {
          _id: data._id,
          group: data.group._id,
          teacher: data?.teacher?._id,
          mentor: data?.mentor?._id,
          date: data?.date,
          startTime: data?.startTime,
          endTime: data?.endTime,
          topic: data?.topic,
          mentorHour: data?.mentorHour,
          status: data?.status,
          students: data?.students,
        },
        openModal: modalType !== "more" ? true : false,
      },
    });
  };
  const deleteItem = () => {
    dispatch(deleteLessonTableAction(data._id));
  };

  const openConfirmModal = () => {
    dispatch({
      type: LESSON_TABLE_MODAL_ACTION_TYPE.OPEN_LESSON_CONFIRM_MODAL,
      payload: {
        data: data,
        openModal: false,
        confirmModal: true,
      },
    });
  };

  useEffect(() => {
    if (user?.role === "student") {
      const studentItem = data.students?.find(
        (item) => item.student._id == user?._id
      );

      setStudentData({
        attendance: studentItem.attendance,
        studentSignature: studentItem.studentSignature,
      });
    }
  }, [data]);

  const doubleClick = () => {
    updateItem("");
  };

  return (
    <>
      {showDeleteModal && (
        <DeleteItemModal
          setShowDeleteModal={setShowDeleteModal}
          deleteItem={deleteItem}
        />
      )}
      {mode === "desktop" ? (
        <tr onDoubleClick={doubleClick}>
          <td>
            <div className="td-con">
              <div className="table-scroll-text profiles">{lessonDay}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">
                {data?.startTime || ""} - {data?.endTime || ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{`${
                data?.topic?.orderNumber || ""
              }${data?.topic?.orderNumber ? "." : ""} ${
                data?.topic?.name === "Praktika"
                  ? "Lab day"
                  : data?.topic?.name || ""
              }`}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data?.teacher?.fullName}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data?.mentor?.fullName}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          {user.role !== "student" ? null : (
            <>
              <td>
                <div className="td-con">
                  <div className="table-scroll-text">
                    {studentData.attendance === 1 ? (
                      <span style={{ color: "#07bc0c" }}>i/e</span>
                    ) : studentData.attendance === -1 ? (
                      <span style={{ color: "#e74c3c" }}>q/b</span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="right-fade"></div>
                </div>
              </td>
            </>
          )}
          {user.role === "student" ? null : (
            <td className="student-length">
              <div onClick={openStudentsList} className="td-con">
                <div className="table-scroll-text">
                  {data.students.length} ...
                </div>
                <div className="right-fade"></div>
              </div>
            </td>
          )}
          {/* <td style={{ backgroundColor: "lightgray" }}>
            <div className="td-con">
              <div className="table-scroll-text">
                {data?.topic?.name === "Praktika" ? (
                  ""
                ) : (
                  <MentorHour data={data} />
                )}
              </div>
            </div>
          </td> */}
          <td
            style={
              data.status === "unviewed"
                ? { backgroundColor: "#d2c3fe" }
                : data.status === "confirmed"
                ? { backgroundColor: "#d4ffbf" }
                : { backgroundColor: "#ffced1" }
            }
          >
            <LessonStatus data={data} />
          </td>{" "}
          <td style={{ backgroundColor: "lightgray" }}>
            <div className="td-con">
              <div className="table-scroll-text">
                <EduConfirmedCheckbox data={data} />
              </div>
            </div>
          </td>
          <td>
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
              openConfirmModal={openConfirmModal}
              profil={"lessonTable"}
              setShowDeleteModal={setShowDeleteModal}
            />
          </td>
        </tr>
      ) : (
        <div className="content-box">
          <div className="left">
            <h3>{data.group.name}</h3>
            <ul>
              {listData.map((item, index) => (
                <li
                  onClick={item.onClick}
                  key={index}
                  className={item.className}
                >
                  <span className="type">{item.key}</span>
                  <p>{item.value}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="right">
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
              openConfirmModal={openConfirmModal}
              profil={"lessonTable"}
              setShowDeleteModal={setShowDeleteModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LessonTableCard;
