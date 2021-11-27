import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './components/home';
import RegisterScreen from './components/register';
import LoginScreen from './components/login';
import ProfileScreen from './components/profile';
import CategoryScreen from './components/category';
import AboutScreen from './components/about';

import AreaScreen from "./components/area";
import LengthScreen from "./components/length";
import SpeedScreen from './components/speed';
import VolumeScreen from "./components/volume";
import WeightScreen from "./components/weight";
import CurrencyScreen from './components/currency';
import ValueProvider from './components/ValueContext';
import { configureData } from './components/configure';
const Stack = createNativeStackNavigator();

const App = () => {
    const currencyURL = "https://openexchangerates.org/api/latest.json?app_id=3fde0830b3a24434957729d6ffae3f4b";

    const serverURL = "https://cpa-server.herokuapp.com/";



    return (
        <ValueProvider value={{ "serverURL": serverURL, "currencyURL": currencyURL }}>
            <NavigationContainer >
                <Stack.Navigator initialRouteName="Home" >
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                    <Stack.Screen name="About" component={AboutScreen} />
                    <Stack.Screen name="Category" component={CategoryScreen} />
                    <Stack.Screen name="Area" component={AreaScreen} />
                    <Stack.Screen name="Volume" component={VolumeScreen} />
                    <Stack.Screen name="Speed" component={SpeedScreen} />
                    <Stack.Screen name="Length" component={LengthScreen} />
                    <Stack.Screen name="Weight" component={WeightScreen} />
                    <Stack.Screen name="Currency" component={CurrencyScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </ValueProvider>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: "40%",
        height: "40%",
    },
    containerHome: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "grey",
    },
    containerCategory: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "grey",
    },
    rowCategory: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    buttonView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    categoryText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    categoryArea: {
        backgroundColor: "red",
        height: 200,
        width: 200,
        justifyContent: "center",
        alignItems: "center",
    },
    categoryLength: {
        backgroundColor: "yellow",
        height: 200,
        width: 200,
        justifyContent: "center",
        alignItems: "center",
    },
    categorySpeed: {
        backgroundColor: "pink",
        height: 200,
        width: 200,
        justifyContent: "center",
        alignItems: "center",
    },
    categoryWeight: {
        backgroundColor: "blue",
        height: 200,
        width: 200,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default App;