import {
    REPORT_ACTION_RECENT,
    REPORT_ACTION_RECENT_SUCCESS,
    REPORT_COUNT,
    REPORT_COUNT_SUCCESS,
    REPORT_STATISTICAL_BY_PAID,
    REPORT_STATISTICAL_BY_PAID_SUCCESS,
    REPORT_STATISTICAL_BY_REGISTER,
    REPORT_STATISTICAL_BY_REGISTER_SUCCESS
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

export const reportStatisticalByPaid = () => {
    return {
        type: REPORT_STATISTICAL_BY_PAID
    };
};

export const reportStatisticalByPaidSuccess = (param) => {
    return {
        type: REPORT_STATISTICAL_BY_PAID_SUCCESS,
        payload: param
    };
};

export const reportStatisticalByRegister = () => {
    return {
        type: REPORT_STATISTICAL_BY_REGISTER
    };
};

export const reportStatisticalByRegisterSuccess = (param) => {
    return {
        type: REPORT_STATISTICAL_BY_REGISTER_SUCCESS,
        payload: param
    };
};

