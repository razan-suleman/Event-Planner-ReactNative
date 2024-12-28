import React, { useState, useEffect } from 'react';
import { Client, Databases, Account, Query } from 'appwrite';

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
    <div className="container mx-auto p-8">
      <h2 className="text-4xl font-bold text-center text-indigo-600 mb-8">All Events</h2>
      {loading ? (
        <div className="text-center text-gray-600">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="text-center text-gray-600">No events available.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.$id}
              className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              <div className="bg-indigo-600 text-white p-4">
                <h3 className="text-xl font-semibold">{event.name}</h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500">Date: {event.date}</p>
                <p className="text-sm text-gray-500">Location: {event.location}</p>
                <p className="mt-4 text-gray-700">{event.description}</p>
                <button
                  onClick={() => handleRegister(event)}
                  disabled={registeredEvents.some((e) => e.$id === event.$id)}
                  className={`mt-6 w-full py-2 rounded-md text-white font-semibold transition-all ${
                    registeredEvents.some((e) => e.$id === event.$id)
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {registeredEvents.some((e) => e.$id === event.$id) ? 'Registered' : 'Register'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <h3 className="text-3xl font-bold text-center text-indigo-600 mt-10 mb-6">Registered Events</h3>
      {registeredEvents.length === 0 ? (
        <div className="text-center text-gray-600">No events registered yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {registeredEvents.map((event) => (
            <div key={event.$id} className="bg-blue-50 border border-blue-200 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-blue-700">{event.name}</h3>
              <p className="text-sm text-blue-500">Date: {event.date}</p>
              <p className="text-sm text-blue-500">Location: {event.location}</p>
              <p className="mt-4 text-blue-600">{event.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEventsTab;
