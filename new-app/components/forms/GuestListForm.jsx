import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const GuestListForm = ({ onAddGuest, guests = [] }) => {
  const [guestName, setGuestName] = useState('');

  const handleAddGuest = () => {
    if (guestName.trim()) {
      onAddGuest(guestName);
      setGuestName('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Guest Name</Text>
      <TextInput
        style={styles.input}
        value={guestName}
        onChangeText={setGuestName}
        placeholder="Enter guest name"
      />
      <Button title="Add Guest" onPress={handleAddGuest} />

      <Text style={styles.label}>Guest List</Text>
      <FlatList
        data={guests}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.guestItem}>{item}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  guestItem: {
    fontSize: 14,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default GuestListForm;
