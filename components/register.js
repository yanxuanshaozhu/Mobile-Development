import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';



const RegisterScreen = ({ navigation, route }) => {
    const [userInfo, setUserInfo] = useState({ name: "", email: "", registered: false })
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [registered, setRegistered] = useState(false);

    const areaName = { "are": "Are", "km2": "Square Kilometer", "m2": "Square Meter", "dm2": "Square Decimeter", "cm2": "Square Centimeter", "mm2": "Square MilliMeter", "acre": "Acre" };
    const lengthName = { "km": "Kilometer Meter", "m": "Meter", "mile": "Mile", "yard": "Yard", "ft": "Feet", "in": "Inch" };
    const speedName = { "km/h": "Kilometer per Hour", "m/s": "Meter per Second", "mph": "Mile per Hour", "ft/min": "Feet per Minute", "c(v)": "Speed of Light", "Mach(a)": "Speed of Sound(air)", "Mach(w)": "Speed of Sound(water)" };
    const volumeName = { "m3": "Cubic Meter", "dm3": "Liter(Cubic dm)", "barrel": "US Barrel", "gal": "US Liquid Gallon", "fl oz": "US Fluid Ounce", "pint": "US Pint", "quart": "US Quart", "tspn": "US Teaspoon", "cup": "US Cup" };
    const weightName = { "kg": "Kilogram", "gr": "Gram", "lb": "Pound", "oz": "Ounce", "grain": "Grain" };
    const currencyName = { "USD": "United States Dollar", "CNY": "Chinese Yuan", "GBP": "Great Britain Pound", "EUR": "EURO", "CAD": "Canadian Dollar", "HKD": "Hong Kong Dollar", "INR": "Indian Rupee" }


    useEffect(() => { getData() }
        , [])

    const getData = async () => {
        try {

            const jsonValue = await AsyncStorage.getItem('@User_info')
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

    let areaView = <View></View>;
    if (userInfo.registered && userInfo.area != null) {
        areaView =
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 15, color: "red" }}> Area conversion history:  </Text>
                <Text>{userInfo.area.i1} {areaName[userInfo.area.i2]} = {userInfo.area.i4.toFixed(6)} {areaName[userInfo.area.i3]}</Text>
            </View>
    }
    let lengthView = <View></View>;
    if (userInfo.registered && userInfo.length != null) {
        lengthView =
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 15, color: "red" }}> Length conversion history:  </Text>
                <Text>{userInfo.length.i1} {lengthName[userInfo.length.i2]} = {userInfo.length.i4.toFixed(6)} {lengthName[userInfo.length.i3]}</Text>
            </View>
    }
    let speedView = <View></View>;
    if (userInfo.registered && userInfo.speed != null) {
        speedView =
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 15, color: "red" }}> Speed conversion history:  </Text>
                <Text>{userInfo.speed.i1} {speedName[userInfo.speed.i2]} = {userInfo.speed.i4.toFixed(6)} {speedName[userInfo.speed.i3]}</Text>
            </View>
    }
    let volumeView = <View></View>;
    if (userInfo.registered && userInfo.volume != null) {
        volumeView =
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 15, color: "red" }}> Volume conversion history:  </Text>
                <Text>{userInfo.volume.i1} {volumeName[userInfo.volume.i2]} = {userInfo.volume.i4.toFixed(6)} {volumeName[userInfo.volume.i3]}</Text>
            </View>
    }
    let weightView = <View></View>;
    if (userInfo.registered && userInfo.weight != null) {
        weightView =
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 15, color: "red" }}> Weight conversion history:  </Text>
                <Text>{userInfo.weight.i1} {weightName[userInfo.weight.i2]} = {userInfo.weight.i4.toFixed(6)} {weightName[userInfo.weight.i3]}</Text>
            </View>
    }
    let currencyView = <View></View>;
    if (userInfo.registered && userInfo.currency != null) {
        currencyView =
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 15, color: "red" }}> Currency conversion history:  </Text>
                <Text>{userInfo.currency.i1} {currencyName[userInfo.currency.i2]} = {userInfo.currency.i4.toFixed(6)} {currencyName[userInfo.currency.i3]}</Text>
            </View>
    }
    let loginView = <View></View>;
    if (userInfo.registered) {
        loginView = <View style={{ alignItems: "center" }}>
            <View style={{ marginLeft: 45}}>

                <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "red", fontSize: 15 }}> User Name </Text>
                    <Text style={{ fontSize: 15 }}> {userInfo.name} </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "red", fontSize: 15 }}> User Email </Text>
                    <Text style={{ fontSize: 15 }}> {userInfo.email} </Text>
                </View>
            </View>
            {areaView}
            {lengthView}
            {speedView}
            {volumeView}
            {weightView}
            {currencyView}
        </View>
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 20, textAlign: "center" }}>Unit Converter version <Text style={{ color: "red" }}>{route.params.version}</Text></Text>
                <Text style={{ fontSize: 20, textAlign: "center" }}>Login to save conversion history:</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={{ fontSize: 15 }}>Enter Your Name </Text>
                <TextInput
                    placeholder="Enter your name"
                    onChangeText={(name) => { setName(name) }}
                    value={name}
                    style={{ fontSize: 15 }}
                />

            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={{ fontSize: 15 }}>Enter Your Email </Text>
                <TextInput
                    placeholder="Enter your email"
                    onChangeText={(email) => { setEmail(email) }}
                    value={email}
                    style={{ fontSize: 15 }}
                />

            </View>
            <Button
                title={"Register and login"}
                onPress={() => {
                    let cond = false;
                    if (name != "" && email != "") {
                        cond = true;
                    }
                    const theUserInfo = { name: name, email: email, registered: cond }
                    storeData(theUserInfo);
                }}
            />
            <Button
                title={"Start Conversion"}
                onPress={
                    () => navigation.navigate('Category')}

            />
            {loginView}

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'flex-start',
        backgroundColor: "grey",
    },
});

export default RegisterScreen;
