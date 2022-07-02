import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = () => (
    <div className="gx-main-content-wrapper">
        <Switch>
            <Route exact path="/home" component={asyncComponent(() => import('./landingPage'))}/>
            <Route path="/home/schedule" component={asyncComponent(() => import('./schedulePage'))}/>
            <Route path="/home/document" component={asyncComponent(() => import('./documentPage'))}/>
            <Route path="/home/exam_schedule" component={asyncComponent(() => import('./examSchedulePage'))}/>
			<Route path="/home/muster" component={asyncComponent(() => import('./musterPage'))}/>
            <Route path="/home/register" component={asyncComponent(() => import('./registerPage'))}/>
        </Switch>
    </div>
);

export default App;
