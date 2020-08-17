import React, { Component } from "react";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { v5 } from "uuid";
import { UUID } from "../../config/uuid-config";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  Modal,
  ModalBody,
} from "react-bootstrap";
import { authenticate, logoutUser } from "../../actions/auth-actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";

class Header extends Component {
  constructor(props) {
    super(props);
    console.log("props", props);
    this.state = { room: "", show: false };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidMount() {
    this.props.authenticate();
  }

  logout() {
    console.log("prorp");
    this.props.logoutUser();
  }

  showModal() {
    console.log("propsswdd", this.props.authReducer.user);
    this.setState({
      room: Cookies.get("room"),
    });
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }
  getAuthLink() {
    switch (this.props.authReducer.loggedIn) {
      case true:
        return (
          <Nav className="mr-auto">
            <NavLink className="float-right" onClick={(e) => this.logout()}>
              Logout
            </NavLink>
            <NavLink onClick={this.showModal}>
              <FontAwesomeIcon icon={faShareAlt} />
            </NavLink>
          </Nav>
        );
      default:
        return (
          <Nav className="mr-auto">
            <NavLink className="float-right" href="/login">
              Login
            </NavLink>
          </Nav>
        );
    }
  }

  render() {
    return (
      <main>
        <Modal show={this.state.show} onHide={this.hideModal}>
          <ModalBody>{`http://localhost:3000/editor/${this.state.room}`}</ModalBody>
        </Modal>
        <Navbar bg="dark" variant="dark" className="justify-content-center">
          <NavbarBrand href="/">Realtime Codeeditor</NavbarBrand>
          {this.getAuthLink()}
        </Navbar>
      </main>
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
