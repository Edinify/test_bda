import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "./RoomCard";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../globalComponents/Loading/components/SmallLoading/SmallLoading";
import RoomCard from "./RoomCard";

const RoomData = ({ getNextRoom }) => {
  const { rooms, hasMore } = useSelector((state) => state.roomsPagination);
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const { openConfirmModal } = useSelector((state) => state.roomsModal);
  const { user } = useSelector((state) => state.user);

  const [scrollHeight, setScrollHeight] = useState(1);
  const dispatch = useDispatch();

  const tableHead = [
    { id: 1, label: "Otaq adı" },
    { id: 2, key: 1, label: "B.E" },
    { id: 3, key: 2, label: "Ç.A" },
    { id: 2, key: 3, label: "Ç" },
    { id: 3, key: 4, label: "C.A" },
    { id: 2, key: 5, label: "C" },
    { id: 3, key: 6, label: "Ş" },
    { id: 2, key: 7, label: "B" },
    { id: 6, label: "" },
  ];
  useEffect(() => {
    if (openMoreModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [openMoreModal]);

  useEffect(() => {
    const mainHeader = document.querySelector(".main-header");
    const detailsHeader = document.querySelector(".details-header");

    const handleResize = () => {
      setScrollHeight(
        window.innerHeight -
          mainHeader.offsetHeight -
          detailsHeader.offsetHeight
      );
    };

    setScrollHeight(
      window.innerHeight - mainHeader.offsetHeight - detailsHeader.offsetHeight
    );

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <>
        {openMoreModal && (
          <MoreModal setOpenMoreModal={setOpenMoreModal} type="rooms" />
        )}

        {openConfirmModal && <ConfirmModal type="rooms" />}
        <InfiniteScroll
          style={{ overflowX: "none" }}
          dataLength={rooms.length}
          next={getNextRoom}
          hasMore={hasMore}
          loader={<SmallLoading />}
          endMessage={<p style={{ textAlign: "center", fontSize: "20px" }}></p>}
          scrollThreshold={0.7}
          height={scrollHeight}
        >
          <table
            className={`details-table  events-table ${
              user?.power === "only-show" ? "only-show" : "update"
            } `}
          >
            <thead>
              <tr>
                {tableHead.map((head, i) => (
                  <th key={i}>{head.label}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rooms?.map((room, i) => (
                <RoomCard
                  key={room._id}
                  data={room}
                  mode="desktop"
                  cellNumber={i + 1}
                  setOpenMoreModal={setOpenMoreModal}
                />
              ))}
            </tbody>
          </table>
        </InfiniteScroll>

        <div className="details-list-tablet course-list-mobile">
          <h3 className="details-list-title">Fənn adı</h3>
          {rooms.map((room, i) => (
            <RoomCard
              key={room._id}
              data={room}
              mode="mobile"
              cellNumber={i + 1}
              setOpenMoreModal={setOpenMoreModal}
            />
          ))}
        </div>
      </>
    </>
  );
};

export default RoomData;
