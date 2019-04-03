import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SelectSavePage from './pages/SelectSavePage';

export default class App extends Component {
  render() {
    return (
      <div className="App">
          <Router>
            <Route path="/" component={SelectSavePage}/>
          </Router>
      </div>
    );
  }
}
