import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Button, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';

export default function ToDoCard(props) {
  const { currentUser, setCurrentUser, setCurrentTodo } = useContext(Context);
  const navigate = useNavigate();
  const { todos } = currentUser;
  const { todo, index } = props;
  const [isDone, setIsDone] = useState(todo.isDone);

  const handleIsDone = () => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const dateString = `${day}/${month}/${year}`;

    setIsDone(!isDone);
    const newItem = {
      title: todo.title,
      content: todo.content,
      id: todo.id,
      isDone: !todo.isDone,
      lastUpdated: dateString
    };

    const user = { ...currentUser };
    const foundIndex = todos.findIndex((item) => item.id === todo.id);
    todos[foundIndex] = newItem;
    user.todos = todos;
    setCurrentUser(user);

    const url = "http://todoappeytan.herokuapp.com/api/todo/add";
    const body = user;

    axios.post(url, body).catch((error) => console.log(error));

  }

  const handleDeleteToDo = () => {

    const user = { ...currentUser };
    const todosAfterDelete = todos.filter(item => item.id !== todo.id );
    user.todos = todosAfterDelete;
    setCurrentUser(user);

    const url = "http://todoappeytan.herokuapp.com/api/todo/add";
    const body = user;

    axios.post(url, body).catch((error) => console.log(error));

  };


  const handleEditTodo = () => {
    setCurrentTodo(todo);
    navigate('/edit-todos')
  }

  return (
    <Draggable key={todo.id} draggableId={todo.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card style={{ width: "100%", margin: "2rem 0" }}>
            <Card.Body>
              <Card.Title>{`${todo.title} - (last updated ${todo.lastUpdated})`}</Card.Title>
              <Card.Text className="overflow-auto" style={{ height: "3rem" }}>
                {todo.content}
              </Card.Text>
              <div>
                <Button
                  variant="success"
                  onClick={handleEditTodo}
                  className="me-3"
                >
                  <i className="bi bi-pencil-square"></i>
                </Button>
                <Button
                  variant="danger"
                  className="me-3"
                  onClick={handleDeleteToDo}
                >
                  <i className="bi bi-trash"></i>
                </Button>
                {isDone ? (
                  <Button
                    className="btn btn-primary me-3"
                    onClick={handleIsDone}
                  >
                    DONE
                  </Button>
                ) : (
                  <Button
                    variant="white"
                    className="btn btn-outline-primary"
                    onClick={handleIsDone}
                  >
                    DONE
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </Draggable>
  );
}
