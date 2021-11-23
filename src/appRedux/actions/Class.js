import {ADD_CLASS, GET_CLASS, UPDATE_CLASS} from "../../constants/ActionTypes";

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
