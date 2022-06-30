import React, { useState } from "react";
import axios from "axios";
import { Button, Col, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Signup = () => {
 
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  function handleVerifyPassword(event) {
    setVerifyPassword(event.target.value);
  }

  function handleSignupSubmit(event) {
    if (password === verifyPassword) {
      const url = "http://todoappeytan.herokuapp.com/api/user/signup";
      axios
        .post(url, {
          email: email,
          password: password,
        })
        .then(() => {
          window.location.pathname = "/";
        })
        .catch((error) => {
          alert(
            "Error: Please make sure your password is more than 6 characters and the e-mail address entered is not used by other users "
          );
        });
    } else {
      alert("passwords do not match");
    }

    event.preventDefault();
    setEmail("");
    setPassword("");
    setVerifyPassword("");
  }

  return (
    <>
      <Container>
        <Col
          lg={5}
          md={6}
          sm={12}
          className="px-5 py-2 m-auto shadow-sm rounded-lg"
        >
          <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
            Signup
          </h1>

          <Form onSubmit={(event) => handleSignupSubmit(event)}>
            <Form.Group className="my-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(event) => handleEmailChange(event)}
                value={email}
              />
            </Form.Group>

            <Form.Group className="my-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(event) => handlePasswordChange(event)}
                value={password}
              />
            </Form.Group>

            <Form.Group className="my-3" controlId="formBasicPassword">
              <Form.Label>Verify Your Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(event) => handleVerifyPassword(event)}
                value={verifyPassword}
              />
            </Form.Group>

            <div className="register-button d-flex flex-column justify-content-between align-items-center">
              <Button variant="success btn-block my-3" type="submit">
                Signup
              </Button>
              <Link className="text-success" to="/">
                Already have an account?
              </Link>
            </div>

          </Form>
        </Col>
      </Container>
    </>
  );
};

export default Signup;
