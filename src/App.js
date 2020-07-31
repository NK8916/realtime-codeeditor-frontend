import React from "react";
import { Switch, Route } from "react-router-dom";
import Editor from "./components/editor";
import Home from "./components/Home";
import "./App.css";
import { Header } from "./components/Header/Header";
import Verify from "./components/Verify";

function App() {
  return (
    <main>
      <Header />
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/editor" exact component={Editor}></Route>
        <Route path="/verify" exact component={Verify}></Route>
      </Switch>
    </main>
  );
}

export default App;
