import React, { Component } from "react";
import axios from "axios";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  FormControl,
  InputGroup,
} from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props);
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
    try {
      const result = await axios.post(
        "http://localhost:8000/login",
        this.state,
        { withCredentials: true }
      );
      console.log(result);
      this.props.history.push(`/editor`);
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md="auto" className="col-centered">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Join</Card.Title>

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
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
