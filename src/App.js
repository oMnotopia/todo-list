import React, { useState, useRef, useEffect } from 'react';
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';
import './app.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))  
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo() {
    const name = todoNameRef.current.value
    if(name==='') return
    setTodos(prevTodos => {
      return [...prevTodos, { id:uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  } 

  function deleteTodo(idToDelete) {
    const newTodos = todos.filter(todo => !(todo.id===idToDelete))
    setTodos(newTodos)
  }

  function handleClearTodos() {
    const newtodos = todos.filter(todo => !todo.complete)
    setTodos(newtodos)
  }

  return (
    <>
      <h1>The Todo List!</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
      <div className="center">
        <input ref={todoNameRef} type="text" />
      </div>
      <div className="center">
        <button onClick={handleAddTodo}>Add Todo</button>
        <br/>
        <button onClick={handleClearTodos}>Clear Completed Todos</button>
      </div>
      <div className="center"> {todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
