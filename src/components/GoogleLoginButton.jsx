// src/components/GoogleLoginButton.js
import React from 'react';

const GoogleLoginButton = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <button onClick={handleLogin}>
      구글 로그인
    </button>
  );
};

export default GoogleLoginButton;
