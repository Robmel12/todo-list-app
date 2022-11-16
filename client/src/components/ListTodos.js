import React, { useEffect, useState } from "react";
import { EditTodo } from "./EditTodo";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);
  const [editMode, setEditMode] = useState({
    show: false,
    targetID: null,
    description: "",
  });
  const [deleteMode, setDeleteMode] = useState({
    show: false,
    targetID: null,
  })

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  //Handle edit click
  const handleEditClick = async (e, id, description) => {
    e.preventDefault();

    try {
      const bodyMessage = { description: description };
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyMessage),
      });
      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  
  };
  // handle Edit Change
  function handleEditChange(value) {
    setEditMode((prev) =>
    ({
      ...prev,
      description: value
    }))
    
  }
  //handle Confirm button
const handleConfirmDelete = async (e, id) => { try {
  const response = await fetch(`http://localhost:5000/todos/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  window.location = "/";
} catch (error) {
  console.error(error.message);
} }
  //handle delete
  const handleDeleteButton = async (e, id) => {
    e.preventDefault();
    setDeleteMode({
      show: true,
      targetID: id
    })
    
  };
//handle checkboxChange
   const handleCheckboxChange =  (e) => { 
    const {name, checked} = e.target
    setTodos(prev => (prev.map(item =>{
      if(item.todo_id.toString() === name){
  
        return {...item, status: checked}
      }
      return item
    })))
         
  };
  //handlecheckbox click
  const handleCheckboxClick = async (e) => {
    e.preventDefault()
    const {name, checked} = e.target;
    try {
      const bodyMessage = {"status": checked} ;
      const response = await fetch(`http://localhost:5000/todos/${name}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyMessage),
      });
      console.log(bodyMessage)
    } catch (error) {
      console.error(error.message);
    }
  
  }
  
  //get todos(data)
  useEffect(() => {
    getTodos();
  }, []);

  const SortedTodos = todos.sort((a, b) => {
    return a.todo_id - b.todo_id;
  });
  const TodoList = SortedTodos.map((todo) => (
    <tr key={todo.todo_id}>
      <td>{todo.description}</td>
      <td>
        <input type="checkbox" checked={todo.status} name={todo.todo_id} onClick={e => handleCheckboxClick(e)}onChange={(e) => handleCheckboxChange(e)}/>
      </td>
      <td>
        <EditTodo
          todo={todo}
          setEditMode={setEditMode}
          editMode={editMode}
          index={todos.indexOf(todo)}
        />
      </td>
      <td>
        <button className="btn btn-failure" onClick={(e) => handleDeleteButton(e, todo.todo_id)}>
          Delete
        </button>
      </td>
    </tr>
  ));
 
  return (
    <>
      {editMode.show && (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",}}>
        <div
          style={{
            marginTop: "200px",
            width: "50%",
            height: "50%",
            backgroundColor: "rgba(0, 0, 0, .7)",
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            flexDirection: "column"
          }}
        >
          <h2 style={{color: "white", marginBottom: "20px"}}>Change your todo!</h2>
          <div style={{display: "flex", flexDirection: "row"}}>
          <button className="btn btn-success"
            onClick={(e) =>
              handleEditClick(e, editMode.targetID, editMode.description)
            }
          >
            Confirm
          </button>
          <input
            
            className="form-control"
            onChange={(e) =>
              handleEditChange(e.target.value)
            }
            type="text"
            value={editMode.description}
          ></input>
          </div>
        </div>
        </div>
      )}
      <table
        style={{ width: "100%" }}
        className="table-repsonsive-lg mt5 text-center"
      >
        <thead>
          <tr>
            <th>Todo</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-center">{TodoList}</tbody>
      </table>
    </>
  );
};
export default ListTodos;
