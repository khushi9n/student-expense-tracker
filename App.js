import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CategoryModal from './CategoryModal';
import Report from './Report';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [budget, setBudget] = useState('');
  const [showBudgetForm, setShowBudgetForm] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const fetchBudget = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/budgets/');
      if (response.data.length > 0) {
        setBudget(response.data[0].amount);
        setShowBudgetForm(false);
      }
    } catch (error) {
      console.error('Error fetching budget:', error);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
    fetchBudget();
    fetchCategories();
  }, [fetchBudget]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/expenses/');
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories/');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addExpense = async (e) => {
    e.preventDefault();
    if (description && amount && selectedCategory) {
      try {
        const response = await axios.post('http://localhost:8000/api/expenses/', {
          description,
          amount: parseFloat(amount),
          category_id: selectedCategory
        });
        setExpenses([...expenses, response.data]);
        setDescription('');
        setAmount('');
        setSelectedCategory('');
      } catch (error) {
        console.error('Error adding expense:', error);
      }
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/expenses/${id}/`);
      setExpenses(expenses.filter(expense => expense.id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const formatAmount = (amount) => {
    const parsedAmount = parseFloat(amount);
    return isNaN(parsedAmount) ? '0.00' : parsedAmount.toFixed(2);
  };

  const totalExpenses = expenses.reduce((total, expense) => total + parseFloat(expense.amount || 0), 0);

  const remainingBudget = budget ? parseFloat(budget) - totalExpenses : 0;

  const handleSetBudget = async (e) => {
    e.preventDefault();
    if (budget) {
      try {
        const response = await axios.post('http://localhost:8000/api/budgets/', {
          amount: parseFloat(budget)
        });
        setBudget(response.data.amount);
        setShowBudgetForm(false);
      } catch (error) {
        console.error('Error setting budget:', error);
      }
    }
  };

  const addCategory = async (name, description) => {
    try {
      const response = await axios.post('http://localhost:8000/api/categories/', { name, description });
      setCategories([...categories, response.data]);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const editCategory = async (id, name, description) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/categories/${id}/`, { name, description });
      setCategories(categories.map(category => category.id === id ? response.data : category));
    } catch (error) {
      console.error('Error editing category:', error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/categories/${id}/`);
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="App">
      <h1>Student Expense Tracker</h1>
      {showBudgetForm ? (
        <form onSubmit={handleSetBudget}>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Set your budget"
            step="0.01"
          />
          <button type="submit">Set Budget</button>
        </form>
      ) : (
        <div>
          <h2>Budget: ${formatAmount(budget)}</h2>
          <h2>Remaining Budget: ${formatAmount(remainingBudget)}</h2>
          <button onClick={() => setShowBudgetForm(true)}>Update Budget</button>
        </div>
      )}
      <form onSubmit={addExpense}>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Expense description"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          step="0.01"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Expense</button>
      </form>
      <button onClick={() => setShowCategoryModal(true)}>Manage Categories</button>
      <button onClick={() => setShowReport(!showReport)}>
        {showReport ? 'Hide Report' : 'Show Report'}
      </button>
      <h2>Expense List</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description}: ${formatAmount(expense.amount)}
            {expense.category && ` - Category: ${expense.category.name}`}
            <button onClick={() => deleteExpense(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Total Expenses: ${formatAmount(totalExpenses)}</h2>
      {showCategoryModal && (
        <CategoryModal
          categories={categories}
          onClose={() => setShowCategoryModal(false)}
          onAddCategory={addCategory}
          onEditCategory={editCategory}
          onDeleteCategory={deleteCategory}
        />
      )}
      {showReport && <Report />}
    </div>
  );
}

export default App;
