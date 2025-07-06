import React, { useState } from "react";
import "./financeDataHead.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  INCOMES_MODAL_ACTION_TYPE,
  EXPENSES_MODAL_ACTION_TYPE,
} from "../../../../redux/actions-type";
import  PlusIcon  from "../../../../assets/icons/finance/Plus.svg?react";
import FinanceDropdown from "./FinanceDropdown";

const FinanceDataHead = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [selectedType, setSelectedType] = useState("Mədaxil");
  const openIncomesModal = () => {
    dispatch({
      type: INCOMES_MODAL_ACTION_TYPE.GET_INCOMES_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const openExpensesModal = () => {
    dispatch({
      type: EXPENSES_MODAL_ACTION_TYPE.GET_EXPENSES_MODAL,
      payload: { data: {}, openModal: true },
    });
  };

  const openModal = () => {
    if (location.pathname === "/finance/incomes") {
      openIncomesModal();
    } else if (location.pathname === "/finance/expenses") {
      openExpensesModal();
    }
  };
  return (
    <div className="finance-data-head">
      <div className="top">
        <Link
          to="/finance/incomes"
          onClick={() => setSelectedType("Mədaxil")}
          className={`data-type ${
            location.pathname === "/finance/incomes" ? "active" : ""
          }`}
        >
          Mədaxil
        </Link>
        <Link
          to="/finance/expenses"
          onClick={() => setSelectedType("Xərc")}
          className={`data-type ${
            location.pathname === "/finance/expenses" ? "active" : ""
          }`}
        >
          Xərc
        </Link>
      </div>

      <div className="bottom">
        <div className="left">
          <FinanceDropdown type='category'  />
          <FinanceDropdown type='sorting' />
        </div>

        <div className="right">
          <button className="add-btn" onClick={() => openModal()}>
            <PlusIcon />
            Əlavə et
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinanceDataHead;
