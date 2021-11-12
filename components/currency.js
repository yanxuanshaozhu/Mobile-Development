import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenTemplate from "./screencontainer.js";

const CurrencyScreen = () => {
    const [userInfo, setUserInfo] = useState({});
    const [num, setNum] = useState(0);
    const [itemValue1, setItemValue1] = useState("USD");
    const [itemValue2, setItemValue2] = useState("USD");
    const [data, setData] = useState({});

    const init = 0;
    const output = num * data[itemValue2] / data[itemValue1];

    useEffect(() => {
        getData();
        getRates();
    }
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

    const getRates = async () => {
        try {
            const response = await fetch('https://openexchangerates.org/api/latest.json?app_id=3fde0830b3a24434957729d6ffae3f4b');
            const json = await response.json();
            setData(json.rates);
            let userInfo = null
            if (jsonValue != null) {
                userInfo = JSON.parse(jsonValue);
                setUserInfo(userInfo);

            }
        } catch (e) {
            console.log("ERROR IN READING DATA");
        }
    }

    let saveView = <View></View>
    if (userInfo.registered) {
        saveView = <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>

            <Button
                title="Save data"
                onPress={() => {
                    const currency = { i1: num, i2: itemValue1, i3: itemValue2, i4: output }
                    userInfo.currency = currency;
                    storeData(userInfo);
                }}
            />
        </View>
    }

    const left = <View style={styles.containerCurrencyLeft}>
        <TextInput
            style={{ flex: 1, backgroundColor: "#03fc77", textAlign: "center", fontSize: 10 }}
            onChangeText={(num) => setNum(parseFloat(num))}
            value={num}
            keyboardType="numeric">
        </TextInput>
        <Picker
            selectedValue={itemValue1}
            onValueChange={(itemValue1, itemIndex) =>
                setItemValue1(itemValue1)
            }
            style={{ flex: 2 }}
            itemStyle={{ fontSize: 10 }}>
            <Picker.Item label="United States Dollar" value="USD" />
            <Picker.Item label="Chinese Yuan" value="CNY" />
            <Picker.Item label="Great Britain Pound" value="GBP" />
            <Picker.Item label="Euro" value="EUR" />
            <Picker.Item label="Canadian Dollar" value="CAD" />
            <Picker.Item label="Hong Kong Dollar" value="HKD" />
            <Picker.Item label="Indian Rupee" value="INR" />
        </Picker>
    </View>

    const right = <View style={styles.containerCurrencyRight}>
        <Text style={{ flex: 1, textAlign: "center", backgroundColor: "#4287f5", fontSize: 10 }}> {num === 0 ? init.toFixed(2) : output.toFixed(6)} </Text>
        <Picker
            selectedValue={itemValue2}
            onValueChange={(itemValue2, itemIndex) =>
                setItemValue2(itemValue2)
            }
            style={{ flex: 2 }}
            itemStyle={{ fontSize: 10 }}>
            <Picker.Item label="United States Dollar" value="USD" />
            <Picker.Item label="Chinese Yuan" value="CNY" />
            <Picker.Item label="Great Britain Pound" value="GBP" />
            <Picker.Item label="Euro" value="EUR" />
            <Picker.Item label="Canadian Dollar" value="CAD" />
            <Picker.Item label="Hong Kong Dollar" value="HKD" />
            <Picker.Item label="Indian Rupee" value="INR" />
        </Picker>
    </View>


    return (
        <View style={styles.containerCurrency}>
            <ScreenTemplate
                left={left}
                right={right}
            />
            {saveView}
        </View>

    );
};

const styles = StyleSheet.create({
    containerCurrency: {
        flex: 1,
        backgroundColor: "grey",
    },
    containerCurrencyLeft: {
        flex: 4,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    containerCurrencyMiddle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    containerCurrencyRight: {
        flex: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
    }
});
export default CurrencyScreen;