import { useEffect } from "react";
import FinanceDateFilter from "./components/FinanceDateFilter/FinanceDateFilter";
import FinanceChart from "./components/FinanceChart/FinanceChart";
import FinanceStatistics from "./components/FInanceStatistics/FinanceStatistics";
import FinanceDataHead from "./components/FinanceDataHead/FinanceDataHead";
import FinanceData from "./components/FinanceData/FinanceData";
import { useFinanceCustomHook } from "./utils";
import { useSelector } from "react-redux";

const FinancePage = () => {
  const { expensesActivateGet } = useSelector((state) => state.expensesModal);
  const { incomesActivateGet } = useSelector((state) => state.incomesModal);
  const { getAllDefaultData, getFinanceDataAfterUpdate, getFinanceDataAfterCreate } = useFinanceCustomHook()

  useEffect(() => {
    if(expensesActivateGet === 'update') {
      getFinanceDataAfterUpdate()
    } else if (expensesActivateGet === 'create') {
      getFinanceDataAfterCreate('expenses')
    } else if(expensesActivateGet === 'delete') {
      getFinanceDataAfterUpdate()
    }
  }, [expensesActivateGet])

  useEffect(() => {
    if(incomesActivateGet === 'update') {
      getFinanceDataAfterUpdate()
    } else if (incomesActivateGet === 'create') {
      getFinanceDataAfterCreate('incomes')
    } else if(incomesActivateGet === 'delete') {
      getFinanceDataAfterUpdate()
    }
  }, [incomesActivateGet])

  useEffect(() => {
    getAllDefaultData()
  }, [])


  return (
    <div className="finance-page">
      <div className="finance-top">
        <div className="left">
          <FinanceDateFilter />
          <FinanceChart />
        </div>

        <div className="right">
          <FinanceStatistics />
        </div>
      </div>

      <div className="finance-bottom">
        <FinanceDataHead />
        <FinanceData />
      </div>
    </div>
  );
};

export default FinancePage;
