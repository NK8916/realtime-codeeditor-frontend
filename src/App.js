import React from "react";
import { Switch, Route } from "react-router-dom";
import Editor from "./components/editor";
import Home from "./components/Home";
import "./App.css";
import { Header } from "./components/Header/Header";

function App() {
  return (
    <main>
      <Header />
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/editor" exact component={Editor}></Route>
      </Switch>
    </main>
  );
}

export default App;
