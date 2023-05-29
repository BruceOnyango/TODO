import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import Header from "./components/Header/Header";
import InputItem from "./components/InputItem/InputItem";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
        
          <Route path="/" component={InputItem} />
        </Switch>
      </Router>
    );
  }
}



