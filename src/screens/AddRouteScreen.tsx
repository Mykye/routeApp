import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import MapView, { MapPressEvent, Marker, Polyline } from 'react-native-maps';
import { RouteContext, RouteContextType, Marker as RouteMarker } from '../context/RouteContext';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

const AddRouteScreen: React.FC<{ navigation: NavigationProp<RootStackParamList, 'Home'>}> = ({ navigation }) => {
  const { addRoute } = useContext(RouteContext) as RouteContextType;

  const [name, setName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [routeLength, setRouteLength] = useState('');
  const [markers, setMarkers] = useState<RouteMarker[]>([]);

  const calculateRouteLength = () => {
    if (markers.length < 2) return 0;
    let totalDistance = 0;
    for (let i = 0; i < markers.length - 1; i++) {
      const [lat1, lon1] = [markers[i].latitude, markers[i].longitude];
      const [lat2, lon2] = [markers[i + 1].latitude, markers[i + 1].longitude];
      const R = 6371; // Radius of the Earth in km
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      totalDistance += R * c;
    }
    setRouteLength(totalDistance.toFixed(2));
  };

  const handleAddMarker = (e: MapPressEvent) => {
    setMarkers([...markers, e.nativeEvent.coordinate]);
    calculateRouteLength();
  };

  const handleAddRoute = () => {
    const newRoute = {
      id: Date.now().toString(),
      name,
      shortDescription,
      fullDescription,
      length: routeLength,
      markers,
      isFavorite: false,
    };
    addRoute(newRoute);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Route Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Short Description (max 160 characters)"
        value={shortDescription}
        maxLength={160}
        onChangeText={setShortDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Full Description"
        value={fullDescription}
        onChangeText={setFullDescription}
      />
      <MapView
        style={styles.map}
        onPress={handleAddMarker}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map((marker, index) => (
          <Marker key={index} coordinate={marker} />
        ))}
        <Polyline coordinates={markers} strokeWidth={3} strokeColor="blue" />
      </MapView>
      <Text>Route Length: {routeLength} km</Text>
      <Button title="Add Route" onPress={handleAddRoute} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },
  map: { flex: 1, marginVertical: 10 },
});

export default AddRouteScreen;
