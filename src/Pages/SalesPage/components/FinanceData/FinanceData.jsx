import React from "react";
import { useLocation } from "react-router-dom";
import LeadData from "./leadData/LeadData";

const FinanceData = () => {
  const location = useLocation();

  return (
    <div>
      <LeadData />
    </div>
  );
};

export default FinanceData;
