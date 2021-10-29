import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet,TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const App = () => {
    const [userInfo, setUserInfo] = useState({});
    const [num, setNum] = useState(0);
    const [itemValue1, setItemValue1] = useState("USD");
    const [itemValue2, setItemValue2] = useState("USD");

    const [data, setData] = useState({});


    
    const init = 0;
    const output = num * data[itemValue2] / data[itemValue1];

    const getRates = async () => {
        try {
            const response = await fetch('https://openexchangerates.org/api/latest.json?app_id=3fde0830b3a24434957729d6ffae3f4b');
            const json = await response.json();
            setData(json.rates);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getRates();
    }, []);

    let saveView = <View></View>
    if (userInfo.registered) {
        saveView = <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>

            <Button
                title="Save data"
                onPress={() => {
                    const area = { i1: num, i2: itemValue1, i3: itemValue2, i4: output}
                    userInfo.area = area;
                    storeData(userInfo);
                }}
            />
        </View>
    }

    return (
        <View style={styles.containerArea}>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={styles.containerAreaLeft}>
                    <TextInput
                        style={{ flex: 1, backgroundColor: "#03fc77", textAlign: "center" }}
                        onChangeText={(num) => setNum(parseFloat(num))}
                        value={num}
                        keyboardType="numeric">
                    </TextInput>
                    <Picker
                        selectedValue={itemValue1}
                        onValueChange={(itemValue1, itemIndex) =>
                            setItemValue1(itemValue1)
                        }
                        style={{ flex: 1 }}>
                        <Picker.Item label="USD" value="USD" />
                        <Picker.Item label="CNY" value="CNY" />
                        <Picker.Item label="GBP" value="GBP" />
                        <Picker.Item label="EUR" value="EUR" />
                        <Picker.Item label="CAD" value="CAD" />
                        <Picker.Item label="HKD" value="HKD" />
                    </Picker>
                </View>
                <View style={styles.containerAreaMiddle}>
                    <Text>
                        =
                    </Text>
                </View>
                <View style={styles.containerAreaRight}>
                    <Text style={{ flex: 1, textAlign: "center", backgroundColor: "#4287f5" }}> {num === 0 ? init.toFixed(2) : output.toFixed(6)} </Text>
                    <Picker
                        selectedValue={itemValue2}
                        onValueChange={(itemValue2, itemIndex) =>
                            setItemValue2(itemValue2)
                        }
                        style={{ flex: 1 }}>
                        <Picker.Item label="USD" value="USD" />
                        <Picker.Item label="CNY" value="CNY" />
                        <Picker.Item label="GBP" value="GBP" />
                        <Picker.Item label="EUR" value="EUR" />
                        <Picker.Item label="CAD" value="CAD" />
                        <Picker.Item label="HKD" value="HKD" />
                    </Picker>
                </View>


            </View>
            {saveView}
        </View>

    );
};

const styles = StyleSheet.create({
    containerArea: {
        flex: 1,
        backgroundColor: "grey",
    },
    containerAreaLeft: {
        flex: 4,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    containerAreaMiddle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    containerAreaRight: {
        flex: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
    }
});
export default App;