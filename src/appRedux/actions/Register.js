import {
    ADD_REGISTER,
    DELETE_REGISTER,
    EXPORT_REGISTER,
    GET_REGISTER,
    UPDATE_REGISTER
} from "../../constants/ActionTypes";


export const getListRegister = (param) => {
    return {
        type: GET_REGISTER,
        payload: param
    };
};

export const addRegister = (param) => {
    return {
        type: ADD_REGISTER,
        payload: param
    };
};

export const updateRegister = (register, param) => {
    return {
        type: UPDATE_REGISTER,
        payload: {
            register: register,
            param: param
        }
    };
};

export const deleteRegister = (id, class_id, param) => {
    return {
        type: DELETE_REGISTER,
        payload: {
            student_id: id,
            class_id: class_id,
            param: param
        }
    };
};

export const exportRegister = (id) => {
    return {
        type: EXPORT_REGISTER,
        payload: { id: id}
    };
};
