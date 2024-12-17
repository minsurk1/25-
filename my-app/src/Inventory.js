import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Inventory.css';

// 임의로 추가할 카드 목록 (예시)
const availableCards = [
  { image: 'card-a-image-url', name: '카드 A' },
  { image: 'card-b-image-url', name: '카드 B' },
  { image: 'card-c-image-url', name: '카드 C' },
];

const Inventory = () => {
  const [inventory, setInventory] = useState([
    { image: 'card-image-url', name: '카드 A', isOpened: false },
    { image: 'card-image-url', name: '카드 B', isOpened: false }
  ]);
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부
  const [newCard, setNewCard] = useState(null); // 랜덤으로 선택된 카드

  // 카드팩 개봉 함수
  const openCardPack = (index) => {
    // 랜덤 카드 선택
    const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
    setNewCard(randomCard);

    // 카드팩 개봉 후 모달 표시
    setShowModal(true);

    // 개봉된 카드 업데이트
    setInventory(prevInventory => {
      const newInventory = [...prevInventory];
      newInventory[index] = { ...newInventory[index], isOpened: true };
      return newInventory;
    });
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setShowModal(false);
    setNewCard(null);
  };

  return (
    <div className="inventory-page">
      <h2>내 인벤토리</h2>
      {inventory.length === 0 ? (
        <p>구매한 카드가 없습니다.</p>
      ) : (
        <div className="inventory-list">
          {inventory.map((card, index) => (
            <div key={index} className="inventory-item">
              {card.isOpened ? (
                <img src={card.image} alt={card.name} className="inventory-item-image" />
              ) : (
                <div className="card-pack">
                  <p>카드팩</p>
                  <button className="open-button" onClick={() => openCardPack(index)}>
                    카드팩 개봉
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 모달 창 */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>새로운 카드가 나왔습니다!</h3>
            <img src={newCard.image} alt={newCard.name} className="modal-card-image" />
            <p>{newCard.name}</p>
            <button className="close-modal" onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}

      <Link to="/" className="back-button">메인으로 돌아가기</Link>
    </div>
  );
};

export default Inventory;
