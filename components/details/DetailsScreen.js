import { Text, View, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import Svg, { Path } from 'react-native-svg';
import { addSongToList, removeSongFromList, songsSelector } from '../home/songsSlice';
import { useDispatch, useSelector } from 'react-redux';

const DetailsScreen = ({ route }) => {
  const songs = useSelector(songsSelector);
  const [detailedSong, setDetailedSong] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const { songId } = route.params;
  const dispatch = useDispatch();

  const handleSetLike = () => {
    if (isLiked) {
      setIsLiked(false);
      dispatch(removeSongFromList({ id: detailedSong.trackId }));
    } else {
      const now = new Date();
      setIsLiked(true);
      dispatch(addSongToList({
        trackId: detailedSong.trackId,
        trackName: detailedSong.trackName,
        artistName: detailedSong.artistName,
        artworkUrl100: detailedSong.artworkUrl100,
        dateAdded: now.toString()
      }));
    }
  }

  const fetchItunesSong = () => {
    const uri = 'https://itunes.apple.com/lookup?';

    fetch(`${uri}id=${songId}`)
      .then((response) => {
        if (response.status === 403) {
          throw new Error('Something went wrong');
        }
        return response.json();
      })
      .then((json) => {
        setDetailedSong(json.results[0]);
        setIsLiked(songs.map(song => song.trackId).includes(json.results[0].trackId));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchItunesSong();
  }, []);

  return (
    <View style={styles.container}>
      {detailedSong ? (
        <View style={styles.center}>
          <View style={{ backgroundColor: 'gray' }}>
            <Image
              style={styles.cover}
              source={{ uri: detailedSong.artworkUrl100.split('100').join('300') }}
            />
          </View>
          <View style={{ marginTop: 16, paddingHorizontal: '10%' }}>
            <Text numberOfLines={2} style={styles.title}>{detailedSong.trackName}</Text>
            <Text numberOfLines={1} style={styles.subtitle}>{detailedSong.artistName}</Text>
          </View>
          <TouchableOpacity onPress={() => handleSetLike()}>
            {!isLiked ? (
              <Svg
                style={styles.heartSvg}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="#000"
                viewBox="0 0 24 24"
              >
                <Path d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0z" />
              </Svg>
            ) : (
              <Svg
                style={styles.heartSvg}
                xmlns="http://www.w3.org/2000/svg"
                fill="#ff0a43"
                viewBox="0 0 20 20"
              >
                <Path d="M3.172 5.172a4 4 0 0 1 5.656 0L10 6.343l1.172-1.171a4 4 0 1 1 5.656 5.656L10 17.657l-6.828-6.829a4 4 0 0 1 0-5.656z" />
              </Svg>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <ActivityIndicator style={{ marginTop: 100 }} size="large" />
      )}
    </View>
  )
}

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 16
  },
  center: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  cover: {
    width: 200,
    height: 200,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  subtitle: {
    marginTop: 6,
    fontSize: 16,
    textAlign: 'center'
  },
  heartSvg: {
    width: 40,
    height: 40
  }
});