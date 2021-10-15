import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LengthScreen = () => {
    const [userInfo, setUserInfo] = useState({});
    const [num, setNum] = useState(0);
    const [itemValue1, setItemValue1] = useState("km")
    const [itemValue2, setItemValue2] = useState("km")


    const lengthMapping = { "km": 1, "m": 1000, "mile": 0.621371, "yard": 1093.612959995625, "ft": 3280.838879986874872, "in": 39370.066559842496645 }
    const init = 0;
    const output = num * lengthMapping[itemValue2] / lengthMapping[itemValue1];

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
                    const length = { i1: num, i2: itemValue1, i3: itemValue2, i4: output }
                    userInfo.length = length;
                    storeData(userInfo);
                }}
            />
        </View>
    }

    return (
        <View style={styles.containerLength}>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={styles.containerLengthLeft}>
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
                        <Picker.Item label="Kilometer Meter" value="km" />
                        <Picker.Item label="Meter" value="m" />
                        <Picker.Item label="Mile" value="mile" />
                        <Picker.Item label="Yard" value="yard" />
                        <Picker.Item label="Feet" value="ft" />
                        <Picker.Item label="Inch" value="in" />
                    </Picker>
                </View>
                <View style={styles.containerLengthMiddle}>
                    <Text>
                        =
                    </Text>
                </View>
                <View style={styles.containerLengthRight}>
                    <Text style={{ flex: 1, textAlign: "center", backgroundColor: "#4287f5" }}> {num === 0 ? init.toFixed(2) : output.toFixed(6)} </Text>
                    <Picker
                        selectedValue={itemValue2}
                        onValueChange={(itemValue2, itemIndex) =>
                            setItemValue2(itemValue2)
                        }
                        style={{ flex: 1 }}>
                        <Picker.Item label="Kilometer Meter" value="km" />
                        <Picker.Item label="Meter" value="m" />
                        <Picker.Item label="Mile" value="mile" />
                        <Picker.Item label="Yard" value="yard" />
                        <Picker.Item label="Feet" value="ft" />
                        <Picker.Item label="Inch" value="in" />
                    </Picker>

                </View>
            </View>
            {saveView}
        </View>
    );
};


const styles = StyleSheet.create({
    containerLength: {
        flex: 1,
        backgroundColor: "grey",
    },
    containerLengthLeft: {
        flex: 4,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    containerLengthMiddle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    containerLengthRight: {
        flex: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
    }
});

export default LengthScreen;