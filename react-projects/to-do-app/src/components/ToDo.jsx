import React, { useState } from 'react';
import './todo.css'; // Import the CSS file

const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null); 

  const handleAddOrUpdate = () => {
    if (title.trim() === "") return;

    if (editId) {
      setTodos(todos.map(todo => 
        todo.id === editId ? { ...todo, title: title } : todo
      ));
      setEditId(null);
    } else {
      setTodos([...todos, { id: todos.length + 1, title: title, isCompleted: false }]);
    }

    setTitle('');
  };

  const handleEditClick = (id, currentTitle) => {
    setEditId(id);
    setTitle(currentTitle);
  };

  const handleCompleteToggle = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
<>
      <h4 className="todo-title">TODO LIST</h4>

      <div>
        <input 
          type="text" 
          placeholder="Enter todo" 
          value={title} 
          className="todo-input"
          onChange={(e) => setTitle(e.target.value)} 
        />
        <button className="add-btn" onClick={handleAddOrUpdate}>
          {editId ? "Save" : "+"}  
        </button>
      </div>

      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <input
              type="checkbox"
              className="todo-checkbox"
              checked={todo.isCompleted}
              onChange={() => handleCompleteToggle(todo.id)}
            />
            <span style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}>
              {todo.title}
            </span>
            <div className="todo-buttons">
              <button className="edit-btn" onClick={() => handleEditClick(todo.id, todo.title)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ToDo;
