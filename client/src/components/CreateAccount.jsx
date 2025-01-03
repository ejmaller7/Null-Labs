import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccount.css'

const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
//   const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Checke if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

  //   const apiUrl = process.env.NODE_ENV === 'production' 
  // ? 'https://null-labs-oejq.onrender.com/api/create-account' 
  // : 'http://localhost:4000/api/create-account';

    try {
        const response = await fetch('https://null-labs-oejq.onrender.com/api/create-account', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log('Account created with ID:', data.userId);
    
          setSuccess('Account created successfully!');
    
        // resets all fields
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setError(''); 
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to create account');
        }
      } catch (error) {
        console.error('Error creating account:', error);
        setError('Something went wrong. Please try again later.');
      }
};

return (
    <div className="create-account-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
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

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>} 

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;