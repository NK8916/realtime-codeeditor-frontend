import React, { useState, Component } from "react";
import { Switch, Route } from "react-router-dom";
import Editor from "./components/editor";
import Home from "./components/Home";
import "./App.css";
import { Header } from "./components/Header";
import Verify from "./components/Verify";
import Login from "./components/Login";

class App extends Component {
  render() {
    return (
      <main>
        <Header />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/editor" exact component={Editor}></Route>
          <Route path="/verify" exact component={Verify}></Route>
          <Route path="/login" exact component={Login}></Route>
        </Switch>
      </main>
    );
  }
}

export default App;
