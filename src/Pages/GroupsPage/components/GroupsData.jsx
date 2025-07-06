import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GroupCard from "./GroupCard";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../globalComponents/Loading/components/SmallLoading/SmallLoading";

const GroupsData = ({ pageNum, getNextTeachers, userData }) => {
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const { groupData, hasMore } = useSelector((state) => state.groupsPagination);
  const { openConfirmModal } = useSelector((state) => state.groupModal);
  const [scrollHeight, setScrollHeight] = useState(1);

  const tableHead = [
    "Qrup adı",
    "İxtisas",
    "Otaq",
    "Müəllimlər",
    "Təlimçilər",
    "Tələbələr",
    "Dərs günləri",
    "Başlama tarixi",
    "Bitmə tarixi",
    "Status",
    "",
  ];

  // // console.log(groupData,"group data")

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
            type="group"
            userData={userData}
          />
        )}

        {openConfirmModal && <ConfirmModal type="groups" />}
        <InfiniteScroll
          dataLength={groupData.length}
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
              {groupData?.map((teacher, i) => (
                <GroupCard
                  key={i}
                  data={teacher}
                  group={userData}
                  mode="desktop"
                  cellNumber={i + 1}
                  setOpenMoreModal={setOpenMoreModal}
                />
              ))}
            </tbody>
          </table>
        </InfiniteScroll>

        <div className="details-list-tablet">
          {groupData?.map((teacher, i) => (
            <GroupCard
              key={i}
              data={teacher}
              group={userData}
              mode="tablet"
              cellNumber={i + 1}
              setOpenMoreModal={setOpenMoreModal}
            />
          ))}
        </div>
      </>
    </>
  );
};

export default GroupsData;
