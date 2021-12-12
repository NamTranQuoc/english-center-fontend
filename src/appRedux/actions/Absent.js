import {
    GET_CLASS_ABSENT, GET_CLASS_ABSENT_SUCCESS,
    GET_STUDENT_ABSENT,
    GET_STUDENT_ABSENT_SUCCESS, REGISTER_ABSENT,
    SAVE_ABSENT,
    SELECT_ABSENT
} from "../../constants/ActionTypes";

export const getListStudentAbsent = (param) => {
    return {
        type: GET_STUDENT_ABSENT,
        payload: param
    };
};

export const getListStudentAbsentSuccess = (param) => {
    return {
        type: GET_STUDENT_ABSENT_SUCCESS,
        payload: param
    };
};

export const saveAbsent = (param) => {
    return {
        type: SAVE_ABSENT,
        payload: param
    };
};

export const selectSchedule = (id) => {
    return {
        type: SELECT_ABSENT,
        payload: id
    };
};

export const getListClassAbsent = (schedule_id) => {
    return {
        type: GET_CLASS_ABSENT,
        payload: {
            schedule_id: schedule_id
        }
    };
};

export const getListClassAbsentSuccess = (param) => {
    return {
        type: GET_CLASS_ABSENT_SUCCESS,
        payload: param
    };
};

export const registerAbsent = (param) => {
    return {
        type: REGISTER_ABSENT,
        payload: param
    };
};
