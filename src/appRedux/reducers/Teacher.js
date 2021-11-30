import {
    GET_ALL_TEACHERS_SUCCESS, GET_MEMBER_BY_TYPE_AND_STATUS_SUCCESS,
} from '../../constants/ActionTypes'

const INIT_STATE = {
    teachers: [],
    membersByStatus: []
};

const TeacherReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_TEACHERS_SUCCESS: {
            return {
                ...state,
                teachers: action.payload,
            }
        }
        case GET_MEMBER_BY_TYPE_AND_STATUS_SUCCESS: {
            return {
                ...state,
                membersByStatus: action.payload,
            }
        }
        default:
            return state;
    }
}

export default TeacherReducer;
