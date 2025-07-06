import { CAREER_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  careerModalData: {},
  careerOpenModal: false,
  careerModalLoading: false,
};

export const careerModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case CAREER_MODAL_ACTION_TYPE.GET_CAREER_MODAL:
      return {
        ...state,
        careerModalData: action.payload.data,
        careerOpenModal: action.payload.openModal,
      };
    case CAREER_MODAL_ACTION_TYPE.CAREER_OPEN_MODAL:
      return {
        ...state,
        careerOpenModal: action.payload,
      };
    case CAREER_MODAL_ACTION_TYPE.CAREER_MODAL_LOADING:
      return {
        ...state,
        careerModalLoading: action.payload,
      };
    default:
      return state;
  }
};
