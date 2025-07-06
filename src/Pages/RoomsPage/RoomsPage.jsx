import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ROOMS_MODAL_ACTION_TYPE,
  ROOMS_ALL_ACTIONS_TYPE,
} from "../../redux/actions-type";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import RoomData from "./components/RoomData";
import { getRoomsPaginationAction } from "../../redux/actions/roomsActions";

const RoomsPage = () => {
  const dispatch = useDispatch();
  const { rooms, totalLength, loading } = useSelector(
    (state) => state.roomsPagination
  );
  const { roomsSearchValues } = useSelector((state) => state.searchValues);
  const { user } = useSelector((state) => state.user);

  const openModal = () => {
    dispatch({
      type: ROOMS_MODAL_ACTION_TYPE.GET_ROOMS_MODAL,
      payload: { data: {}, openModal: true },
    });
  };

  // ============

  const getNextRoom = () => {
    if (loading) return;

    if (roomsSearchValues) {
      dispatch(getRoomsPaginationAction(rooms?.length || 0, roomsSearchValues));
    } else {
      dispatch(getRoomsPaginationAction(rooms?.length || 0, ""));
    }
  };

  // ========

  const searchData = (e) => {
    e.preventDefault();
    dispatch({
      type: ROOMS_ALL_ACTIONS_TYPE.RESET_ROOMS_PAGINATION,
    });

    dispatch(getRoomsPaginationAction(0, roomsSearchValues));
  };

  useEffect(() => {
    if (roomsSearchValues) {
      dispatch(getRoomsPaginationAction(0, roomsSearchValues));
    } else {
      dispatch(getRoomsPaginationAction(0, ""));
    }

    return () => {
      dispatch({
        type: ROOMS_ALL_ACTIONS_TYPE.RESET_ROOMS_PAGINATION,
      });
    };
  }, []);

  console.log(roomsSearchValues, "rooms search value");
  return (
    <div className="details-page rooms ">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        DATA_SEARCH_VALUE={"ROOMS_SEARCH_VALUE"}
        dataSearchValues={roomsSearchValues}
        profile="rooms"
        statusType={"rooms"}
        count={totalLength}
      />

      <RoomData getNextRoom={getNextRoom} />
    </div>
  );
};

export default RoomsPage;
