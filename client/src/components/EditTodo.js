import React from 'react'

export const EditTodo = (props) => {
    const {todo, setEditMode, editMode} = props;
    const handleEditModeClick = (e, id, descript) => { e.preventDefault();
    setEditMode(({
      targetID: id,
      show: true,
      description: descript
      
    }) )
    
  }
  return (<>
     <button className='btn btn-success' onClick={e => handleEditModeClick(e, todo.todo_id, todo.description)}>edit</button>
    </>
  )
}
