import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useValue } from "./ValueContext";
import Axios from "axios";


const RegisterScreen = ({ navigation, route }) => {

    const { currentValue, setCurrentValue } = useValue()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState(0);

    const validateEmail = (value) => {
        if (value !== "") {
            let re = /@+/
            let cond = re.test(value)
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

    const validateName = (value) => {
        if (value !== "") {
            let c = value[0].toLowerCase();
            let cond = "a" <= c && c <= "z"
            if (!cond) {
                return (<View>
                    <Text style={{ color: "red" }}>Username can only start with a character </Text>
                </View>);
            } else {
                return;
            }
        } else {
            return (<View>
                <Text style={{ color: "red" }}>UserName is required </Text>
            </View>);
        }
    }

    const validatePassword = (value) => {
        if (value !== "") {
            let re1 = /[a-zA-Z]+/
            let re2 = /[0-9]+/
            let re3 = /[!@#$%^&*]+/
            let cond = re1.test(value) && re2.test(value) && re3.test(value)
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
        if (value === 0) {
            return (<View></View>)
        } else if (value === 1) {
            return (<View style={{ alignItems: "center" }}>
                <Text style={{ color: "red" }}> Registration is successful! Please Login</Text>
                <Button
                    title="Login In"
                    onPress={() => navigation.navigate('Login', { version: "CPA 5.0" })}
                />
            </View>)
        } else if (result === 2) {
            return (<View style={{ alignItems: "center" }}>
                <Text style={{ color: "red" }}>Registration failed, this email has ready linked to one account, please go to login</Text>
                <Button
                    title="Login In"
                    onPress={() => navigation.navigate('Login', { version: "CPA 5.0" })}
                />
            </View>)
        }
    }

    const userRegistration = async () => {
        try {
            let serverURL = currentValue.serverURL;

            const registerStatus = await Axios({
                method: "post",
                url: "/register",
                baseURL: serverURL,
                data: { userEmail: email, userName: name, userPassword: password },
            });
            if (registerStatus.data["status"] === true) {
                setResult(1)
            } else {
                setResult(2)
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
                <Text style={{ fontSize: 20, textAlign: "center" }}>Register an account here</Text>
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

            {validateEmail(email)}

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={{ fontSize: 15 }}>Enter Your Name </Text>
                <TextInput
                    placeholder="Enter your name"
                    onChangeText={(name) => { setName(name) }}
                    value={name}
                    style={{ fontSize: 15 }}
                />
            </View>

            {validateName(name)}

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
            <Button
                title="Register"
                onPress={() => {
                    userRegistration();
                }}
            />
            {displayResult(result)}


        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "grey",
    },
});

export default RegisterScreen;
