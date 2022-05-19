import { Text, Image, View, StyleSheet, Keyboard, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { TextInput } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import TrackItem from '../tracklist/TrackItem';
import uuid from 'react-uuid';

const SearchScreen = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchSongs, setSearchSongs] = useState([]);
  const navigation = useNavigation();

  const goToDetails = (id) => {
    navigation.navigate('Details', {
      songId: id
    });
  }

  const fetchItunesApi = () => {
    const uri = 'https://itunes.apple.com/search?';

    if (searchValue.trim() === '') {
      return;
    }

    fetch(`${uri}limit=20&media=music&term=${searchValue.trim()}`)
      .then((response) => response.json())
      .then((json) => {
        setSearchSongs(json.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchItunesApi();
  }, [searchValue]);

  return (
    <View style={[styles.container, { paddingHorizontal: 16, paddingVertical: 20, flex: 1 }]}>
      <TextInput
        style={styles.input}
        onChangeText={setSearchValue}
        value={searchValue}
        placeholder="Titre, artiste..."
        autoFocus={true}
      />
      {searchSongs.length !== 0 ? (
        <SafeAreaView style={{ marginTop: 20, flex: 1 }}>
          <FlatList
            style={{ flex: 'auto' }}
            data={searchSongs}
            renderItem={({ item }) => (
              <TrackItem item={item} handlePress={(id) => goToDetails(id)} />
            )}
            keyExtractor={item => uuid()}
            onScrollBeginDrag={Keyboard.dismiss}
          />
        </SafeAreaView>
      ) : (
        <Text style={{textAlign: 'center', paddingHorizontal: 16, paddingVertical: 20}}>Ecoutez la musique que vous aimez!</Text>
      )}
    </View>
  )
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: '1 1 100%'
  },
  input: {
    color: '#111',
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
    fontSize: 18,
    backgroundColor: '#fff',
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  }
});
