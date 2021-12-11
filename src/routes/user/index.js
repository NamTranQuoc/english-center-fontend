import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = () => (
    <div className="gx-main-content-wrapper">
        <Switch>
            <Route exact path="/home" component={asyncComponent(() => import('./homePage'))}/>
            <Route path="/home/schedule" component={asyncComponent(() => import('./schedulePage'))}/>
            <Route path="/home/document" component={asyncComponent(() => import('./documentPage'))}/>
            <Route path="/home/exam_schedule" component={asyncComponent(() => import('./examSchedulePage'))}/>
        </Switch>
    </div>
);

export default App;
