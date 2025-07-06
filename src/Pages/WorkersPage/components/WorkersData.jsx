import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WorkerCard from "./WorkerCard";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../globalComponents/Loading/components/SmallLoading/SmallLoading";

const WorkersData = ({ userData, getNextTeachers }) => {
  const { workers, hasMore } = useSelector((state) => state.workersPagination);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(1);

  const tableHead = [
    "Ad soyad",
    "Fin kod",
    "Email",
    "Mobil nömrə",
    "Pozisiya",
    "Doğum günü",
    "Profillər",
    "",
  ];

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
          userData={userData}
          setOpenMoreModal={setOpenMoreModal}
          type="worker"
        />
      )}

      {openConfirmModal && (
        <ConfirmModal
          setOpenConfirmModal={setOpenConfirmModal}
          type="workers"
        />
      )}

      <InfiniteScroll
        style={{ overflowX: "none" }}
        dataLength={workers.length}
        next={getNextTeachers}
        hasMore={hasMore}
        loader={<SmallLoading />}
        endMessage={<p style={{ textAlign: "center", fontSize: "20px" }}></p>}
        height={scrollHeight}
        scrollThreshold={0.7}
      >
        <table
          className={`details-table  teacher-table ${
            userData.power === "only-show" ? "only-show" : "update"
          } `}
        >
          <thead>
            <tr>
              {tableHead.map((head, i) => (
                <th key={i}>{head}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {workers?.map((teacher, i) => (
              <WorkerCard
                key={i}
                data={teacher}
                worker={userData}
                mode="desktop"
                cellNumber={i + 1}
                setOpenConfirmModal={setOpenConfirmModal}
                setOpenMoreModal={setOpenMoreModal}
              />
            ))}
          </tbody>
        </table>
      </InfiniteScroll>

      <div className="details-list-tablet">
        {workers?.map((teacher, i) => (
          <WorkerCard
            key={i}
            data={teacher}
            worker={userData}
            mode="tablet"
            cellNumber={i + 1}
            setOpenMoreModal={setOpenMoreModal}
            setOpenConfirmModal={setOpenConfirmModal}
          />
        ))}
      </div>
    </>
  );
};

export default WorkersData;
