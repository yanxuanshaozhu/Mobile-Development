import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenTemplate from './screenContainer';
import { useValue } from './ValueContext';
import Axios from "axios";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const AreaScreen = ({ navigation }) => {
    const { currentValue, setCurrentValue } = useValue();
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
                data: { userEmail: userInfo["userEmail"], area: value },
            });
        } catch (e) {
            console.log("ERROR IN STORING DATA");
        }
    }

    let saveView = <View></View>
    if (userInfo["registered"] === true) {
        saveView = <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
            <TouchableOpacity
                style={{ alignItems: "center", backgroundColor: "black" }}
                onPress={() => {
                    let area = `${num} ${itemValue1} ${itemValue2} ${output}`
                    storeData((area));
                }}
            >
                <Text style={{ color: "red", margin: 5 }}>Save Conversion Result</Text>
            </TouchableOpacity>
        </View>
    }

    const left = <View style={styles.containerAreaLeft}>
        <TextInput
            style={{ flex: 1, backgroundColor: "#03fc77", textAlign: "center", fontSize: 10 }}
            onChangeText={(num) => setNum(num)}
            value={num.toString()}
            keyboardType="numeric" />

        <Picker
            selectedValue={itemValue1}
            onValueChange={(itemValue1, itemIndex) =>
                setItemValue1(itemValue1)
            }
            style={{ flex: 2 }}
            itemStyle={{ fontSize: 10 }}>
            <Picker.Item label="Are" value="are" />
            <Picker.Item label="Square Kilometer" value="km2" />
            <Picker.Item label="Square Meter" value="m2" />
            <Picker.Item label="Square Decimeter" value="dm2" />
            <Picker.Item label="Square Centimeter" value="cm2" />
            <Picker.Item label="Square MilliMeter" value="mm2" />
            <Picker.Item label="Acre" value="acre" />
        </Picker>
    </View>

    const right = <View style={styles.containerAreaRight}>
        <Text style={{ flex: 1, textAlign: "center", backgroundColor: "#4287f5", fontSize: 10 }}> {num === 0 ? init.toFixed(2) : output.toFixed(6)} </Text>
        <Picker
            selectedValue={itemValue2}
            onValueChange={(itemValue2, itemIndex) =>
                setItemValue2(itemValue2)
            }
            style={{ flex: 2 }}
            itemStyle={{ fontSize: 10 }}>
            <Picker.Item label="Are" value="are" />
            <Picker.Item label="Square Kilometer" value="km2" />
            <Picker.Item label="Square Meter" value="m2" />
            <Picker.Item label="Square Decimeter" value="dm2" />
            <Picker.Item label="Square Centimeter" value="cm2" />
            <Picker.Item label="Square Millimeter" value="mm2" />
            <Picker.Item label="Acre" value="acre" />
        </Picker>
    </View>

    return (
        <View style={styles.containerArea}>
            <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontSize: 20}}>Unit Converter Version <Text style={{ color: "red" }}>{currentValue.version}</Text></Text>
                <Text style={{ fontSize: 20}}> Convert Area Units Here</Text>
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
        </View >

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
    containerAreaRight: {
        flex: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
    }
});

export default AreaScreen;