import {
    ADD_CLASS, GET_ALL_CLASS_BY_COURSE, GET_ALL_CLASS_BY_COURSE_SUCCESS,
    GET_ALL_COURSE_BY_CATEGORY,
    GET_ALL_COURSE_BY_CATEGORY_SUCCESS,
    GET_CLASS,
    UPDATE_CLASS
} from "../../constants/ActionTypes";

export const getListClass = (param) => {
    return {
        type: GET_CLASS,
        payload: param
    };
};

export const addClass = (param) => {
    return {
        type: ADD_CLASS,
        payload: param
    };
};

export const updateClass = (values, param) => {
    return {
        type: UPDATE_CLASS,
        payload: {
            values: values,
            param: param
        }
    };
};

export const getAllClassByCourseId = (id) => {
    return {
        type: GET_ALL_CLASS_BY_COURSE,
        payload: {
            id:id,
        }
    };
};

export const getAllSuccessClassByCourseId = (param) => {
    return {
        type: GET_ALL_CLASS_BY_COURSE_SUCCESS,
        payload: param
    };
};
