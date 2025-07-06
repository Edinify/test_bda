import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import EventCard from "./EventCard";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../globalComponents/Loading/components/SmallLoading/SmallLoading";

const EventsData = ({ userData, getNextTeachers }) => {
  const { data, events, hasMore } = useSelector(
    (state) => state.eventsPagination
  );
  const [scrollHeight, setScrollHeight] = useState(1);
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const { openConfirmModal } = useSelector((state) => state.coursesModal);
  const tableHead = [
    { id: 1, label: "Tədbir adı" },
    { id: 9, label: "Məkan" },
    { id: 2, label: "Tarix" },
    { id: 3, label: "Saat" },
    { id: 4, label: "Qonaq" },
    { id: 5, label: "Spiker" },
    { id: 10, label: "Hədəf kütlə" },
    { id: 12, label: "Məqsəd" },
    { id: 13, label: "Büdcə" },
    { id: 6, label: "İştirakçı sayı" },
    { id: 11, label: "Alınacaq" },
    { id: 7, label: "status" },
    { id: 8, label: "" },
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
      {openMoreModal && (
        <MoreModal
          setOpenMoreModal={setOpenMoreModal}
          type="event"
          userData={userData}
        />
      )}

      {openConfirmModal && <ConfirmModal type="courses" />}
      <InfiniteScroll
        dataLength={events.length}
        next={getNextTeachers}
        hasMore={hasMore}
        loader={<SmallLoading />}
        endMessage={<p style={{ textAlign: "center", fontSize: "20px" }}></p>}
        height={scrollHeight}
        scrollThreshold={0.7}
      >
        <table
          className={`details-table events-table   ${
            userData.power === "only-show" ? "only-show" : "update"
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
            {events.map((event, i) => (
              <EventCard
                key={i}
                data={event}
                userData={userData}
                mode="desktop"
                cellNumber={i + 1}
                setOpenMoreModal={setOpenMoreModal}
              />
            ))}
          </tbody>
        </table>
      </InfiniteScroll>

      <div className="details-list-tablet course-list-mobile">
        <h3 className="details-list-title">Tədbir adı</h3>
        {events.map((event, i) => (
          <EventCard
            key={i}
            data={event}
            userData={userData}
            mode="mobile"
            cellNumber={i + 1}
            setOpenMoreModal={setOpenMoreModal}
          />
        ))}
      </div>
      {/* {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={eventPageNum}
                defaultCurrent={1}
                total={totalPages * 10}
                onChange={getPageNumber}
              />
            </div>
          )} */}
    </>
  );
};

export default EventsData;
