import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/auth/login');
  };

  return (
    <div className="Login">
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;