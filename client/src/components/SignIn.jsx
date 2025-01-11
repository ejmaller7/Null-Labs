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

  // Function to handle sign-in form submission
  const handleSignIn = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const apiUrl = process.env.NODE_ENV === 'production'
      ? 'https://null-labs-oejq.onrender.com/api/sign-in'
      : 'http://localhost:4000/api/sign-in';

    try {
      // Sending POST request to the server with email and password
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // If sign-in is successful, log in the user and redirect to home page
        const data = await response.json();
        logIn(data); // Save the user data to context

        // Store the token in localStorage or sessionStorage
        localStorage.setItem('jwtToken', data.token);
        
        navigate('/');

      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Sign-in failed');
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