import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Navbar from "./components/navbar";
import Landing from "./components/landing";
import Dashboard from "./components/dashboard";
import DocViewer from "./components/docviewer";

export default function App(props) {
    if (props.user) return (
        <Router>
            <div className="App">
                <Navbar/>
                <Route exact path='/' render={() => (<Dashboard user={props.user}/>)}/>
                <Route exact path='/submission/:submissionID' component={DocViewer}/>
            </div>
        </Router>
    ); else return (
        <div className="App">
            <Navbar/>
            <Landing/>
        </div>
    );
}

App.defaultProps = {
    user: {first: 'Ima', last: 'Maginary'}
};
