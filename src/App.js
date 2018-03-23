import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import Navbar from "./components/navbar";
import Landing from "./components/landing";
import Dashboard from "./components/dashboard";
import DocViewer from "./components/docviewer";
import SubmissionForm from "./components/submissionform";

export function App(props) {
    if (props.user) return (
        <Router>
            <div className="App">
                <Navbar/>
                <Switch>
                    <Route exact path='/' component={Dashboard}/>
                    <Route path='/dashboard/:activeTab' component={Dashboard}/>
                    <Route exact path='/submit' component={SubmissionForm}/>
                    <Route exact path='/submission/:submissionID' component={DocViewer}/>
                </Switch>
            </div>
        </Router>
    );

    return <Landing/>;
}

const mapStateToProps = state => ({
    user: state.sublitr.user,
    active: state.sublitr.dashboard.activeTab
});

export default connect(mapStateToProps)(App);
