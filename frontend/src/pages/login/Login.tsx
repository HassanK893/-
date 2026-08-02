import { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, user, loading, error, clearError } = useAuth();

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      login(email, password);
    },
    [email, password, login],
  );
  if (user) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--background-color, rgb(214, 225, 255))',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '30px',
            color: 'var(--accent-color, rgb(23, 49, 119))',
          }}
        >
          Вход в админ-панель
        </h2>

        {error && (
          <div
            style={{
              background: 'rgb(255, 200, 200)',
              color: 'rgb(150, 20, 20)',
              padding: '10px',
              borderRadius: '6px',
              marginBottom: '15px',
              textAlign: 'center',
            }}
          >
            {error}
          </div>
        )}

        <div style={{ marginBottom: '15px' }}>
          <label
            style={{ display: 'block', marginBottom: '5px', fontWeight: 600 }}
          >
            Логин
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) clearError();
            }}
            required
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '2px solid rgb(180, 195, 230)',
              borderRadius: '8px',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label
            style={{ display: 'block', marginBottom: '5px', fontWeight: 600 }}
          >
            Пароль
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) clearError();
            }}
            required
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '2px solid rgb(180, 195, 230)',
              borderRadius: '8px',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            background: 'var(--button-color, rgb(23, 49, 119))',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>
    </div>
  );
}

export default Login;
