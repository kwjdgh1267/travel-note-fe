// src/pages/LoginPage.js
import React, { useEffect } from 'react';
import GoogleLoginButton from '../components/GoogleLoginButton';

const LoginPage = () => {
  useEffect(() => {
    const hasToken = document.cookie.includes('TNtoken');
    if (hasToken) {
      window.location.href = '/main';
    }
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>TravelNote</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>구글로 로그인하기</p>
      <GoogleLoginButton />
    </div>
  );
};

export default LoginPage;
