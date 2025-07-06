import React, { useEffect } from "react";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import WhereHeardData from "./components/WhereHeardData";
import { useDispatch, useSelector } from "react-redux";
import { WHERE_HEARD_MODAL_ACTION_TYPE } from "../../redux/actions-type";
import { getAllWhereComing } from "../../redux/actions/whereHeardActions";

const WhereHeardPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllWhereComing());
  }, [dispatch]);

  const openModal = () => {
    dispatch({
      type: WHERE_HEARD_MODAL_ACTION_TYPE.GET_WHERE_HEARD_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  return (
    <div className="details-page courses ">
      <GlobalHead
        openModal={openModal}
        profile="whereHeard"
        statusType={"whereHeard"}
      />

      <WhereHeardData userData={user} />
    </div>
  );
};

export default WhereHeardPage;
