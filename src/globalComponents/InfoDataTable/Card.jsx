import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { STUDENTS_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { deleteStudentAction } from "../../../redux/actions/studentsActions";

const Card = ({ data, mode, cellNumber, setOpenMoreModal, allData, lastPage, searchValue, dataStatus }) => {
  const dispatch = useDispatch();
  let courses =
    Array.isArray(data.courses) && data.courses.length > 0
      ? data.courses
          .map((course) => {
            return `${course.course.name} (${course.lessonAmount} dərs)`;
          })
          .join(", ")
      : "boş";

  const updateItem = (data) => {
    const {
      fullName,
      motherName,
      fatherName,
      birthday,
      motherPhone,
      fatherPhone,
      email,
      password,
      courses,
      lessonAmount,
      status,
      _id,
      createdAt,
      payment,
      sector,
      whereComing,
      educationalInstitution,
      educationDegree,
      healthStatus,
      emergencyPhone,
      whereFrom,
      fin,
      seria,
    } = data;

    dispatch({
      type: STUDENTS_MODAL_ACTION_TYPE.GET_STUDENTS_MODAL,
      payload: {
        data: {
          fullName,
          motherName,
          fatherName,
          birthday,
          motherPhone,
          fatherPhone,
          email,
          password,
          courses,
          lessonAmount,
          status,
          _id,
          createdAt,
          payment,
          sector,
          whereComing,
          educationalInstitution,
          educationDegree,
          healthStatus,
          emergencyPhone,
          whereFrom,
          fin,
          seria,
        },
        openModal: modalType !== "more" ? true : false,
      },
    });
  };
  const deleteItem = () => {
    const pageNumber =
      lastPage > 1 ? (students.length > 1 ? lastPage : lastPage - 1) : 1;
    const _id = data._id;
    const searchQuery = searchValue;
    const status = dataStatus ? dataStatus : "all";
    dispatch(deleteStudentAction({ _id, pageNumber, searchQuery, status }));
  };
  const openMoreModal = () => {
    updateItem("more");
    setOpenMoreModal(true);
  };

  return (
    <>
      {mode === "desktop" ? (
        <tr>
          <td>
            <div className="td-con">
              <div className="cell-number">{cellNumber}.</div>
              <div className="table-scroll-text">{data.fullName}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">
                {data.motherName ? data.motherName : "boş"}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">
                {data.fatherName ? data.fatherName : "boş"}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{courses}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text phone">
                {data.motherPhone ? data.motherPhone : "boş"}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text phone">
                {data.fatherPhone ? data.fatherPhone : "boş"}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td className="more" onClick={() => openMoreModal()}>
            Ətraflı
          </td>

          {/* <td>{data.lessonAmount}</td>
          <td>{data.status ? "Aktiv" : "Deaktiv"}</td> */}
          <td>
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
            />
          </td>
        </tr>
      ) : (
        <div className="content-box">
          <div className="left">
            <h3>{data.fullName}</h3>
            <ul>
              <li>
                <span className="type">Fənn:</span>
                <p>{courses}</p>
              </li>
              <li>
                <span className="type">Ana telefon nömrəsi:</span>
                <p>{data.motherPhone ? data.motherPhone : "boş"}</p>
              </li>
              <li>
                <span className="type">Ata telefon nömrəsi:</span>
                <p>{data.fatherPhone ? data.fatherPhone : "boş"}</p>
              </li>
            </ul>
          </div>
          <div className="right">
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
            />
            <span onClick={() => openMoreModal()}>Ətraflı</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
