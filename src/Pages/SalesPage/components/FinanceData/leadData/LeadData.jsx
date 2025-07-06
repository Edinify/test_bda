import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import Loading from "../../../../../globalComponents/Loading/Loading";
import LeadCard from "./LeadCard";
import { getLeadPaginationAction } from "../../../../../redux/actions/leadActions";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../../../globalComponents/Loading/components/SmallLoading/SmallLoading";

const LeadData = () => {
  const dispatch = useDispatch();
  const { financeMonthsFilter, financeChooseDate } = useSelector(
    (state) => state.financeDateFilter
  );
  const { leads, hasMore } = useSelector((state) => state.leads);

  const dataHead = [
    { id: 1, label: "#" },
    { id: 2, label: "Lead sayı" },
    { id: 3, label: "tarix" },
    { id: 4, label: "" },
  ];

  const getNextLeads = () => {
    if (financeChooseDate.startDate && financeChooseDate.endDate) {
      dispatch(
        getLeadPaginationAction(
          leads.length,
          financeChooseDate.startDate,
          financeChooseDate.endDate,
          "" //month
        )
      );
    } else {
      dispatch(
        getLeadPaginationAction(
          leads.length,
          "",
          "",
          financeMonthsFilter ? financeMonthsFilter : 1 //month
        )
      );
    }
  };

  console.log(leads, "leadsssssssssssssssssssss");
  return (
    <>
      <InfiniteScroll
        dataLength={leads.length}
        next={getNextLeads}
        hasMore={hasMore}
        loader={<SmallLoading />}
        endMessage={<p style={{ textAlign: "center", fontSize: "20px" }}></p>}
        height={400}
        scrollThreshold={1}
      >
        <table className="details-table incomes-table">
          <thead>
            <tr>
              {dataHead.map((head, i) => (
                <th key={i}>{head.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads?.map((lead, i) => (
              <LeadCard key={i} data={lead} mode="desktop" cellNumber={i + 1} />
            ))}
          </tbody>
        </table>
      </InfiniteScroll>

      <div className="details-list-tablet incomes-page  ">
        {leads?.map((lead, i) => (
          <LeadCard key={i} data={lead} mode="tablet" cellNumber={i + 1} />
        ))}
      </div>
    </>
  );
};

export default LeadData;
