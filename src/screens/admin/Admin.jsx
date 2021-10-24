import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Dashboard from "../dashboard/Dashboard";
import ManagerStudents from "./student/ManagerStudents";
import {Route, Switch} from "react-router-dom";
import ManagerReceptionist from "./receptionist/ManagerReceptionist";
import ManagerTeacher from "./teacher/ManagerTeacher";
import ManagerCourse from "./course/ManagerCourse";
import ManagerCategoryCourse from "./category.course/ManagerCategoryCourse";

function Admin() {
    return (
        <div>
            <Navbar/>
            <Switch>
                <Route exact path="/admin/dashboard" component={Dashboard} />
                <Route exact path="/admin/student" component={ManagerStudents} />
                <Route exact path="/admin/receptionist" component={ManagerReceptionist} />
                <Route exact path="/admin/teacher" component={ManagerTeacher} />
                <Route exact path="/admin/category/course" component={ManagerCategoryCourse} />
                <Route exact path="/admin/course" component={ManagerCourse} />
            </Switch>
        </div>
    );
}

export default Admin;
