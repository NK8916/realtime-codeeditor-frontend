import React, { Component, useReducer } from "react";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Editor from "./components/editor";
import Home from "./components/Home";
import "./App.css";
import Header from "./components/Header";
import Verify from "./components/Verify";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/editor/:id" exact component={Editor}></Route>
          <Route path="/verify" exact component={Verify}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route
            path="/forgot-password"
            exact
            component={ForgotPassword}
          ></Route>
          <Route path="/reset-password" component={ResetPassword}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
  };
};

export default connect(mapStateToProps)(App);
