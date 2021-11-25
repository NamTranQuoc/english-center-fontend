import {GENERATE_SCHEDULE, GET_SCHEDULE, GET_SCHEDULE_SUCCESS} from "../../constants/ActionTypes";

export const getSchedule = (param) => {
    return {
        type: GET_SCHEDULE,
        payload: param
    };
};

export const getScheduleSuccess = (param) => {
    return {
        type: GET_SCHEDULE_SUCCESS,
        payload: param
    };
};

export const generateSchedule = (param) => {
    return {
        type: GENERATE_SCHEDULE,
        payload: param
    };
};
