import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import songsReducer from "./components/home/songsSlice";
import filterReducer from "./components/home/filterSlice";
import thunk from 'redux-thunk';

const reducers = combineReducers({ songs: songsReducer, filter: filterReducer });

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});