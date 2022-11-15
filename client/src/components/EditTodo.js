import React from 'react'

export const EditTodo = (props) => {
    const {click} = props.handleClick;
  return (
    <button onClick={click}>Edit</button>
  )
}
