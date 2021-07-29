import React, { useState, useEffect } from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

export default function TodoList() {
    const [todos, setTodos] = useState([]);

 
    function addTodo(todo) {
        if (!todo.text || /^\s*$/.test(todo.text)) return;

        const newTodos = [todo, ...todos];
        setTodos(newTodos);

    }

    function toggleTodo(id) {
            const newTodos = [...todos]
            const todo = newTodos.find(todo => todo.id === id)
            todo.complete = !todo.complete
            setTodos(newTodos);
        }

    function updateTodo(todoID, newValue) {
        if (!newValue.text || /^\s*$/.test(newValue.text)) return
            
        setTodos(prevTodos => prevTodos.map(item => (
            item.id === todoID ? newValue : item)
            ))
            
        }

    function removeTodo(id) {
        const removeArr = [...todos].filter(todo => todo.id !== id)
            
            setTodos(removeArr)
        }

    function handleClearTodos(e) {
        const newTodos = todos.filter(todo => !todo.complete)
        setTodos(newTodos)
    }



    useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)

    }, [])

    useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])
    



    return (
        <div>
            <h1 className="title">Tasks for Today</h1>
            <TodoForm  onSubmit={addTodo} />
            <Todo todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} updateTodo={updateTodo} />
            <br/>
            {todos.length > 0 && <button className="clear-todos-button" onClick={handleClearTodos}>Clear Complete</button> }
            {todos.length > 0 && <p className="todo-counter">{todos.filter(todo => !todo.complete).length} left to do</p> }
            <div className="footer">
                Made By Gino Swanepoel with React <br/>
                © All rights reserved.
            </div>
        </div>
        
    )




}
