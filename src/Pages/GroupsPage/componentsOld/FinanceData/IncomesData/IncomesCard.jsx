import React from "react";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { INCOMES_MODAL_ACTION_TYPE } from "../../../../../redux/actions-type";
import UpdateDeleteModal from "../../../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { useFinanceCustomHook } from "../../../utils";

const IncomesCard = ({ data, mode, cellNumber }) => {
  const dispatch = useDispatch();
  const { deleteIncome } = useFinanceCustomHook();
  const listData = [
    { key: "Təlimçi", value: data.appointment },
    { key: "Qrup", value: data.appointment },
    { key: "Tələbə sayı", value: data.appointment },
    { key: "Gün", value: data.appointment },
    { key: "Saat", value: data.appointment },
    { key: "Başlama tarixi", value: data.appointment },
    { key: "Bitmə tarixi", value: data.appointment },
  ];
  const updateItem = () => {
    const {
      category,
      appointment,
      _id,
      unitMeasurement,
      date,
      // quantity,
      unitPrice,
      recipient,
      amount,
      paymentMethod,
      imx,
    } = data;
    dispatch({
      type: INCOMES_MODAL_ACTION_TYPE.GET_INCOMES_MODAL,
      payload: {
        data: {
          category,
          appointment,
          _id,
          date,
          unitMeasurement,
          // quantity,
          unitPrice,
          recipient,
          amount,
          paymentMethod,
          imx,
        },
        openModal: true,
      },
    });
  };
  const deleteItem = () => {
    deleteIncome(data._id);
  };
  const categoryData = [
    { key: "all", name: "Bütün kateqoriyalar" },
    { key: "tuitionFees", name: "Təhsil haqqı" },
    { key: "other", name: "Digər" },
  ];
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

export default IncomesCard;
