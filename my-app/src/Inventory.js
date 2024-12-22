import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Inventory.css';

const cardImages = {
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

const Inventory = ({ inventory, setInventory, currency, setCurrency }) => {
  const [openedCards, setOpenedCards] = useState({});
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const getRandomCard = (cardType) => {
    let legendProbability;
    switch (cardType) {
      case 'B':
        legendProbability = 0.01; // B급 카드팩 레전드카드 확률은 1%
        break;
      case 'A':
        legendProbability = 0.03; // A급 카드팩 레전드카드 확률은 3%
        break;
      case 'S':
        legendProbability = 0.05; // S급 카드팩 레전드카드 확률은 5%
        break;
      default:
        legendProbability = 0.01; // 레전드카드 기본확률은 1%
    }

    const randomNumber = Math.random();
    if (randomNumber < legendProbability) {
      // Legend tier card
      return cardImages.legend[Math.floor(Math.random() * cardImages.legend.length)];
    } else {
      // Regular tier card (fire, water, forest)
      const tierTypes = ['fire', 'water', 'forest'];
      const selectedTier = tierTypes[Math.floor(Math.random() * tierTypes.length)];
      return cardImages[selectedTier][Math.floor(Math.random() * cardImages[selectedTier].length)];
    }
  };

  const openCardPack = (index) => {
    const cardPack = inventory[index];
    const randomImages = [];
    for (let i = 0; i < 5; i++) {
      randomImages.push(getRandomCard(cardPack.name.split(' ')[1])); 
    }
    setOpenedCards((prev) => ({
      ...prev,
      [index]: randomImages,
    }));
    setCurrentIndex(index);
    setShowConfirmButton(true);
  };

  const handleConfirm = () => {
    const updatedInventory = inventory.filter((_, idx) => idx !== currentIndex);
    setInventory(updatedInventory);
    setOpenedCards({});
    setShowConfirmButton(false);
    setCurrentIndex(null);
  };

  return (
    <div className="inventory-page">
      <div className="header">
        <div className="currency">보유 재화: {currency} G</div>
        <Link to="/" className="main-button">메인화면</Link>
      </div>
      
      <h2>내 인벤토리</h2>
      
      {inventory.length === 0 ? (
        <p>구매한 카드가 없습니다.</p>
      ) : (
        <div className="inventory-list">
          {inventory.map((card, index) => (
            <div key={index} className="inventory-item">
              {!openedCards[index] ? (
                <>
                  <img src={card.image} alt="카드팩" className="inventory-item-image" />
                  <button 
                    className="open-button" 
                    onClick={() => openCardPack(index)}
                  >
                    카드팩 개봉
                  </button>
                </>
              ) : (
                <div className="card-pack-container opened">
                  <div className="card-content">
                    <div className="card-opened">
                      {openedCards[index].map((image, i) => (
                        <img key={i} src={image} alt={`카드 ${i}`} className="card-opened-image" />
                      ))}
                    </div>
                    {showConfirmButton && (
                      <button className="confirm-button" onClick={handleConfirm}>
                        확인
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inventory;

