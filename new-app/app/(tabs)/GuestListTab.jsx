import React, { useState, useEffect } from 'react';
import { Client, Databases, Query } from 'appwrite';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const GuestListTab = ({ route }) => {
  const { eventId } = route.params;

  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('676d278b00097e04ab85'); 

  const databases = new Databases(client);

  const fetchGuests = async () => {
    if (!eventId) return;

    try {
      const response = await databases.listDocuments(
        '676d2a0e003c7819b8fc', 
        '676db435003981b8a9ea', 
        [Query.equal('eventId', eventId)]
      );

      const fetchedGuests = response.documents.map((guest, index) => ({
        number: index + 1, 
        userEmail: guest.userEmail || 'No Email',
      }));

      setGuests(fetchedGuests);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching guests:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchGuests();
    }
  }, [eventId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guest List</Text>
      {loading ? (
        <Text style={styles.loading}>Loading guests...</Text>
      ) : (
        <View>
          <View style={styles.tableHeader}>
            <Text style={[styles.cell, styles.headerCell]}>#</Text>
            <Text style={[styles.cell, styles.headerCell]}>Email</Text>
          </View>
          {guests.map((guest) => (
            <View key={guest.number} style={styles.tableRow}>
              <Text style={styles.cell}>{guest.number}</Text>
              <Text style={styles.cell}>{guest.userEmail}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  loading: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    paddingVertical: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 5,
  },
  cell: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default GuestListTab;
