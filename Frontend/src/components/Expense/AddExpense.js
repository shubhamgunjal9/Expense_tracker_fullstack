import React, { useState } from 'react';
import './Expense.css';
import axios from 'axios';

const Expense = () => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [comments, setComments] = useState('');
  
  const categories = [
    'Food',
    'Transportation',
    'Housing',
    'Utilities',
    'Entertainment',
    'Healthcare',
    'Education',
    'Miscellaneous',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('currentUserId')
    const createdAt = new Date();
    const updatedAt = createdAt;
    const expense = {
        "category": category,
        "amount": amount,
        "comments": comments,
        "createdAt": createdAt,
        "updatedAt": updatedAt,
        "user": {
          "id": userId
        }
      };
    axios.post(`http://localhost:8080/expense/save`,expense).then((r)=>{
        alert("saved success");
        console.log(e.Data);
    }).catch((error)=>{
        alert(`not saved : ${error}`);
    })
    console.log('Expense added:', expense);

    // Reset form fields
    setCategory('');
    setAmount('');
    setComments('');
  };

  return (
    <div className="expense-container">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comments">Comments:</label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default Expense;
