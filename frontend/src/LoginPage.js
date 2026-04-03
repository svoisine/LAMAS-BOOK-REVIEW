import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    // Decode the JWT token to get user info
    const decodedUser = jwtDecode(credentialResponse.credential);
    console.log('Decoded User:', decodedUser);
    // Redirect to the dashboard and pass the user data in state
    navigate('/dashboard', { state: { user: decodedUser } });
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // No backend auth wired yet; pass through a basic user object.
    navigate('/dashboard', {
      state: {
        user: {
          name: username || 'User',
          picture: null,
        },
      },
    });
  };

  const handleSignupClick = (e) => {
    // I kept signup simple untill we have more to add later.
    e.preventDefault();
    setPassword(''); // UX: avoid accidental reuse
    navigate('/dashboard', {
      state: {
        user: {
          name: username || 'User',
          picture: null,
        },
      },
    });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: '#F5F1EB',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '320px',
          background: '#fff',
          borderRadius: '12px',
          padding: '44px 28px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          backgroundColor: "#FFFFFF"
        }}
      >
        <h2 style={{ margin: 0, marginBottom: '18px', fontSize: '22px', textAlign: 'center'}}>
          Lamas Login
        </h2>

        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            aria-label="Username"
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #d0d0d0',
              outline: 'none',
            }}
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            aria-label="Password"
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #d0d0d0',
              outline: 'none',
            }}
          />

          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            <button
              className="LoginButton"
              type="submit"
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '15px',
              }}
            >
              Login
            </button>
            <button
              className="SignupButton"
              type="button"
              onClick={handleSignupClick}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #d0d0d0',
                cursor: 'pointer',
                fontSize: '15px',
              }}
            >
              Sign up
            </button>
          </div>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '26px 0 18px' }}>
          <div style={{ height: '1px', background: '#e6e6e6', flex: 1 }} />
          <div style={{ fontSize: '12px', color: '#A67C52' }}>or continue with Google</div>
          <div style={{ height: '1px', background: '#e6e6e6', flex: 1 }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;