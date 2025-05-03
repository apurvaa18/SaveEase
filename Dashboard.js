import React, { useEffect, useState } from 'react';
import API from '../api';
import TransactionForm from '../components/TransactionForm';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const res = await API.get('/transactions');
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const total = transactions.reduce((acc, t) => {
    return t.type === 'income' ? acc + t.amount : acc - t.amount;
  }, 0);

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Total Balance: ₹{total}</h3>
      <TransactionForm onAdd={fetchTransactions} />
      <ul>
        {transactions.map((t) => (
          <li key={t._id}>
            {t.title} - ₹{t.amount} [{t.category}] ({t.type})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
