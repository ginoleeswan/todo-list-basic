import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';

export default function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  })

  function handleChange(e){
    setInput(e.target.value);
  }

  function handleSubmit(e) {
      e.preventDefault();

      props.onSubmit({
          id: uuidv4(),
          text: input,
          complete: false
      })

      setInput('')
  }

  
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
        {props.edit ? ( 
            <>
            <input 
                type="text" 
                placeholder='Update task' 
                value={input}
                name="text"
                className="todo-input edit"
                onChange={handleChange}
                ref={inputRef}
            />
            <button className='todo-button edit'>Update</button>
            </>
        ) : (
            <>
            <input 
                type="text" 
                placeholder='Enter task' 
                value={input}
                name="text"
                className="todo-input"
                onChange={handleChange}
                ref={inputRef}
            />
            <button className='todo-button'>Add</button>
            </>
        ) }
    </form>
  )
}

