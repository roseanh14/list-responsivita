import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

const ShoppingListMembers = ({ shoppingList, isOwner, onAddMember, onRemoveMember, onUnsubscribe }) => {
  const [newMember, setNewMember] = useState('');

  const { t } = useTranslation(); 


  return (
    <div>
     <input
  type="text"
  value={newMember}
  onChange={(e) => setNewMember(e.target.value)}
  placeholder={t('enterNewMemberName')}
  style={{ fontSize: '17px', width: '360px' }}
/>
<button onClick={() => onAddMember(newMember)}>
  {t('addMember')}
</button>
      <ul>
        {shoppingList.members.map((member) => (
          <li key={member}>
            {member}{' '}
            <Button
  variant={isOwner ? 'danger' : 'warning'}
  onClick={() => (isOwner ? onRemoveMember(member) : onUnsubscribe(member))}
>
  {isOwner ? t('delete') : t('unsubscribe')}
</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingListMembers;