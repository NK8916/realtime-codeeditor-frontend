import React, { Component } from "react";
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
  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md="auto" className="col-centered">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Join</Card.Title>
                <InputGroup className="mb-3">
                  <FormControl placeholder="Email"></FormControl>
                </InputGroup>

                <InputGroup>
                  <FormControl placeholder="Organisation"></FormControl>
                </InputGroup>
              </Card.Body>
              <Card.Footer>
                <Button variant="primary">Join</Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
