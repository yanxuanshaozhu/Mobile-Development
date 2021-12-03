import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenTemplate from './screenContainer';
import { useValue } from './ValueContext';
import Axios from "axios";
import { useFocusEffect } from '@react-navigation/native';

const VolumeScreen = ({ navigation }) => {
    const { currentValue, setCurrentValue } = useValue();
    const [userInfo, setUserInfo] = useState({});
    const [num, setNum] = useState(0);
    const [itemValue1, setItemValue1] = useState("m3");
    const [itemValue2, setItemValue2] = useState("m3");


    const volumeMapping = { "m3": 1, "dm3": 1000, "barrel": 6.28981077, "gal": 264.1720524, "fl oz": 33814.0227, "pint": 2113.376419, "quart": 1056.688209, "tspn": 202884.1362, "cup": 4226.752838 };
    const init = 0;
    const output = num * volumeMapping[itemValue2] / volumeMapping[itemValue1];

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            getData();
            return () => {
                isActive = false;
            };
        }, [])
    );

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("@userData");
            if (jsonValue != null) {
                let info = JSON.parse(jsonValue);
                setUserInfo(info);
            } else { setUserInfo({ "registered": false }) }
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
                data: { userEmail: userInfo["userEmail"], volume: value },
            });
        } catch (e) {
            console.log("ERROR IN STORING DATA");
        }
    }

    let saveView = <View></View>;
    if (userInfo.registered) {
        saveView = <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
            <TouchableOpacity
                style={{ alignItems: "center", backgroundColor: "black" }}
                onPress={() => {
                    let volume = `${num} ${itemValue1} ${itemValue2} ${output}`
                    storeData(volume);
                }}
            >
                <Text style={{ color: "red", margin: 5 }}>Save Conversion Result</Text>
            </TouchableOpacity>
        </View>
    }

    const left = <View style={styles.containerVolumeLeft}>
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
            itemStyle={{ fontSize: 10 }}
        >
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

    const right = <View style={styles.containerVolumeRight}>
        <Text style={{ flex: 1, textAlign: "center", backgroundColor: "#4287f5", fontSize: 10 }}> {num === 0 ? init.toFixed(2) : output.toFixed(6)} </Text>
        <Picker
            selectedValue={itemValue2}
            onValueChange={(itemValue2, itemIndex) =>
                setItemValue2(itemValue2)
            }
            style={{ flex: 2 }}
            itemStyle={{ fontSize: 10 }}>
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
    return (
        <View style={styles.containerVolume}>
            <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontSize: 20 }}>Unit Converter Version <Text style={{ color: "red" }}>{currentValue.version}</Text></Text>
                <Text style={{ fontSize: 20 }}> Convert Volume Units Here</Text>
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
    containerVolumeRight: {
        flex: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
    }
});

export default VolumeScreen;