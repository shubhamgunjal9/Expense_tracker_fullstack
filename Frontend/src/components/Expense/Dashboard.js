import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const userId = localStorage.getItem('currentUserId');

  useEffect(() => {
    axios.get(`http://localhost:8080/expense/getexpense/${userId}`)
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }, [userId]);

  const calculateTotalAmount = () => {
    return expenses.reduce((acc, expense) => acc + expense.amount, 0);
  };

  const calculateCategoryTotals = () => {
    const categoryTotals = {};
    expenses.forEach(expense => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount;
      } else {
        categoryTotals[expense.category] = expense.amount;
      }
    });
    return categoryTotals;
  };

  const calculateCategoryCounts = () => {
    const categoryCounts = {};
    expenses.forEach(expense => {
      if (categoryCounts[expense.category]) {
        categoryCounts[expense.category] += 1;
      } else {
        categoryCounts[expense.category] = 1;
      }
    });
    return categoryCounts;
  };

  const categoryTotals = calculateCategoryTotals();
  const categoryCounts = calculateCategoryCounts();
  const totalAmount = calculateTotalAmount();

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryTotals),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="summary">
        <p>Total Expenses: ${totalAmount}</p>
      </div>
      <div className="chart-container">
        <Bar data={data} />
      </div>
      <div className="grid-container">
        {Object.keys(categoryCounts).map(category => (
          <div className="grid-item" key={category}>
            <h3>{category}</h3>
            <p>Number of Expenses: {categoryCounts[category]}</p>
            <p>Total Amount: ${categoryTotals[category]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
