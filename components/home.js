import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.containerHome} >
            <Image
                source={require("../assets/icon.png")}
                style={styles.backgroundImage} />
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 35 }}> Unit Converter </Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Button title="Go to App Description"
                            onPress={
                                () => navigation.navigate('About')}
                        />
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Button title="Start Conversion"
                            onPress={
                                () => navigation.navigate('Category')}
                        />
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Button title="Register to view history"
                            onPress={
                                () => navigation.navigate('Register', {version: "CPA 3.0"})}
                        />
                    </View>

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    containerHome: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "grey",
    }
});

export default HomeScreen;