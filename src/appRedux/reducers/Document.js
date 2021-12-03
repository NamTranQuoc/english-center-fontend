import {GET_ADVERTISEMENT_SUCCESS,} from '../../constants/ActionTypes'

const INIT_STATE = {
    advertisement: []
};

const DocumentReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ADVERTISEMENT_SUCCESS: {
            return {
                ...state,
                advertisement: action.payload,
            }
        }
        default:
            return state;
    }
}

export default DocumentReducer;
