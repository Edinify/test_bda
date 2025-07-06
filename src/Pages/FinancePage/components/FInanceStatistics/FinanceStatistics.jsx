import React, { useEffect, useState } from "react";
import "./financeStatistics.css";
import { useSelector } from "react-redux";
import  DropdownArrowFinanceIcon1 from "../../../../assets/icons/dashboard/arrow-down-finance1.svg";
import  DropdownArrowFinanceIcon2 from "../../../../assets/icons/dashboard/arrow-up.svg";
import  TurnoverIcon from "../../../../assets/icons/dashboard/refresh-cw-02.svg";
import  ProfitIcon from "../../../../assets/icons/dashboard/bank-note-01.svg";

const FinanceStatistics = () => {
  const {financeData} = useSelector((state) => state.financeData);

  return (
    <div className="finance-statictics">
      <div className="content-box finance">
        <div className="left blue">
          <DropdownArrowFinanceIcon1 />
        </div>

        <div className="right">
          <div className="top">
            <h2 className="title">Mədaxil</h2>
            <div className="diff-pointer plus">+36.47%</div>
          </div>
          <p className="amount">
            ₼ {financeData?.income ? financeData?.income : 0}
            <small className="diff-pointer plus">+36.47%</small>
          </p>
        </div>
      </div>

      <div className="content-box finance">
        <div className="left red">
          <DropdownArrowFinanceIcon2 />
        </div>

        <div className="right">
          <div className="top">
            <h2 className="title">Xərc</h2>
            <div className="diff-pointer minus">-36.47%</div>
          </div>
          <p className="amount">
            ₼ {financeData?.expense ? financeData?.expense : 0}
            <small className="diff-pointer minus">+36.47%</small>
          </p>
        </div>
      </div>

      <div className="content-box finance">
        <div className="left orange">
          <TurnoverIcon />
        </div>

        <div className="right">
          <div className="top">
            <h2 className="title">Dövriyyə</h2>
            <div className="diff-pointer plus">+36.47%</div>
          </div>
          <p className="amount">
            ₼ {financeData?.turnover ? financeData?.turnover : 0}
            <small className="diff-pointer plus">+36.47%</small>
          </p>
        </div>
      </div>

      <div className="content-box finance last">
        <div className="left green">
          <ProfitIcon />
        </div>

        <div className="right">
          <div className="top">
            <h2 className="title">Qazanc</h2>
            <div className="diff-pointer plus">+36.47%</div>
          </div>
          <p className="amount">
            ₼ {financeData?.profit ? financeData?.profit : 0}
            <small className="diff-pointer plus">+36.47%</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinanceStatistics;
