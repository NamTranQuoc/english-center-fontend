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

export const updateExamSchedule = (room, param) => {
    return {
        type: UPDATE_EXAM_SCHEDULE,
        payload: {
            room: room,
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
