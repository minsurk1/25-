import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import logo from './assets/images/logo.png';
import MainPage from './MainPage';
import SignUpPage from './SignUpPage';

function LoginPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    // 여기에 실제 로그인 로직을 추가할 수 있습니다.
    // 지금은 단순히 MainPage로 이동합니다.
    navigate('/main');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div>
      {/* 풀스크린 배경 */}
      <div className="fullscreen-background"></div>

      {/* 우측 상단 로고 */}
      <img src={logo} alt="Logo" className="top-right-logo" />

      {/* 로그인 패널 */}
      <div className={`login-panel ${isOpen ? 'open' : ''}`}>
        {isOpen && (
          <button className="toggle-button close" onClick={togglePanel}>닫기</button>
        )}
        
        {/* 로그인 창 내용 */}
        <div className="login-content">
          {/* 로그인 창 상단 로고 */}
          <img src={logo} alt="Logo" className="login-logo" />
          
          <h2>로그인</h2>
          <input type="text" placeholder="아이디" />
          <input type="password" placeholder="비밀번호" />
          <button className="login-button" onClick={handleLogin}>로그인</button>
          <button className="signup-button" onClick={handleSignUp}>회원가입</button>
        </div>
      </div>

      {/* 열기 버튼 */}
      {!isOpen && (
        <button className="toggle-button open" onClick={togglePanel}>열기</button>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPanel />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;

