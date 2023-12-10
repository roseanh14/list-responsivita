import React, { useState, useEffect } from 'react';
import ShoppingListTile from '../tiles-example/ShoppingListTile';
import AddShoppingList from '../tiles-example/AddShoppingList';
import Calls from '../server/calls';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';

const TilesPage = () => {
  const { t } = useTranslation();
  const [shoppingLists, setShoppingLists] = useState([]);
  const [archivedVisible, setArchivedVisible] = useState(false);
  const [isJohnOwner, setIsJohnOwner] = useState(true);
  const [loading, setLoading] = useState(true);
  const [newShoppingList, setNewShoppingList] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const toggleArchivedVisibility = () => {
    setArchivedVisible(!archivedVisible);
  };

  const switchRoleButtonStyle = {
    marginLeft: '16px',
  };


  const handleAddShoppingList = async (name, items) => {
    const newShoppingListData = {
      id: shoppingLists.length + 1,
      name: name,
      items: items,
      archived: false,
      owner: 'John',
      members: ['Jane'],
    };

    try {
      setLoading(true);

      await Calls.addShoppingList(newShoppingListData);

      const response = await Calls.loadShoppingLists();

      if (response && Array.isArray(response.data)) {
        setShoppingLists(response.data);
      } else {
        console.error('Invalid data format:', response);
      }
    } catch (error) {
      console.error('Error adding shopping list:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveShoppingList = async (shoppingListId) => {
    const shoppingListToRemove = shoppingLists.find(
      (list) => list.id === shoppingListId
    );

    try {
      setLoading(true);

      if (!shoppingListToRemove) {
        alert(t('shoppingListNotFound'));
        return;
      }

      const currentUser = isJohnOwner ? 'John' : 'Jane';

      if (shoppingListToRemove.owner !== currentUser) {
        alert(t('deletePermissionError', { owner: shoppingListToRemove.owner }));
        return;
      }

      await Calls.deleteShoppingList(shoppingListId);

      const response = await Calls.loadShoppingLists();

      console.log('Received data after removing:', response);

      if (response && Array.isArray(response.data)) {
        setShoppingLists(response.data);
      } else {
        console.error('Invalid data format after removing:', response);
      }
    } catch (error) {
      console.error('Error deleting shopping list:', error.message);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await Calls.loadShoppingLists();

        console.log('Received data on mount:', response);

        if (response && Array.isArray(response.data)) {
          setShoppingLists(response.data);
        } else {
          console.error('Invalid data format on mount:', response);
        }
      } catch (error) {
        console.error('Error loading shopping lists:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSwitchRole = () => {
    setIsJohnOwner((prevIsJohnOwner) => !prevIsJohnOwner);
  };

  const handleCreateShoppingList = () => {
    setShowCreateModal(true);
    setNewShoppingList({
      id: shoppingLists.length + 1,
      name: '',
      items: [],
      archived: false,
      owner: 'John',
      members: ['Jane'],
    });
  };

  const handleCancelCreateShoppingList = () => {
    setShowCreateModal(false);
    setNewShoppingList(null);
  };

  const handleSaveShoppingList = () => {
    if (newShoppingList && newShoppingList.name && newShoppingList.items) {
      if (newShoppingList.name.trim() !== '' && newShoppingList.items.length > 0) {
        handleAddShoppingList(newShoppingList.name, newShoppingList.items);
        setShowCreateModal(false);
        setNewShoppingList(null);
      } else {
        alert('Please enter a name and at least one item for the shopping list.');
      }
    } else {
      alert('Invalid shopping list data.'); 
    }
  };
  return (
    <div>
      <h2>{t('tilesPage')}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Button variant="primary" onClick={toggleArchivedVisibility}>
            {archivedVisible ? t('hideArchived') : t('showArchived')}
          </Button>
        </div>
        <div>
        <Button variant="success" onClick={handleCreateShoppingList}>
  {t('createList')}
</Button>
        </div>
        <div>
          <Button variant="secondary" onClick={handleSwitchRole} style={switchRoleButtonStyle}>
            {t('switchRole')}
          </Button>
        </div>
      </div>
      {loading && <p>{t('loading')}</p>}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {shoppingLists
          .filter((shoppingList) => (archivedVisible ? shoppingList.archived : true))
          .map((shoppingList) => (
            <ShoppingListTile
              key={shoppingList.id}
              shoppingList={shoppingList}
              isJohnOwner={isJohnOwner}
              handleRemoveShoppingList={handleRemoveShoppingList}
            />
          ))}
        <Modal show={showCreateModal} onHide={handleCancelCreateShoppingList}>
          <Modal.Header closeButton>
          <Modal.Title>{t('createShoppingList')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddShoppingList
              handleAddShoppingList={(name, items) => setNewShoppingList({ ...newShoppingList, name, items })}
              onCancel={handleCancelCreateShoppingList}
            />
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelCreateShoppingList}>
  {t('cancel')}
</Button>
<Button variant="success" onClick={handleSaveShoppingList}>
  {t('save')}
</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default TilesPage;