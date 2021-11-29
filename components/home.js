import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.containerHome} >
            <Image
                source={require("../assets/icon.png")}
                style={styles.backgroundImage} />
            <View style={{ flex: 1, justifyContent: "center" }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={{ flex: 1, marginBottom: -20, marginTop: 100 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 40 }}> Unit Converter </Text>
                    </View>
                    <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-around", alignItems: "center" }}>
                        <Text
                            style={{ backgroundColor: "black", color: "red", fontSize: 20, margin: 10 }}
                            onPress={
                                () => navigation.navigate('About')}
                        > App Description</Text>
                        <Text
                            style={{ backgroundColor: "black", color: "red", fontSize: 20, margin: 10 }}
                            onPress={
                                () => navigation.navigate('Category')}
                        > Start Conversion</Text>
                    </View>
                    <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-around", alignItems: "center" }}>
                        <Text
                            style={{ backgroundColor: "black", color: "red", fontSize: 20, margin: 10 }}
                            onPress={
                                () => navigation.navigate('Register', { version: "CPA 5.0" })}
                        > Register</Text>
                        <Text
                            style={{ backgroundColor: "black", color: "red", fontSize: 20, margin: 10 }}
                            onPress={
                                () => navigation.navigate('Login', { version: "CPA 5.0" })}
                        > Login</Text>
                        <Text
                            style={{ backgroundColor: "black", color: "red", fontSize: 20, margin: 10 }}
                            onPress={
                                () => navigation.navigate('Logout', { version: "CPA 5.0" })}
                        > Logout</Text>
                        <Text
                            style={{ backgroundColor: "black", color: "red", fontSize: 20, margin: 10 }}
                            onPress={
                                () => navigation.navigate('Profile', { version: "CPA 5.0" })}
                        > Profile</Text>
                    </View>
                </View>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'contain'
    },
    containerHome: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "grey",
    }
});

export default HomeScreen;