import { useDispatch, useSelector } from "react-redux";
import { COURSES_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { deleteCoursesAction } from "../../../redux/actions/coursesActions";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import DeleteItemModal from "../../../globalComponents/Modals/DeleteItemModal/DeleteItemModal";
import { useState } from "react";

const CourseCard = ({ data, mode, course, cellNumber, setOpenMoreModal }) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const updateItem = (modalType) => {
    console.log(data);
    dispatch({
      type: COURSES_MODAL_ACTION_TYPE.GET_COURSES_MODAL,
      payload: {
        data: data,
        openModal: modalType !== "more" ? true : false,
      },
    });
  };
  const deleteItem = () => {
    dispatch(deleteCoursesAction(data._id));
  };

  const openMoreModal = () => {
    updateItem("more");
    setOpenMoreModal(true);
  };
  const openConfirmModal = () => {
    dispatch({
      type: COURSES_MODAL_ACTION_TYPE.OPEN_COURSE_CONFIRM_MODAL,
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

  const wholePayment = data.payments.find(
    (payment) => payment.paymentType === "Tam"
  );
  const teachingPeriodPayment = data.payments.find(
    (payment) => payment.paymentType === "Tədris müddəti"
  );
  const partPayment = data.payments.find(
    (payment) => payment.paymentType === "10 hissəli"
  );

  return (
    <>
      {showDeleteModal && (
        <DeleteItemModal
          setShowDeleteModal={setShowDeleteModal}
          deleteItem={deleteItem}
        />
      )}
      {mode === "desktop" ? (
        <tr className="class-table" onDoubleClick={doubleClick}>
          <td >
            <div className="td-con">
              <div className="table-scroll-text">
                {cellNumber}. {data.name}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data?.lessonCount}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">
                {`${
                  wholePayment?.payment ? `${wholePayment?.payment} AZN` : ""
                }`}{" "}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">
                {" "}
                {`${
                  teachingPeriodPayment?.payment
                    ? `${teachingPeriodPayment?.payment} AZN - ${teachingPeriodPayment.part} hissəli`
                    : ""
                }`}{" "}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">
                {`${partPayment?.payment ? `${partPayment?.payment} AZN` : ""}`}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>

          {course?.power !== "only-show" ? (
            <td>
              <UpdateDeleteModal
                updateItem={updateItem}
                deleteItem={deleteItem}
                data={data}
                state={course}
                openConfirmModal={openConfirmModal}
                openMoreModal={openMoreModal}
                profil={"courses"}
                setShowDeleteModal={setShowDeleteModal}
              />
            </td>
          ) : null}
        </tr>
      ) : (
        <div className="content-box">
          <div className="left">
            <h3 className="name">{data.name}</h3>
          </div>

          {course.power === "only-show" ? null : (
            <div className="right">
              <UpdateDeleteModal
                updateItem={updateItem}
                deleteItem={deleteItem}
                data={data}
                state={course}
                openConfirmModal={openConfirmModal}
                openMoreModal={openMoreModal}
                profil={"courses"}
                setShowDeleteModal={setShowDeleteModal}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CourseCard;
