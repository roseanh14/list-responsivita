import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Breadcrumb, Dropdown } from 'react-bootstrap';
import TilesPage from './tiles-example/TilesPage';
import ShoppingList from './shopping-list-detail/ShoppingList';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './i18n';

const LanguageContext = createContext();

const App = () => {
  const { t } = useTranslation();

  const [shoppingList, setShoppingList] = useState({
    id: 'some-id',
    name: 'Groceries',
    items: [],
    owner: 'John',
    members: ['Jane'],
  });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleToggleDarkMode = () => {
    setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage, handleLanguageChange }}>
      <I18nextProvider i18n={i18n} initialLanguage={selectedLanguage}>
        <Router>
          <div
            className="d-flex flex-column min-vh-100"
            style={{
              background: isDarkMode ? '#333' : '#fff',
              color: isDarkMode ? '#fff' : '#000',
              transition: 'background 0.3s ease',
              overflowX: 'hidden',
            }}
          >
            <div className="container-fluid">
              <div className="row justify-content-between align-items-center p-3">
                <div className="col-md-8 col-lg-6">
                  <h2 style={{ fontSize: '1.8rem' }}>{t('shoppingList')}</h2>
                  <Breadcrumb style={{ fontSize: '1.2rem' }}>
                    <Breadcrumb.Item href="/">{t('home')}</Breadcrumb.Item>
                    <Breadcrumb.Item href="/tiles">{t('tiles')}</Breadcrumb.Item>
                  </Breadcrumb>
                </div>

                <div className="col-md-4 col-lg-6 d-flex justify-content-end">
                  <button className="btn btn-light" onClick={handleToggleDarkMode}>
                    {isDarkMode ? t('lightMode') : t('darkMode')}
                  </button>

                  <Dropdown>
                    <Dropdown.Toggle variant="info" id="language-dropdown">
                      {t('selectLanguage')}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleLanguageChange('en')}>
                        {t('english')}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleLanguageChange('cs')}>
                        {t('czech')}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleLanguageChange('de')}>
                        {t('german')}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>

            <Routes>
              <Route path="/tiles" element={<TilesPage />} />
              <Route
                path="/"
                element={
                  shoppingList && (
                    <ShoppingList
                      shoppingList={shoppingList}
                      onUpdate={(updatedList) => setShoppingList(updatedList)}
                    />
                  )
                }
              />
            </Routes>
          </div>
        </Router>
      </I18nextProvider>
    </LanguageContext.Provider>
  );
};

export default App;