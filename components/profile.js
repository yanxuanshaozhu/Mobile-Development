import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from "axios";
import { useValue } from './ValueContext';


const ProfileScreen = ({ navigation }) => {
    const { currentValue, setCurrentValue } = useValue()
    const [userInfo, setUserInfo] = useState({ userEmail: "", userName: "", registeredAt: "" });
    const [userActivity, setUserActivity] = useState({ "area": [], "length": [], "speed": [], "volume": [], "weight": [], "currency": [] });

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

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            getUserInfo();
            setDisplayActivity(false);
            setDisplayEmail(false);
            setDisplayName(false);
            setDisplayPwd(false);
            return () => {
                isActive = false;
            };
        }, [])
    );

    const getUserInfo = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("@userData");
            if (jsonValue != null) {
                let info = JSON.parse(jsonValue);
                setUserInfo(info);
            } else {
                setUserActivity({ "area": [], "length": [], "speed": [], "volume": [], "weight": [], "currency": [] })
                setUserInfo({ userEmail: "", userName: "", registeredAt: "" })
            }
        } catch (e) {
            console.dir(e);
        }
    }

    const getUserActivity = async () => {
        try {
            if (userInfo.userEmail != "") {
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
            } else { setUserActivity({ "area": [], "length": [], "speed": [], "volume": [], "weight": [], "currency": [] }); }
        } catch (error) {
            console.dir(error);
        }
    }

    const checkEmail = (input) => {
        let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return re.test(input);
    }

    const updateEmail = async () => {
        try {
            // The user should login to update information
            if (userInfo["registeredAt"] !== "") {
                // The input email cannot be empty
                if (email !== "") {
                    // The input email should be valid
                    if (checkEmail(email)) {
                        const updateData = { userEmail: userInfo.userEmail };
                        updateData["newEmail"] = email;
                        let serverURL = currentValue.serverURL;
                        const response = await Axios({
                            method: "post",
                            url: "/updateUserInfo",
                            baseURL: serverURL,
                            data: updateData
                        });
                        // If update is successful, update asynchronous storage and userInfo
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
                    } else {
                        setResultEmail(3);
                    }
                } else {
                    setResultEmail(4);
                }
            } else {
                setResultEmail(5)
            }
        } catch (error) {
            console.dir(error);
        }
    }

    const checkName = (input) => {
        let c = input[0].toLowerCase();
        return "a" <= c && c <= "z";

    }

    const updateUserName = async () => {
        try {
            // The user should login to update information
            if (userInfo["registeredAt"] !== "") {
                // The new name cannot be empty
                if (name !== "") {
                    // The new name should be valid
                    if (checkName(name)) {
                        const updateData = { userEmail: userInfo.userEmail };
                        updateData["userName"] = name;
                        let serverURL = currentValue.serverURL;
                        const response = await Axios({
                            method: "post",
                            url: "/updateUserInfo",
                            baseURL: serverURL,
                            data: updateData
                        });
                        // If update is successful, update asynchronous storage userInfo
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
                    } else {
                        setResultName(3);
                    }
                } else {
                    setResultName(4);
                }
            } else {
                setResultName(5);
            }
        } catch (error) {
            console.dir(error);
        }
    }

    const checkPassword = (input) => {
        let re1 = /[a-zA-Z]+/;
        let re2 = /[0-9]+/;
        let re3 = /[!@#$%^&*]+/;
        return re1.test(input) && re2.test(input) && re3.test(input);
    }

    const updatePassword = async () => {
        try {
            // The user should login to update information
            if (userInfo["registeredAt"] !== "") {
                // The new password cannot be empty
                if (password !== "") {
                    // The new password should be valid
                    if (checkPassword(password)) {
                        const updateData = { userEmail: userInfo.userEmail };
                        updateData["userPassword"] = password;
                        let serverURL = currentValue.serverURL;
                        const response = await Axios({
                            method: "post",
                            url: "/updateUserInfo",
                            baseURL: serverURL,
                            data: updateData
                        });
                        // If update is successful, update asynchronous storage userInfo
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
                    } else {
                        setResultPwd(3);
                    }
                } else {
                    setResultPwd(4);
                }
            } else {
                setResultPwd(5);
            }
        } catch (error) {
            console.dir(error);
        }
    }

    const renderArea = (item) => {
        let ls = item.item.item.split(" ");
        return (
            <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "black", marginHorizontal: 2 }}>
                <Text style={{ color: "red", fontSize: 12 }}> {ls[0]} {areaName[ls[1]]} = {ls[3]} {areaName[ls[2]]}</Text>
            </View>
        );
    }
    const renderLength = (item) => {
        let ls = item.item.item.split(" ");
        return (
            <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "black", marginHorizontal: 2 }}>
                <Text style={{ color: "red", fontSize: 12 }}> {ls[0]} {lengthName[ls[1]]} = {ls[3]} {lengthName[ls[2]]}</Text>
            </View>
        );
    }
    const renderSpeed = (item) => {
        let ls = item.item.item.split(" ");
        return (
            <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "black", marginHorizontal: 2 }}>
                <Text style={{ color: "red", fontSize: 12 }}> {ls[0]} {speedName[ls[1]]} = {ls[3]} {speedName[ls[2]]}</Text>
            </View>
        );
    }
    const renderVolume = (item) => {
        let ls = item.item.item.split(" ");
        return (
            <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "black", marginHorizontal: 2 }}>
                <Text style={{ color: "red", fontSize: 12 }}>{ls[0]} {volumeName[ls[1]]} = {ls[3]} {volumeName[ls[2]]}</Text>
            </View>
        );
    }
    const renderWeight = (item) => {
        let ls = item.item.item.split(" ");
        return (
            <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "black", marginHorizontal: 2 }}>
                <Text style={{ color: "red", fontSize: 12 }}>{ls[0]} {weightName[ls[1]]} = {ls[3]} {weightName[ls[2]]}</Text>
            </View>
        );
    }
    const renderCurrency = (item) => {
        let ls = item.item.item.split(" ");
        return (
            <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "black", marginHorizontal: 2 }}>
                <Text style={{ color: "red", fontSize: 12 }}> {ls[0]} {currencyName[ls[1]]} = {ls[3]} {currencyName[ls[2]]}</Text>
            </View>
        );
    }

    let resultEmailView = <View></View>
    if (resultEmail === 0) {
        resultEmailView = <View><Text>Update succeeded!</Text></View>
    } else if (resultEmail === -2) {
        resultEmailView = <View><Text>Update failed: current email does not link to any existing account!</Text></View>
    } else if (resultEmail === -1) {
        resultEmailView = <View><Text>Update failed: target email has already been linked to one account, please try again!</Text></View>
    } else if (resultEmail === 5) {
        resultEmailView = <View><Text>Update failed: please login first!</Text></View>
    } else if (resultEmail === 4) {
        resultEmailView = <View><Text>Update failed: the new email cannot be empty!</Text></View>
    } else if (resultEmail === 3) {
        resultEmailView = <View><Text>Update failed: please enter a valid new email!</Text></View>
    } else if (resultEmail === 2) {
        resultEmailView = <View></View>
    }

    let resultNameView = <View></View>
    if (resultName === 0) {
        resultNameView = <View><Text>Update succeeded!</Text></View>
    } else if (resultName === 5) {
        resultNameView = <View><Text>Update failed: please login first!</Text></View>;
    } else if (resultName === 4) {
        resultNameView = <View><Text>Update failed: the new username cannot be empty!</Text></View>
    } else if (resultName === 3) {
        resultNameView = <View><Text>Update failed: username should start with a character!</Text></View>
    } else if (resultName === 2) {
        resultNameView = <View></View>
    }

    let resultPwdView = <View></View>
    if (resultPwd === 0) {
        resultPwdView = <View><Text>Update succeeded!</Text></View>
    } else if (resultPwd === 5) {
        resultPwdView = <View><Text>Update failed: please login first!</Text></View>;
    } else if (resultPwd === 4) {
        resultPwdView = <View><Text>Update failed: password cannot be empty!</Text></View>
    } else if (resultPwd === 3) {
        resultPwdView = <View><Text>Update failed: password should contain one character, one number and one special character!</Text></View>
    } else if (resultPwd === 2) {
        resultPwdView = <View></View>
    }


    let emailView = <View></View>
    if (displayEmail) {
        emailView = <View>
            <Text >Enter new Email </Text>
            <TextInput
                placeholder="Enter new email"
                onChangeText={(email) => { setEmail(email) }}
                value={email}
            />
            <TouchableOpacity
                style={{ backgroundColor: "black", marginBottom: 2 }}
                onPress={() => updateEmail()}
            >
                <Text
                    style={{ margin: 5, color: "red" }}

                >Submit Update</Text>
            </TouchableOpacity>
            {resultEmailView}
        </View>
    }

    let nameView = <View></View>
    if (displayName) {
        nameView = <View>
            <Text >Enter new username </Text>
            <TextInput
                placeholder="Enter new username"
                onChangeText={(name) => { setName(name) }}
                value={name}
            />
            <TouchableOpacity
                style={{ backgroundColor: "black", marginBottom: 2 }}
                onPress={() => updateUserName()}
            >
                <Text
                    style={{ margin: 5, color: "red" }}

                >Submit Update</Text>
            </TouchableOpacity>
            {resultNameView}
        </View>
    }

    let pwdView = <View></View>
    if (displayPwd) {
        pwdView = <View>
            <Text >Enter new password </Text>
            <TextInput
                placeholder="Enter new password"
                onChangeText={(password) => { setPassword(password) }}
                value={password}
                secureTextEntry={true}
            />
            <TouchableOpacity
                style={{ backgroundColor: "black", marginBottom: 2 }}
                onPress={() => updatePassword()}
            >
                <Text
                    style={{ margin: 5, color: "red" }}

                >Submit Update</Text>
            </TouchableOpacity>
            {resultPwdView}
        </View>
    }

    let historyView = <View></View>
    if (displayActivity) {
        historyView = <View >

            <View >
                <Text style={{ fontWeight: "bold" }}> Area conversion history:</Text>
                <FlatList
                    horizontal={true}
                    data={userActivity["area"].map((item, index) => ({ "item": item, "id": index }))}
                    renderItem={renderArea}
                    keyExtractor={(item, id) => id.toString()}
                />
            </View>

            <View >
                <Text style={{ fontWeight: "bold" }}> Length conversion history:</Text>
                <FlatList
                    horizontal={true}
                    data={userActivity["length"].map((item, index) => ({ item, "id": index }))}
                    renderItem={renderLength}
                    keyExtractor={(item, id) => id.toString()}
                />
            </View>

            <View >
                <Text style={{ fontWeight: "bold" }}> Speed conversion history:</Text>
                <FlatList
                    horizontal={true}
                    data={userActivity["speed"].map((item, index) => ({ item, "id": index }))}
                    renderItem={renderSpeed}
                    keyExtractor={(item, id) => id.toString()}
                />
            </View>

            <View >
                <Text style={{ fontWeight: "bold" }}> Volume conversion history:</Text>
                <FlatList
                    horizontal={true}
                    data={userActivity["volume"].map((item, index) => ({ item, "id": index }))}
                    renderItem={renderVolume}
                    keyExtractor={(item, id) => id.toString()}
                />
            </View>

            <View >
                <Text style={{ fontWeight: "bold" }}> Weight conversion history:</Text>
                <FlatList
                    horizontal={true}
                    data={userActivity["weight"].map((item, index) => ({ item, "id": index }))}
                    renderItem={renderWeight}
                    keyExtractor={(item, id) => id.toString()}
                />
            </View>

            <View >
                <Text style={{ fontWeight: "bold" }}> Currency conversion history:</Text>
                <FlatList
                    horizontal={true}
                    data={userActivity["currency"].map((item, index) => ({ item, "id": index }))}
                    renderItem={renderCurrency}
                    keyExtractor={(item, id) => id.toString()}
                />
            </View>

        </View>
    }


    return (
        <View style={styles.container}>
            <View style={{ justifyContent: "flex-start", alignItems: "center" }}>
                <Text style={{ fontSize: 20 }}>Unit Converter version <Text style={{ color: "red" }}>{currentValue.version}</Text></Text>
                <Text style={{ fontSize: 20 }}> User Information </Text>
            </View>
            <View style={{ justifyContent: "flex-start" }}>
                <View style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold" }}>UserEmail  <Text style={{ fontWeight: "normal" }}>{userInfo.userEmail}</Text></Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold" }}>UserName  <Text style={{ fontWeight: "normal" }}>{userInfo.userName}</Text></Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold" }}>Registration date  <Text style={{ fontWeight: "normal" }}>{userInfo.registeredAt.substr(0, userInfo.registeredAt.search("T"))}</Text></Text>
                    </View>
                    <View >
                        <TouchableOpacity
                            style={{ backgroundColor: "black", marginVertical: 2 }}
                            onPress={() => {
                                setDisplayEmail(!displayEmail);
                                if (!displayEmail) {
                                    setResultEmail(2);
                                    setEmail("");
                                }
                            }}
                        >
                            <Text
                                style={{ margin: 5, color: "red" }}
                            >Update Email</Text>
                        </TouchableOpacity>
                        {emailView}
                    </View>

                    <View style={{ alignItems: "flex-start" }}>
                        <View >
                            <TouchableOpacity
                                style={{ backgroundColor: "black", marginBottom: 2 }}
                                onPress={() => {
                                    setDisplayName(!displayName);
                                    if (!displayName) {
                                        setResultName(2);
                                        setName("");
                                    }
                                }}
                            >
                                <Text
                                    style={{ margin: 5, color: "red" }}
                                >Update Username</Text>
                            </TouchableOpacity>
                            {nameView}
                        </View>

                        <View >
                            <TouchableOpacity
                                style={{ backgroundColor: "black", marginBottom: 2 }}
                                onPress={() => {
                                    setDisplayPwd(!displayPwd);
                                    if (!displayPwd) {
                                        setResultPwd(2);
                                        setPassword("");
                                    }
                                }}
                            >
                                <Text
                                    style={{ margin: 5, color: "red" }}
                                >Update Password</Text>
                            </TouchableOpacity>
                            {pwdView}
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: "flex-start" }}>
                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity
                            style={{ alignItems: "center", backgroundColor: "black" }}
                            onPress={() => {
                                getUserActivity();
                                setDisplayActivity(!displayActivity);
                            }}
                        >
                            <Text style={{ color: "red", margin: 5 }}>{`${displayActivity === false ? "Show" : "Hide"} History`}</Text>
                        </TouchableOpacity>
                    </View>
                    {historyView}
                </View>
            </View>
        </View>)
};

const styles = StyleSheet.create({
    container: {
        flex: 2,
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
        justifyContent: "flex-start",
        alignItems: "center",
    },
    historyView: {
        flex: 2,
        justifyContent: "flex-start",
        alignItems: "flex-start"
    }
});

export default ProfileScreen;
