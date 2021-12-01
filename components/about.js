import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AboutText from './aboutText';
import ValueProvider from './ValueContext';
import { useValue } from './ValueContext';


const AboutScreen = ({ navigation }) => {
    const { currentValue, setCurrentValue } = useValue();
    const data = { text: "As an international student who came to the United States for the first time, I find it quite confusing with units that I'd never used in my home country. So I made this unit converter to help me do conversions." }
    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 20, textAlign: "center" }}>Unit Converter version <Text style={{ color: "red" }}>{currentValue.version}</Text></Text>
            </View>
            <ValueProvider value={data}>
                <AboutText />
            </ValueProvider>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 2, justifyContent: "center" }}>
                    <Text style={{ fontSize: 20, color: "black" }}>
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
                        renderItem={({ item }) => <Text style={{ fontSize: 20, textAlign: "center", color: "black" }}>{item.key}</Text>}
                    />

                </View>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
                <TouchableOpacity
                    style={{ backgroundColor: "black" }}
                    onPress={
                        () => navigation.navigate('Category')}
                >
                    <Text style={{ color: "red", margin: 5 }}>Start Conversion</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "grey",
        justifyContent: "flex-start"
    },

});

export default AboutScreen;