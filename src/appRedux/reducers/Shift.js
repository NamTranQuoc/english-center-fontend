import {GET_ALL_SHIFT, GET_ALL_SHIFT_SUCCESS,} from '../../constants/ActionTypes'

const INIT_STATE = {
    shifts: []
};

const ShiftReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_SHIFT: {
            return {
                ...state,
                shifts: []
            }
        }
        case GET_ALL_SHIFT_SUCCESS: {
            return {
                ...state,
                shifts: action.payload,
            }
        }
        default:
            return state;
    }
}

export default ShiftReducer;
