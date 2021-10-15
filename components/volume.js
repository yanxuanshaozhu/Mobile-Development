import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VolumeScreen = () => {
    const [userInfo, setUserInfo] = useState({});
    const [num, setNum] = useState(0);
    const [itemValue1, setItemValue1] = useState("m3");
    const [itemValue2, setItemValue2] = useState("m3");


    const volumeMapping = { "m3": 1, "dm3": 1000, "barrel": 6.28981077, "gal": 264.1720524, "fl oz": 33814.0227, "pint": 2113.376419, "quart": 1056.688209, "tspn": 202884.1362, "cup": 4226.752838 };
    const init = 0;
    const output = num * volumeMapping[itemValue2] / volumeMapping[itemValue1];

    useEffect(() => { getData() }
        , [])

    const getData = async () => {
        try {

            const jsonValue = await AsyncStorage.getItem('@User_info');
            let userInfo = null
            if (jsonValue != null) {
                userInfo = JSON.parse(jsonValue);
                setUserInfo(userInfo);

            }
        } catch (e) {
            console.log("ERROR IN READING DATA");
            console.dir(e);
        }
    }


    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('@User_info', jsonValue);
        } catch (e) {
            console.log("ERROR IN STORING DATA");
        }
    }

    let saveView = ""
    if (userInfo.registered) {
        saveView = <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>

            <Button
                title="Save data"
                onPress={() => {
                    const volume = { i1: num, i2: itemValue1, i3: itemValue2, i4: output }
                    userInfo.volume = volume;
                    storeData(userInfo);
                }}
            />
        </View>
    }

    return (
        <View style={styles.containerVolume}>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={styles.containerVolumeLeft}>
                    <TextInput
                        style={{ flex: 1, backgroundColor: "#03fc77", textAlign: "center" }}
                        onChangeText={(num) => setNum(parseFloat(num))}
                        value={num}
                        keyboardType="numeric">
                    </TextInput>
                    <Picker
                        selectedValue={itemValue1}
                        onValueChange={(itemValue1, itemIndex) =>
                            setItemValue1(itemValue1)

                        }
                        style={{ flex: 1 }}>
                        <Picker.Item label="Cubic Meter" value="m3" />
                        <Picker.Item label="Liter(Cubic dm)" value="dm3" />
                        <Picker.Item label="US Barrel" value="barrel" />
                        <Picker.Item label="US Liquid Gallon" value="gal" />
                        <Picker.Item label="US Fluid Ounce" value="fl oz" />
                        <Picker.Item label="US Pint" value="pint" />
                        <Picker.Item label="US Quart" value="quart" />
                        <Picker.Item label="US Teaspoon" value="tspn" />
                        <Picker.Item label="US Cup" value="cup" />
                    </Picker>
                </View>
                <View style={styles.containerVolumeMiddle}>
                    <Text>
                        =
                    </Text>
                </View>
                <View style={styles.containerVolumeRight}>
                    <Text style={{ flex: 1, textAlign: "center", backgroundColor: "#4287f5" }}> {num === 0 ? init.toFixed(2) : output.toFixed(6)} </Text>
                    <Picker
                        selectedValue={itemValue2}
                        onValueChange={(itemValue2, itemIndex) =>
                            setItemValue2(itemValue2)
                        }
                        style={{ flex: 1 }}>
                        <Picker.Item label="Cubic Meter" value="m3" />
                        <Picker.Item label="Liter(Cubic dm)" value="dm3" />
                        <Picker.Item label="US Barrel" value="barrel" />
                        <Picker.Item label="US Liquid Gallon" value="gal" />
                        <Picker.Item label="US Fluid Ounce" value="fl oz" />
                        <Picker.Item label="US Pint" value="pint" />
                        <Picker.Item label="US Quart" value="quart" />
                        <Picker.Item label="US Teaspoon" value="tspn" />
                        <Picker.Item label="US Cup" value="cup" />
                    </Picker>
                </View>
            </View>
            {saveView}
        </View >
    );
};


const styles = StyleSheet.create({
    containerVolume: {
        flex: 1,
        backgroundColor: "grey",
    },
    containerVolumeLeft: {
        flex: 4,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    containerVolumeMiddle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    containerVolumeRight: {
        flex: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
    }
});

export default VolumeScreen;