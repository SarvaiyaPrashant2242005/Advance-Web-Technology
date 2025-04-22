import React, { useState } from "react";

const ExpenseItem = ({ expense, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
  });

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    onUpdate(expense._id, { ...editForm, amount: parseFloat(editForm.amount) });
    setIsEditing(false);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      {isEditing ? (
        <>
          <input name="title" value={editForm.title} onChange={handleChange} />
          <input name="amount" value={editForm.amount} onChange={handleChange} />
          <input name="category" value={editForm.category} onChange={handleChange} />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <strong>{expense.title}</strong> - ₹{expense.amount} [{expense.category}]
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <button onClick={() => onDelete(expense._id)}>Delete</button>
    </div>
  );
};

export default ExpenseItem;
