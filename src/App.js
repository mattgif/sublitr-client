import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import Navbar from "./components/navbar/index";
import Landing from "./components/landing-screen/landing";
import Dashboard from "./components/dashboard/dashboard";
import DocViewer from "./components/document-viewer/docviewer";
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import {fetchPublications} from "./actions/publications";

export class App extends React.Component {
    componentDidMount() {
        return this.props.dispatch(fetchPublications());
    }

    

    render() {
        if (this.props.user) {
            return (
                <Router>
                    <div className="App">
                        <Navbar/>
                        <Switch>
                            <Route exact path='/' component={Dashboard}/>
                            <Route path='/dashboard/:activeTab' component={Dashboard}/>
                            <Route exact path='/submission/:submissionID' component={DocViewer}/>
                        </Switch>
                    </div>
                </Router>
            )
        } else if (this.props.loggingIn) {
            return (
                <Segment>
                    <Dimmer active>
                        <Loader>Logging in...</Loader>
                    </Dimmer>

                    <Landing/>
                </Segment>
            )
        }

        return <Landing/>;
    }
}

const mapStateToProps = state => ({
    user: state.auth.currentUser,
    active: state.sublitr.dashboard.activeTab,
    loggingIn: (state.auth.loading && !state.auth.modalOpen)
});

export default connect(mapStateToProps)(App);
