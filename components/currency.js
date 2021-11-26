import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenTemplate from './screenContainer';
import { useValue } from './ValueContext';
import Axios from "axios";

const CurrencyScreen = () => {
    const { currentValue, setCurrentValue } = useValue();
    const [userInfo, setUserInfo] = useState({});
    const [num, setNum] = useState(0);
    const [itemValue1, setItemValue1] = useState("USD");
    const [itemValue2, setItemValue2] = useState("USD");
    const [data, setData] = useState({});

    useEffect(() => {
        getData();
        getRates();
    }
        , [])
    const init = 0;
    const output = num * data[itemValue2] / data[itemValue1];

    const currencyURL = currentValue.currencyURL;


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
                data: { userEmail: userInfo["userEmail"], currency: value },
            });
        } catch (e) {
            console.log("ERROR IN STORING DATA");
        }
    }

    const getRates = async () => {
        try {
            const response = await Axios({
                method: "get",
                url: currencyURL
            })
            setData(response.data.rates);
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
                    let currency = `${num} ${itemValue1} ${itemValue2} ${output}`
                    storeData(currency);
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