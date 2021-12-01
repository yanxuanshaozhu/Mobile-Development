import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './components/home';
import RegisterScreen from './components/register';
import LoginScreen from './components/login';
import LogoutScreen from './components/logout';
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
const Drawer = createDrawerNavigator();

const CategoryStack = () => {
    return (
        <Stack.Navigator initialRouteName="Category">
            <Stack.Screen name="C" component={CategoryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Area" component={AreaScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Volume" component={VolumeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Speed" component={SpeedScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Length" component={LengthScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Weight" component={WeightScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Currency" component={CurrencyScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const App = () => {
    const currencyURL = configureData.currency;

    const serverURL = configureData.server;



    return (
        <ValueProvider value={{ "serverURL": serverURL, "currencyURL": currencyURL, "version": "CPA 5.0" }}>
            <NavigationContainer >
                <Drawer.Navigator initialRouteName="Home" screenOptions={{ drawerActiveTintColor: "red" }}>
                    <Drawer.Screen name="Home" component={HomeScreen} />
                    <Drawer.Screen name="About" component={AboutScreen} />
                    <Drawer.Screen name="Category" component={CategoryStack} />
                    <Drawer.Screen name="Register" component={RegisterScreen} />
                    <Drawer.Screen name="Login" component={LoginScreen} />
                    <Drawer.Screen name="Logout" component={LogoutScreen} />
                    <Drawer.Screen name="Profile" component={ProfileScreen} />
                </Drawer.Navigator>
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