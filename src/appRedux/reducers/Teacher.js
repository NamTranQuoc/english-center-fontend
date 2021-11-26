import {
    GET_ALL_TEACHERS_SUCCESS,
} from '../../constants/ActionTypes'

const INIT_STATE = {
    teachers: []
};

const TeacherReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_TEACHERS_SUCCESS: {
            return {
                ...state,
                teachers: action.payload,
            }
        }
        default:
            return state;
    }
}

export default TeacherReducer;
