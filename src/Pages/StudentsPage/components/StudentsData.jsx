import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StudentCard from "./StudentCard";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../globalComponents/Loading/components/SmallLoading/SmallLoading";

const StudentsData = ({ userData, getNextStudents }) => {
  const { students, hasMore } = useSelector(
    (state) => state.studentsPagination
  );
  const { openConfirmModal } = useSelector((state) => state.studentsModal);
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(1);

  const tableHead = [
    "Tələbə adı",
    "Fin",
    "Seriya",
    "Doğum günü",
    "Mobil nömrə",
    "Email",
    "Bizi haradan eşidiblər?",
    "Haradan gəliblər",
    "Satış bölgüsü",
    "İxtisas",
    "Qrup",
    "Q/B",
    "",
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
      {openConfirmModal && <ConfirmModal type="student" />}

      <InfiniteScroll
        dataLength={students.length}
        next={getNextStudents}
        hasMore={hasMore}
        loader={<SmallLoading />}
        endMessage={<p style={{ textAlign: "center", fontSize: "20px" }}></p>}
        height={scrollHeight}
        scrollThreshold={0.7}
      >
        <table
          style={{ marginBottom: "50px" }}
          className={`details-table  student-table ${
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
            {students?.map((student, i) => (
              <StudentCard
                key={student._id}
                data={student}
                mode="desktop"
                student={userData}
                setOpenMoreModal={setOpenMoreModal}
                cellNumber={i + 1}
              />
            ))}
          </tbody>
        </table>
      </InfiniteScroll>

      <div className="details-list-tablet with-more">
        {students?.map((student, i) => (
          <StudentCard
            key={student._id}
            data={student}
            mode="tablet"
            student={userData}
            setOpenMoreModal={setOpenMoreModal}
            cellNumber={i + 1}
          />
        ))}
      </div>
    </>
  );
};

export default StudentsData;
