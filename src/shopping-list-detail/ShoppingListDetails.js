import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

const ShoppingListDetails = ({ shoppingList, isOwner, onUpdate, onSwitchRole }) => {
  const [editingName, setEditingName] = useState(false);
  const [editedName, setEditedName] = useState(shoppingList.name);
  const { t } = useTranslation();

  const handleEditName = () => {
    setEditingName(true);
  };

  const handleSaveName = () => {
    setEditingName(false);
    onUpdate({
      ...shoppingList,
      name: editedName,
    });
  };

  return (
    <div>
      <h2>
        {editingName ? (
          <>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <Button variant="secondary" onClick={handleSaveName}>{t('saveName')}</Button>
          </>
        ) : (
          <>
            {shoppingList.name}
            {isOwner && (
              <Button variant="info" onClick={handleEditName}>{t('editName')}</Button>
            )}
          </>
        )}
      </h2>
      <p>{isOwner ? `${t('owner')}: ${shoppingList.owner}` : `${t('member')}: ${shoppingList.members.join(', ')}`}</p>
      <Button variant="secondary" onClick={onSwitchRole}>{t('switchRole')}</Button>
    </div>
  );
};

export default ShoppingListDetails;