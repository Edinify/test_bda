import { DASHBOARD_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  dashboardData: "",
  confirmedLessonsData: null,
  cancelledLessonsData: null,
  unviewedLessonsData: 0,
  allGroupsCount: 0,
  waitingGroupsCount: 0,
  currentGroupsCount: 0,
  endedGroupsCount: 0,
  eventsData: 0,
  dashboardFinanceData: {},
  courseStatistic: {},
  advertising: [],
  leadboard: {},
  dashboardStudentsAmount: {},
  dashboardweek: [],
};

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD:
      return {
        ...state,
        dashboardData: action.payload,
      };
    case DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_CONFIRMED_LESSONS:
      return {
        ...state,
        confirmedLessonsData: action.payload,
      };
    case DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_CANCELLED_LESSONS:
      return {
        ...state,
        cancelledLessonsData: action.payload,
      };
    case DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_UNVIEWED_LESSONS:
      return {
        ...state,
        unviewedLessonsData: action.payload,
      };
    case DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_GROUPS_COUNT:
      return {
        ...state,
        allGroupsCount: action.payload.allGroupsCount,
        waitingGroupsCount: action.payload.waitingGroupsCount,
        currentGroupsCount: action.payload.currentGroupsCount,
        endedGroupsCount: action.payload.endedGroupsCount,
      };
    case DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_EVENTS:
      return {
        ...state,
        eventsData: action.payload,
      };
    case DASHBOARD_ACTIONS_TYPE.UPDATE_DASHBOARD_UNVIEWED_LESSONS:
      return {
        ...state,
        unviewedLessonsData:
          action.payload.status !== "unviewed"
            ? state.unviewedLessonsData.find(
                (item) => item?.teacher?._id === action?.payload?.teacher?._id
              ).lessons.length === 1
              ? state.unviewedLessonsData.filter(
                  (item) => item?.teacher?._id !== action?.payload?.teacher?._id
                )
              : state.unviewedLessonsData.map((item) => {
                  if (item.teacher._id === action.payload.teacher._id) {
                    return {
                      ...item,
                      lessons: item?.lessons?.filter(
                        (lesson) => lesson._id !== action.payload._id
                      ),
                    };
                  } else {
                    return item;
                  }
                })
            : // state.unviewedLessonsData.filter((item) => {
              //   if(item?.teacher?._id !== action?.payload?.teacher?._id) {
              //     const newLessons = item.lessons.filter(lesson => lesson?._id !== action?.payload?._id)
              //      if(newLessons.length === item.lessons.length ) {
              //       return true
              //      } else if(newLessons.lenght === 1) {
              //       return false
              //      }
              //   }
              // })
              state.unviewedLessonsData.map((item) => {
                if (item.teacher._id === action.payload.teacher._id) {
                  return {
                    ...item,
                    lessons: item.lessons.map((lesson) =>
                      lesson._id === action.payload._id
                        ? action.payload
                        : lesson
                    ),
                  };
                } else {
                  return item;
                }
              }),
      };
    case DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_ADVERTISING:
      return {
        ...state,
        advertising: action.payload,
      };
    case DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_FINANCE:
      return {
        ...state,
        dashboardFinanceData: action.payload,
      };
    case DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_COURSE_STATISTIC:
      return {
        ...state,
        courseStatistic: action.payload,
      };
    case DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_LEADBOARD:
      return {
        ...state,
        leadboard: action.payload,
      };
    case DASHBOARD_ACTIONS_TYPE.GET_DASHBOARD_STUDENTS_AMOUNT:
      return {
        ...state,
        dashboardStudentsAmount: action.payload,
      };
    case DASHBOARD_ACTIONS_TYPE.GET_WEEKLY_TABLE:
      return {
        ...state,
        dashboardweek: action.payload,
      };
    default:
      return state;
  }
};
