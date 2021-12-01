import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useValue } from "./ValueContext";
import Axios from "axios";
import { useFocusEffect } from '@react-navigation/native';


const LoginScreen = ({ navigation }) => {
    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            setEmail("");
            setPassword("");
            setResult(0);
            return () => {
                isActive = false;
            };
        }, [])
    );
    const { currentValue, setCurrentValue } = useValue()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState(0);

    const checkEmail = (input) => {
        let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return re.test(input);
    }

    const checkPassword = (input) => {
        let re1 = /[a-zA-Z]+/;
        let re2 = /[0-9]+/;
        let re3 = /[!@#$%^&*]+/;
        return re1.test(input) && re2.test(input) && re3.test(input);
    }

    const validateEmail = (value) => {
        if (value !== "") {
            let cond = checkEmail(value);
            if (!cond) {
                return (<View>
                    <Text style={{ color: "red" }}>Invalid email address</Text>
                </View>)
            } else {
                return;
            }
        } else {
            return (<View>
                <Text style={{ color: "red" }}>Email is required </Text>
            </View>);
        }
    }

    const validatePassword = (value) => {
        if (value !== "") {
            let cond = checkPassword(value);
            if (!cond) {
                return (<View>
                    <Text style={{ color: "red" }}>Password should contain at least one character, one number and one special character</Text>
                </View>);
            } else {
                return;
            }
        } else {
            return (<View>
                <Text style={{ color: "red" }}>Password is required </Text>
            </View>);
        }
    }


    const displayResult = (value) => {
        if (value === -1) {
            return (<View>
                <Text style={{ color: "red" }}>Please enter valid email, username, password and try again!</Text>
            </View>)
        } else if (value === 0) {
            return;
        } else if (value === 1) {
            return (<View style={{ alignItems: "center" }}>
                <Text style={{ color: "red" }}> Login succeeded!</Text>
                <TouchableOpacity
                    style={{ backgroundColor: "black", marginVertical: 2 }}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Text style={{ color: "red", margin: 5 }}>View Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ backgroundColor: "black", marginBottom: 2 }}
                    onPress={() => navigation.navigate('Category')}
                >
                    <Text style={{ color: "red", margin: 5 }}>Start Conversion</Text>
                </TouchableOpacity>
            </View>)
        } else if (value === 2) {
            return (<View style={{ alignItems: "center" }}>
                <Text style={{ color: "red" }}>Login failed: account does not exist, please register first</Text>
                <TouchableOpacity
                    style={{ backgroundColor: "black", marginVertical: 2 }}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={{ color: "red", margin: 5 }}>Register</Text>
                </TouchableOpacity>
            </View>)
        } else if (value == 3) {
            return (<View>
                <Text style={{ color: "red" }}> Login failed: email and password do not match, please try again</Text>
            </View>)
        }
    }

    const userLogin = async () => {
        try {
            if (checkEmail(email) && checkPassword(password)) {
                let serverURL = currentValue.serverURL;
                const registerStatus = await Axios({
                    method: "post",
                    url: "/getUserInfo",
                    baseURL: serverURL,
                    data: { userEmail: email },
                });
                let data = registerStatus.data;
                if (data["status"] === true) {
                    if (data["userEmail"] === email && data["userPassword"] == password) {
                        setResult(1);
                        await AsyncStorage.setItem("@userData",
                            JSON.stringify({
                                "userEmail": data.userEmail, "userName": data.userName, "registered": true, "registeredAt": data.registeredAt
                            }))
                    } else {
                        setResult(3);
                    }
                } else {
                    setResult(2);
                }
            } else {
                setResult(-1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 20 }}>Unit Converter version <Text style={{ color: "red" }}>{currentValue.version}</Text></Text>
                <Text style={{ fontSize: 20 }}>Login your account here</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={{ fontSize: 15 }}>Enter Your Email </Text>
                <TextInput
                    placeholder="Enter your email"
                    onChangeText={email => setEmail(email)}
                    value={email}
                    style={{ fontSize: 15 }}
                />
            </View>

            {validateEmail(email)}

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={{ fontSize: 15 }}>Enter Your Password </Text>
                <TextInput
                    placeholder="Enter your password"
                    onChangeText={(password) => { setPassword(password) }}
                    value={password}
                    style={{ fontSize: 15 }}
                    secureTextEntry={true}
                />
            </View>

            {validatePassword(password)}


            <TouchableOpacity
                style={{ backgroundColor: "black", marginVertical: 2 }}
                onPress={() => {
                    userLogin();
                }}
            >
                <Text style ={{color:"red", margin:5}}> Login </Text>
            </TouchableOpacity>
            {displayResult(result)}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "grey",
    },
});

export default LoginScreen;
