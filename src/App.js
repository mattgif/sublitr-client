import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import Navbar from "./components/navbar/index";
import Landing from "./components/landing";
import Dashboard from "./components/dashboard/dashboard";
import DocViewer from "./components/document-viewer/docviewer";
import SubmissionForm from "./components/forms/submission-form/submissionform";

export class App extends React.Component {
    componentDidMount() {

    }
    render() {
        if (this.props.user) return (
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
}

const mapStateToProps = state => ({
    user: state.auth.currentUser,
    active: state.sublitr.dashboard.activeTab
});

export default connect(mapStateToProps)(App);
