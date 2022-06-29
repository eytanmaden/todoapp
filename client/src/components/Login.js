import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Button, Col, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Context from "../context/Context";

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(Context); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    localStorage.clear();
  }, []);

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  function handleLoginSubmit(event) {
    const url = "http://localhost:8000/api/user/login";
    axios
      .post(url, {
        email: email,
        password: password,
      })
      .then((res) => {
        const user = res.data.user;
        localStorage.setItem("token", JSON.stringify(res.data.token));
        setCurrentUser(user);
        navigate("/todos"); 
      })
      .catch((error) => {
        alert("Error: The email and password do not match ");
      });

    event.preventDefault();
    setEmail("");
    setPassword("");
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
            Login
          </h1>
          <Form onSubmit={(event) => handleLoginSubmit(event)}>
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

            <div className="d-flex flex-column justify-content-between align-items-center">
              <Button variant="success btn-block my-3" type="submit">
                Login
              </Button>
              <Link className="text-success" to="/signup">
                Don't have an account yet?
              </Link>
            </div>
          </Form>
        </Col>
      </Container>
    </>
  );
};

export default Login;
