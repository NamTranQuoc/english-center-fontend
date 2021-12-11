import {GET_ALL_CLASS_BY_COURSE, GET_ALL_CLASS_BY_COURSE_SUCCESS,} from '../../constants/ActionTypes'

const INIT_STATE = {
    classByCourseId: []
};

const ClassReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_CLASS_BY_COURSE: {
            return {
                ...state,
                classByCourseId: []
            }
        }
        case GET_ALL_CLASS_BY_COURSE_SUCCESS: {
            return {
                ...state,
                classByCourseId: action.payload,
            }
        }
        default:
            return state;
    }
}

export default ClassReducer;
