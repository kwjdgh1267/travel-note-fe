// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MapView from './pages/MapView'; // 지도 페이지
import TravelRecordForm from './pages/TravelRecordForm';
import BottomNav from './components/BottomNav';
import TravelRecordList from './pages/TravelRecordList';
import TravelRecordDetail from './pages/TravelRecordDetail';

function App() {
  return (
    <Router>
      <div style={{ paddingBottom: '60px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MapView />} /> {/* 지도 페이지를 메인으로 사용 */}
          <Route path="/map" element={<MapView />} />
          <Route path="/record/create" element={<TravelRecordForm />} />
          <Route path="/records" element={<TravelRecordList />} />
          <Route path="/record/:id" element={<TravelRecordDetail />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
