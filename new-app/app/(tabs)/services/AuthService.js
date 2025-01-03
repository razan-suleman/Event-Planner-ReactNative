import { Client, Account, ID } from 'appwrite';
import React, { createContext, useContext, useState, useEffect } from 'react';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('676d278b00097e04ab85');

const account = new Account(client);

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const session = await account.getSession('current');
      if (session) {
        const userData = await account.get();
        setUser(userData);
        setIsSignedIn(true);
      }
    } catch (error) {
      console.log('No active session');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, name) => {
    try {
      const response = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      await signin(email, password);
      return response;
    } catch (error) {
      console.error('Sign-up error:', error);
      throw error;
    }
  };

  const signin = async (email, password) => {
    try {
      const session = await account.createEmailSession(email, password);
      const userData = await account.get();
      setUser(userData);
      setIsSignedIn(true);
      return session;
    } catch (error) {
      console.error('Sign-in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await account.deleteSession('current');
      setIsSignedIn(false);
      setUser(null);
    } catch (error) {
      console.error('Sign-out error:', error);
      throw error;
    }
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{
      isSignedIn,
      user,
      signup,
      signin,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
