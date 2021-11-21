import {
    ADD_COURSE_CATEGORY,
    DELETE_COURSE_CATEGORY,
    GET_ALL_COURSE_CATEGORY,
    GET_ALL_COURSE_CATEGORY_SUCCESS,
    GET_COURSE_CATEGORY,
    UPDATE_COURSE_CATEGORY
} from "../../constants/ActionTypes";

export const getListCourseCategory = (param) => {
    return {
        type: GET_COURSE_CATEGORY,
        payload: param
    };
};

export const getAllCourseCategory = (param) => {
    return {
        type: GET_ALL_COURSE_CATEGORY,
        payload: param
    };
};

export const getAllSuccessCourseCategory = (param) => {
    return {
        type: GET_ALL_COURSE_CATEGORY_SUCCESS,
        payload: param
    };
};

export const addCourseCategory = (param) => {
    return {
        type: ADD_COURSE_CATEGORY,
        payload: param
    };
};

export const updateCourseCategory = (courseCategory, param) => {
    return {
        type: UPDATE_COURSE_CATEGORY,
        payload: {
            courseCategory: courseCategory,
            param: param
        }
    };
};

export const deleteCourseCategory = (id, param) => {
    return {
        type: DELETE_COURSE_CATEGORY,
        payload: {
            id: id,
            param: param
        }
    };
};
