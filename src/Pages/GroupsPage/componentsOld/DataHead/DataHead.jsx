import React, { useState } from "react";
import "./financeDataHead.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  GROUP_MODAL_ACTION_TYPE,
  EXPENSES_MODAL_ACTION_TYPE,
} from "../../../../redux/actions-type";
import PlusIcon  from "../../../../assets/icons/finance/Plus.svg?react";
import FinanceDropdown from "./FinanceDropdown";
import HeadTabs from "../../../../globalComponents/HeadTabs/HeadTabs";

const DataHead = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const openCurrentGroupModal = () => {
    dispatch({
      type: GROUP_MODAL_ACTION_TYPE.GET_GROUP_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const openWaitingGroupModal = () => {
    dispatch({
      type: EXPENSES_MODAL_ACTION_TYPE.GET_EXPENSES_MODAL,
      payload: { data: {}, openModal: true },
    });
  };

  const openModal = () => {
    if (location.pathname === "/groups/current") {
      openCurrentGroupModal();
    } else if (location.pathname === "/groups/waiting") {
      openWaitingGroupModal();
    }
  };
  return (
    <div className="finance-data-head">
      <HeadTabs
        firstRoute={"/groups/current"}
        secondRoute={"/groups/waiting"}
        firstPathname={"Mövcud qruplar"}
        secondPathname={"Yığılan qruplar"}
      />

      <div className="bottom">
        <div className="left">
          <FinanceDropdown type="category" />
          <FinanceDropdown type="sorting" />
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

export default DataHead;
