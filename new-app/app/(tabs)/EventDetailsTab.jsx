import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const EventDetailsTab = ({ route, navigation }) => {
  const { event, currentUserId } = route.params; 
  const handleEdit = () => {
    if (event) {
      navigation.navigate('EditEvent', { event });
    }
  };

  const handleDelete = () => {
    navigation.navigate('HomeTab');
  };

  const handleGuestsList = () => {
    if (event) {
      console.log(event);
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

export default EventDetailsTab;  // This should be placed at the bottom of the file
