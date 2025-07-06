import React from "react";
import { useLocation } from "react-router-dom";
import IncomesData from "./IncomesData/IncomesData";
import ExpensesData from "./ExpensesData/ExpensesData";

const FinanceData = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/finance/incomes" ? (
        <IncomesData />
      ) : (
        <ExpensesData />
      )}
    </div>
  );
};

export default FinanceData;
