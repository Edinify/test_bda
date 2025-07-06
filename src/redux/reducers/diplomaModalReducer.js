import { DIPLOMA_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  diplomaModalData: {
    fullName: "",
    date: "",
    degree: "",
    seria: "",
    group: "",
  },
  diplomaOpenModal: false,
  diplomaModalLoading: false,
};

export const diplomaModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case DIPLOMA_MODAL_ACTION_TYPE.GET_DIPLOMA_MODAL:
      return {
        ...state,
        diplomaModalData: action.payload.data,
        diplomaOpenModal: action.payload.openModal,
      };
    case DIPLOMA_MODAL_ACTION_TYPE.DIPLOMA_OPEN_MODAL:
      return {
        ...state,
        diplomaOpenModal: action.payload,
        diplomaModalLoading: false,
      };
    case DIPLOMA_MODAL_ACTION_TYPE.DIPLOMA_MODAL_LOADING:
      console.log(action.payload, "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
      return {
        ...state,
        diplomaModalLoading: action.payload,
      };
    default:
      return state;
  }
};
