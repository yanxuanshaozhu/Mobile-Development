import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useValue } from "./ValueContext";

const LogoutScreen = ({ navigation }) => {
    const { currentValue, setCurrentValue } = useValue();
    const [display, setDisplay] = useState(false);

    let displayView = <View></View>
    if (display) {
        displayView = <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <Button
                title="home page"
                onPress={() => navigation.navigate('Home')}
            />
            <Button
                title="start conversion"
                onPress={() => navigation.navigate('Category')}
            />
            <Button
                title="login again"
                onPress={() => navigation.navigate('Login')}
            />
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
            <Button
                title="logout"
                onPress={() => userLogout()}
            />
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
