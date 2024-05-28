import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="Login">
      <button onClick={() => { window.location.href = "/auth/login"; }}>Login</button>
    </div>
  );
}

export default Login;