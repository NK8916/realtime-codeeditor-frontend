import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { forgotPassword } from "../../actions/auth-actions";

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = { email: "", show: false };
    this.email = this.email.bind(this);
    this.verify = this.verify.bind(this);
  }

  email(event) {
    this.setState({ email: event.target.value });
  }
  async verify() {
    this.props.forgotPassword(this.state);
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
                    placeholder="Enter Your Email"
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

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (data) => dispatch(forgotPassword(data)),
  };
};

export default connect(null, mapDispatchToProps)(ForgotPassword);
