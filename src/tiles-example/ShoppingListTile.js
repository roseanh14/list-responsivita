import React from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { useTranslation } from 'react-i18next';

const ShoppingListTile = ({ shoppingList, isJohnOwner, handleRemoveShoppingList }) => {
  const tileStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px',
    width: '300px',
    backgroundColor: isJohnOwner ? '#b3d9ff' : '#c2f0c2',
  };

  const { t } = useTranslation();

  const ownerTextStyle = {
    color: isJohnOwner ? 'blue' : 'green',
  };

  return (
    <div style={tileStyle}>
      <h3 style={ownerTextStyle}>{shoppingList.name}</h3>
      <p style={ownerTextStyle}>
        {isJohnOwner
          ? `${t('owner')}: ${shoppingList.owner}`
          : `${t('member')}: ${shoppingList.members.join(', ')}`}
      </p>
      <ul>
        {shoppingList.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <Badge bg="info">{t('itemCount')}: {shoppingList.items.length}</Badge>
      <div>
        <Button variant="danger" onClick={() => handleRemoveShoppingList(shoppingList.id)}>
          {t('delete')}
        </Button>
      </div>
    </div>
  );
};

export default ShoppingListTile;