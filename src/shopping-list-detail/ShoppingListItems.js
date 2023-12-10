import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';

const ShoppingListItems = ({ shoppingList, showUncheckedOnly, onUpdate, onToggleShowUncheckedOnly }) => {
  const [newItemText, setNewItemText] = useState('');
  const { t } = useTranslation(); 

  const handleAddItem = () => {
    if (!newItemText) return;

    const updatedList = {
      ...shoppingList,
      items: [...shoppingList.items, { id: uuidv4(), text: newItemText, checked: false }],
    };

    onUpdate(updatedList);
    setNewItemText('');
  };

  const handleRemoveItem = (itemId) => {
    const updatedList = {
      ...shoppingList,
      items: shoppingList.items.filter((item) => item.id !== itemId),
    };

    onUpdate(updatedList);
  };

  const handleToggleChecked = (itemId) => {
    const updatedList = {
      ...shoppingList,
      items: shoppingList.items.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      ),
    };

    onUpdate(updatedList);
  };

  return (
    <div>
      <ul>
        {showUncheckedOnly
          ? shoppingList.items
              .filter((item) => !item.checked)
              .map((item) => (
                <li key={item.id}>
                  <span style={{ textDecoration: item.checked ? 'line-through' : 'none' }}>
                    {item.text}
                  </span>{' '}
                  <button onClick={() => handleToggleChecked(item.id)}>
                    {item.checked ? 'Unchecked' : 'Checked'}
                  </button>{' '}
                  <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                </li>
              ))
          : shoppingList.items.map((item) => (
            <li key={item.id}>
            <span
              style={{ textDecoration: item.checked ? 'line-through' : 'none', cursor: 'pointer' }}
              onClick={() => handleToggleChecked(item.id)}
            >
              {item.text}
            </span>{' '}
            <button onClick={() => handleToggleChecked(item.id)}>
              {item.checked ? t('unchecked') : t('checked')}
            </button>{' '}
            <button onClick={() => handleRemoveItem(item.id)}>
              {t('remove')}
            </button>
          </li>
            ))}
      </ul>
      <input
        type="text"
        value={newItemText}
        onChange={(e) => setNewItemText(e.target.value)}
      />
      <button onClick={handleAddItem}>
  {t('addItem')}
</button>
      <button onClick={onToggleShowUncheckedOnly}>
        {showUncheckedOnly ? t('showAllItems') : t('showUncheckedItemsOnly')}
      </button>
    </div>
  );
};

export default ShoppingListItems;