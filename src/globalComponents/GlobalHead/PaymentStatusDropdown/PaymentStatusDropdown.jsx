import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArrowIcon  from "../../../assets/icons/arrow-down-dropdown.svg?react";
import CheckIcon  from "../../../assets/icons/Checkbox.svg?react";
import {
  PAYMENT_STATUS_FILTER_ACTION_TYPE,
} from "../../../redux/actions-type";

export const PaymentStatusDropdown = ({ statusType, deviceType = "" }) => {
  const { paymentStatus } = useSelector((state) => state.paymentStatus);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const dispatch = useDispatch();
  const filterData = [
    { key: "all", name: "Bütün ödənişlər " },
    { key: "latePayment", name: "Gecikmiş ödənişlər" },
  ];

  const getCategory = (categoryType) => {
    setSelectedType(categoryType.name);
    setDropdownOpen(false);

    dispatch({
      type: PAYMENT_STATUS_FILTER_ACTION_TYPE.GET_PAYMENT_STATUS,
      payload: categoryType.key,
    });
  };

  useEffect(() => {
    setSelectedType("");
  }, []);

  //   const handleClick = (item) => {
  //     // console.log(item);
  //     // // console.log(item.key)
  //     dispatch({
  //       type: LESSON_TABLE_ALL_ACTIONS_TYPE.GET_LESSON_STATUS,
  //       payload: item.key,
  //     });
  //     getCategory(item);
  //   };

  return (
    <div
      className={`global-category-dropdown dropdown-name data-status ${deviceType} ${
        dropdownOpen ? "active" : ""
      }`}
    >
      <div
        className="dropdown-head"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <h2>{selectedType ? selectedType : "Bütün Ödənişlər"}</h2>
        <div className="arrow-icon">
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body">
        <ul>
          {filterData.map((item) => (
            <li key={item.key} onClick={() => getCategory(item)}>
              {paymentStatus === item.id && <CheckIcon />}
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
