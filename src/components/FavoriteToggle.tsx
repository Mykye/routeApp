import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface FavoriteToggleProps {
    initialFavorite: boolean;
    onFavoriteChange: (routeId: string, newStatus: boolean) => void;
    routeId: string;
  }

const FavoriteToggle: React.FC<FavoriteToggleProps> = ({ initialFavorite, onFavoriteChange, routeId }) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const handleFavoriteToggle = () => {
    const newStatus = !isFavorite;
    setIsFavorite(newStatus);

    if (onFavoriteChange) {
      onFavoriteChange(routeId, newStatus);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.favoriteStatus}>
        {isFavorite ? '★ This is a Favorite' : '☆ Not a Favorite'}
      </Text>
      <Button
        title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        onPress={handleFavoriteToggle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10, alignItems: 'center' },
  favoriteStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default FavoriteToggle;
