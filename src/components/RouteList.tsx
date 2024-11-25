import React, { useContext } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet, Button } from 'react-native';
import { Route, RouteContext, RouteContextType } from '../context/RouteContext';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

interface RouteListProps {
  routes: Route[]
  navigation: NavigationProp<RootStackParamList, 'Home'>;
}

const RouteList: React.FC<RouteListProps> = ({ routes, navigation }) => {
  const { toggleFavorite, deleteRoute } = useContext(RouteContext) as RouteContextType;

  const handleFavoriteToggle = (routeId: string, isFavorite: boolean) => {
    toggleFavorite(routeId, isFavorite);
  };

  const handleDelete = (id: string) => {
    deleteRoute(id);
  };

  return (
    <FlatList
    data={routes.sort((a, b) => (b.isFavorite === true ? 1 : 0) - (a.isFavorite === true ? 1 : 0))}
    keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.routeItem}>
          <TouchableOpacity
            style={styles.routeDetails}
            onPress={() => navigation.navigate('Details', { route: item })}
          >
            <Text style={styles.routeName}>{item.name}</Text>
            <Text style={styles.routeDescription}>{item.shortDescription}</Text>
            <Text style={styles.routeLength}>Length: {item.length} km</Text>
          </TouchableOpacity>
          <Button
            title={item.isFavorite ? '★' : '☆'}
            onPress={() => handleFavoriteToggle(item.id, !item.isFavorite)}
            color={item.isFavorite ? 'gold' : 'gray'}
          />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.deleteButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  routeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  routeDetails: {
    flex: 1,
    marginRight: 10,
  },
  routeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  routeDescription: {
    fontSize: 14,
    color: '#666',
  },
  routeLength: {
    fontSize: 12,
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: '#ff4d4d',
    borderRadius: 15,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RouteList;
