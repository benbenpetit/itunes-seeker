import { Text, View, Pressable, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import { songsSelector } from './songsSlice';
import { useSelector, useStore } from 'react-redux';
import TrackItem from '../tracklist/TrackItem';
import FilterBy, { FilterModal } from './FilterBy';
import { filterSelector } from './filterSlice';
import { useEffect } from 'react';

const AddSongsCta = () => {
  const navigation = useNavigation();

  return (
    <Pressable style={styles.button} onPress={() => navigation.navigate('Rechercher')}>
      <Text style={styles.text}>Ajouter des musiques</Text>
    </Pressable>
  )
}

const HomeScreen = () => {
  const store = useStore();
  const navigation = useNavigation();
  const songs = useSelector(songsSelector);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sorting, setSorting] = useState(useSelector(filterSelector));

  const goToDetails = (id) => {
    navigation.navigate('Details', {
      songId: id
    });
  }

  const sortSongs = (items) => {
    switch (sorting) {
      case 'TITLE':
        return [...items].sort((a, b) => a.trackName.localeCompare(b.trackName));
      case 'ARTIST':
        return [...items].sort((a, b) => a.artistName.localeCompare(b.artistName));
      case 'DATE':
        return [...items].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }
  }

  useEffect(() => store.subscribe(() => {
    setSorting(store.getState().filter);
  }), [store]);

  return (
    <View style={styles.container}>
      <View style={[styles.container, { paddingHorizontal: 16, paddingVertical: 20 }]}>
        <FilterBy handlePress={() => setIsOpenModal(!isOpenModal)} />
        <View style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1 }}>
            <FlatList
              ListEmptyComponent={<Text style={{ fontSize: 16, textAlign: 'center', marginTop: '50%' }}>Vous n'avez pas encore ajouté de musique</Text>}
              style={{ flex: 'auto' }}
              data={sortSongs(songs)}
              renderItem={({ item }) => <TrackItem item={item} handlePress={(id) => goToDetails(id)} />}
              keyExtractor={item => item.trackId}
            />
          </SafeAreaView>
          <AddSongsCta />
        </View>
      </View>
      {isOpenModal && <FilterModal handlePress={(action) => setIsOpenModal(action)} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: '1 1 100%'
  },
  button: {
    width: '100%',
    backgroundColor: 'black',
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    zIndex: 99,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default HomeScreen;