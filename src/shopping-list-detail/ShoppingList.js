import React, { useState, useEffect } from 'react';
import ShoppingListDetails from '../shopping-list-detail/ShoppingListDetails';
import ShoppingListMembers from '../shopping-list-detail/ShoppingListMembers';
import ShoppingListItems from '../shopping-list-detail/ShoppingListItems';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShoppingList = ({ shoppingList, onUpdate }) => {
  const [newMember, setNewMember] = useState('');
  const [showUncheckedOnly, setShowUncheckedOnly] = useState(false);
  const [isOwner, setIsOwner] = useState(true);
  const [solvedItemsCount, setSolvedItemsCount] = useState(0);

  useEffect(() => {
    const updateSolvedItemsCount = () => {
      const solvedCount = shoppingList.items.filter((item) => item.checked).length;
      setSolvedItemsCount(solvedCount);
    };

    console.log('ShoppingList component rendered');
    updateSolvedItemsCount();
  }, [shoppingList]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <ShoppingListDetails
        shoppingList={shoppingList}
        isOwner={isOwner}
        onUpdate={onUpdate}
        onSwitchRole={() => setIsOwner((prevIsOwner) => !prevIsOwner)}
      />
      <ShoppingListMembers
        shoppingList={shoppingList}
        isOwner={isOwner}
        newMember={newMember}
        onAddMember={(member) => {
          setNewMember('');
          onUpdate({ ...shoppingList, members: [...shoppingList.members, member] });
        }}
        onRemoveMember={(member) => {
          onUpdate({
            ...shoppingList,
            members: shoppingList.members.filter((m) => m !== member),
          });
        }}
        onUnsubscribe={(member) => {
          onUpdate({
            ...shoppingList,
            members: shoppingList.members.filter((m) => m !== member),
          });
        }}
      />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>Solved Items: {solvedItemsCount}</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {/* Visual representation of solved items */}
          <div style={{ backgroundColor: 'green', height: '20px', width: `${(solvedItemsCount / shoppingList.items.length) * 100}%` }}></div>
          {/* Visual representation of unsolved items */}
          <div style={{ backgroundColor: 'red', height: '20px', width: `${100 - (solvedItemsCount / shoppingList.items.length) * 100}%` }}></div>
        </div>
        <p>Not Solved Items: {shoppingList.items.length - solvedItemsCount}</p>
      </div>
      <ShoppingListItems
        shoppingList={shoppingList}
        showUncheckedOnly={showUncheckedOnly}
        onUpdate={onUpdate}
        onToggleShowUncheckedOnly={() => setShowUncheckedOnly(!showUncheckedOnly)}
      />
    </div>
  );
};



export default ShoppingList;