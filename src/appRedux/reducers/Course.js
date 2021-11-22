import {
    GET_ALL_COURSE,
    GET_ALL_COURSE_SUCCESS,
} from '../../constants/ActionTypes'

const INIT_STATE = {
    courses: []
};

const CourseReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_COURSE: {
            return {
                ...state,
                courses: []
            }
        }
        case GET_ALL_COURSE_SUCCESS: {
            return {
                ...state,
                courses: action.payload,
            }
        }
        default:
            return state;
    }
}

export default CourseReducer;
