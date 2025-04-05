import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Report = () => {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/expenses/generate_report/');
        setReportData(response.data);
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };

    fetchReportData();
  }, []);

  if (!reportData) {
    return <div>Loading report...</div>;
  }

  return (
    <div className="report">
      <h2>Expense Report</h2>
      <div className="report-summary">
        <p>Budget: ${reportData.budget.toFixed(2)}</p>
        <p>Total Expenses: ${reportData.total_expenses.toFixed(2)}</p>
        <p>Remaining Budget: ${reportData.remaining_budget.toFixed(2)}</p>
      </div>
      <h3>Expenses by Category</h3>
      <ul className="category-list">
        {reportData.expenses_by_category.map((category, index) => (
          <li key={index}>
            {category.category__name || 'Uncategorized'}: ${category.total.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Report;
