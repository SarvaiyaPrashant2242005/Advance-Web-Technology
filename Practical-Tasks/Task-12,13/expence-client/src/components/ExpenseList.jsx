import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses, onDelete, onUpdate }) => {
  return (
    <div>
      {expenses.map((exp) => (
        <ExpenseItem
          key={exp._id}
          expense={exp}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default ExpenseList;
