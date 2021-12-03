import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenTemplate from './screenContainer';
import { useValue } from './ValueContext';
import Axios from "axios";
import { useFocusEffect } from '@react-navigation/native';

const WeightScreen = ({ navigation }) => {
    const { currentValue, setCurrentValue } = useValue();
    const [userInfo, setUserInfo] = useState({});
    const [num, setNum] = useState(0);
    const [itemValue1, setItemValue1] = useState("kg");
    const [itemValue2, setItemValue2] = useState("kg");


    const weightMapping = { "kg": 1, "gr": 1000, "lb": 2.204622622, "oz": 35.27396195, "grain": 15432.35835 };
    const init = 0;
    const output = num * weightMapping[itemValue2] / weightMapping[itemValue1];

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
                data: { userEmail: userInfo["userEmail"], weight: value },
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
                    let weight = `${num} ${itemValue1} ${itemValue2} ${output}`
                    storeData(weight);
                }}
            >
                <Text style={{ color: "red", margin: 5 }}>Save Conversion Result</Text>
            </TouchableOpacity>
        </View>
    }

    const left = <View style={styles.containerWeightLeft}>
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
            <Picker.Item label="Kilogram" value="kg" />
            <Picker.Item label="Gram" value="gr" />
            <Picker.Item label="Pound" value="lb" />
            <Picker.Item label="Ounce" value="oz" />
            <Picker.Item label="Grain" value="grain" />
        </Picker>
    </View>

    const right = <View style={styles.containerWeightRight}>
        <Text style={{ flex: 1, textAlign: "center", backgroundColor: "#4287f5", fontSize: 10 }}> {num === 0 ? init.toFixed(2) : output.toFixed(6)} </Text>
        <Picker
            selectedValue={itemValue2}
            onValueChange={(itemValue2, itemIndex) =>
                setItemValue2(itemValue2)
            }
            style={{ flex: 2 }}
            itemStyle={{ fontSize: 10 }}>
            <Picker.Item label="Kilogram" value="kg" />
            <Picker.Item label="Gram" value="gr" />
            <Picker.Item label="Pound" value="lb" />
            <Picker.Item label="Ounce" value="oz" />
            <Picker.Item label="Grain" value="grain" />
        </Picker>
    </View>


    return (
        <View style={styles.containerWeight}>
            <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontSize: 20 }}>Unit Converter Version <Text style={{ color: "red" }}>{currentValue.version}</Text></Text>
                <Text style={{ fontSize: 20 }}> Convert Weight Units Here</Text>
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
    containerWeightRight: {
        flex: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
    }
});


export default WeightScreen;