import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar, NavbarBrand, Nav, NavLink } from "react-bootstrap";
import { authenticate, logoutUser } from "../../actions/auth-actions";

class Header extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);
  }

  componentDidMount() {
    this.props.authenticate();
  }

  logout() {
    console.log("prorp");
    this.props.logoutUser();
  }

  getAuthLink() {
    switch (this.props.authReducer.loggedIn) {
      case true:
        return (
          <NavLink className="float-right" onClick={(e) => this.logout()}>
            Logout
          </NavLink>
        );
      default:
        return (
          <NavLink className="float-right" href="/login">
            Login
          </NavLink>
        );
    }
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark" className="justify-content-center">
        <NavbarBrand href="/">Realtime Codeeditor</NavbarBrand>
        <Nav className="mr-auto">{this.getAuthLink()}</Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("auth", state);
  return {
    authReducer: state.authReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: () => dispatch(authenticate()),
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
