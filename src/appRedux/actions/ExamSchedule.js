import {
    ADD_EXAM_SCHEDULE,
    DELETE_EXAM_SCHEDULE,
    GET_EXAM_SCHEDULE,
    UPDATE_EXAM_SCHEDULE
} from "../../constants/ActionTypes";


export const getListExamSchedule = (param) => {
    return {
        type: GET_EXAM_SCHEDULE,
        payload: param
    };
};

export const addExamSchedule = (param) => {
    return {
        type: ADD_EXAM_SCHEDULE,
        payload: param
    };
};

export const updateExamSchedule = (examSchedule, param) => {
    return {
        type: UPDATE_EXAM_SCHEDULE,
        payload: {
            examSchedule: examSchedule,
            param: param
        }
    };
};

export const deleteExamSchedule = (id, param) => {
    return {
        type: DELETE_EXAM_SCHEDULE,
        payload: {
            id: id,
            param: param
        }
    };
};
