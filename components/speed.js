import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenTemplate from './screenContainer';
import { useValue } from './ValueContext';
import Axios from "axios";

const SpeedScreen = ({ navigation }) => {
    const { currentValue, setCurrentValue } = useValue();
    const [userInfo, setUserInfo] = useState({});
    const [num, setNum] = useState(0);
    const [itemValue1, setItemValue1] = useState("km/h");
    const [itemValue2, setItemValue2] = useState("km/h");

    const speedMapping = { "km/h": 1, "m/s": 0.2777777778, "mph": 0.6213711922, "ft/min": 54.68066492, "c(v)": 0.00000000149116, "Mach(a)": 0.0008093758094, "Mach(w)": 0.000187181791 };
    const init = 0;
    const output = num * speedMapping[itemValue2] / speedMapping[itemValue1];

    useEffect(() => { getData() }
        , [])

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("@userData");
            if (jsonValue != null) {
                let info = JSON.parse(jsonValue);
                setUserInfo(info);
            }
        } catch (e) {
            console.dir(e);
        }
    }


    const storeData = async (value) => {
        try {
            let serverURL = currentValue.serverURL;
            const response = await Axios({
                method: "post",
                url: "/setUserActivity",
                baseURL: serverURL,
                data: { userEmail: userInfo["userEmail"], speed: value },
            });
        } catch (e) {
            console.log("ERROR IN STORING DATA");
        }
    }

    let saveView = <View></View>
    if (userInfo.registered) {
        saveView = <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
            <TouchableOpacity
                style={{ alignItems: "center", backgroundColor: "black" }}
                onPress={() => {
                    let speed = `${num} ${itemValue1} ${itemValue2} ${output}`
                    storeData(speed);
                }}
            >
                <Text style={{ color: "red", margin: 5 }}>Save Conversion Result</Text>
            </TouchableOpacity>
        </View>
    }

    const left = <View style={styles.containerSpeedLeft}>
        <TextInput
            style={{ flex: 1, backgroundColor: "#03fc77", textAlign: "center", fontSize: 10 }}
            onChangeText={(num) => setNum(num)}
            value={num.toString()}
            keyboardType="numeric">
        </TextInput>
        <Picker
            selectedValue={itemValue1}
            onValueChange={(itemValue1, itemIndex) =>
                setItemValue1(itemValue1)
            }
            style={{ flex: 2 }}
            itemStyle={{ fontSize: 10 }}>
            <Picker.Item label="Kilometer per Hour" value="km/h" />
            <Picker.Item label="Meter per Second" value="m/s" />
            <Picker.Item label="Mile per Hour" value="mph" />
            <Picker.Item label="Feet per Minute" value="ft/min" />
            <Picker.Item label="Speed of Light" value="c(v)" />
            <Picker.Item label="Speed of Sound(air)" value="Mach(a)" />
            <Picker.Item label="Speed of Sound(water)" value="Mach(w)" />
        </Picker>
    </View>

    const right = <View style={styles.containerSpeedRight}>
        <Text style={{ flex: 1, textAlign: "center", backgroundColor: "#4287f5", fontSize: 10 }}> {num === 0 ? init.toFixed(2) : output.toFixed(10)} </Text>
        <Picker
            selectedValue={itemValue2}
            onValueChange={(itemValue2, itemIndex) =>
                setItemValue2(itemValue2)
            }
            style={{ flex: 2 }}
            itemStyle={{ fontSize: 10 }}>
            <Picker.Item label="Kilometer per Hour" value="km/h" />
            <Picker.Item label="Meter per Second" value="m/s" />
            <Picker.Item label="Mile per Hour" value="mph" />
            <Picker.Item label="Feet per Minute" value="ft/min" />
            <Picker.Item label="Speed of Light" value="c(v)" />
            <Picker.Item label="Speed of Sound(air)" value="Mach(a)" />
            <Picker.Item label="Speed of Sound(water)" value="Mach(w)" />
        </Picker>
    </View>


    return (
        <View style={styles.containerSpeed}>
            <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontSize: 20 }}>Unit Converter Version <Text style={{ color: "red" }}>{currentValue.version}</Text></Text>
                <Text style={{ fontSize: 20 }}> Convert Speed Units Here</Text>
                <ScreenTemplate
                    left={left}
                    right={right}
                />
                <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
                    <TouchableOpacity
                        style={{ alignItems: "center", backgroundColor: "black" }}
                        onPress={() => navigation.navigate("C")}
                    >
                        <Text style={{ color: "red", margin: 5 }}>Back to Category</Text>

                    </TouchableOpacity>
                </View>
            </View>
            {saveView}
        </View>
    );
};

const styles = StyleSheet.create({
    containerSpeed: {
        flex: 1,
        backgroundColor: "grey",
    },
    containerSpeedLeft: {
        flex: 4,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    containerSpeedRight: {
        flex: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
    }
});

export default SpeedScreen;