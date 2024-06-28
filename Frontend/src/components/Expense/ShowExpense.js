import React, { useEffect, useState } from 'react';
import './ExpenseList.css';
import axios from 'axios';

const ShowExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [updatedCategory, setUpdatedCategory] = useState('');
  const [updatedAmount, setUpdatedAmount] = useState('');
  const [updatedComments, setUpdatedComments] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const userId = localStorage.getItem('currentUserId');

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/expense/delete/${id}`)
      .then((res) => {
        alert("Expense deleted successfully");
        // After successful deletion, update the expenses list
        setExpenses(expenses.filter(expense => expense.id !== id));
      })
      .catch((error) => {
        alert(`Failed to delete expense: ${error}`);
      });
  };

  const handleUpdate = () => {
    // Implement update logic here
    if (!selectedExpense) {
      return;
    }

    const updatedExpense = {
      ...selectedExpense,
      category: updatedCategory,
      amount: updatedAmount,
      comments: updatedComments,
      updatedAt: new Date().toISOString()
    };

    axios.put(`http://localhost:8080/expense/update/${selectedExpense.id}`, updatedExpense)
      .then((res) => {
        alert("Expense updated successfully");
        // Update the expenses list with the updated expense
        const updatedExpenses = expenses.map(expense =>
          expense.id === selectedExpense.id ? updatedExpense : expense
        );
        setExpenses(updatedExpenses);
        closeUpdateModal();
      })
      .catch((error) => {
        alert(`Failed to update expense: ${error}`);
      });
  };

  const openUpdateModal = (expense) => {
    setSelectedExpense(expense);
    setUpdatedCategory(expense.category);
    setUpdatedAmount(expense.amount);
    setUpdatedComments(expense.comments);
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedExpense(null);
    setUpdatedCategory('');
    setUpdatedAmount('');
    setUpdatedComments('');
  };

  useEffect(() => {
    // Fetch expenses from API on component mount
    axios.get(`http://localhost:8080/expense/getexpense/${userId}`)
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }, [userId]); // Trigger effect when userId changes or component mounts

  // Sort expenses based on sortField and sortOrder
  const sortedExpenses = [...expenses].sort((a, b) => {
    if (!sortField) return 0;
    if (sortOrder === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  // Filter expenses based on searchTerm
  const filteredExpenses = sortedExpenses.filter(expense =>
    expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.comments.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="expense-list-container">
      <h2>Expense List</h2>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by category or comments"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Sort Dropdown */}
      <select onChange={(e) => setSortField(e.target.value)} value={sortField}>
        <option value="">Sort by</option>
        <option value="category">Category</option>
        <option value="amount">Amount</option>
        <option value="createdAt">Created At</option>
        <option value="updatedAt">Updated At</option>
      </select>
      
      {/* Sort Order Toggle */}
      <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        {sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
      </button>

      <table className="expense-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Comments</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.category}</td>
              <td>{expense.amount}</td>
              <td>{new Date(expense.createdAt).toLocaleString()}</td>
              <td>{new Date(expense.updatedAt).toLocaleString()}</td>
              <td>{expense.comments}</td>
              <td><button onClick={() => openUpdateModal(expense)}>Update</button></td>
              <td><button onClick={() => handleDelete(expense.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Update Expense</h3>
            <form>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <input
                  type="text"
                  id="category"
                  value={updatedCategory}
                  onChange={(e) => setUpdatedCategory(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount:</label>
                <input
                  type="number"
                  id="amount"
                  value={updatedAmount}
                  onChange={(e) => setUpdatedAmount(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="comments">Comments:</label>
                <textarea
                  id="comments"
                  value={updatedComments}
                  onChange={(e) => setUpdatedComments(e.target.value)}
                />
              </div>
              <div className="modal-buttons">
                <button type="button" onClick={handleUpdate}>Update</button>
                <button type="button" onClick={closeUpdateModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowExpense;
