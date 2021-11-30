import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from "axios";
import { useValue } from './ValueContext';


const ProfileScreen = ({ navigation }) => {
    const { currentValue, setCurrentValue } = useValue()
    const [userInfo, setUserInfo] = useState({ userEmail: "", userName: "", registeredAt: "" });
    const [userActivity, setUserActivity] = useState({});
    const [displayActivity, setDisplayActivity] = useState(false);
    const [displayEmail, setDisplayEmail] = useState(false);
    const [displayName, setDisplayName] = useState(false);
    const [displayPwd, setDisplayPwd] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [resultEmail, setResultEmail] = useState(1);
    const [resultName, setResultName] = useState(1);
    const [resultPwd, setResultPwd] = useState(1);

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

    const updateEmail = async () => {
        try {
            console.log("updateEmail start")
            const updateData = { userEmail: userInfo.userEmail };
            if (email != "") {
                updateData["newEmail"] = email;
            }
            let serverURL = currentValue.serverURL;
            const response = await Axios({
                method: "post",
                url: "/updateUserInfo",
                baseURL: serverURL,
                data: updateData
            });
            console.log("update email response")
            console.log(response.data["status"]);
            if (response.data["status"] === 0) {
                let date = userInfo["registeredAt"];
                let newName = name === "" ? userInfo["userName"] : name;
                let newEmail = email === "" ? userInfo["userEmail"] : email;
                let newData = {
                    "userEmail": newEmail, "userName": newName, "registered": true, "registeredAt": date
                }
                await AsyncStorage.setItem("@userData",
                    JSON.stringify(newData));
                setUserInfo(newData);
            }
            setResultEmail(response.data["status"]);
            console.log("update email end")
        } catch (error) {
            console.dir(error);
        }
    }

    const updateUserName = async () => {
        try {
            console.log("updateName start")
            const updateData = { userEmail: userInfo.userEmail };
            if (name != "") {
                updateData["userName"] = name;
            }
            let serverURL = currentValue.serverURL;
            const response = await Axios({
                method: "post",
                url: "/updateUserInfo",
                baseURL: serverURL,
                data: updateData
            });
            console.log("update name response")
            console.log(response.data["status"]);
            if (response.data["status"] === 0) {
                let date = userInfo["registeredAt"];
                let newName = name === "" ? userInfo["userName"] : name;
                let newEmail = email === "" ? userInfo["userEmail"] : email;
                let newData = {
                    "userEmail": newEmail, "userName": newName, "registered": true, "registeredAt": date
                }
                await AsyncStorage.setItem("@userData",
                    JSON.stringify(newData));
                setUserInfo(newData);
            }
            setResultName(response.data["status"]);
            console.log("update email end")
        } catch (error) {
            console.dir(error);
        }
    }

    const updatePassword = async () => {
        try {
            console.log("update password  start")
            const updateData = { userEmail: userInfo.userEmail };
            if (password != "") {
                updateData["userPassword"] = password;
            }
            let serverURL = currentValue.serverURL;
            const response = await Axios({
                method: "post",
                url: "/updateUserInfo",
                baseURL: serverURL,
                data: updateData
            });
            console.log("update password response")
            console.log(response.data["status"]);
            if (response.data["status"] === 0) {
                let date = userInfo["registeredAt"];
                let newName = name === "" ? userInfo["userName"] : name;
                let newEmail = email === "" ? userInfo["userEmail"] : email;
                let newData = {
                    "userEmail": newEmail, "userName": newName, "registered": true, "registeredAt": date
                }
                await AsyncStorage.setItem("@userData",
                    JSON.stringify(newData));
                setUserInfo(newData);
            }
            setResultPwd(response.data["status"]);
            console.log("update password end")
        } catch (error) {
            console.dir(error);
        }
    }



    const renderArea = (item) => {
        let ls = item["item"].split(" ");
        return (
            <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "black", margin: 5 }}>
                <Text style={{ color: "red" }}> {ls[0]} {areaName[ls[1]]} = {ls[3]} {areaName[ls[2]]}</Text>
            </View>
        );
    }
    const renderLength = (item) => {
        let ls = item["item"].split(" ");
        return (
            <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "black", margin: 5 }}>
                <Text style={{ color: "red" }}> {ls[0]} {lengthName[ls[1]]} = {ls[3]} {lengthName[ls[2]]}</Text>
            </View>
        );
    }
    const renderSpeed = (item) => {
        let ls = item["item"].split(" ");
        return (
            <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "black", margin: 5 }}>
                <Text style={{ color: "red" }}> {ls[0]} {speedName[ls[1]]} = {ls[3]} {speedName[ls[2]]}</Text>
            </View>
        );
    }
    const renderVolume = (item) => {
        let ls = item["item"].split(" ");
        return (
            <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "black", margin: 5 }}>
                <Text style={{ color: "red" }}>{ls[0]} {volumeName[ls[1]]} = {ls[3]} {volumeName[ls[2]]}</Text>
            </View>
        );
    }
    const renderWeight = (item) => {
        let ls = item["item"].split(" ");
        return (
            <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "black", margin: 5 }}>
                <Text style={{ color: "red" }}>{ls[0]} {weightName[ls[1]]} = {ls[3]} {weightName[ls[2]]}</Text>
            </View>
        );
    }
    const renderCurrency = (item) => {
        let ls = item["item"].split(" ");
        return (
            <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "black", margin: 5 }}>
                <Text style={{ color: "red" }}> {ls[0]} {currencyName[ls[1]]} = {ls[3]} {currencyName[ls[2]]}</Text>
            </View>
        );
    }

    let resultEmailView = <View></View>
    if (resultEmail === 0) {
        resultEmailView = <View><Text>Update succeeded!</Text></View>
    } else if (resultEmail === -2) {
        resultEmailView = <View><Text>Update failed: current email does not link to any existing account!</Text></View>
    } else if (resultEmail === -1) {
        resultEmailView = <View><Text>Update failed: target email has already been linked to another account, please try again!</Text></View>
    }

    let resultNameView = <View></View>
    if (resultName === 0) {
        resultNameView = <View><Text>Update succeeded!</Text></View>
    }

    let resultPwdView = <View></View>
    if (resultPwd === 0) {
        resultPwdView = <View><Text>Update succeeded!</Text></View>
    }

    let emailView = <View></View>
    if (displayEmail) {
        emailView = <View>
            <Text >Enter new Email </Text>
            <TextInput
                placeholder="Enter your email"
                onChangeText={(email) => { setEmail(email) }}
                value={email}
            />
            <Text
                style={{ marginRight: 5, color: "red", backgroundColor: "black" }}
                onPress={() => updateEmail()}
            >Submit Update</Text>
            {resultEmailView}
        </View>
    }

    let nameView = <View></View>
    if (displayName) {
        nameView = <View>
            <Text >Enter new username </Text>
            <TextInput
                placeholder="Enter your username"
                onChangeText={(name) => { setName(name) }}
                value={name}
            />
            <Text
                style={{ marginRight: 5, color: "red", backgroundColor: "black" }}
                onPress={() => updateUserName()}
            >Submit Update</Text>
            {resultNameView}
        </View>
    }

    let pwdView = <View></View>
    if (displayPwd) {
        pwdView = <View>
            <Text >Enter new password </Text>
            <TextInput
                placeholder="Enter your email"
                onChangeText={(password) => { setPassword(password) }}
                value={password}
                secureTextEntry={true}
            />
            <Text
                style={{ marginRight: 5, color: "red", backgroundColor: "black" }}
                onPress={() => updatePassword()}
            >Submit Update</Text>
            {resultPwdView}
        </View>
    }

    let historyView = <View></View>
    if (displayActivity) {
        historyView = <View style={styles.historyView}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Text style={{ fontWeight: "bold", margin: 5 }}> Area conversion history:</Text>
                <FlatList
                    horizontal={true}
                    data={userActivity["area"]}
                    renderItem={renderArea}
                />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontWeight: "bold", margin: 5 }}> Length conversion history:</Text>
                <FlatList
                    horizontal={true}
                    data={userActivity["length"]}
                    renderItem={renderLength}
                />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontWeight: "bold", margin: 5 }}> Speed conversion history:</Text>
                <FlatList
                    horizontal={true}
                    data={userActivity["speed"]}
                    renderItem={renderSpeed}
                />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontWeight: "bold", margin: 5 }}> Volume conversion history:</Text>
                <FlatList
                    horizontal={true}
                    data={userActivity["volume"]}
                    renderItem={renderVolume}
                />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontWeight: "bold", margin: 5 }}> Weight conversion history:</Text>
                <FlatList
                    horizontal={true}
                    data={userActivity["weight"]}
                    renderItem={renderWeight}
                />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontWeight: "bold", margin: 5 }}> Currency conversion history:</Text>
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
                <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
                    <Text style={{ fontSize: 20 }}>Unit Converter version <Text style={{ color: "red" }}>{currentValue.version}</Text></Text>
                    <Text style={{ fontSize: 20 }}> User Information </Text>
                </View>
                <View style={{ flex: 2 }}>

                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold" }}>UserEmail  <Text style={{ fontWeight: "normal" }}>{userInfo.userEmail}</Text></Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold" }}>UserName  <Text style={{ fontWeight: "normal" }}>{userInfo.userName}</Text></Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold" }}>Registration date  <Text style={{ fontWeight: "normal" }}>{userInfo.registeredAt.substr(0, userInfo.registeredAt.search("T"))}</Text></Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                        <View >
                            <Text
                                style={{ marginRight: 5, color: "red", backgroundColor: "black" }}
                                onPress={() => setDisplayName(!displayName)}
                            >Update Username</Text>
                            {nameView}
                        </View>
                        <View >
                            <Text
                                style={{ marginRight: 5, color: "red", backgroundColor: "black" }}
                                onPress={() => setDisplayEmail(!displayEmail)}
                            >Update Email</Text>
                            {emailView}
                        </View>
                        <View >
                            <Text
                                style={{ marginRight: 5, color: "red", backgroundColor: "black" }}
                                onPress={() => setDisplayPwd(!displayPwd)}
                            >Update Password</Text>
                            {pwdView}
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.historyInfo}>
                <Button
                    title={`${displayActivity === false ? "show" : "hide"} history`}
                    onPress={() => {
                        getUserActivity();
                        setDisplayActivity(!displayActivity);
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
        justifyContent: "flex-start",
        backgroundColor: "grey",
    },
    profileInfo: {
        flex: 1,
        justifyContent: "flex-start",

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
