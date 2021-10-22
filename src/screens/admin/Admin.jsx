import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Dashboard from "../dashboard/Dashboard";
import ManagerStudents from "./student/ManagerStudents";
import ImageUpload from "../../components/common/ImageUpload";
import {Route, Switch} from "react-router-dom";
import ManagerReceptionist from "./receptionist/ManagerReceptionist";
import ManagerTeacher from "./teacher/ManagerTeacher";

function Admin() {
    return (
        <div>
            <Navbar/>
            <Switch>
                <Route exact path="/admin/dashboard" component={Dashboard} />
                <Route exact path="/admin/abc" component={ImageUpload} />
                <Route exact path="/admin/student" component={ManagerStudents} />
                <Route exact path="/admin/receptionist" component={ManagerReceptionist} />
                <Route exact path="/admin/teacher" component={ManagerTeacher} />
            </Switch>
        </div>
    );
}

export default Admin;
