import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useValue } from "./ValueContext";
import Axios from "axios";


const LoginScreen = ({ navigation, route }) => {

    const { currentValue, setCurrentValue } = useValue()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState({ "status": "" });

    let emailError = <View> </View>
    const validateEmail = (value) => {
        if (value !== "") {
            let re = /@+/
            let cond = re.test(value)
            if (!cond) {
                emailError = <View>
                    <Text style={{ color: "red" }}>Email should contain "@" </Text>
                </View>
            }
        } else if (value === "") {
            emailError = <View>
                <Text style={{ color: "red" }}>Email is required </Text>
            </View>
        }
    }
    let pwdError = <View></View>
    const validatePassword = (value) => {
        if (value !== "") {
            let re1 = /[a-zA-Z]+/
            let re2 = /[0-9]+/
            let re3 = /[!@#$%^&*]+/
            let cond = re1.test(value) && re2.test(value) && re3.test(value)
            if (!cond) {
                pwdError = <View>
                    <Text style={{ color: "red" }}>Password should contain at least one character, one number and one special character</Text>
                </View>
            }
        } else if (value === "") {
            pwdError = <View>
                <Text style={{ color: "red" }}>Password is required </Text>
            </View>
        }
    }


    let resultView = <View></View>
    if (result["status"] === true) {
        resultView = <View>
            <Text style={{ color: "red" }}> Login successful!</Text>
            <Button
                title="profile"
                onPress={() => navigation.navigate('Profile')}
            />
            <Button
                title="start conversion"
                onPress={() => navigation.navigate("Category")}
            />
        </View>
    } else if (result["status"] === false) {
        resultView = <View>
            <Text style={{ color: "red" }}>Login failed, account does not exist, please register first</Text>
            <Button
                title="Register"
                onPress={() => navigation.navigate('Register', { version: "CPA 5.0" })}
            />
        </View>
    }

    const userLogin = async () => {
        try {
            let serverURL = currentValue.serverURL;

            const registerStatus = await Axios({
                method: "post",
                url: "/getUserInfo",
                baseURL: serverURL,
                data: { userEmail: email },
            });
            let data = registerStatus.data;
            console.log(data);
            setResult(data);
            if (data["status"] === true) {
                await AsyncStorage.setItem("@userData",
                    JSON.stringify({
                        "userEmail": data.userEmail, "userName": data.userName, "registered": true, "registeredAt": data.registeredAt
                    }))
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 20, textAlign: "center" }}>Unit Converter version <Text style={{ color: "red" }}>{route.params.version}</Text></Text>
            </View>

            <View>
                <Text style={{ fontSize: 20, textAlign: "center" }}>Login your account here</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={{ fontSize: 15 }}>Enter Your Email </Text>
                <TextInput
                    placeholder="Enter your email"
                    onChangeText={email => setEmail(email)}
                    value={email}
                    style={{ fontSize: 15 }}
                    onEndEditing={validateEmail(email)}
                />
            </View>

            {emailError}

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={{ fontSize: 15 }}>Enter Your Password </Text>
                <TextInput
                    placeholder="Enter your password"
                    onChangeText={(password) => { setPassword(password) }}
                    value={password}
                    style={{ fontSize: 15 }}
                    onEndEditing={validatePassword(password)}
                    secureTextEntry={true}
                />
            </View>

            {pwdError}
            {resultView}
            <Button
                title="Login"
                onPress={() => {
                    userLogin();
                }}
            />
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

export default LoginScreen;
