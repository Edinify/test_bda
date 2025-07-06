import { DROPDOWN_TEACHER_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  selectedTeacher: "",
};

export const dropdownTeacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case DROPDOWN_TEACHER_ACTIONS_TYPE.SELECT_TEACHER:
      return {
        selectedTeacher: action.payload,
      };
    default:
      return state;
  }
};
