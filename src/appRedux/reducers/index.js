import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import GetList from "./GetList";
import Common from "./Common";


const reducers = combineReducers({
    routing: routerReducer,
    settings: Settings,
    common: Common,
    auth: Auth,
    getList: GetList,
});

export default reducers;
