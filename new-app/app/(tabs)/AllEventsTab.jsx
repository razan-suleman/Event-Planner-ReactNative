import React, { useState, useEffect } from 'react';
import { Client, Databases, Account, Query } from 'appwrite';
import { ID } from 'appwrite';


const AllEventsTab = () => {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject('676d278b00097e04ab85');
  const databases = new Databases(client);
  const account = new Account(client);

  const fetchUser = async () => {
    try {
      const user = await account.get();
      setUserId(user.$id);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUserId(null);
    }
  };

  const handleRegister = async (event) => {
    if (!userId) {
      console.error('User is not logged in');
      return;
    }

    try {
      const userInfo = await account.get();
      const userEmail = userInfo.email;
      const existingEvent = await databases.listDocuments(
        '676d2a0e003c7819b8fc',
        '676db435003981b8a9ea',
        [Query.equal('userId', userId), Query.equal('eventId', event.$id), Query.equal('userEmail', userEmail)]
      );

      if (existingEvent.documents.length > 0) return;

      await databases.createDocument('676d2a0e003c7819b8fc', '676db435003981b8a9ea', ID.unique(), {
        userId: userId,
        userEmail: userEmail,
        eventId: event.$id
      });

      setRegisteredEvents((prev) => [...prev, event]);
    } catch (error) {
      console.error('Error registering guest:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await databases.listDocuments('676d2a0e003c7819b8fc', '676d2a160018160291e4');
      setEvents(response.documents);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  const fetchRegisteredEvents = async () => {
    if (!userId) return;

    try {
      const registrations = await databases.listDocuments(
        '676d2a0e003c7819b8fc',
        '676db435003981b8a9ea',
        [Query.equal('userId', userId)]
      );
      const registeredEventIds = registrations.documents.map((reg) => reg.eventId);
      const userRegisteredEvents = events.filter((event) =>
        registeredEventIds.includes(event.$id)
      );
      setRegisteredEvents(userRegisteredEvents);
    } catch (error) {
      console.error('Error fetching registered events:', error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      await fetchUser();
      await fetchEvents();
    };
    initializeData();
  }, []);

  useEffect(() => {
    if (userId && events.length > 0) {
      fetchRegisteredEvents();
    }
  }, [userId, events]);

  return (
    <div style={styles.container}>
  <h2 style={styles.heading}>All Events</h2>
  {loading ? (
    <div style={styles.textCenter}>Loading events...</div>
  ) : events.length === 0 ? (
    <div style={styles.textCenter}>No events available.</div>
  ) : (
    <div style={{ ...styles.grid, ...styles.gridCols1, ...styles.smGridCols2, ...styles.lgGridCols3 }}>
      {events.map((event) => (
        <div
          key={event.$id}
          style={{
            ...styles.card,
            ...(registeredEvents.some((e) => e.$id === event.$id) && styles.cardHover),
          }}
        >
          <div style={styles.cardHeader}>{event.name}</div>
          <div style={styles.cardBody}>
            <p style={styles.cardBodyText}>Date: {event.date}</p>
            <p style={styles.cardBodyText}>Location: {event.location}</p>
            <p style={styles.cardBodyText}>{event.description}</p>
            <button
              onClick={() => handleRegister(event)}
              disabled={registeredEvents.some((e) => e.$id === event.$id)}
              style={{
                ...styles.button,
                ...(registeredEvents.some((e) => e.$id === event.$id) && styles.buttonDisabled),
              }}
            >
              {registeredEvents.some((e) => e.$id === event.$id) ? "Registered" : "Register"}
            </button>
          </div>
        </div>
      ))}
    </div>
  )}

  <h3 style={styles.heading}>Registered Events</h3>
  {registeredEvents.length === 0 ? (
    <div style={styles.textCenter}>No events registered yet.</div>
  ) : (
    <div style={{ ...styles.grid, ...styles.gridCols1, ...styles.smGridCols2, ...styles.lgGridCols3 }}>
      {registeredEvents.map((event) => (
        <div key={event.$id} style={{ ...styles.card, ...styles.registeredCard }}>
          <h3>{event.name}</h3>
          <p>Date: {event.date}</p>
          <p>Location: {event.location}</p>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  )}
</div>

  );
};
const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    color: "#4f46e5",
    textAlign: "center",
    fontWeight: "bold",
  },
  textCenter: {
    textAlign: "center",
    color: "#6b7280",
  },
  grid: {
    display: "grid",
    gap: "20px",
  },
  gridCols1: {
    gridTemplateColumns: "1fr",
  },
  smGridCols2: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  lgGridCols3: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  card: {
    backgroundColor: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s, boxShadow 0.3s",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15)",
  },
  cardHeader: {
    backgroundColor: "#4f46e5",
    color: "white",
    padding: "15px",
    fontSize: "1.2em",
  },
  cardBody: {
    padding: "20px",
  },
  cardBodyText: {
    color: "#374151",
  },
  button: {
    display: "inline-block",
    width: "100%",
    padding: "10px",
    backgroundColor: "#4f46e5",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#4338ca",
  },
  buttonDisabled: {
    backgroundColor: "#d1d5db",
    cursor: "not-allowed",
  },
  registeredCard: {
    backgroundColor: "#e0f2fe",
    borderColor: "#60a5fa",
    color: "#1d4ed8",
  },
};

export default AllEventsTab;
