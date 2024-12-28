import React, { useState } from 'react';
import { Account, Client } from 'appwrite';
import { useNavigation } from '@react-navigation/native'; 
import '../../assets/styles/App.css';

const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('676d278b00097e04ab85');
const account = new Account(client);

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const session = await account.createEmailPasswordSession( email, password, "112");
      console.log('Session created:', session);
      alert('Signin successful!');
  
      navigation.navigate('HomeTab');
    } catch (err) {
      console.error('Error during sign-in:', err);
      setError(err.message || 'Failed to sign in. Please check your email and password.');
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Sign In</h2>
        <form onSubmit={handleSignin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <button type="submit" className="submit-button">Sign In</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Signin;