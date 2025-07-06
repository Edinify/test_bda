import { LEAD_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  leadModalData: {
    count: "",
    date: "",
  },
  leadOpenModal: false,
  leadModalLoading: false,
  leadActivateGet: false,
};

export const leadModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case LEAD_MODAL_ACTION_TYPE.GET_LEAD_MODAL:
      return {
        ...state,
        leadModalData: action.payload.data,
        leadOpenModal: action.payload.openModal,
      };
    case LEAD_MODAL_ACTION_TYPE.LEAD_OPEN_MODAL:
      return {
        ...state,
        leadOpenModal: action.payload,
      };
    case LEAD_MODAL_ACTION_TYPE.LEAD_MODAL_LOADING:
      return {
        ...state,
        leadModalLoading: action.payload,
      };
    case LEAD_MODAL_ACTION_TYPE.LEAD_MODAL_ACTIVATE_GET:
      return {
        ...state,
        leadActivateGet: action.payload,
      };
    default:
      return state;
  }
};
