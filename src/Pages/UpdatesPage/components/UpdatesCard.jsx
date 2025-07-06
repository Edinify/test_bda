import React from "react";
import { useDispatch } from "react-redux";
import { UPDATE_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import moment from "moment";

const UpdatesCard = ({ data, cellNumber }) => {
  const dispatch = useDispatch();

  const updateItem = (modalType) => {
    dispatch({
      type: UPDATE_MODAL_ACTION_TYPE.GET_UPDATES_MODAL,
      payload: {
        data: data,
        openModal: modalType !== "more" ? true : false,
      },
    });
  };

  const doubleClick = () => {
    updateItem("");
  };
  return (
    <tr className="class-table" onDoubleClick={doubleClick}>
      <td style={{ width: "200px" }}>
        <div className="td-con">
          <div className="table-scroll-text">
            {cellNumber}. {data?.sender.fullName}
          </div>
          <div className="right-fade"></div>
        </div>
      </td>
      <td>
        <div className="td-con">
          <div className="table-scroll-text">
            {moment(data?.createdAt).locale("az").format("DD MM YYYY")}
          </div>
        </div>
      </td>{" "}
      <td>
        <div className="td-con">
          <div className="table-scroll-text">
            {data.status !== "pending" &&
              moment(data?.updatedAt).locale("az").format("DD MM YYYY")}
          </div>
        </div>
      </td>
      <td>
        <div className="td-con">
          <div className="table-scroll-text"  >
            {data.status === "pending"
              ? "Gözləmədə"
              : data.status === "confirmed"
              ? "Təstiqləndi"
              : data.status === "cancelled"
              ? "Ləğv edildi"
              : ""}
          </div>
        </div>
      </td>
      <td style={{ cursor: "pointer" }} onClick={updateItem}>
        Yenilə
      </td>
      {/* {user?.power !== "only-show" ? (
        <td>
          <UpdateDeleteModal
            updateItem={updateItem}
            // deleteItem={deleteItem}
            data={data}
            profil={"whereHeard"}
          />
        </td>
      ) : null} */}
    </tr>
  );
};

export default UpdatesCard;
