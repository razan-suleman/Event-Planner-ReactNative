import React, { useState, useEffect } from 'react';
import { Client, Databases } from 'appwrite';
import { Account } from 'appwrite';
import { useNavigation } from '@react-navigation/native';
import { Query } from 'appwrite';

const ManageEventsTab = () => {
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUserId, setCurrentUserId] = useState(undefined);

  const navigation = useNavigation();

  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('676d278b00097e04ab85');
  const databases = new Databases(client);
  const account = new Account(client);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await account.get();
        setCurrentUserId(user.$id);
      } catch (error) {
        console.error('Error fetching current user:', error);
        setErrorMessage('Failed to fetch user data.');
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUserId !== undefined) {
      const fetchEvents = async () => {
        try {
          const response = await databases.listDocuments(
            '676d2a0e003c7819b8fc',
            '676d2a160018160291e4',
            [Query.equal('ownerId', currentUserId)]
          );
          setEvents(response.documents);
        } catch (error) {
          console.error('Error fetching events:', error);
          setErrorMessage('Failed to fetch events. Please try again.');
        }
      };

      fetchEvents();
    }
  }, [currentUserId]);

  const handleViewDetails = async (eventId) => {
    try {
      const eventResponse = await databases.getDocument(
        '676d2a0e003c7819b8fc',
        '676d2a160018160291e4',
        eventId
      );

      navigation.navigate('EventDetailsTab', { event: eventResponse, currentUserId });
    } catch (error) {
      console.error('Error fetching event details:', error);
      setErrorMessage('Failed to fetch event details.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Manage Events</h2>
      {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
      {events.length === 0 ? (
        <p>No events found for this user.</p>
      ) : (
        <div>
          {events.map((event) => (
            <div key={event.$id} style={styles.eventCard}>
              <h3>{event.name}</h3>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <p>{event.description}</p>
              <button
                style={styles.viewDetailsButton}
                onClick={() => handleViewDetails(event.$id)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    maxWidth: '600px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    color: '#444',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
  },
  eventCard: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '15px',
    marginBottom: '15px',
    backgroundColor: '#f9f9f9',
  },
  viewDetailsButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default ManageEventsTab;
