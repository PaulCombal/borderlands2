import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SelectSavePage from './pages/SelectSavePage';
import EditSavePage from "./pages/EditSavePage";

export default class App extends Component {
  render() {
    return (
      <div className="App" style={{marginBottom: 30, fontFamily: 'Asap'}}>
          <Router>
            <Route path="/" exact component={SelectSavePage}/>
            <Route path="/edit" component={EditSavePage}/>
          </Router>
      </div>
    );
  }
}
