import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TeacherCard from "./TeacherCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../globalComponents/Loading/components/SmallLoading/SmallLoading";

const TeachersData = ({ getNextTeachers, userData }) => {
  const dispatch = useDispatch();
  const { teachers, hasMore } = useSelector(
    (state) => state.teachersPagination
  );
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const { openConfirmModal } = useSelector((state) => state.teachersModal);
  const [scrollHeight, setScrollHeight] = useState(1);

  const tableHead = [
    { id: 1, label: "Təlimçi adı" },
    { id: 2, label: "Fin" },
    { id: 3, label: "Seriya" },
    { id: 4, label: "Doğum tarixi" },
    { id: 5, label: "Email" },
    { id: 6, label: "Mobil nömrə" },
    { id: 7, label: "Fənn" },
    { id: 8, label: "Qoşulma tarixi" },
    { id: 9, label: "Status" },
    { id: 10, label: "" },
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
    const globalHeads = document.querySelector(".global-head-tabs");

    const handleResize = () => {
      setScrollHeight(
        window.innerHeight -
          mainHeader.offsetHeight -
          detailsHeader.offsetHeight -
          globalHeads.offsetHeight
      );
    };

    setScrollHeight(
      window.innerHeight -
        mainHeader.offsetHeight -
        detailsHeader.offsetHeight -
        globalHeads.offsetHeight
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
          <MoreModal
            setOpenMoreModal={setOpenMoreModal}
            type="teacher"
            userData={userData}
          />
        )}
        {openConfirmModal && <ConfirmModal type="teacher" />}
        <InfiniteScroll
          dataLength={teachers.length}
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
                  <th key={i}>{head.label}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {teachers?.map((teacher, i) => (
                <TeacherCard
                  key={i}
                  data={teacher}
                  mode="desktop"
                  teacher={userData}
                  cellNumber={i + 1}
                  setOpenMoreModal={setOpenMoreModal}
                />
              ))}
            </tbody>
          </table>
        </InfiniteScroll>

        {/* <div className="details-list-tablet with-more">
          {teachers?.map((teacher, i) => (
            <TeacherCard
              key={i}
              data={teacher}
              mode="tablet"
              teacher={userData}
              cellNumber={i + 1}
              setOpenMoreModal={setOpenMoreModal}
            />
          ))}
        </div> */}
      </>
    </>
  );
};

export default TeachersData;
