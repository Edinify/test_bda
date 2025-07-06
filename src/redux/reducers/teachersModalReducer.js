import { TEACHERS_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  teachersModalData: {
    fullName: "",
    courses: "",
    email: "",
    password: "",
    salary: "",
    createdAt: "",
    sector: "",
    birthday: "",
    fin: "",
    seria: "",
    phone: "",
    workExperience: "",
    maritalStatus: "",
    disability: "",
    healthStatus: "",
  },
  teachersOpenModal: false,
  teachersModalLoading: false,
  openConfirmModal: false,
};

export const teachersModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEACHERS_MODAL_ACTION_TYPE.GET_TEACHERS_MODAL:
      return {
        ...state,
        teachersModalData: action.payload.data,
        teachersOpenModal: action.payload.openModal,
        openConfirmModal: action.payload.confirmModal,
      };
    case TEACHERS_MODAL_ACTION_TYPE.TEACHER_OPEN_MODAL:
      return {
        ...state,
        teachersOpenModal: action.payload,
      };
    case TEACHERS_MODAL_ACTION_TYPE.TEACHER_MODAL_LOADING:
      return {
        ...state,
        teachersModalLoading: action.payload,
      };
    case TEACHERS_MODAL_ACTION_TYPE.CLOSE_TEACHER_CONFIRM_MODAL:
      return {
        ...state,
        ...initialState,
      };
    case TEACHERS_MODAL_ACTION_TYPE.OPEN_TEACHER_CONFIRM_MODAL:
      return {
        ...state,
        teachersModalData: action.payload.data,
        teachersOpenModal: action.payload.openModal,
        openConfirmModal: action.payload.confirmModal,
      };
    default:
      return state;
  }
};
