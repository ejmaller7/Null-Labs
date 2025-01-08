import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './SignIn.css'; 

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, logIn } = useUser();
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();

    const apiUrl = process.env.NODE_ENV === 'production'
      ? 'https://null-labs-oejq.onrender.com/api/create-account'
      : 'http://localhost:4000/api/sign-in';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        logIn(data);
        navigate('/');

      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Sign-in failed');
        // setSuccess('');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="sign-in-container">
      <h2>{user ? `Hello, ${username}!` : 'Sign In'}</h2>

      {!user ? (
        <form onSubmit={handleSignIn}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">Sign In</button>
        </form>
      ) : (
        <p>You are already signed in as {user.username}.</p>
      )}
    </div>
  );
};

export default SignIn;