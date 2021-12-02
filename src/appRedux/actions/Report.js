import {
    REPORT_ACTION_RECENT,
    REPORT_ACTION_RECENT_SUCCESS,
    REPORT_COUNT,
    REPORT_COUNT_SUCCESS
} from "../../constants/ActionTypes";

export const reportCount = () => {
    return {
        type: REPORT_COUNT
    };
};

export const reportCountSuccess = (param) => {
    return {
        type: REPORT_COUNT_SUCCESS,
        payload: param
    };
};

export const reportActionRecent = () => {
    return {
        type: REPORT_ACTION_RECENT
    };
};

export const reportActionRecentSuccess = (param) => {
    return {
        type: REPORT_ACTION_RECENT_SUCCESS,
        payload: param
    };
};
