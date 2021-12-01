import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useValue } from "./ValueContext";
import { useFocusEffect } from '@react-navigation/native';

const LogoutScreen = ({ navigation }) => {

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            setDisplay(false);
            return () => {
                isActive = false;
            };
        }, [])
    );
    const { currentValue, setCurrentValue } = useValue();
    const [display, setDisplay] = useState(false);

    let displayView = <View></View>
    if (display) {
        displayView = <View >
            <View style={{ alignItems: "center" }}>
                <Text> Logout successfully!</Text>
            </View>
            <View style={{ flexDirection: "row" }}>

                <TouchableOpacity
                    style={{ backgroundColor: "black", marginHorizontal: 5 }}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={{ color: "red", margin: 5 }}>Home Page</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ backgroundColor: "black", marginRight: 5 }}
                    onPress={() => navigation.navigate('Category')}
                >
                    <Text style={{ color: "red", margin: 5 }}>Start Conversion</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ backgroundColor: "black", marginRight: 5 }}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={{ color: "red", margin: 5 }}>Login Again</Text>
                </TouchableOpacity>
            </View>
        </View>
    }

    const userLogout = async () => {
        try {
            await AsyncStorage.clear();
            setDisplay(true);
        } catch (error) {
            console.dir(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 20 }}>Unit Converter version <Text style={{ color: "red" }}>{currentValue.version}</Text></Text>
                <Text style={{ fontSize: 20 }}>Logout your account here</Text>
            </View>
            <TouchableOpacity
                style={{ backgroundColor: "black" }}
                onPress={() => userLogout()}
            >
                <Text style={{ color: "red", margin: 5 }}>Logout</Text>
            </TouchableOpacity>
            {displayView}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "grey",
    },
});

export default LogoutScreen;
