import React, { useState } from 'react';
import './Home.css';
import Expense from '../Expense/AddExpense'; // Import Expense component
import ExpenseList from '../Expense/ShowExpense';
import Dashboard from '../Expense/Dashboard';

const Home = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showExpenseList, setShowExpenseList] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true); // Default to show the Dashboard


  const toggleExpenseForm = () => {
    setShowExpenseForm(true);
    setShowExpenseList(false);
    setShowDashboard(false);
  };

  const toggleExpenseList = () => {
    setShowExpenseList(true);
    setShowExpenseForm(false);
    setShowDashboard(false);
  };

  const showHome = () => {
    setShowDashboard(true);
    setShowExpenseForm(false);
    setShowExpenseList(false);
  };
  return (
    <div className="home-container">
      <div className="sidebar">
      <div className="sidebar-item" onClick={showHome}>
          <i className="fas fa-home"></i>
          <span>Home</span>
        </div>
        <div className="sidebar-item" onClick={toggleExpenseForm}>
          <i className="fas fa-plus"></i>
          <span>Add Expense</span>
        </div>
        
        <div className="sidebar-item" onClick={toggleExpenseList}>
          <i className="fas fa-eye"></i>
          <span>Show</span>
        </div>
      </div>
      <div className="main-content">
        <h1>Welcome to the Expense Tracker App</h1>
        <p>Select an option from the sidebar to get started.</p>
        {showExpenseForm && <Expense />}
        {showExpenseList && <ExpenseList />} 
        {showDashboard && <Dashboard/>}
      </div>
    </div>
  );
};

export default Home;
