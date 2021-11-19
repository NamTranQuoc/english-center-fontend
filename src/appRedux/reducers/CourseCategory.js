import {GET_ALL_COURSE_CATEGORY, GET_ALL_COURSE_CATEGORY_SUCCESS,} from '../../constants/ActionTypes'

const INIT_STATE = {
    courseCategories: []
};

const CourseCategoryReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_COURSE_CATEGORY: {
            return {
                ...state,
                courseCategories: []
            }
        }
        case GET_ALL_COURSE_CATEGORY_SUCCESS: {
            return {
                ...state,
                courseCategories: action.payload,
            }
        }
        default:
            return state;
    }
}

export default CourseCategoryReducer;
