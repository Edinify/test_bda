import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "./CourseCard";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../globalComponents/Loading/components/SmallLoading/SmallLoading";

const CoursesData = ({ userData, getNextCourse }) => {
  const { courses, hasMore } = useSelector((state) => state.coursesPagination);
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const { openConfirmModal } = useSelector((state) => state.coursesModal);
  const [scrollHeight, setScrollHeight] = useState(1);
  const dispatch = useDispatch()



  const tableHead = [
    { id: 1, label: "Fənn adı" },
    { id: 2, label: "Dərs sayı" },
    { id: 3, label: "Tam" },
    { id: 4, label: "Tədris müddəti" },
    { id: 5, label: "10 hissəli" },
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
  // console.log(courses)
  return (
    <>
      <>
        {openMoreModal && (
          <MoreModal
            setOpenMoreModal={setOpenMoreModal}
            type="courses"
            userData={userData}
          />
        )}

        {openConfirmModal && <ConfirmModal type="courses" />}
        <InfiniteScroll
          style={{ overflowX: "none" }}
          dataLength={courses.length}
          next={getNextCourse}
          hasMore={hasMore}
          loader={<SmallLoading />}
          endMessage={<p style={{ textAlign: "center", fontSize: "20px" }}></p>}
          scrollThreshold={0.7}
          height={scrollHeight}
        >
          <table
            className={`details-table  courses-table ${
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

            <tbody  >
              {courses?.map((course, i) => (
                <CourseCard
                  key={i}
                  data={course}
                  course={userData}
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
          {courses.map((courseName, i) => (
            <CourseCard
              key={i}
              data={courseName}
              course={userData}
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

export default CoursesData;
