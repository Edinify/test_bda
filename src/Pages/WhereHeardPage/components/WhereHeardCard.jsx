import React from "react";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { WHERE_HEARD_MODAL_ACTION_TYPE } from "../../../redux/actions-type";

const WhereHeardCard = ({ data, cellNumber }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const updateItem = (modalType) => {
    dispatch({
      type: WHERE_HEARD_MODAL_ACTION_TYPE.GET_WHERE_HEARD_MODAL,
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
      <td>
        <div className="td-con">
          <div className="table-scroll-text">
            {cellNumber}. {data.name}
          </div>
          <div className="right-fade"></div>
        </div>
      </td>

      <td>
        <div className="td-con">
          <div className="table-scroll-text">{data.desc}</div>
          <div className="right-fade"></div>
        </div>
      </td>

      <td>
        <div className="td-con">
          <div className="table-scroll-text">
            {data.isActive ? "Aktiv" : "Deaktiv"}
          </div>
          <div className="right-fade"></div>
        </div>
      </td>

      {user?.power !== "only-show" ? (
        <td>
          <UpdateDeleteModal
            updateItem={updateItem}
            // deleteItem={deleteItem}
            data={data}
            profil={"whereHeard"}
          />
        </td>
      ) : null}
    </tr>
  );
};

export default WhereHeardCard;
