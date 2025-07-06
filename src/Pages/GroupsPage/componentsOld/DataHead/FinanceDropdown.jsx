import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import  ArrowIcon  from "../../../../assets/icons/finance/arrow-down.svg?react";
import { FINANCE_FILTER_ACTION_TYPE } from "../../../../redux/actions-type";
import { useFinanceCustomHook } from "../../utils";

const FinanceDropdown = ({ type }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { getFilteredIncomes, getFilteredExpenses } = useFinanceCustomHook();
  const {
    financeIncomeCategory,
    financeIncomeSorting,
    financeExpenseCategory,
    financeExpenseSorting,
  } = useSelector((state) => state.financeDateFilter);
  const [openDropdown, setOpenDropdown] = useState(false);
  const sortingData = [
    { key: "lowestAmount", name: "Aşağı məbləğdən" },
    { key: "highestAmount", name: "Yuxarı məbləğdən" },
    { key: "latest", name: "Yenidən köhnəyə" },
    { key: "oldest", name: "Köhnədən yeniyə" },
  ];
  const categoryData =
    location.pathname === "/groups/current"
      ? [
          { key: "all", name: "Bütün kateqoriyalar" },
          { key: "tuitionFees", name: "Təhsil haqqı" },
          { key: "other", name: "Digər" },
        ]
      : [
          { key: "all", name: "Bütün kateqoriyalar" },
          { key: "food", name: "Qida" },
          { key: "cleaningSupplies", name: "Təmizlik ləvazimatları " },
          { key: "repair", name: "Təmir" },
          { key: "lease", name: "İcarə" },
          { key: "equipment", name: "Avadanlıq" },
          { key: "other", name: "Digər" },
        ];
  const getSorting = (sortType) => {
    if (location.pathname === "/groups/current") {
      dispatch({
        type: FINANCE_FILTER_ACTION_TYPE.GET_INCOME_SORTING_FILTER,
        payload: { financeIncomeSorting: sortType },
      });

      getFilteredIncomes(sortType.key, financeIncomeCategory.key);
    } else if (location.pathname === "/groups/waiting") {
      dispatch({
        type: FINANCE_FILTER_ACTION_TYPE.GET_EXPENSE_SORTING_FILTER,
        payload: { financeExpenseSorting: sortType },
      });

      getFilteredExpenses(sortType.key, financeExpenseCategory.key);
    }
    setOpenDropdown(false);
  };
  const getCategory = (categoryType) => {
    if (location.pathname === "/groups/current") {
      dispatch({
        type: FINANCE_FILTER_ACTION_TYPE.GET_INCOME_CATEGORY_FILTER,
        payload: { financeIncomeCategory: categoryType },
      });

      getFilteredIncomes(financeIncomeSorting.key, categoryType.key);
    } else if (location.pathname === "/groups/waiting") {
      dispatch({
        type: FINANCE_FILTER_ACTION_TYPE.GET_EXPENSE_CATEGORY_FILTER,
        payload: { financeExpenseCategory: categoryType },
      });

      getFilteredExpenses(financeExpenseSorting.key, categoryType.key);
    }
    setOpenDropdown(false);
  };

  useEffect(() => {
    dispatch({
      type: FINANCE_FILTER_ACTION_TYPE.ClEAR_CATEGORY_SORT,
    });
  }, []);
  return (
    <div
      className={`global-category-dropdown finance-dropdown ${
        openDropdown ? "active" : ""
      }`}
    >
      <div
        className="dropdown-head"
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        {type === "category" && location.pathname === "/groups/current" && (
          <h2>
            {financeIncomeCategory
              ? financeIncomeCategory.name
              : "Bütün kateqoriyalar"}
          </h2>
        )}
        {type === "sorting" && location.pathname === "/groups/current" && (
          <h2>
            {" "}
            {financeIncomeSorting
              ? financeIncomeSorting.name
              : "Köhnədən yeniyə"}
          </h2>
        )}

        {type === "category" && location.pathname === "/groups/waiting" && (
          <h2>
            {financeExpenseCategory
              ? financeExpenseCategory.name
              : "Bütün kateqoriyalar"}
          </h2>
        )}
        {type === "sorting" && location.pathname === "/groups/waiting" && (
          <h2>
            {" "}
            {financeExpenseSorting
              ? financeExpenseSorting.name
              : "Köhnədən yeniyə"}
          </h2>
        )}

        <div className="arrow-icon">
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body">
        {type === "category" && (
          <ul>
            {categoryData.map((item, index) => (
              <li key={index} onClick={() => getCategory(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        )}

        {type === "sorting" && (
          <ul>
            {sortingData.map((item, index) => (
              <li key={index} onClick={() => getSorting(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FinanceDropdown;
