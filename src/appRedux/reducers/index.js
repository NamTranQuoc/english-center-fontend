import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import Member from "./Member";


const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  member: Member,
});

export default reducers;
