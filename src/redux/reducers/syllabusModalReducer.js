import { SYLLABUS_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  syllabusModalData: {},
  syllabusOpenModal: false,
  syllabusModalLoading: false,
  openConfirmModal: false,
};

export const syllabusModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SYLLABUS_MODAL_ACTION_TYPE.GET_SYLLABUS_MODAL:
      return {
        ...state,
        syllabusModalData: action.payload.data,
        syllabusOpenModal: action.payload.openModal,
      };
    case SYLLABUS_MODAL_ACTION_TYPE.SYLLABUS_OPEN_MODAL:
      return {
        ...state,
        syllabusOpenModal: action.payload,
      };
    case SYLLABUS_MODAL_ACTION_TYPE.SYLLABUS_MODAL_LOADING:
      return {
        ...state,
        syllabusModalLoading: action.payload,
      };
    case SYLLABUS_MODAL_ACTION_TYPE.CLOSE_SYLLABUS_CONFIRM_MODAL:
      return {
        ...state,
        ...initialState,
      };
    case SYLLABUS_MODAL_ACTION_TYPE.OPEN_SYLLABUS_CONFIRM_MODAL:
      return {
        ...state,
        syllabusModalData: action.payload.data,
        syllabusOpenModal: action.payload.openModal,
        openConfirmModal: action.payload.confirmModal,
      };
    default:
      return state;
  }
};
