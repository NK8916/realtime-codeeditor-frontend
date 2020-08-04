import React, { useState, Component } from "react";
import { Switch, Route } from "react-router-dom";
import Editor from "./components/editor";
import Home from "./components/Home";
import "./App.css";
import { Header } from "./components/Header";
import Verify from "./components/Verify";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

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
          <Route
            path="/forgot-password"
            exact
            component={ForgotPassword}
          ></Route>
          <Route path="/reset-password" component={ResetPassword}></Route>
        </Switch>
      </main>
    );
  }
}

export default App;
