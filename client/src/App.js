import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./TodoForm"; // Assuming TodoForm.js is in the same directory as App.js
import "./styles/App.css";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch todos from server on component mount
    axios
      .get("http://localhost:5000/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addTodo = (newTodo) => {
    // Add new todo to the list
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (id) => {
    // Delete todo by id
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      const updatedTodos = todos.filter((todo) => todo._id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>MERN Stack Todo App</h1>
      <TodoForm onAdd={addTodo} />
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.task}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
