import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import ProfessorDashboard from "../components/ProfessorDashboard";
import Recommendations from "../components/Recommendations";
import Enrollments from "../components/Enrollments";
import Courses from "../components/Courses";
import history from "./history";

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Courses} />
                    <Route path="/Recommendations" component={Recommendations} />
                    <Route path="/Enrollments" component={Enrollments} />
                </Switch>
            </Router>
        )
    }
}