import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./login/Login";
import Admin from "./admin/Admin";

export default function MainRoute() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/admin">
                    <Admin/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
