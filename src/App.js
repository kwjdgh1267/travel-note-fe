import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import TravelRecordForm from './pages/TravelRecordForm';
import BottomNav from './components/BottomNav';
import TravelRecordList from './pages/TravelRecordList';

function App() {
  return (
    <Router>
      <div style={{ paddingBottom: '60px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/record/create" element={<TravelRecordForm />} />
          <Route path="/records" element={<TravelRecordList />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
