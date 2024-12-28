import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const VendorSearchForm = ({ vendors = [], onVendorSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVendors, setFilteredVendors] = useState(vendors);

  const handleSearch = () => {
    const filtered = vendors.filter((vendor) =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVendors(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search Vendor</Text>
      <TextInput
        style={styles.input}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Enter vendor name"
      />
      <Button title="Search" onPress={handleSearch} />

      <FlatList
        data={filteredVendors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text
            style={styles.vendorItem}
            onPress={() => onVendorSelect(item)}>
            {item.name}
          </Text>
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
  vendorItem: {
    fontSize: 16,
    padding: 12,
    backgroundColor: '#f9f9f9',
    marginVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default VendorSearchForm;
