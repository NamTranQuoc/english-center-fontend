import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "../../util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route exact path={`${match.url}admin/dashboard`} component={asyncComponent(() => import('./dashboard'))}/>
      <Route exact path={`${match.url}admin/student`} component={asyncComponent(() => import('./userPage/studentPage'))}/>
      <Route exact path={`${match.url}admin/teacher`} component={asyncComponent(() => import('./userPage/teacherPage'))}/>
      <Route exact path={`${match.url}admin/receptionist`} component={asyncComponent(() => import('./userPage/receptionistPage'))}/>
      <Route exact path={`${match.url}admin/course-category`} component={asyncComponent(() => import('./studyPage/courseCategoryPage'))}/>
      <Route exact path={`${match.url}admin/course`} component={asyncComponent(() => import('./studyPage/coursePage'))}/>
    </Switch>
  </div>
);

export default App;
