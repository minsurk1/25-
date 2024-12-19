import React, { useState } from 'react';
import './DeckPage.css';

const imagePaths = {
  fire: [
    'assets/images/firetier1.png', 'assets/images/firetier2.png', 'assets/images/firetier3.png',
    'assets/images/firetier4.png', 'assets/images/firetier5.png', 'assets/images/firetier6.png'
  ],
  water: [
    'assets/images/watertier1.png', 'assets/images/watertier2.png', 'assets/images/watertier3.png',
    'assets/images/watertier4.png', 'assets/images/watertier5.png', 'assets/images/watertier6.png'
  ],
  forest: [
    'assets/images/foresttier1.png', 'assets/images/foresttier2.png', 'assets/images/foresttier3.png',
    'assets/images/foresttier4.png', 'assets/images/foresttier5.png', 'assets/images/foresttier6.png'
  ],
  legend: [
    'assets/images/legendtier1.png', 'assets/images/legendtier2.png', 'assets/images/legendtier3.png',
    'assets/images/legendtier4.png', 'assets/images/legendtier5.png', 'assets/images/legendtier6.png'
  ]
};

const DeckPage = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const maxSelectedCards = 8;
  const cards = [
    ...imagePaths.fire,
    ...imagePaths.water,
    ...imagePaths.forest,
    ...imagePaths.legend
  ];

  const selectCard = (card) => {
    if (selectedCards.length >= maxSelectedCards || selectedCards.includes(card)) return;
    setSelectedCards([...selectedCards, card]);
  };

  const removeCard = (index) => {
    const updatedCards = [...selectedCards];
    updatedCards.splice(index, 1);
    setSelectedCards(updatedCards);
  };

  return (
    <div className="deck-page">
      <header className="header">내 덱 설정</header>

      <div className="selected-cards-container">
        <div className="selected-cards">
          {Array.from({ length: maxSelectedCards }, (_, index) => (
            <div
              key={index}
              className="selected-card"
              onClick={() => removeCard(index)}
            >
              {selectedCards[index] ? (
                <img src={selectedCards[index]} alt={`Selected ${index}`} />
              ) : (
                `카드 ${index + 1}`
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="card-list">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${selectedCards.includes(card) ? 'disabled' : ''}`}
            onClick={() => selectCard(card)}
          >
            <img src={card} alt={`Card ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeckPage;
