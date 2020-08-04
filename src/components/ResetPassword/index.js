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

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = { newPassword: "", confirmPassword: "" };
    this.newPassword = this.newPassword.bind(this);
    this.confirmPassword = this.confirmPassword.bind(this);
    this.reset = this.reset.bind(this);
  }
  newPassword(event) {
    this.setState({ newPassword: event.target.value });
  }
  confirmPassword(event) {
    this.setState({ confirmPassword: event.target.value });
  }

  async reset() {
    if (this.state.newPassword === this.state.confirmPassword) {
      try {
        const result = await axios.post(
          "http://localhost:8000/reset-password",
          {
            password: this.state.newPassword,
            email: this.props.location.search.substr(1),
          }
        );
        console.log(result);
        this.props.history.push(`/login`);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Passwords didn't match");
    }
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md="auto" className="col-centered">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Reset Password</Card.Title>

                <InputGroup className="mb-3">
                  <FormControl
                    value={this.state.newPassword}
                    type="password"
                    onChange={this.newPassword}
                    placeholder="New Password"
                  ></FormControl>
                </InputGroup>

                <InputGroup>
                  <FormControl
                    value={this.state.confirmPassword}
                    type="password"
                    onChange={this.confirmPassword}
                    placeholder="Confirm Password"
                  ></FormControl>
                </InputGroup>
              </Card.Body>
              <Card.Footer>
                <Button onClick={this.reset} variant="primary">
                  Reset
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ResetPassword;
