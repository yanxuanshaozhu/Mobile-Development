import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const LogoutScreen = ({ navigation, route }) => {
    const [display, setDisplay] = useState(false);

    let displayView = <View></View>
    if (display) {
        displayView = <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <Button
                title="home page"
                onPress={() => navigation.navigate('Home', { version: "CPA 5.0" })}
            />
            <Button
                title="start conversion"
                onPress={() => navigation.navigate('Category', { version: "CPA 5.0" })}
            />
            <Button
                title="login again"
                onPress={() => navigation.navigate('Login', { version: "CPA 5.0" })}
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
                <Text style={{ fontSize: 20, textAlign: "center" }}>Unit Converter version <Text style={{ color: "red" }}>{route.params.version}</Text></Text>
            </View>

            <View>
                <Text style={{ fontSize: 20, textAlign: "center" }}>Logout your account here</Text>
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
        justifyContent: "center",
        backgroundColor: "grey",
    },
});

export default LogoutScreen;
