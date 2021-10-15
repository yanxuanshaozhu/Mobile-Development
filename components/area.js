import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AreaScreen = () => {
    const [userInfo, setUserInfo] = useState({});
    const [num, setNum] = useState(0);
    const [itemValue1, setItemValue1] = useState("are");
    const [itemValue2, setItemValue2] = useState("are");

    const areaMapping = { "are": 1, "km2": 0.0001, "m2": 100, "dm2": 10000, "cm2": 1000000, "mm2": 100000000, "acre": 0.0247105 };
    const init = 0;
    const output = num * areaMapping[itemValue2] / areaMapping[itemValue1];

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
                    const area = { i1: num, i2: itemValue1, i3: itemValue2, i4: output}
                    userInfo.area = area;
                    storeData(userInfo);
                }}
            />
        </View>
    }

    return (
        <View style={styles.containerArea}>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={styles.containerAreaLeft}>
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
                        <Picker.Item label="Are" value="are" />
                        <Picker.Item label="Square Kilometer" value="km2" />
                        <Picker.Item label="Square Meter" value="m2" />
                        <Picker.Item label="Square Decimeter" value="dm2" />
                        <Picker.Item label="Square Centimeter" value="cm2" />
                        <Picker.Item label="Square MilliMeter" value="mm2" />
                        <Picker.Item label="Acre" value="acre" />
                    </Picker>
                </View>
                <View style={styles.containerAreaMiddle}>
                    <Text>
                        =
                    </Text>
                </View>
                <View style={styles.containerAreaRight}>
                    <Text style={{ flex: 1, textAlign: "center", backgroundColor: "#4287f5" }}> {num === 0 ? init.toFixed(2) : output.toFixed(6)} </Text>
                    <Picker
                        selectedValue={itemValue2}
                        onValueChange={(itemValue2, itemIndex) =>
                            setItemValue2(itemValue2)
                        }
                        style={{ flex: 1 }}>
                        <Picker.Item label="Are" value="are" />
                        <Picker.Item label="Square Kilometer" value="km2" />
                        <Picker.Item label="Square Meter" value="m2" />
                        <Picker.Item label="Square Decimeter" value="dm2" />
                        <Picker.Item label="Square Centimeter" value="cm2" />
                        <Picker.Item label="Square Millimeter" value="mm2" />
                        <Picker.Item label="Acre" value="acre" />
                    </Picker>
                </View>


            </View>
            {saveView}
        </View>
    );
};

const styles = StyleSheet.create({
    containerArea: {
        flex: 1,
        backgroundColor: "grey",
    },
    containerAreaLeft: {
        flex: 4,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    containerAreaMiddle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    containerAreaRight: {
        flex: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
    }
});

export default AreaScreen;