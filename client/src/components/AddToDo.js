import React, { useContext, useState } from 'react';
import { Col, Container, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import swal from "sweetalert";



export default function AddToDo() {
  const token = JSON.parse(localStorage.getItem("token"));
  const { currentUser, setCurrentUser } = useContext(Context); 
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCancel = () => {
     navigate("/todos");
  } 

  const handleTitleChange = (event) => {
    setTitle(event.target.value);

  }

  const handleContentChange = (event) => {
    setContent(event.target.value);

  };

  const handleSubmit = (event) => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const dateString = `${day}/${month}/${year}`;

    const uniqueId = uuid();
    const newItem = {
      title: title,
      content: content,
      id: uniqueId,
      isDone: false,
      lastUpdated: dateString,
    };

    const user = {...currentUser};
    user.todos.push(newItem);
    setCurrentUser(user);

    const url = "http://todoappeytan.herokuapp.com/api/todo/add";
    const body = currentUser;

    axios
      .post(url, body)
      .then(swal("Success!", "You have added a new todo!", "success"))
      .catch((error) => console.log(error));


    navigate("/todos");

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
            Add New Item
          </h1>
          <Form >
            <Form.Group
              className="mb-3 mt-4"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Please enter a title for your note</Form.Label>
              <Form.Control
                onChange={(event) => handleTitleChange(event)}
                value={title}
                placeholder="ex. Groceries"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Please add your note here</Form.Label>
              <Form.Control
                onChange={(event) => handleContentChange(event)}
                value={content}
                as="textarea"
                rows={6}
              />
            </Form.Group>
          </Form>
          <Button
            onClick={(event) => handleSubmit(event)}
            variant="success btn-block my-3 w-100"
            type="submit"
          >
            Save
          </Button>
          <Button variant="danger btn-block my-3 w-100" onClick={handleCancel}>
            Cancel
          </Button>
        </Col>
      </Container>
    </>
  );
}
