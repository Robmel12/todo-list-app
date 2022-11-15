import React, { useEffect, useState } from "react";
import { EditTodo } from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
      
    } catch (error) {
      console.error(error.message);
    }
  };
  //Handle todo edit
  const handleEditClick = async(e, id) => {
    e.preventDefault()
    try {
        const bodyMessage = {"description": "that"};
        const response = await fetch(`http://localhost:5000/todos/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyMessage)}
        );
        window.location ="/";
      } catch (error) {
        console.error(error.message);
      }
  }
  useEffect(() => {
    getTodos();
  }, []);
  
  const TodoList = todos.sort((a, b)=>{return a.todo_id - b.todo_id}).map((todo) => (
    <tr key={todo.todo_id}>
      <td>{todo.description} {todo.todo_id}</td>
      <td>
        <button onClick={e => handleEditClick(e, todo.todo_id)}>Edit</button>
      </td>
      <td>
        {/* <button onClick={handleDeleteClick}>Delete</button> */}
      </td>
    </tr>
  ));

  return (
    <>
      <table
        style={{ width: "100%" }}
        className="table-repsonsive-lg mt5 text-center"
      >
        <thead>
          <tr>
            <th>Description</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-center">
            {TodoList}
            </tbody>
      </table>
    </>
  );
};
export default ListTodos;
