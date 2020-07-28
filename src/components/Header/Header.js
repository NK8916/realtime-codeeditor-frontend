import React, { Component } from "react";
import openSocket from "socket.io-client";
import { Navbar, NavbarBrand } from "react-bootstrap";
var socket;
class Header extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:8000",
    };

    socket = openSocket(this.state.endpoint);
  }
  render() {
    return (
      <Navbar bg="dark" variant="dark" className="mb-3 justify-content-center">
        <NavbarBrand>Realtime Codeeditor</NavbarBrand>
      </Navbar>
    );
  }
}
export { Header, socket };
