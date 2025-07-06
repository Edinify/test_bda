import "moment/locale/az";

const TeacherCells = ({ time, groups, index }) => {
  return (
    <td
      className={`lesson-name teacher-cell`}
      key={time.startTime + index}
      style={{ padding: "10px", boxSizing: "border-box"}}
    >
      <div className="lesson-box-con">
        <ul>
          {groups.map((data, i) => {
            const { name, lessonDate } = data;

            const date = lessonDate.find(
              (lesson) =>
                lesson.day === index && lesson.startTime === time.startTime
            );

            // // console.log(date, "dateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

            return (
              <ul style={{  display: "flex" }}>
                <li
                  style={
                    (date?.practical && {
                      color: "#f9710f",
                      fontWeight: "bold",
                    }) || { fontWeight: 600 }
                  }
                  key={time.startTime + i + i}
                >
                  {date && name}
                </li>
                <span style={{ margin: "0 5px" }}>
                  {date && name && data.room ? "/" : ""}
                </span>
                <li
                  style={
                    (date?.practical && {
                      color: "#f9710f",
                      fontWeight: "bold",
                    }) || { fontWeight: 600 }
                  }
                  key={i}
                >
                  {data.room?.name && date && "Otaq:"}{" "}
                  {(date && data.room?.name) || ""}
                </li>
              </ul>
            );
          })}
        </ul>
      </div>
    </td>
  );
};

export default TeacherCells;
