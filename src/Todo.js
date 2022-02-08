import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';


export default function Todo({ todo, todos, toggleTodo, deleteTodo }) {
    
    function handleTodoClick() {
        toggleTodo(todo.id)
    }

    function handleDelete(idToDelete) {
        deleteTodo(idToDelete)
    }
  
    return (
    <div className="item">
        <input 
            type="checkbox" 
            checked={todo.complete} 
            onChange={handleTodoClick} 
        />
        <label>{todo.name}</label>
        <FaTrashAlt 
            onClick={() => handleDelete(todo.id)}
            role="button" 
            tabIndex="0" 
        />
    </div>
  );
}
