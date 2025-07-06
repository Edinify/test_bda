import { useState, React } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { EXPENSES_MODAL_ACTION_TYPE } from "../../../../../redux/actions-type";
import { deleteExpensesAction } from "../../../../../redux/actions/expensesAction";
import UpdateDeleteModal from "../../../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { useFinanceCustomHook } from "../../../utils";

const ExpensesCard = ({ data, mode, cellNumber }) => {
  const dispatch = useDispatch();
  const {deleteExpense} = useFinanceCustomHook()

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
    deleteExpense(data._id)
  };
  const categoryData = [
    { key: "all", name: "Bütün kateqoriyalar" },
    { key: "food", name: "Qida" },
    { key: "cleaningSupplies", name: "Təmizlik ləvazimatları " },
    { key: "repair", name: "Təmir" },
    { key: "lease", name: "İcarə" },
    { key: "equipment", name: "Avadanlıq" },
    { key: "other", name: "Digər" },
  ];

  return (
    <>
      {mode === "desktop" ? (
        <tr>
          <td>
            <div className="td-con">
              <div className="cell-number">{cellNumber}.</div>
              <div className="table-scroll-text">
                {data.category
                  ? categoryData.find((item) => item.key === data.category)
                      ?.name
                  : ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data.appointment}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>{data.amount}</td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">
                {data.date ? moment(data.date).format("DD-MM-YYYY") : ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
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
                <span className="type">Kateqoriya:</span>
                <p>
                  {data.category
                    ? categoryData.find((item) => item.key === data.category)
                        ?.name
                    : ""}
                </p>
              </li>
              <li>
                <span className="type">Təyinat:</span>
                <p>{data.appointment ? data.appointment : "boş"}</p>
              </li>
              <li className="payment">
                <span className="type">Məbləği:</span>
                <p>{data.amount ? data.amount : "boş"}</p>
              </li>
              <li>
                <span className="type"> Tarix:</span>
                <p>
                  {data.date ? moment(data.date).format("YYYY-MM-DD") : "boş"}
                </p>
              </li>
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
