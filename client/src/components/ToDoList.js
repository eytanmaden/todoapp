import React, { useContext, useState } from 'react'
import Context from '../context/Context';
import ToDoCard from './ToDoCard';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import axios from 'axios';

export default function ToDoList() {
  const { currentUser, setCurrentUser } = useContext(Context);
  const todos = currentUser?.todos;
  const [orderedTodos, setOrderedTodos] = useState(todos); 
  
  const handleOnDragEnd = (result) => {
    if(!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    currentUser.todos = items;
    const user = { ...currentUser };
    user.todos = items;
    setCurrentUser(user);

    const url = "http://localhost:8000/api/todo/add";
    const body = user;

    axios.post(url, body).catch((error)=>console.log(error));

  } 


  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='todos'>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {todos?.map((item, index) => (
              <ToDoCard key={item.id} todo={item} index={index}/>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
