import React, { useState } from 'react';

const CategoryModal = ({ categories, onClose, onAddCategory, onEditCategory, onDeleteCategory }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      onEditCategory(editingCategory.id, name, description);
    } else {
      onAddCategory(name, description);
    }
    setName('');
    setDescription('');
    setEditingCategory(null);
  };

  const handleEdit = (category) => {
    setName(category.name);
    setDescription(category.description);
    setEditingCategory(category);
  };

  const handleDelete = (id) => {
    onDeleteCategory(id);
    if (editingCategory && editingCategory.id === id) {
      setName('');
      setDescription('');
      setEditingCategory(null);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Category description"
          />
          <button type="submit">{editingCategory ? 'Update' : 'Add'}</button>
        </form>
        <h3>Categories</h3>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              {category.name}
              <button onClick={() => handleEdit(category)}>Edit</button>
              <button onClick={() => handleDelete(category.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CategoryModal;
