import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = () => {
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav">
      <button onClick={() => navigate('/map')}>지도</button>
      <button onClick={() => navigate('/records')}>여행 목록</button>
      <button onClick={() => navigate('/record/create')}>기록 추가</button>
      <button onClick={() => navigate('/friends')}>친구 추가</button>
    </nav>
  );
};

export default BottomNav;
