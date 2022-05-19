import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useDispatch } from 'react-redux';
import { setListFilter } from './filterSlice';

export const FilterModal = ({ handlePress }) => {
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const appearAnim = useRef(new Animated.Value(100)).current;
  const filterOptions = [
    {
      label: "Titre",
      action: "TITLE"
    },
    {
      label: "Artiste",
      action: "ARTIST"
    },
    {
      label: "Date d'ajout",
      action: "DATE"
    },
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 120,
      useNativeDriver: false
    }).start();
    Animated.timing(appearAnim, {
      toValue: 0,
      duration: 200,
      easing: Easing.bezier(0.4, 0, 0, 1),
      useNativeDriver: false
    }).start();
  }, [fadeAnim, appearAnim]);

  const itemClick = (item) => {
    handlePress(false);
    dispatch(setListFilter({ sorting: item.action }));
  }

  return (
    <Animated.View style={[styles.modal, {opacity: fadeAnim}]}>
      <Animated.View style={[styles.select, {opacity: fadeAnim, transform: [{translateY: appearAnim}]}]}>
        {filterOptions.map(item => (
          <TouchableOpacity onPress={() => itemClick(item)} key={item.action} style={styles.optionWrapper}>
            <Text style={styles.optionText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
      <TouchableOpacity style={styles.backdrop} onPress={() => handlePress(false)}></TouchableOpacity>
    </Animated.View>
  )
}

const FilterBy = ({ handlePress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => handlePress()}>
        <Text>Trier par</Text>
        <Svg style={styles.svg} viewBox="0 0 20 20">
          <Path style={{width: '100%'}} fillRule="evenodd" clipRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
        </Svg>
      </TouchableOpacity>
    </View>
  )
}

export default FilterBy;

const styles = StyleSheet.create({
  container: {
    flex: '0 1 auto',
    paddingBottom: 16,
  },
  button: {
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4
  },
  svg: {
    marginLeft: 4,
    width: 20,
    height: 20,
    fill: '#444'
  },
  modal: {
    position: 'absolute',
    zIndex: 999,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  select: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingBottom: 50,
    paddingTop: 30
  },
  optionWrapper: {
    paddingVertical: 16,
    paddingHorizontal: 10
  },
  optionText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22
  }
});
