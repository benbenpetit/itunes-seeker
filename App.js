import "react-native-url-polyfill/auto"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import HomeScreen from "./components/home/HomeScreen";
import SearchScreen from "./components/search/SearchScreen";
import DetailsScreen from "./components/details/DetailsScreen";
import store from "./store";
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from "redux-persist/lib/persistStore";

const Stack = createNativeStackNavigator();
const persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: '#FFFFFF' } }}>
            <Stack.Screen name="Accueil" component={HomeScreen} />
            <Stack.Screen name="Rechercher" component={SearchScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </PersistGate>
    </Provider>
  );
}
