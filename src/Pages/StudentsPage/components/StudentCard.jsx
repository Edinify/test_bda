import { useDispatch, useSelector } from "react-redux";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { STUDENTS_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { deleteStudentAction } from "../../../redux/actions/studentsActions";
import moment from "moment";
import "moment/locale/az";
import { useCustomHook } from "../../../globalComponents/GlobalFunctions/globalFunctions";
import DeleteItemModal from "../../../globalComponents/Modals/DeleteItemModal/DeleteItemModal";
import { useState } from "react";

const StudentCard = ({
  data,
  mode,
  cellNumber,
  setOpenMoreModal,
  setOpenConfirmModal,
  student,
}) => {
  const dispatch = useDispatch();

  const { whereSendList } = useCustomHook();

  const whereSendName = whereSendList.find(
    (item) => item.key === data?.whereSend
  )?.name;

  // console.log(data,"Data")

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  let courses =
    Array.isArray(data?.courses) && data?.courses.length > 0
      ? data.courses
          .map((course) => {
            return `${course.name}`;
          })
          .join(", ")
      : "";
  const listData = [
    { key: "İxtisas", value: courses },
    {
      key: "Mobil nömrə",
      value: data?.phone ? data?.phone : "",
    },
  ];

  let groupName =
    Array.isArray(data?.groups) && data?.groups.length > 0
      ? data.groups
          .map((group) => {
            return `${group?.group?.name}`;
          })
          .join(",")
      : "";

  const updateItem = (modalType) => {
    dispatch({
      type: STUDENTS_MODAL_ACTION_TYPE.GET_STUDENTS_MODAL,
      payload: {
        data: JSON.parse(JSON.stringify(data)),
        openModal: modalType !== "more" ? true : false,
      },
    });
  };
  const deleteItem = () => {
    dispatch(deleteStudentAction(data._id));
  };

  const openMoreModal = () => {
    updateItem("more");
    setOpenMoreModal(true);
  };

  const openConfirmModal = () => {
    dispatch({
      type: STUDENTS_MODAL_ACTION_TYPE.OPEN_STUDENT_CONFIRM_MODAL,
      payload: {
        data: data,
        openModal: false,
        confirmModal: true,
      },
    });
  };

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
              <div className="cell-number">{cellNumber}.</div>
              <div className="table-scroll-text">{data?.fullName || ""}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data?.fin || ""}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data?.seria || ""}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "150px" }}>
              <div className="table-scroll-text">
                {data?.birthday
                  ? moment(data.birthday).locale("az").format("DD MMMM YYYY ")
                  : "" || ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data?.phone || ""}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div
                className="table-scroll-text"
                style={{ textTransform: "lowercase" }}
              >
                {data?.email || ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>

          <td>
            <div className="td-con" style={{ width: "200px" }}>
              <div className="table-scroll-text">
                {data?.whereComing?.name || ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "200px" }}>
              <div className="table-scroll-text">{whereSendName || ""}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "200px" }}>
              <div className="table-scroll-text">{data?.salesType}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "200px" }}>
              <div className="table-scroll-text">{courses}</div>
              <div className="right-fade"></div>
            </div>
          </td>

          <td>
            <div className="td-con" style={{ width: "200px" }}>
              <div className="table-scroll-text">
                {groupName}
                {/* {data.groups.map((item) => (
                  <p key={item.group._id}>
                    {item.group.name} <br />
                  </p>
                ))} */}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">
                Lab:{data?.practicsQbCount || 0} / Əsas:{data.mainQbCount || 0}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>

          <td>
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
              setOpenConfirmModal={setOpenConfirmModal}
              state={student}
              openConfirmModal={openConfirmModal}
              openMoreModal={openMoreModal}
              profil="students"
              setShowDeleteModal={setShowDeleteModal}
            />
          </td>
        </tr>
      ) : (
        <div className="content-box">
          <div className="left">
            <h3>{data.fullName}</h3>
            <ul>
              {listData.map((item, index) => (
                <li key={index}>
                  <span className="type">{item.key}:</span>
                  <p>{item.value}</p>
                </li>
              ))}
            </ul>
            <div className="groups-list">
              <h2>Qruplar</h2>
              <ul>
                {data?.groups?.map((groupsData) => (
                  <li key={groupsData.group._id}>
                    <span>Qrup adı: {groupsData?.group?.name}</span>
                    Qrup İxtisası: {groupsData?.group?.course?.name} <br />
                    Ümumi ödəniş: {groupsData?.totalAmount} <br />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {student.power === "only-show" ? (
            <div className="more-content">
              <span onClick={openMoreModal}>Ətraflı</span>
            </div>
          ) : (
            <div className="right">
              {/* <UpdateDeleteModal
                updateItem={updateItem}
                deleteItem={deleteItem}
                data={data}
                state={student}
                setOpenConfirmModal={setOpenConfirmModal}
                openConfirmModal={openConfirmModal}
                openMoreModal={openMoreModal}
                profil={"students"}
              /> */}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default StudentCard;
