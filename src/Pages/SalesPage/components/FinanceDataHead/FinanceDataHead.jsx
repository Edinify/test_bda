import "./financeDataHead.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LEAD_MODAL_ACTION_TYPE } from "../../../../redux/actions-type";
import  PlusIcon  from "../../../../assets/icons/finance/Plus.svg?react";

const FinanceDataHead = () => {
  const dispatch = useDispatch();

  const openLeadModal = () => {
    dispatch({
      type: LEAD_MODAL_ACTION_TYPE.GET_LEAD_MODAL,
      payload: { data: {}, openModal: true },
    });
  };

  return (
    <div className="finance-data-head">
      <div className="top">
        <Link className={`data-type active`}>Lead</Link>
      </div>

      <div className="bottom">
        <div className="left"></div>

        <div className="right">
          <button className="add-btn" onClick={openLeadModal}>
            <PlusIcon />
            Əlavə et
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinanceDataHead;
