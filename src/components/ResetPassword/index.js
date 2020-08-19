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

import { resetPassword } from "../../actions/auth-actions";

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
    const data = {
      password: this.state.newPassword,
      email: this.props.location.search.substr(1),
    };

    this.props.resetPassword(data);

    this.props.history.push("/login");
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

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (data) => dispatch(resetPassword(data)),
  };
};

export default connect(null, mapDispatchToProps)(ResetPassword);
