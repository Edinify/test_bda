import { useState, React } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { EXPENSES_MODAL_ACTION_TYPE } from "../../../../../redux/actions-type";
import UpdateDeleteModal from "../../../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { useFinanceCustomHook } from "../../../utils";

const ExpensesCard = ({ data, mode, cellNumber }) => {
  const dispatch = useDispatch();
  const { deleteExpense } = useFinanceCustomHook();
  const listData = [
    { key: "Instruktor", value: data.appointment },
    { key: "Qrup növü", value: data.appointment },
    { key: "Tələbə sayı", value: data.appointment },
    { key: "Ad soyad", value: data.appointment },
    { key: "Dərs günləri", value: data.appointment },
    { key: "Dərs saatı", value: data.appointment },
    { key: "Müqavilə növü", value: data.appointment },
    { key: "Müqavilə tarixi", value: data.appointment },
  ];
  const updateItem = () => {
    const { category, amount, _id, appointment, date } = data;
    dispatch({
      type: EXPENSES_MODAL_ACTION_TYPE.GET_EXPENSES_MODAL,
      payload: {
        data: {
          category,
          amount,
          appointment,
          date,
          _id,
        },
        openModal: true,
      },
    });
  };
  const deleteItem = () => {
    deleteExpense(data._id);
  };

  return (
    <>
      {mode === "desktop" ? (
        <tr>
          <td>{data.appointment}</td>
          <td>{data.appointment}</td>
          <td>{data.appointment}</td>
          <td>{data.appointment}</td>
          <td>{data.appointment}</td>
          <td>{data.appointment}</td>
          <td>{data.appointment}</td>
          <td>{data.appointment}</td>
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
              {listData.map((item, index) => (
                <li key={index}>
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
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ExpensesCard;
