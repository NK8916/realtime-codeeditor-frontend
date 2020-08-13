import React, { Component } from "react";
import { v5 } from "uuid";
import { connect } from "react-redux";
import { UUID } from "../../config/uuid-config";
import { fetchUser } from "../../actions/auth-actions";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./Login.module.css";

class Login extends Component {
  constructor(props) {
    super(props);
    console.log("login", props);
    this.state = { email: "", password: "" };
    this.email = this.email.bind(this);
    this.password = this.password.bind(this);
    this.login = this.login.bind(this);
  }

  email(event) {
    this.setState({ email: event.target.value });
  }
  password(event) {
    this.setState({ password: event.target.value });
  }

  async login() {
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(data);
    console.log("ststs", this.state);
    this.props.fetchUser(data);
  }
  render() {
    return this.props.authReducer.loggedIn ? (
      <Redirect to={`/editor/${v5(this.state.email, UUID)}`}></Redirect>
    ) : (
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md="auto" className="col-centered">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Login</Card.Title>

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
                <Button onClick={this.login} variant="primary">
                  Get Started
                </Button>
              </Card.Footer>
            </Card>

            <a href="/forgot-password">Forgot Password</a>
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
    fetchUser: (userData) => dispatch(fetchUser(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
