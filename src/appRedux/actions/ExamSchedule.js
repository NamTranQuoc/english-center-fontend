import {
    ADD_EXAM_SCHEDULE,
    DELETE_EXAM_SCHEDULE, EXPORT_EXAM_SCHEDULE,
    GET_EXAM_SCHEDULE, REGISTER_EXAM_SCHEDULE,
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

export const registerExam = (member, exam_id, param) => {
    return {
        type: REGISTER_EXAM_SCHEDULE,
        payload: {
            member: member,
            exam_id: exam_id,
            param: param
        }
    };
};

export const exportExam = (exam_id) => {
    return {
        type: EXPORT_EXAM_SCHEDULE,
        payload: {
            exam_id: exam_id
        }
    };
};
