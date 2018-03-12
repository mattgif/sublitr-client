import React, { Component } from 'react';
import './App.css';
import Navbar from "./components/navbar";
import Landing from "./components/landing";
import Dashboard from "./components/dashboard";

class App extends Component {

    render() {
        {if (this.props.user) {
            return (
                <div className="App">
                    <Navbar/>
                    <Dashboard user={this.props.user}/>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <Navbar/>
                    <Landing/>
                </div>
            );
        }}
    }
}

App.defaultProps = {
    user: {first: 'Ima', last: 'Maginary'}
};

export default App;
