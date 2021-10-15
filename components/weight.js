import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WeightScreen = () => {
    const [userInfo, setUserInfo] = useState({});
    const [num, setNum] = useState(0);
    const [itemValue1, setItemValue1] = useState("kg");
    const [itemValue2, setItemValue2] = useState("kg");


    const weightMapping = { "kg": 1, "gr": 1000, "lb": 2.204622622, "oz": 35.27396195, "grain": 15432.35835 };
    const init = 0;
    const output = num * weightMapping[itemValue2] / weightMapping[itemValue1];

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
                    const weight = { i1: num, i2: itemValue1, i3: itemValue2, i4: output }
                    userInfo.weight = weight;
                    storeData(userInfo);
                }}
            />
        </View>
    }

    return (
        <View style={styles.containerWeight}>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={styles.containerWeightLeft}>
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
                        <Picker.Item label="Kilogram" value="kg" />
                        <Picker.Item label="Gram" value="gr" />
                        <Picker.Item label="Pound" value="lb" />
                        <Picker.Item label="Ounce" value="oz" />
                        <Picker.Item label="Grain" value="grain" />
                    </Picker>
                </View>
                <View style={styles.containerWeightMiddle}>
                    <Text>
                        =
                    </Text>
                </View>
                <View style={styles.containerWeightRight}>
                    <Text style={{ flex: 1, textAlign: "center", backgroundColor: "#4287f5" }}> {num === 0 ? init.toFixed(2) : output.toFixed(6)} </Text>
                    <Picker
                        selectedValue={itemValue2}
                        onValueChange={(itemValue2, itemIndex) =>
                            setItemValue2(itemValue2)
                        }
                        style={{ flex: 1 }}>
                        <Picker.Item label="Kilogram" value="kg" />
                        <Picker.Item label="Gram" value="gr" />
                        <Picker.Item label="Pound" value="lb" />
                        <Picker.Item label="Ounce" value="oz" />
                        <Picker.Item label="Grain" value="grain" />
                    </Picker>
                </View>
            </View>
            {saveView}
        </View>
    );
};

const styles = StyleSheet.create({
    containerWeight: {
        flex: 1,
        backgroundColor: "grey",
    },
    containerWeightLeft: {
        flex: 4,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    containerWeightMiddle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    containerWeightRight: {
        flex: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
    }
});


export default WeightScreen;