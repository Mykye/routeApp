import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import RouteList from '../components/RouteList';
import { RouteContext, RouteContextType } from '../context/RouteContext';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

const HomeScreen: React.FC<{ navigation: NavigationProp<RootStackParamList, 'Home'> }> = ({ navigation }) => {
  const { routes } = useContext(RouteContext) as RouteContextType;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRoutes = routes.filter(
    (route) =>
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search routes"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <RouteList routes={filteredRoutes} navigation={navigation} />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Add Route')}
      >
        <Text style={styles.addButtonText}>Add Route</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  searchInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;
