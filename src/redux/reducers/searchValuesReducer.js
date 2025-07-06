import { SEARCH_VALUES_ACTION_TYPES } from "../actions-type";

const initialState = {
  teachersSearchValues: "",
  workersSearchValues: "",
  groupsSearchValues: "",
  lessonTableSearchValues: "",
  syllabusSearchValues: "",
  careerSearchValues: "",
  adminsSearchValues: "",
  studentSearchValues: "",
  tuitionFeeSearchValues: "",
  consultationSearchValues: "",
  coursesSearchValues: "",
  eventsSearchValues: "",
  salariesSearchValues: "",
  bonusSearchValues: "",
  fineSearchValues: "",
  feedbackSearchValues: "",
  studentFeedbackSearchValues: "",
  diplomaSearchValues: "",
  roomsSearchValues: "",
  consultationPhoneSearchValues: "",
};

export const searchValuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_VALUES_ACTION_TYPES.TEACHERS_SEARCH_VALUE:
      return {
        ...state,
        teachersSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.WORKERS_SEARCH_VALUE:
      return {
        ...state,
        workersSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.GROUPS_SEARCH_VALUE:
      return {
        ...state,
        groupsSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.LESSON_TABLE_SEARCH_VALUE:
      return {
        ...state,
        lessonTableSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.SYLLABUS_SEARCH_VALUE:
      return {
        ...state,
        syllabusSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.CAREER_SEARCH_VALUE:
      return {
        ...state,
        careerSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.STUDENTS_SEARCH_VALUE:
      return {
        ...state,
        studentSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.TUITION_FEE_SEARCH_VALUE:
      return {
        ...state,
        tuitionFeeSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.CONSULTATION_SEARCH_VALUE:
      return {
        ...state,
        consultationSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.COURSES_SEARCH_VALUE:
      return {
        ...state,
        coursesSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.EVENTS_SEARCH_VALUE:
      return {
        ...state,
        eventsSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.SALARIES_SEARCH_VALUE:
      return {
        ...state,
        salariesSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.BONUS_SEARCH_VALUE:
      return {
        ...state,
        bonusSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.FINE_SEARCH_VALUE:
      return {
        ...state,
        fineSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.FEEDBACK_SEARCH_VALUE:
      return {
        ...state,
        feedbackSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.STUDENT_FEEDBACK_SEARCH_VALUE:
      return {
        ...state,
        studentFeedbackSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.ADMINS_SEARCH_VALUE:
      return {
        ...state,
        adminsSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.DIPLOMA_SEARCH_VALUE:
      return {
        ...state,
        diplomaSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.ROOMS_SEARCH_VALUE:
      return {
        ...state,
        roomsSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.CONSULTATION_PHONE_SEARCH_VALUE:
      return {
        ...state,
        consultationPhoneSearchValues: action.payload,
      };
    case SEARCH_VALUES_ACTION_TYPES.RESET_SEARCH_VALUES:
      return initialState;
    default:
      return state;
  }
};
