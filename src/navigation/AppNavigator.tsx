import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import AddRouteScreen from '../screens/AddRouteScreen';
import { Route } from '../context/RouteContext';

export type RootStackParamList = {
  Home: undefined;
  Details: { route: Route };
  'Add Route': undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailScreen} />
      <Stack.Screen name="Add Route" component={AddRouteScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
