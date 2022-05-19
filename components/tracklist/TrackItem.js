import React from 'react';
import { Text, Image, View, TouchableOpacity, StyleSheet } from 'react-native';

const TrackItem = ({ item, handlePress }) => {
  return (
    <TouchableOpacity onPress={() => handlePress(item.trackId)} style={{ marginBottom: 12, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Image
        style={styles.trackImage}
        source={{ uri: item.artworkUrl100 }}
      />
      <View style={{ marginLeft: 14, flex: 1 }}>
        <Text style={{ fontSize: 18, marginBottom: 4 }} numberOfLines={1}>{item.trackName}</Text>
        <Text style={{ fontSize: 14 }} numberOfLines={1}>{item.artistName}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default TrackItem;

const styles = StyleSheet.create({
  trackImage: {
    width: 50,
    height: 50,
    borderRadius: 4
  }
});
