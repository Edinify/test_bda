import { useEffect } from "react";
import FinanceDateFilter from "./components/FinanceDateFilter/FinanceDateFilter";
import FinanceChart from "./components/FinanceChart/FinanceChart";
import FinanceStatistics from "./components/FInanceStatistics/FinanceStatistics";
import FinanceDataHead from "./components/FinanceDataHead/FinanceDataHead";
import FinanceData from "./components/FinanceData/FinanceData";
import { useFinanceCustomHook } from "./utils";
import { useSelector } from "react-redux";
import LeadData from "./components/FinanceData/leadData/LeadData";
import { CoursesDropdown } from "../../globalComponents/GlobalHead/CoursesDropdown/CoursesDropdown";

const FinancePage = () => {
  const { leadActivateGet } = useSelector((state) => state.leadModal);
  const { courseId } = useSelector((state) => state.salesData);
  const {
    getAllDefaultData,
    getFinanceDataAfterUpdate,
    getFinanceDataAfterCreate,
  } = useFinanceCustomHook();

  useEffect(() => {
    // // console.log(leadActivateGet, "lead activate get");
    if (leadActivateGet === "update" || leadActivateGet === "delete") {
      getFinanceDataAfterUpdate();
    } else if (leadActivateGet === "create") {
      getFinanceDataAfterCreate();
    }
  }, [leadActivateGet]);

  useEffect(() => {
    getFinanceDataAfterUpdate();
  }, [courseId]);

  useEffect(() => {
    getAllDefaultData();
  }, []);

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
        <LeadData />
      </div>
    </div>
  );
};

export default FinancePage;
