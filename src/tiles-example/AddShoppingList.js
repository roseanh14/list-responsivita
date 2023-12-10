import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

const AddShoppingList = ({ handleAddShoppingList, onCancel }) => {
  const [newShoppingListName, setNewShoppingListName] = useState('');
  const [newShoppingListItem, setNewShoppingListItem] = useState('');
  const [newShoppingListItems, setNewShoppingListItems] = useState([]);
  const { t } = useTranslation();

  const handleAddItem = () => {
    if (newShoppingListItem.trim() !== '') {
      setNewShoppingListItems([...newShoppingListItems, newShoppingListItem]);
      setNewShoppingListItem('');
    }
  };

  const handleAddList = () => {
    if (newShoppingListName.trim() !== '' && newShoppingListItems.length > 0) {
      handleAddShoppingList(newShoppingListName, newShoppingListItems);
    } else {
      alert(t('enterNameAndItems'));
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newShoppingListName}
        onChange={(e) => setNewShoppingListName(e.target.value)}
        placeholder={t('enterName')}
      />
      <div>
        <textarea
          value={newShoppingListItem}
          onChange={(e) => setNewShoppingListItem(e.target.value)}
          placeholder={t('enterItem')}
        />
        <Button variant="success" onClick={handleAddItem}>
          {t('addItem')}
        </Button>
      </div>
      <ul>
        {newShoppingListItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <Button variant="success" onClick={handleAddList}>
        {t('create')}
      </Button>
    </div>
  );
};

export default AddShoppingList;