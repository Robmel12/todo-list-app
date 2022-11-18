import React, { useEffect, useState, useRef } from "react";
import { EditTodo } from "./EditTodo";
import useComponentVisible from "./useComponentVisible";
import "./checkbox.scss"

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

  const DeleteRef = useRef(null);
  const EditRef = useRef(null);
  
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/users.todos");
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
      const bodyMessage = { "description": description };
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
    setDeleteVisible(true)
    setDeleteMode({
      show: true,
      targetID: id
    })
    setEditMode(prev => ({
      ...prev,
      show: false
    }))
    
  };
//handle checkboxChange
   const handleCheckboxChange =  async (e) => { 
    const {name, checked} = e.target
 
      try {
      const bodyMessage = {"status": checked} ;
      const response = await fetch(`http://localhost:5000/todos/${name}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyMessage),
      });
      getTodos()
      
    } catch (error) {
      console.error(error.message);
    }
    };
         
  //get todos(data)
  useEffect(() => {
    getTodos();
  }, []);
//undo delete or edit mode
  useEffect(() => {
    const handleEsc = (event) => {
       if (event.keyCode === 27) {
        setDeleteMode(prev => ({
          ...prev,
          show: false
        }))
        setEditMode(prev => ({
          ...prev,
          show: false
        }))
      }
    };
    window.addEventListener('keydown', handleEsc);
   
    return () => {
      window.removeEventListener('keydown', handleEsc);
     
  }
},[]);

const { isComponentVisible:isEditOn, setIsComponentVisible:setEditVisible } = useComponentVisible(true ,EditRef)
const {isComponentVisible:isDeleteOn, setIsComponentVisible:setDeleteVisible} = useComponentVisible(true, DeleteRef)
useEffect(() => {
  if(!isEditOn && editMode.show ){
    setEditMode(prev =>({
      ...prev,
      show: false
    }))
  }
  if(!isDeleteOn && deleteMode.show){
    setDeleteMode(prev =>({
      ...prev,
      show: false
    }))
  }

 
}, [isEditOn, isDeleteOn])


//sort todos
  const SortedTodos = todos.sort((a, b) => {
    return a.todo_id - b.todo_id;
  });
  //map todos to table
  const TodoList = SortedTodos.map((todo) => (
    <tr key={todo.todo_id}>
      <td style={{marginRight: "20px"}}>{todo.description}</td>
      <td>
        <label class="container"><input  type="checkbox" checked={todo.status} name={todo.todo_id} onChange={(e) => handleCheckboxChange(e)}/> <span class="checkmark"></span></label>
      </td>
      <td>
        <EditTodo
          todo={todo}
          setEditMode={setEditMode}
          editMode={editMode}
          index={todos.indexOf(todo)}
          setDeleteMode={setDeleteMode}
          setIsComponentVisible={setEditVisible}
        
        />
      </td>
      <td>
        <button  name={todo.todo_id} className="btn btn-danger" onClick={(e) => handleDeleteButton(e, todo.todo_id)}>
          Delete
        </button>
      </td>
    </tr>
  ));
 
  return (
    <>
      {editMode.show && (
        <div  style={{
          
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",}}>
        <div ref={EditRef}
          style={{
            marginTop: "200px",
            width: "50%",
            height: "50%",
            backgroundColor: "rgba(0, 0, 0, .7)",
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            borderRadius: "10px",
            flexDirection: "column",
            zIndex: 99
          }}
        >
          <h2 style={{color: "white", marginBottom: "20px"}}>Change your todo!</h2>
          <div style={{display: "flex", flexDirection: "row"}}>
          <button className="btn btn-success"
            onClick={(e) =>
              handleEditClick(e, editMode.targetID, editMode.description)
            }
          >
            Confirm Change
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
      {deleteMode.show && 
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",}}>
      <div ref={DeleteRef} style={{
            marginTop: "200px",
            width: "50%",
            height: "50%",
            backgroundColor: "rgba(0, 0, 0, .7)",
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            flexDirection: "column",
            zIndex: 99
          }}>
        <h2 style={{color: "white"}}>Are you sure you want to delete?</h2>
      <button className="btn btn-danger" onClick={e => handleConfirmDelete(e, deleteMode.targetID)}>Confirm Delete</button></div></div>
      }
      <table
        style={{ width: "100%", display: "flex", flexDirection:'column', justifyContent: 'center', alignItems:"center"}}
        className="table-repsonsive-lg mt5"
      >
        <thead>
          <tr>
            <th >Todo List</th>

          </tr>
        </thead>
        <tbody style={{width: "50%", gap: "30px", marginTop: "50px"}}>{TodoList}</tbody>
      </table>
    </>
  );
};
export default ListTodos;
