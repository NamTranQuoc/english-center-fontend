import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import Settings from "./Settings";
import Auth from "./Auth";
import Common from "./Common";
import GetList from "./GetList";
import CourseCategory from "./CourseCategory"
import Shift from "./Shift";


const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    settings: Settings,
    auth: Auth,
    common: Common,
    getList: GetList,
    courseCategory: CourseCategory,
    shift: Shift
});

export default createRootReducer
