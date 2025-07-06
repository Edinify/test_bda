import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";

const Data = ({ allData, totalPages, loading, pageNum, getPageNumber, haveMoreModal, dataHead }) => {
  const [openMoreModal, setOpenMoreModal] = useState(false);

  useEffect(() => {
    if (openMoreModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [openMoreModal]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <table className="details-table  student-table">
            <thead>
              <tr>
                {dataHead.map((head, i) => (
                  <th key={i}>{head.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allData?.map((student, i) => (
                <Card
                  key={i}
                  data={student}
                  mode="desktop"
                  setOpenMoreModal={setOpenMoreModal}
                  cellNumber={i + 1 + (pageNum - 1) * 10}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet with-more">
            {allData?.map((student, i) => (
              <Card
                key={i}
                data={student}
                mode="tablet"
                setOpenMoreModal={setOpenMoreModal}
                cellNumber={i + 1 + (pageNum - 1) * 10}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={pageNum}
                defaultCurrent={1}
                total={totalPages * 10}
                onChange={getPageNumber}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Data;
