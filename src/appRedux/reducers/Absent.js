import {GET_CLASS_ABSENT_SUCCESS,} from '../../constants/ActionTypes'

const INIT_STATE = {
    classAbsent: []
};

const AbsentReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_CLASS_ABSENT_SUCCESS: {
            return {
                ...state,
                classAbsent: action.payload,
            }
        }
        default:
            return state;
    }
}

export default AbsentReducer;
