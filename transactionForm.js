import React, { useState } from 'react';
import API from '../api';

function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: '',
    type: 'expense'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/transactions', form);
    onAdd(); // refresh transactions
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input type="number" placeholder="Amount" onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} />
      <input placeholder="Category (e.g., food, travel)" onChange={(e) => setForm({ ...form, category: e.target.value })} />
      <select onChange={(e) => setForm({ ...form, type: e.target.value })}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default TransactionForm;
