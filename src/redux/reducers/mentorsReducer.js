import { MENTOR_TYPES } from "../actions-type";

const initialState = {
  mentors: [],
};

const mentorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MENTOR_TYPES.GET_MENTORS:
      // // console.log(action.payload, "Mentors in reducer");
      return { ...state, mentors: action.payload };
    default:
      return state;
  }
};

export default mentorsReducer;
