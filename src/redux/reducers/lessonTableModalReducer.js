import { LESSON_TABLE_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  lessonTableModalData: {},
  lessonTableOpenModal: false,
  openStudentModal: false,
  lessonTableModalLoading: false,
  openConfirmModal: false,
};

export const lessonTableModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case LESSON_TABLE_MODAL_ACTION_TYPE.GET_LESSON_TABLE_MODAL:
      // // console.log(action.payload, "--bla bla bla");
      return {
        ...state,
        lessonTableModalData: action.payload.data,
        lessonTableOpenModal: action.payload.openModal,
      };
    case LESSON_TABLE_MODAL_ACTION_TYPE.LESSON_TABLE_OPEN_MODAL:
      return {
        ...state,
        lessonTableOpenModal: action.payload,
      };
    case LESSON_TABLE_MODAL_ACTION_TYPE.LESSON_TABLE_MODAL_LOADING:
      return {
        ...state,
        lessonTableModalLoading: action.payload,
      };
    case LESSON_TABLE_MODAL_ACTION_TYPE.STUDENT_MODAL:
      return {
        ...state,
        openStudentModal: action.payload,
      };
    case LESSON_TABLE_MODAL_ACTION_TYPE.CLOSE_LESSON_CONFIRM_MODAL:
      return {
        ...state,
        ...initialState,
      };
    case LESSON_TABLE_MODAL_ACTION_TYPE.OPEN_LESSON_CONFIRM_MODAL:
      return {
        ...state,
        lessonTableModalData: action.payload.data,
        lessonTableOpenModal: action.payload.openModal,
        openStudentModal: false,
        openConfirmModal: action.payload.confirmModal,
      };
    default:
      return state;
  }
};
