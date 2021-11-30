import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.containerHome} >
            <Image
                source={require("../assets/icon.png")}
                style={styles.backgroundImage} />
            <View style={{ flex: 1, justifyContent: "center" }}>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 40 }}> Unit Converter </Text>
                    </View>

                    <View style={{ flexDirection: "row", flex: 1, alignItems: "center", justifyContent: "space-around" }}>
                        <View style={{ flex: 1, justifyContent: "center", marginRight: 2 }}>
                            <TouchableOpacity
                                style={{ backgroundColor: "black", alignItems: "center", height: 60, justifyContent: "center" }}
                                onPress={
                                    () => navigation.navigate('About')}
                            >
                                <Text style={{ color: "red", fontSize: 20, margin: 3 }}> App Description</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", marginLeft: 2 }}>
                            <TouchableOpacity
                                style={{ backgroundColor: "black", alignItems: "center", height: 60, justifyContent: "center" }}
                                onPress={
                                    () => navigation.navigate('Category')}
                            >
                                <Text style={{ color: "red", fontSize: 20, margin: 3 }}> Start Conversion</Text>
                            </TouchableOpacity>
                        </View>
                    </View> 

                    <View style={{ flexDirection: "row", flex: 1, alignItems: "center", justifyContent: "space-around" }}>
                        <View style={{ flex: 1, justifyContent: "center", marginRight: 1, marginLeft: 1 }}>
                            <TouchableOpacity
                                style={{ backgroundColor: "black", alignItems: "center", height: 60, justifyContent: "center" }}
                                onPress={
                                    () => navigation.navigate('Register', { version: "CPA 5.0" })}
                            >
                                <Text style={{ color: "red", fontSize: 16, margin: 2 }}>Register</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", marginRight: 1, marginLeft: 1 }}>
                            <TouchableOpacity
                                style={{ backgroundColor: "black", alignItems: "center", height: 60, justifyContent: "center" }}
                                onPress={
                                    () => navigation.navigate('Login', { version: "CPA 5.0" })}
                            >
                                <Text style={{ color: "red", fontSize: 16, margin: 2 }}> Login</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", marginRight: 1, marginLeft: 1 }}>
                            <TouchableOpacity
                                style={{ backgroundColor: "black", alignItems: "center", height: 60, justifyContent: "center" }}
                                onPress={
                                    () => navigation.navigate('Logout', { version: "CPA 5.0" })}
                            >
                                <Text style={{ color: "red", fontSize: 16, margin: 2 }}> Logout</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", marginRight: 1, marginLeft: 1 }}>
                            <TouchableOpacity
                                style={{ backgroundColor: "black", alignItems: "center", height: 60, justifyContent: "center" }}
                                onPress={
                                    () => navigation.navigate('Profile', { version: "CPA 5.0" })}
                            >
                                <Text style={{ color: "red", fontSize: 16, margin: 2 }}> Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        height: 400,
        width: 400,
    },
    containerHome: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "grey",
    }
});

export default HomeScreen;