import {ADD_COURSE, DELETE_COURSE, GET_COURSE, UPDATE_COURSE} from "../../constants/ActionTypes";

export const getListCourse = (param) => {
    return {
        type: GET_COURSE,
        payload: param
    };
};

export const addCourse = (param) => {
    return {
        type: ADD_COURSE,
        payload: param
    };
};

export const updateCourse = (course, param) => {
    return {
        type: UPDATE_COURSE,
        payload: {
            course: course,
            param: param
        }
    };
};

export const deleteCourse = (id, param) => {
    return {
        type: DELETE_COURSE,
        payload: {
            id: id,
            param: param
        }
    };
};
