import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import aCard from './assets/images/a_card.png';
import sCard from './assets/images/s_card.png';
import bCard from './assets/images/b_card.png';
import Inventory from './Inventory';

function App() {
  const [cards] = useState([
    { image: bCard, name: "카드 B", price: 300 },
    { image: sCard, name: "카드 S", price: 1500 },
    { image: aCard, name: "카드 A", price: 800 },
  ]);

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [currency, setCurrency] = useState(200);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'F1') {
        event.preventDefault();
        setCurrency(99999);
        console.log('치트 활성화: 재화가 99999G로 설정되었습니다.');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const buyCard = (index) => {
    const selectedCard = cards[index];
    if (currency >= selectedCard.price) {
      setCurrency(currency - selectedCard.price);
      setInventory([...inventory, { ...selectedCard, isOpened: false }]);
      setMessage(`${selectedCard.name} 카드팩을 구매했습니다!`);
      setShowMessage(true);
    } else {
      setMessage('재화가 부족합니다.');
      setShowMessage(true);
    }
  };

  const closeMessage = () => {
    setShowMessage(false);
  };

  return (
    <Router>
      <div className="App">
        <div className="background">
          <Routes>
            <Route path="/" element={
              <>
                <div className="header">
                    <div className="currency">보유 재화: {currency} G</div>
                    <Link to="/inventory" className="inventory-button">인벤토리</Link>
                </div>
                <div className="card-container">
                  {cards.map((card, index) => (
                    <div key={index} className="card">
                      <img src={card.image} alt={`Card ${index + 1}`} className="card-image" />
                      <p>{card.name} - {card.price} G</p>
                      <button className="buy-button" onClick={() => buyCard(index)}>구매하기</button>
                    </div>
                  ))}
                </div>
              </>
            } />
            <Route 
              path="/inventory" 
              element={
                <Inventory 
                  inventory={inventory} 
                  setInventory={setInventory} 
                  currency={currency}
                  setCurrency={setCurrency}
                />
              } 
            />
          </Routes>

          {showMessage && (
            <div className="message-box">
              <p>{message}</p>
              <button className="close-button" onClick={closeMessage}>닫기</button>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
