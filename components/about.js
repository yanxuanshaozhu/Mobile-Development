import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';



const AboutScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={{ fontSize: 20 }}>
                    As an international student who came to the United States for the first time, I find it quite confusing with units that I'd never used in my home country. So I made this unit converter to help me do conversions.
                </Text>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 2, justifyContent: "center" }}>
                    <Text style={{ fontSize: 20, color: "#fcba03" }}>
                        You can choose do conversions in the following categories:
                    </Text>

                    <FlatList
                        data={[
                            { key: 'Area' },
                            { key: 'Length' },
                            { key: 'Speed' },
                            { key: 'Volume' },
                            { key: 'Weight' },
                            { key: 'Currency' },

                        ]}
                        renderItem={({ item }) => <Text style={{ fontSize: 20, textAlign: "center", color: "#fcba03" }}>{item.key}</Text>}
                    />

                </View>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
                <Button title="Start Conversion"
                    onPress={
                        () => navigation.navigate('Category')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "grey",
    },

});

export default AboutScreen;