import React, { Component } from "react";
import { v4 } from "uuid";
import Cookies from "js-cookie";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";

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
    try {
      const result = await axios.post("http://localhost:8000/verify", {
        email: this.props.location.search.substr(1),
        otp: this.state.otp,
      });
      console.log(result.data);
      Cookies.set("token", result.data.token);
      this.props.history.push(`/editor/${v4()}`);
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

export default Verify;
