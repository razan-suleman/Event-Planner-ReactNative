import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Client, Databases, Account } from 'appwrite';
const { v4: uuidv4 } = require('uuid');

const CreateEventTab = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null); 
  const [isUserLoaded, setIsUserLoaded] = useState(false); 

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
        setIsUserLoaded(true);  
      } catch (error) {
        console.error('Error fetching current user:', error);
        setErrorMessage('Failed to fetch user data.');
      }
    };

    fetchCurrentUser();
  }, []);

  const handleCreateEvent = async () => {
    if (eventName && eventDate && eventLocation && currentUserId) {
      const eventData = {
        name: eventName,
        date: eventDate,
        location: eventLocation,
        description: description,
        ownerId: currentUserId,   
      };

      try {
        const response = await databases.createDocument(
          '676d2a0e003c7819b8fc', 
          '676d2a160018160291e4', 
          uuidv4(),  
          eventData 
        );

        setSuccessMessage(`Event "${eventName}" created successfully!`);
        setEventName('');
        setEventDate('');
        setEventLocation('');
        setDescription('');

        navigation.navigate('ManageEventsTab');

      } catch (error) {
        setErrorMessage('Failed to create event. Please try again.');
        console.error('Error creating event:', error);
      }
    } else {
      setSuccessMessage('');
      setErrorMessage('Please fill in all required fields.');
    }
  };
 
  if (!isUserLoaded) {
    return <p>Loading user data...</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Event</h2>
      <div style={styles.form}>
        <label style={styles.label}>Event Name</label>
        <input
          style={styles.input}
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Enter event name"
        />

        <label style={styles.label}>Event Date</label>
        <input
          style={styles.input}
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />

        <label style={styles.label}>Event Location</label>
        <input
          style={styles.input}
          type="text"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
          placeholder="Enter event location"
        />

        <label style={styles.label}>Description (Optional)</label>
        <textarea
          style={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide a brief description of the event"
        />

        <button style={styles.button} onClick={handleCreateEvent}>
          Create Event
        </button>
      </div>

      {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
      {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    height: '100px',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  successMessage: {
    marginTop: '15px',
    color: 'green',
    textAlign: 'center',
  },
  errorMessage: {
    marginTop: '15px',
    color: 'red',
    textAlign: 'center',
  },
};

export default CreateEventTab;
