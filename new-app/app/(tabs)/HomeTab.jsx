import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Client, Account } from 'appwrite';
import { useNavigation } from '@react-navigation/native';

// Initialize Appwrite client and account
const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject('676d278b00097e04ab85');
const account = new Account(client);

const HomeTab = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Check if there's an active session when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await account.get();  // Get the current user
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await account.deleteSession('current');  // Delete the current session
      setUser(null);
      navigation.navigate('HomeTab');  // Navigate back to home
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Image source={require('../../assets/images/logo.png')} style={styles.headerImage} />
        <Text style={styles.title}>Welcome to EventEase!</Text>
      </View>

      {/* User Auth Section */}
      {user ? (
        <View style={styles.loggedInContainer}>
          <Text style={styles.subtitle}>Hello!</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.loggedOutContainer}>
          <Text style={styles.subtitle}>Please sign in to continue</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signin')}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Additional Content Section */}
      <View style={styles.additionalContent}>
        <Text style={styles.contentTitle}>Discover amazing events near you!</Text>
        <TouchableOpacity style={styles.exploreButton} onPress={() => navigation.navigate('AllEventsTab')}>
          <Text style={styles.exploreButtonText}>Explore Events</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
    fontWeight: 'bold',
  },
  headerContainer: {
    backgroundColor: '#4e73df',
    borderRadius: 15,
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: '100%',
  },
  headerImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#ffffff',
    overflow: 'hidden',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  loggedInContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  loggedOutContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#ff5722',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    width: '80%',
    marginVertical: 10,
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  additionalContent: {
    marginTop: 40,
    alignItems: 'center',
  },
  contentTitle: {
    fontSize: 20,
    color: '#007bff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  exploreButton: {
    backgroundColor: '#4e73df',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 8,
  },
  exploreButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeTab;
