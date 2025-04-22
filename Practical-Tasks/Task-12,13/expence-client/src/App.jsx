import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:5000/api/expenses");
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async (expense) => {
    const res = await axios.post("http://localhost:5000/api/expenses", expense);
    setExpenses([...expenses, res.data]);
  };

  const updateExpense = async (id, updatedData) => {
    const res = await axios.put(`http://localhost:5000/api/expenses/${id}`, updatedData);
    setExpenses(expenses.map(exp => (exp._id === id ? res.data : exp)));
  };

  const deleteExpense = async (id) => {
    await axios.delete(`http://localhost:5000/api/expenses/${id}`);
    setExpenses(expenses.filter(exp => exp._id !== id));
  };

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <ExpenseForm onAdd={addExpense} />
      <ExpenseList
        expenses={expenses}
        onDelete={deleteExpense}
        onUpdate={updateExpense}
      />
    </div>
  );
}

export default App;
