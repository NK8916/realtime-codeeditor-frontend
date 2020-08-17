import React, { Component } from "react";
import { v5 } from "uuid";
import { connect } from "react-redux";
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

import { UUID } from "../../config/uuid-config";
import { verify } from "../../actions/auth-actions";

class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = { otp: "" };
    this.otp = this.otp.bind(this);
    this.verify = this.verify.bind(this);
  }
  otp(event) {
    console.log(this.props.location.search.substr(1));
    this.setState({ otp: event.target.value });
  }
  async verify() {
    const data = {
      otp: this.state.otp,
      email: this.props.location.search.substr(1),
    };
    this.props.verify(data);
  }
  render() {
    return this.props.authReducer.loggedIn ? (
      <Redirect
        to={`/editor/${v5(this.props.location.search.substr(1), UUID)}`}
      ></Redirect>
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
                    onChange={this.otp}
                    placeholder="Enter OTP Sent To Your Email !!!"
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

const mapStateToProps = (state) => {
  console.log("auth", state);
  return {
    authReducer: state.authReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verify: (data) => dispatch(verify(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Verify);
