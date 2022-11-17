import React from 'react'

export const EditTodo = (props) => {
    const {todo, setEditMode, setDeleteMode, setIsComponentVisible} = props;
    const handleEditModeClick = (e, id, descript) => { e.preventDefault();
      setIsComponentVisible(true)
    setEditMode(({
      targetID: id,
      show: true,
      description: descript
      
    }) )
    setDeleteMode(prev => ({
      ...prev,
      show: false
    }))
    
  }
  return (<>
     <button name={todo.todo_id} className='btn btn-success' onClick={e => handleEditModeClick(e, todo.todo_id, todo.description)}>edit</button>
    </>
  )
}
