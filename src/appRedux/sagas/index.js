import {all} from "redux-saga/effects";
import authSagas from "./Auth";
import memberSagas from "./Member"

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    memberSagas(),
  ]);
}
