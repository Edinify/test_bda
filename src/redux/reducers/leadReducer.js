import { LEAD_ACTION_TYPE } from "../actions-type";

const initialState = {
  leads: [],
  loading: false,
  hasMore: true,
};

export const leadReducer = (state = initialState, action) => {
  switch (action.type) {
    case LEAD_ACTION_TYPE.GET_LEAD_PAGINATION:
      return {
        ...state,
        leads: [...state.leads, ...action.payload.leads],
        hasMore: !(action.payload.leads.length < 10),
      };

    case LEAD_ACTION_TYPE.UPDATE_LEAD:
      console.log(action.payload, "updated data in lead reducer");
      console.log(state.leads.map((lead) =>
      lead._id === action.payload._id ? action.payload : lead
    ))
      return {
        ...state,
        leads: state.leads.map((lead) =>
          lead._id === action.payload._id ? action.payload : lead
        ),
      };
    case LEAD_ACTION_TYPE.CREATE_LEAD:
      return {
        ...state,
        leads: [action.payload, ...state.leads],
      };
    case LEAD_ACTION_TYPE.RESET_LEAD:
      return initialState;
    case LEAD_ACTION_TYPE.DELETE_LEAD:
      return {
        ...state,
        leads: state.leads.filter((lead) => lead._id !== action.payload),
      };
    case LEAD_ACTION_TYPE.LEAD_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case LEAD_ACTION_TYPE.GET_LEAD_LAST_PAGE:
      return {
        ...state,
        loading: false,
        lastPage: action.payload,
      };
    default:
      return state;
  }
};
