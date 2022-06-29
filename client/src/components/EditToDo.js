import axios from "axios";
import React, { useContext, useState } from "react";
import { Col, Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";
import swal from "sweetalert";


export default function EditToDo() {
  const { currentUser, setCurrentUser, currentTodo, setCurrentTodo } = useContext(Context);
  const { todos } = currentUser;
  const [title, setTitle] = useState(currentTodo.title);
  const [content, setContent] = useState(currentTodo.content);
  const [disableButtons, setDisableButtons] = useState(true);

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/todos");
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const dateString = `${day}/${month}/${year}`;


    const newItem = {
      title: title,
      content: content,
      id: currentTodo.id,
      isDone: currentTodo.isDone,
      lastUpdated: dateString
    };


    const user = { ...currentUser };
    const foundIndex = todos.findIndex((item) => item.id === currentTodo.id);
    todos[foundIndex] = newItem;
    user.todos = todos;
    setCurrentUser(user);


    const url = "http://localhost:8000/api/todo/add";
    const body = user;

    axios
      .post(url, body)
      .then(swal("Success!", "You have edited your note!", "success"))
      .catch((error) => console.log(error));

    navigate("/todos");
  };

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
            Edit To Do
          </h1>
          <Form>
            <Form.Group
              className="mb-3 mt-4"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Please enter your new title here</Form.Label>
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
              <Form.Label>Please add your new note here</Form.Label>
              <Form.Control
                onChange={(event) => handleContentChange(event)}
                value={content}
                as="textarea"
                rows={6}
              />
            </Form.Group>
          </Form>

          {currentTodo.title === title && currentTodo.content === content ? (
            <div>
              <Button
                onClick={(event) => handleSubmit(event)}
                variant="success btn-block my-3 w-100"
                type="submit"
                disabled
              >
                Save
              </Button>
              <Button
                variant="danger btn-block my-3 w-100"
                onClick={handleCancel}
              >
                Go back to the main page
              </Button>
            </div>
          ) : (
            <div>
              <Button
                onClick={(event) => handleSubmit(event)}
                variant="success btn-block my-3 w-100"
                type="submit"
              >
                Save
              </Button>
              <Button
                variant="danger btn-block my-3 w-100"
                onClick={handleCancel}
              >
                Discard Changes
              </Button>
            </div>
          )}
        </Col>
      </Container>
    </>
  );
}
