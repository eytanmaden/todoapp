import { createContext } from "react";

const Context = createContext({
    currentUser: {},
    setCurrentUser: () => {},
    currentTodo: {},
    setCurrentTodo: () => {} 
})

export default Context;