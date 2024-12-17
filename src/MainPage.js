import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

function MainPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 로직을 여기에 추가할 수 있습니다.
    navigate('/');
  };

  return (
    <div className="main-page">
      <h1>메인 페이지</h1>
      <p>로그인에 성공하셨습니다!</p>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}

export default MainPage;

