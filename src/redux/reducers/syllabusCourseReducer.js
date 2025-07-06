import { SYLLABUS_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  selectedCourse: "",
};

export const syllabusCourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SYLLABUS_ALL_ACTIONS_TYPE.SELECT_COURSE_FOR_SYLLABUS:
      return {
        selectedCourse: action.payload,
      };
      case SYLLABUS_ALL_ACTIONS_TYPE.CLEAR_COURSE:
      return {
        selectedCourse: "",
      };
    default:
      return state;
  }
};
