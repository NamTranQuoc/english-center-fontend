import {
    ADD_SHIFT,
    DELETE_SHIFT,
    GET_SHIFT,
    UPDATE_SHIFT
} from "../../constants/ActionTypes";

export const getListShift = (param) => {
    return {
        type: GET_SHIFT,
        payload: param
    };
};

export const addShift = (param) => {
    return {
        type: ADD_SHIFT,
        payload: param
    };
};

export const updateShift = (shift, param) => {
    return {
        type: UPDATE_SHIFT,
        payload: {
            shift: shift,
            param: param
        }
    };
};

export const deleteShift = (id, param) => {
    return {
        type: DELETE_SHIFT,
        payload: {
            id: id,
            param: param
        }
    };
};
