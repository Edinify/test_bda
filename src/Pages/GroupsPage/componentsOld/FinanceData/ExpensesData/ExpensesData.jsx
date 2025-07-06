import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpensesCard from "./ExpensesCard";
import { Pagination } from "antd";
import Loading from "../../../../../globalComponents/Loading/Loading";
import { getExpensesPaginationAction } from "../../../../../redux/actions/expensesAction";

const ExpensesData = () => {
  const dispatch = useDispatch();
  const {
    financeMonthsFilter,
    financeChooseDate,
    financeExpenseCategory,
    financeExpenseSorting,
  } = useSelector((state) => state.financeDateFilter);
  const {
    expensesData,
    totalPages,
    loading,
    lastPage: expensesPageNum,
  } = useSelector((state) => state.expensesData);
  const dataHead = ["Instruktor", "Qrup növü", "Tələbə sayı", "Ad soyad", "Dərs günləri", "Dərs saatı", "Müqavilə növü", "Müqavilə tarixi", "",];

  const getPageNumberExpenses = (pageNumber) => {
    if (financeChooseDate.startDate && financeChooseDate.endDate) {
      dispatch(
        getExpensesPaginationAction(
          pageNumber,
          financeChooseDate.startDate,
          financeChooseDate.endDate,
          "", //month
          financeExpenseCategory
            ? financeExpenseCategory !== "all"
              ? financeExpenseCategory.key
              : ""
            : "",
          financeExpenseSorting ? financeExpenseSorting.key : "oldest"
        )
      );
    } else {
      dispatch(
        getExpensesPaginationAction(
          pageNumber,
          "",
          "",
          financeMonthsFilter ? financeMonthsFilter : 1, //month
          financeExpenseCategory
            ? financeExpenseCategory !== "all"
              ? financeExpenseCategory.key
              : ""
            : "",
          financeExpenseSorting ? financeExpenseSorting.key : "oldest"
        )
      );
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <table className="details-table expenses-table">
            <thead>
              <tr>
                {dataHead.map((head, i) => (
                  <th key={i}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {expensesData?.map((expense, i) => (
                <ExpensesCard
                  key={i}
                  data={expense}
                  mode="desktop"
                  cellNumber={i + 1 + (expensesPageNum - 1) * 10}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet incomes-page ">
            {expensesData?.map((expense, i) => (
              <ExpensesCard
                key={i}
                data={expense}
                mode="tablet"
                cellNumber={i + 1 + (expensesPageNum - 1) * 10}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={expensesPageNum}
                defaultCurrent={1}
                total={totalPages * 10}
                onChange={getPageNumberExpenses}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ExpensesData;
