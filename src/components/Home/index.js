import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../../actions/auth-actions";
import { Redirect } from "react-router-dom";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  FormControl,
  InputGroup,
} from "react-bootstrap";

import "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "" };
    this.name = this.name.bind(this);
    this.email = this.email.bind(this);
    this.password = this.password.bind(this);
    this.register = this.register.bind(this);
  }

  name(event) {
    this.setState({ name: event.target.value });
  }

  email(event) {
    this.setState({ email: event.target.value });
  }
  password(event) {
    this.setState({ password: event.target.value });
  }

  register() {
    console.log(this.props);
    this.props.register(this.state);
  }
  render() {
    return this.props.authReducer.need_to_verify ? (
      <Redirect to={`/verify`}></Redirect>
    ) : (
      <Container>
        <Row className="justify-content-center">
          <Col md="auto" className="col-centered">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Join</Card.Title>
                <InputGroup className="mb-3">
                  <FormControl
                    value={this.state.name}
                    type="text"
                    onChange={this.name}
                    placeholder="Enter Your Name"
                  ></FormControl>
                </InputGroup>

                <InputGroup className="mb-3">
                  <FormControl
                    value={this.state.email}
                    type="email"
                    onChange={this.email}
                    placeholder="Work Email"
                  ></FormControl>
                </InputGroup>

                <InputGroup>
                  <FormControl
                    value={this.state.password}
                    type="password"
                    onChange={this.password}
                    placeholder="Password"
                  ></FormControl>
                </InputGroup>
              </Card.Body>
              <Card.Footer>
                <Button onClick={this.register} variant="primary">
                  Get Started
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
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
    register: (userData) => dispatch(register(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
