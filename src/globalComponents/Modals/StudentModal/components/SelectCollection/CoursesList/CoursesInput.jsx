import  MinusIcon  from "../../../../../../assets/icons/minus-cirlce.svg?react";

const CoursesInput = ({
  data,
  index,
  deleteClass,
}) => {
  return (
    <li>
      <div className="top">
        {`${index + 1}. ${data?.name}`}
        <div className="minus-icon-con">
          <MinusIcon
            className="minus-icon"
            onClick={() => deleteClass(data._id)}
          />
        </div>
      </div>
    </li>
  );
};

export default CoursesInput;
