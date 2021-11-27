import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from "axios";
import { useValue } from './ValueContext';
import { FlatList } from 'react-native-gesture-handler';


const ProfileScreen = () => {
    const { currentValue, setCurrentValue } = useValue()
    const [userInfo, setUserInfo] = useState({ userEmail: "", userName: "", registeredAt: "" });
    const [userActivity, setUserActivity] = useState({});
    const [display, setDisplay] = useState(false);

    const areaName = { "are": "Are", "km2": "Square Kilometer", "m2": "Square Meter", "dm2": "Square Decimeter", "cm2": "Square Centimeter", "mm2": "Square MilliMeter", "acre": "Acre" };
    const lengthName = { "km": "Kilometer Meter", "m": "Meter", "mile": "Mile", "yard": "Yard", "ft": "Feet", "in": "Inch" };
    const speedName = { "km/h": "Kilometer per Hour", "m/s": "Meter per Second", "mph": "Mile per Hour", "ft/min": "Feet per Minute", "c(v)": "Speed of Light", "Mach(a)": "Speed of Sound(air)", "Mach(w)": "Speed of Sound(water)" };
    const volumeName = { "m3": "Cubic Meter", "dm3": "Liter(Cubic dm)", "barrel": "US Barrel", "gal": "US Liquid Gallon", "fl oz": "US Fluid Ounce", "pint": "US Pint", "quart": "US Quart", "tspn": "US Teaspoon", "cup": "US Cup" };
    const weightName = { "kg": "Kilogram", "gr": "Gram", "lb": "Pound", "oz": "Ounce", "grain": "Grain" };
    const currencyName = { "USD": "United States Dollar", "CNY": "Chinese Yuan", "GBP": "Great Britain Pound", "EUR": "EURO", "CAD": "Canadian Dollar", "HKD": "Hong Kong Dollar", "INR": "Indian Rupee" }


    useEffect(() => {
        getUserInfo();
    }
        , [])

    const getUserInfo = async () => {
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

    const getUserActivity = async () => {
        try {
            let email = userInfo.userEmail;
            let baseURL = currentValue.serverURL;
            Axios({
                method: "post",
                url: "/getUserActivity",
                baseURL: baseURL,
                data: { "userEmail": email },
            }).then((response) => {
                setUserActivity(response.data);
            })
        } catch (error) {
            console.dir(error);
        }
    }



    const renderArea = (item) => {
        let ls = item["item"].split(" ");
        return (
            <View style={{ justifyContent: "center" }}>
                <Text> {ls[0]} {areaName[ls[1]]} = {ls[3]} {areaName[ls[2]]}</Text>
            </View>
        );
    }
    const renderLength = (item) => {
        let ls = item["item"].split(" ");
        return (
            <View style={{ justifyContent: "center" }}>
                <Text> {ls[0]} {lengthName[ls[1]]} = {ls[3]} {lengthName[ls[2]]}</Text>
            </View>
        );
    }
    const renderSpeed = (item) => {
        let ls = item["item"].split(" ");
        return (
            <View style={{ justifyContent: "center" }}>
                <Text> {ls[0]} {speedName[ls[1]]} = {ls[3]} {speedName[ls[2]]}</Text>
            </View>
        );
    }
    const renderVolume = (item) => {
        let ls = item["item"].split(" ");
        return (
            <View style={{ justifyContent: "center" }}>
                <Text> {ls[0]} {volumeName[ls[1]]} = {ls[3]} {volumeName[ls[2]]}</Text>
            </View>
        );
    }
    const renderWeight = (item) => {
        let ls = item["item"].split(" ");
        return (
            <View style={{ justifyContent: "center" }}>
                <Text> {ls[0]} {weightName[ls[1]]} = {ls[3]} {weightName[ls[2]]}</Text>
            </View>
        );
    }
    const renderCurrency = (item) => {
        let ls = item["item"].split(" ");
        return (
            <View style={{ justifyContent: "center" }}>
                <Text> {ls[0]} {currencyName[ls[1]]} = {ls[3]} {currencyName[ls[2]]}</Text>
            </View>
        );
    }



    let historyView = <View></View>
    if (display) {
        historyView = <View style={styles.historyView}>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text> Area conversion history:</Text>
                <FlatList
                    horizontal={true}
                    data={userActivity["area"]}
                    renderItem={renderArea}
                />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text> Length conversion history:</Text>
                <FlatList
                    horizontal={true}
                    data={userActivity["length"]}
                    renderItem={renderLength}
                />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text> Speed conversion history:</Text>
                <FlatList
                    horizontal={true}
                    data={userActivity["speed"]}
                    renderItem={renderSpeed}
                />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text> Volume conversion history:</Text>
                <FlatList
                    horizontal={true}
                    data={userActivity["volume"]}
                    renderItem={renderVolume}
                />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text> Weight conversion history:</Text>
                <FlatList
                    horizontal={true}
                    data={userActivity["weight"]}
                    renderItem={renderWeight}
                />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text> Currency conversion history:</Text>
                <FlatList
                    horizontal={true}
                    data={userActivity["currency"]}
                    renderItem={renderCurrency}
                />
            </View>
        </View>
    }


    return (
        <View style={styles.container}>
            <View style={styles.profileInfo}>
                <Text>UserEmail: {userInfo.userEmail}</Text>
                <Text>UserName: {userInfo.userName}</Text>
                <Text>Registration Date: {userInfo.registeredAt.substr(0, userInfo.registeredAt.search("T"))}</Text>
            </View>
            <View style={styles.historyInfo}>
                <Button
                    title={`${display === false ? "show" : "hide"} history`}
                    onPress={() => {
                        getUserActivity();
                        setDisplay(!display);
                    }}
                />
                {historyView}
            </View>

        </View>)
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "grey",
    },
    profileInfo: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start"
    },
    historyInfo: {
        flex: 1,
        alignItems: "center",
    },
    historyView: {
        flex: 1
    }
});

export default ProfileScreen;
