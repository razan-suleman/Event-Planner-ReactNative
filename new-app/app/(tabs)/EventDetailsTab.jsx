import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Client, Databases } from 'appwrite';

const client = new Client();
const databases = new Databases(client);

client
  .setEndpoint('https://cloud.appwrite.io/v1')  
  .setProject('676d278b00097e04ab85'); 

const EventDetailsTab = ({ route, navigation }) => {
  const { event, currentUserId } = route.params;

  const handleDelete = async () => {
    console.log("Event ID:", event.$id);

    if (event) {
      try {
        await databases.deleteDocument('676d2a0e003c7819b8fc', '676d2a160018160291e4', event.$id);
        alert('Event deleted successfully!');
        navigation.navigate('HomeTab');
      } catch (error) {
        console.error('Error deleting event:', error.message);
        alert('Failed to delete the event. Please try again.');
      }
    }
  };

  const handleGuestsList = () => {
    if (event) {
      navigation.navigate('GuestListTab', { eventId: event.$id, ownerId: event.ownerId, currentUserId });
    }
  };

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorMessage}>Event not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.subtitle}>{event.date}</Text>
      <Text style={styles.location}>Location: {event.location}</Text>
      {event.description && (
        <Text style={styles.description}>{event.description}</Text>
      )}

      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={handleDelete}
      >
        <Text style={styles.buttonText}>Delete Event</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleGuestsList}>
        <Text style={styles.buttonText}>View Guests List</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    color: '#777',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#444',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  deleteButton: {
    backgroundColor: '#ff4c4c',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 18,
    color: 'red',
  },
});

export default EventDetailsTab;
