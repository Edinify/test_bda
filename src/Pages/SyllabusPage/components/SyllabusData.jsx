import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SyllabusCard from "./SyllabusCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../globalComponents/Loading/components/SmallLoading/SmallLoading";
const SyllabusData = ({ getNextSyllabus, userData, selectedCourse }) => {
  const { syllabusData, hasMore } = useSelector(
    (state) => state.syllabusPagination
  );
  const { openConfirmModal } = useSelector((state) => state.syllabusModal);
  const [scrollHeight, setScrollHeight] = useState(1);

  const tableHead = ["No", "Mövzü", ""];

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
        {openConfirmModal && <ConfirmModal type="syllabus" />}
        <InfiniteScroll
          style={{ overflowX: "none" }}
          dataLength={syllabusData.length}
          next={getNextSyllabus}
          hasMore={hasMore && selectedCourse?._id}
          loader={<SmallLoading />}
          endMessage={<p style={{ textAlign: "center", fontSize: "20px" }}></p>}
          height={scrollHeight}
          scrollThreshold={0.7}
        >
          <table className="details-table syllabus-table">
            <thead>
              <tr>
                {tableHead.map((head, i) => (
                  <th key={i}>{head}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {syllabusData?.map((teacher, i) => (
                <SyllabusCard
                  key={i}
                  data={teacher}
                  mode="desktop"
                  syllabus={userData}
                  cellNumber={i + 1}
                />
              ))}
            </tbody>
          </table>
        </InfiniteScroll>

        <div className="details-list-tablet syllabus-tablet">
          {syllabusData?.map((teacher, i) => (
            <SyllabusCard
              key={i}
              data={teacher}
              syllabus={userData}
              mode="tablet"
              cellNumber={i + 1}
            />
          ))}
        </div>
      </>
    </>
  );
};

export default SyllabusData;
