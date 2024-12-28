import React, { useState } from 'react';
import { signup } from './services/AuthService';
import { useNavigation } from '@react-navigation/native'; 
import '../../assets/styles/App.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();  

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log('Attempting signup with:', { email, password, name });
      await signup(email, password, name);
      alert('Signup successful!');
      navigation.navigate('SignIn'); 
    } catch (error) {
      setError('Failed to sign up');
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-button">Sign Up</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;
