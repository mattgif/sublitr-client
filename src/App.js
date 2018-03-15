import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import Navbar from "./components/navbar";
import Landing from "./components/landing";
import Dashboard from "./components/dashboard";
import DocViewer from "./components/docviewer";
import SubmissionForm from "./components/submissionform";
import ModalWrapper from "./components/modalwrapper";

export function App(props) {
    if (props.user) return (
        <Router>
            <div className="App">
                <ModalWrapper />
                <Navbar/>
                <Route exact path='/' render={() => (<Dashboard />)}/>
                <Route exact path='/submit' component={SubmissionForm}/>
                <Route exact path='/submission/:submissionID' component={DocViewer}/>
            </div>
        </Router>
    );

    return <Landing/>;
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(App);
