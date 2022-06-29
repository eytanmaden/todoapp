import React, { useContext } from 'react'
import Context from '../context/Context';
import { Col, Container, Button, ListGroup, Card } from "react-bootstrap";
import ToDoList from './ToDoList';
import { useNavigate } from 'react-router-dom';


export default function LandingPage() {
  const { currentUser, setCurrentUser } = useContext(Context); 
  const navigate = useNavigate();

  const handleAddNewToDo = () => {
    navigate("/add-todos");
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
            My To Do List
          </h1>
          <Button variant="success btn-block mt-4 w-100" onClick={handleAddNewToDo}>
            Add New Item To The List
          </Button>
          <ToDoList />
        </Col>
      </Container>
    </>
  );
};

