import {GET_STUDENT_ABSENT, GET_STUDENT_ABSENT_SUCCESS, SAVE_ABSENT, SELECT_ABSENT} from "../../constants/ActionTypes";

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
