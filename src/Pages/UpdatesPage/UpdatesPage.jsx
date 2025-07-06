import React, { useEffect } from "react";
import UpdatesData from "./components/UpdatesData";
import { useDispatch } from "react-redux";
import { getUpdatesAction } from "../../redux/actions/updatesActions";
import { useParams } from "react-router-dom";

const UpdatesPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getUpdatesAction(id));
    }
  }, [id]);
  return (
    <div className="details-page ">
      <UpdatesData />
    </div>
  );
};

export default UpdatesPage;
