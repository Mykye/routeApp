import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import FavoriteToggle from '../components/FavoriteToggle';
import { RouteContext, RouteContextType } from '../context/RouteContext';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface DetailScreenProps {
  route: DetailScreenRouteProp;
}

const DetailScreen: React.FC<DetailScreenProps> = ({ route }) => {
  const { toggleFavorite } = useContext(RouteContext) as RouteContextType;
  const { id, name, fullDescription, length, markers, isFavorite } = route.params.route;

  const handleFavoriteChange = (routeId: string, newStatus: boolean) => {
    toggleFavorite(routeId, newStatus);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{fullDescription}</Text>
      <Text style={styles.length}>Length: {length} km</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: markers[0]?.latitude || 37.78825,
          longitude: markers[0]?.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers && <Polyline coordinates={markers} strokeWidth={3} strokeColor="blue" />}
      </MapView>
      <FavoriteToggle
        initialFavorite={isFavorite}
        onFavoriteChange={handleFavoriteChange}
        routeId={id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, marginBottom: 10 },
  length: { fontSize: 14, color: '#666', marginBottom: 10 },
  map: { flex: 1, marginBottom: 10 },
});

export default DetailScreen;
