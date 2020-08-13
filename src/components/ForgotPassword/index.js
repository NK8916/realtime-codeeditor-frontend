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

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = { email: "" };
    this.email = this.email.bind(this);
    this.verify = this.verify.bind(this);
  }
  email(event) {
    this.setState({ email: event.target.value });
  }
  async verify() {
    try {
      await axios.post("http://localhost:8000/forgot-password", this.state);
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    return (
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md="auto" className="col-centered">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Forgot Password</Card.Title>

                <InputGroup className="mb-3">
                  <FormControl
                    value={this.state.email}
                    type="email"
                    onChange={this.email}
                    placeholder="Work Email"
                  ></FormControl>
                </InputGroup>
              </Card.Body>
              <Card.Footer>
                <Button onClick={this.verify} variant="primary">
                  Verify
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ForgotPassword;
