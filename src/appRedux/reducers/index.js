import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import Member from "./Member";
import Common from "./Common";


const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  common: Common,
  auth: Auth,
  member: Member,
});

export default reducers;
